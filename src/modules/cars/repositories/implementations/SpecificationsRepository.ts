import { Specifications } from "../../entities/Specifications";
import { getRepository, Repository } from "typeorm";
import {
    ICreateSpecificationDTO,
    ISpecificationRepositorie,
} from "../ISpecificationsRepositorie";

class SpecificationRepositorie implements ISpecificationRepositorie {
    private specifications: Repository<Specifications>;
    
    constructor() {
        this.specifications = getRepository(Specifications)
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.specifications.create({
            description,
            name
        })

        await this.specifications.save(specification)
        
      
    }

    async findByName(name: string): Promise<Specifications> {
        const specification = await this.specifications.findOne({name})
        return specification;
        
    }

    async list(): Promise<Specifications[]> {
        const specifications = await this.specifications.find();
        return specifications;
    }
}

export { SpecificationRepositorie };
