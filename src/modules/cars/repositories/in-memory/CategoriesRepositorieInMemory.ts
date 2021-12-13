import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoryRepositorie, ICreateCategoryDTO } from "../../infra/typeorm/interfaces/ICategoryRepositorie";


class CategoriesRepositorieInMemory implements ICategoryRepositorie {

   categories: Category[] = []

   async findById(id: string): Promise<Category> {
        const category = this.categories.find(category => category.id === id)
        return category
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category()
        Object.assign(category, {
            name,
            description
        })

        this.categories.push(category)
    }

    async list(): Promise<Category[]> {
        const listCategories = this.categories
        return listCategories
    }

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(category => category.name === name)
        return category
    }

}

export { CategoriesRepositorieInMemory }