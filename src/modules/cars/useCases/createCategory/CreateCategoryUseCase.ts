import { ICategoryRepositorie } from "../../infra/typeorm/interfaces/ICategoryRepositorie";
import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoryRepositorieMongo } from "../../infra/mongodb/interfaces/ICategoryRepositorieMongo";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoryRepositorie) {}

   async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

      
        if (categoryAlreadyExists) {
            throw new AppError("Category already exists");
        }

        await this.categoriesRepository.create({ name, description });
      
    }
}

export { CreateCategoryUseCase };
