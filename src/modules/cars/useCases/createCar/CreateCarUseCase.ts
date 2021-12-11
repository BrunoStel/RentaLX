
import { inject, injectable} from "tsyringe";
import { ICarsRepositorie } from "../../infra/typeorm/interfaces/ICarsRepositorie";

interface IRequest{
    name:string,
    description:string,
    daily_rate:number,
    license_plate:string,
    fine_amount:number,
    brand:string,
    category_id:string
}



@injectable()
class CreateCarUseCase{

    constructor(
        //@inject("CarsRepositorie")
        private carsRepositorie : ICarsRepositorie
    ){}

    async execute({name, description, daily_rate, license_plate, fine_amount,brand,category_id}:IRequest): Promise<void>{
        await this.carsRepositorie.create({name, description, daily_rate, license_plate, fine_amount,brand,category_id})
    }

}

export { CreateCarUseCase }