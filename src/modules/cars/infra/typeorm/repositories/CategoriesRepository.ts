import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";
import {
    ICategoryRepositorie,
    ICreateCategoryDTO,
} from "../interfaces/ICategoryRepositorie";

class CategoriesRepository implements ICategoryRepositorie {
    private repository: Repository<Category>;
    
    constructor() {
        this.repository = getRepository(Category);
    }

    findById(id: string): Promise<Category> {
        const category = this.repository.findOne({id})
        return category
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name
        })

        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {
       const categories = await this.repository.find();
       return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({name})
        return category;
    }
}

export { CategoriesRepository };
