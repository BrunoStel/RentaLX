import { ICreateCategoryDTO } from "../../infra/typeorm/interfaces/ICategoryRepositorie";
import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationRepositorieMongo } from "../../infra/mongodb/interfaces/ISpecificationRepositorieMongo";


@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepositorieMongo")
        private specificationRepositorie: ISpecificationRepositorieMongo) {}

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
