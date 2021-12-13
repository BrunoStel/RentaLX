import { inject, injectable } from "tsyringe";
import { IRequestCarDTO } from "../../infra/dtos/IRequestCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepositorie } from "../../infra/typeorm/interfaces/ICarsRepositorie";




@injectable()
class ListAvailableCarsUseCase {

    constructor(
        @inject("CarsRepositorie")
        private carsRepositorie: ICarsRepositorie
    ){}

    async execute({brand,category_id,name}:IRequestCarDTO): Promise<Car[]>{
        const cars = await this.carsRepositorie.listAvailableCars({brand,category_id,name})
        
        return cars
    }



}

export { ListAvailableCarsUseCase }