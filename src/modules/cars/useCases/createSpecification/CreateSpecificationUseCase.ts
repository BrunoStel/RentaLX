import { ICreateCategoryDTO } from "../../repositories/ICategoryRepositorie";
import { ISpecificationRepositorie } from "../../repositories/ISpecificationsRepositorie";
import { inject, injectable } from "tsyringe"

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepositorie")
        private specificationRepositorie: ISpecificationRepositorie) {}

    async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
        const specificationAlreadyExists =
           await this.specificationRepositorie.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Specification already exists");
        }

        this.specificationRepositorie.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
