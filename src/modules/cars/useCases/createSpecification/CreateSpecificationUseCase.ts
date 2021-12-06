import { ICreateCategoryDTO } from "../../repositories/ICategoryRepositorie";
import { ISpecificationRepositorie } from "../../repositories/ISpecificationsRepositorie";
import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepositorie")
        private specificationRepositorie: ISpecificationRepositorie) {}

    async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
        const specificationAlreadyExists =
           await this.specificationRepositorie.findByName(name);

        if (specificationAlreadyExists) {
            throw new AppError("Specification already exists");
        }

        this.specificationRepositorie.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
