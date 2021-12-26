import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rentals";
import { ICarsRepositorie } from "../../../cars/infra/typeorm/interfaces/ICarsRepositorie";
import { IRentalsRepositorie } from "../../infra/typeorm/interfaces/IRentalsRepositorie";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

@injectable()
class CreateRentalUseCase{

    constructor(
        @inject("RentalRepositorie")
        private rentalRepositorie:IRentalsRepositorie,
        @inject("CarsRepositorie")
        private carsRepositorie:ICarsRepositorie,
        @inject("DayJsDateProvider")
        private dateProvider :IDateProvider
    ){}

    async execute(car_id:string, user_id:string, expected_return_date:Date) : Promise<Rental>{

        //Verificando se o usuário já possui algum aluguel em aberto
        const userAlreadyHasARental = await this.rentalRepositorie.findUserById(user_id)


        if(userAlreadyHasARental === true){
            throw new AppError('User already has a open rental')
        }

         //Verificando as informações relacionados ao carro
        const isCarAvailable = await this.carsRepositorie.findById(car_id)

         //Verificando se o carro existe
        if(!isCarAvailable){
            throw new AppError('Car does not exists')
        }

         //Verificando se o carro está disponível
        if(isCarAvailable.available === false) {
            throw new AppError('Car is unavailable')
        }

        //Verificando se o rental é de no mínimo 24 horas
        const minimumHours = 24
        const start_date = this.dateProvider.dateNow()
        const compare = this.dateProvider.compareInHours(start_date, expected_return_date)

        if(compare < minimumHours){
            throw new AppError('The rental must be with at least 24 hours of rent')
        }


        const rental = await this.rentalRepositorie.create({car_id, user_id,expected_return_date})

        await this.carsRepositorie.changeAvailability(car_id, false)

        return rental

    }

}

export { CreateRentalUseCase }