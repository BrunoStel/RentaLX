import { Category } from "../../model/Category";
import { ICategoryRepositorie } from "../../repositories/ICategoryRepositorie";

class ListCategoryUseCase {
    constructor(private categoriesRepository: ICategoryRepositorie) {}

    execute(): Category[] {
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoryUseCase };
