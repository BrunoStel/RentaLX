import { Specifications } from "../entities/Specifications";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepositorie {
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<Specifications>;
    list(): Promise<Specifications[]>;
}

export { ISpecificationRepositorie, ICreateSpecificationDTO };
