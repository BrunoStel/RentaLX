import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { ICategoryRepositorie } from "../../repositories/ICategoryRepositorie";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

@injectable()
class ListCategoryUseCase {
    constructor(
        @inject(CategoriesRepository)
        private categoriesRepository: ICategoryRepositorie) {}

    execute(): Promise<Category[]> {
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoryUseCase };
