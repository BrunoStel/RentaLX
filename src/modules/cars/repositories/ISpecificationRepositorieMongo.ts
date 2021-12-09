import { IspecificationSchema } from "../../../database/schemas/specificationSchema";


interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepositorieMongo {
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<IspecificationSchema>;
    list(): Promise<IspecificationSchema[]>;
}

export { ISpecificationRepositorieMongo, ICreateSpecificationDTO };
