import { Specifications } from "../../entities/Specifications";
import { ICreateSpecificationDTO, ISpecificationRepositorie } from "../ISpecificationsRepositorie";


class SpecificationRepositorieInMemory implements ISpecificationRepositorie {
    
    specifications:Specifications[] = []
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specifications()
        Object.assign(specification,{
            name,
            description
        })

        this.specifications.push(specification)

    }
    async findByName(name: string): Promise<Specifications> {
        const specification = this.specifications.find(specification => specification.name === name)
        return specification
    }
    async list(): Promise<Specifications[]> {
        const listOfSpecification = this.specifications
        return listOfSpecification
    }
}

export {SpecificationRepositorieInMemory}