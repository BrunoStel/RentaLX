import { Specifications } from "../model/Specifications";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepositorie {
    create({ name, description }: ICreateSpecificationDTO): void;
    findByName(name: string);
    list(): Specifications[];
}

export { ISpecificationRepositorie, ICreateSpecificationDTO };
