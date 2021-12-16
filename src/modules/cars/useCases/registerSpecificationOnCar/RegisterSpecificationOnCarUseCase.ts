import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepositorie } from "../../infra/typeorm/interfaces/ICarsRepositorie";
import { ISpecificationRepositorie } from "../../infra/typeorm/interfaces/ISpecificationsRepositorie";


interface IRequest{
    car_id:string,
    specifications_id:string[]
}

@injectable()
class RegisterSpecificationOnCarUseCase {
    
    constructor(
        @inject("CarsRepositorie")
        private carsRepositorie: ICarsRepositorie , 
        @inject("SpecificationRepositorie")
        private specificationRepositorie : ISpecificationRepositorie
    ){}

    async execute({car_id, specifications_id}:IRequest):Promise<Car>{
        const carExists = await this.carsRepositorie.findById(car_id)

        if(!carExists){
            throw new AppError("Car does not exists")
        }

        const specifications = await this.specificationRepositorie.findByIds(specifications_id)

        carExists.specifications = specifications;

        const car = await this.carsRepositorie.create(carExists)

        return car

    }



}

export{RegisterSpecificationOnCarUseCase}