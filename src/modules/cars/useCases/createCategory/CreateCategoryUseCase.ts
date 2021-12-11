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
        @inject("")
        private categoriesRepository: ICategoryRepositorie,
        @inject("CategoriesRepositoryMongo")
        private categproesRepositorieMongo: ICategoryRepositorieMongo) {}

   async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

        const categoryAlreadyExistsMongo =
            await this.categproesRepositorieMongo.findByName(name);

        if (categoryAlreadyExistsMongo || categoryAlreadyExists) {
            throw new AppError("Category already exists");
        }

        await this.categoriesRepository.create({ name, description });
        await this.categproesRepositorieMongo.create({ name, description });
    }
}

export { CreateCategoryUseCase };
