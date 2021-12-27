import { ICreateCategoryDTO } from "../../infra/typeorm/interfaces/ICategoryRepositorie";
import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationRepositorie } from "../../infra/typeorm/interfaces/ISpecificationsRepositorie";


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

        await this.specificationRepositorie.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
