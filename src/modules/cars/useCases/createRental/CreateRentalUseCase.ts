import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepositorie } from "../../../accounts/infra/typeorm/interfaces/IUserRepositorie";
import { Rental } from "../../infra/typeorm/entities/Rentals";
import { ICarsRepositorie } from "../../infra/typeorm/interfaces/ICarsRepositorie";
import { IRentalsRepositorie } from "../../infra/typeorm/interfaces/IRentalsRepositorie";


@injectable()
class CreateRentalUseCase{

    constructor(
        @inject("RentalRepositorie")
        private rentalRepositorie:IRentalsRepositorie,
        @inject("CarsRepositorie")
        private carsRepositorie:ICarsRepositorie
    ){}

    async execute(car_id:string, user_id:string, expected_return_date:Date, start_date:Date) : Promise<Rental>{

        //Verificando se o usuário já possui algum carro cadastrado
        const userAlreadyHasARental = await this.rentalRepositorie.findUserById(user_id)

        if(userAlreadyHasARental){
            throw new AppError('User already has a open rental')
        }

         //Verificando se o carro está disponível
        const isCarAvailable = await this.carsRepositorie.findById(car_id)

        if(isCarAvailable.available === false) {
            throw new AppError('Car is not available')
        }

        const rental = await this.rentalRepositorie.create({car_id, user_id,expected_return_date,start_date})

        return rental

    }

}

export { CreateRentalUseCase }