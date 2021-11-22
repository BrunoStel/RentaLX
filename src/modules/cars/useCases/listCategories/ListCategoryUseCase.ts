import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { ICategoryRepositorie } from "../../repositories/ICategoryRepositorie";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

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
