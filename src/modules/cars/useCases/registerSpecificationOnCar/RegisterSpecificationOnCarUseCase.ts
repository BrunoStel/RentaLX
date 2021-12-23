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

        //Verificado se  os specifications_id existem no banco de dados
        const listOfSpecificationsIDs = (await this.specificationRepositorie.list()).map(specification => specification.id)

        specifications_id.forEach(specification => {

           if(!listOfSpecificationsIDs.includes(specification)){

                throw new AppError(`O ID of specification : ${specification} informed does not exists`)

           }
        })

        const newSpecifications = await this.specificationRepositorie.findByIds(specifications_id)
        
        //Pegando as especificações já cadastradas para esse carro
        const oldSpecifications = await this.carsRepositorie.specificationsAlreadyRegistered(car_id)
        

        if(!oldSpecifications){
            carExists.specifications = [...newSpecifications]
        }else{
            carExists.specifications = [...newSpecifications, ...oldSpecifications]
        }

        const car = await this.carsRepositorie.create(carExists)
        
        return car

    }



}

export{RegisterSpecificationOnCarUseCase}