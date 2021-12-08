import { ICreateSpecificationDTO } from "../ISpecificationsRepositorie";
import { specificationModel } from "../../../../database/models/specificationModel";
import { ISpecificationRepositorieMongo } from "../ISpecificationRepositorieMongo";
import { IspecificationSchema } from "../../../../database/schemas/specificationSchema";

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
