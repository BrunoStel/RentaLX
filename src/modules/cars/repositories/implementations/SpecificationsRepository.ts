import { Specifications } from "../../model/Specifications";
import {
    ICreateSpecificationDTO,
    ISpecificationRepositorie,
} from "../ISpecificationsRepositorie";

class SpecificationRepositorie implements ISpecificationRepositorie {
    private specifications: Specifications[];

    // eslint-disable-next-line no-use-before-define
    private static INSTANCE: SpecificationRepositorie;

    private constructor() {
        this.specifications = [];
    }

    public static getInstance(): SpecificationRepositorie {
        if (!SpecificationRepositorie.INSTANCE) {
            SpecificationRepositorie.INSTANCE = new SpecificationRepositorie();
        }
        return SpecificationRepositorie.INSTANCE;
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
