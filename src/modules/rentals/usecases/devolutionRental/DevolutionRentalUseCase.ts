import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepositorie } from "../../../cars/infra/typeorm/interfaces/ICarsRepositorie";
import { IRentalsRepositorie } from "../../infra/typeorm/interfaces/IRentalsRepositorie";
import { Rental } from "../../infra/typeorm/entities/Rentals";


@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject("RentalRepositorie")
        private rentalRepositorie:IRentalsRepositorie,
        @inject("CarsRepositorie")
        private carsRepositorie: ICarsRepositorie,
        @inject("DayJsDateProvider")
        private dateProvider :IDateProvider
    ){}

    async execute(id:string): Promise<Rental>{
        const rental = await this.rentalRepositorie.findById(id)
         
        if(!rental){
            throw new AppError("Rental does not exists ")
        }

        if(rental.finished === true){
            throw new AppError("Rental is already finished")
        }

        const minimumHours = 24
        const minimumDaily = 1
        let diffInHours:Number = 0 
        let delay:number = 0
        const dateNow = this.dateProvider.dateNow()


        rental.end_date = dateNow

        if(dateNow > rental.expected_return_date ){
            diffInHours = this.dateProvider.compareInHours(rental.start_date, rental.end_date)
        }else {
            diffInHours = this.dateProvider.compareInHours(rental.start_date, rental.expected_return_date)
        }
      

        let daily = (diffInHours as number/ minimumHours)

        if(daily <= 1){
            daily = minimumDaily
        }

        if (daily > 1){
            delay = this.dateProvider.compareInHours(rental.expected_return_date, dateNow) as number/24
        }

        const car = await this.carsRepositorie.findById(rental.car_id)

        const calculate_fine = delay * car.fine_amount

        let total = calculate_fine

        total += daily*car.daily_rate

        rental.total = total
        rental.finished = true

        await this.rentalRepositorie.create(rental)

        await this.carsRepositorie.changeAvailability(car.id, true)

        return rental
    }


}

export { DevolutionRentalUseCase}