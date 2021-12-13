import { inject, injectable } from "tsyringe";
import { IcategorySchema } from "../../infra/mongodb/schemas/categorySchema";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoryRepositorie } from "../../infra/typeorm/interfaces/ICategoryRepositorie";


@injectable()
class ListCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoryRepositorie) {}
  
    async execute(): Promise<Category[] | IcategorySchema[]> {
        const categories = await this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoryUseCase };
