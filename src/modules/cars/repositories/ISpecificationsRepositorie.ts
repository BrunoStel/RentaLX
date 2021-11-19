import { Specifications } from "../entities/Specifications";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepositorie {
    create({ name, description }: ICreateSpecificationDTO): void;
    findByName(name: string): Specifications;
    list(): Specifications[];
}

export { ISpecificationRepositorie, ICreateSpecificationDTO };
