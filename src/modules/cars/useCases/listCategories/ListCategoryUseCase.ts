import { inject, injectable } from "tsyringe";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoryRepositorie } from "../../infra/typeorm/interfaces/ICategoryRepositorie";
import { CategoriesRepository } from "../../infra/typeorm/repositories/CategoriesRepository";

@injectable()
class ListCategoryUseCase {
    constructor(
        @inject(CategoriesRepository)
        private categoriesRepository: ICategoryRepositorie) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoryUseCase };
