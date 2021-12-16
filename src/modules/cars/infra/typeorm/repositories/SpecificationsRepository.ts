import { Specifications } from "../entities/Specifications";
import { getRepository, Repository } from "typeorm";
import {
    ICreateSpecificationDTO,
    ISpecificationRepositorie,
} from "../interfaces/ISpecificationsRepositorie";

class SpecificationRepositorie implements ISpecificationRepositorie {
    private repository: Repository<Specifications>;

    
    constructor() {
        this.repository = getRepository(Specifications)
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specifications> {
        const specification = this.repository.create({
            description,
            name
        })

        await this.repository.save(specification)

        return specification
    
    }

    async findByName(name: string): Promise<Specifications> {
        const specification = await this.repository.findOne({name})
        return specification;
        
    }

    async list(): Promise<Specifications[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    async findByIds(ids: string[]): Promise<Specifications[]> {
        const specifications = await this.repository.findByIds(ids)
        return specifications
    }
}

export { SpecificationRepositorie };
