import { ICreateCategoryDTO } from "../repositories/ICategoryRepositorie";
import { ISpecificationRepositorie } from "../repositories/ISpecificationsRepositorie";

class CreateSpecificationService {
    constructor(private specificationRepositorie: ISpecificationRepositorie) {}

    execute({ name, description }: ICreateCategoryDTO): void {
        const specification = this.specificationRepositorie.findByName(name);

        if (specification) {
            throw new Error("Specification already exists");
        }

        this.specificationRepositorie.create({ name, description });
    }
}

export { CreateSpecificationService };
