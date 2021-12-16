import { Specifications } from "../entities/Specifications";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepositorie {
    create({ name, description }: ICreateSpecificationDTO): Promise<Specifications>;
    findByName(name: string): Promise<Specifications>;
    list(): Promise<Specifications[]>;
    findByIds(ids:string[]): Promise<Specifications[]>
}

export { ISpecificationRepositorie, ICreateSpecificationDTO };
