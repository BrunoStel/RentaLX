import { ICreateCategoryDTO } from "../../repositories/ICategoryRepositorie";
import { ISpecificationRepositorie } from "../../repositories/ISpecificationsRepositorie";

class CreateSpecificationUseCase {
    constructor(private specificationRepositorie: ISpecificationRepositorie) {}

    execute({ name, description }: ICreateCategoryDTO): void {
        const specificationAlreadyExists =
            this.specificationRepositorie.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Specification already exists");
        }

        this.specificationRepositorie.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
