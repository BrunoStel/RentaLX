import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepositorie } from "../../infra/typeorm/interfaces/ICarsRepositorie";




@injectable()
class ListAvailableCarsUseCase {

    constructor(
        @inject("CarsRepositorie")
        private carsRepositorie: ICarsRepositorie
    ){}

    async execute(): Promise<Car[]>{
        const cars = await this.carsRepositorie.listAvailableCars()
        
        return cars
    }



}

export { ListAvailableCarsUseCase }