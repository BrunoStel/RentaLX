import { Specifications } from "../model/Specifications";
import {
    ICreateSpecificationDTO,
    ISpecificationRepositorie,
} from "./ISpecificationsRepositorie";

class SpecificationRepositorie implements ISpecificationRepositorie {
    private specifications: Specifications[];

    constructor() {
        this.specifications = [];
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specifications();
        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });
        this.specifications.push(specification);
    }

    findByName(name: string): Specifications {
        return this.specifications.find((obj) => obj.name === name);
    }

    list(): Specifications[] {
        return this.specifications;
    }
}

export { SpecificationRepositorie };
