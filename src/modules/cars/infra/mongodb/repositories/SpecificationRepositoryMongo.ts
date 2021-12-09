import { ICreateSpecificationDTO } from "../../typeorm/interfaces/ISpecificationsRepositorie";

import { ISpecificationRepositorieMongo } from "../interfaces/ISpecificationRepositorieMongo";
import { IspecificationSchema } from "../schemas/specificationSchema";
import { specificationModel } from "../models/specificationModel";


class SpecificationRepositorieMongo implements ISpecificationRepositorieMongo {

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        await specificationModel.create({name, description})
      
    }

    async findByName(name: string): Promise<IspecificationSchema> {
        const specification = await specificationModel.findOne({name})
        return specification;
        
    }

    async list(): Promise<IspecificationSchema[]> {
        const specifications = await specificationModel.find();
        return specifications;
    }
}

export { SpecificationRepositorieMongo };
