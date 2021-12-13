
import { inject, injectable} from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepositorie } from "../../infra/typeorm/interfaces/ICarsRepositorie";
import { ICategoryRepositorie } from "../../infra/typeorm/interfaces/ICategoryRepositorie";

interface IRequest{
    name:string,
    description:string,
    daily_rate:number,
    license_plate:string,
    fine_amount:number,
    brand:string,
    category_id:string,
    available?:boolean
}

@injectable()
class CreateCarUseCase{

    constructor(
        @inject("CarsRepositorie")
        private carsRepositorie : ICarsRepositorie
    ){}

    async execute({name, description, daily_rate, license_plate, fine_amount,brand,category_id, available}:IRequest): Promise<Car>{
        const licensePlateAlreadyInUse = await this.carsRepositorie.findByLicensePlate(license_plate)


        if(licensePlateAlreadyInUse){
            throw new AppError('License Plate Already in use')
        }

        const car = await this.carsRepositorie.create({name, description, daily_rate, license_plate, fine_amount,brand,category_id, available})
        return car
    }

}

export { CreateCarUseCase }