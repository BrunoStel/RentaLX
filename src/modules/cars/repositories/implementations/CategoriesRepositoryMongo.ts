import { categoryModel } from "../../../../database/models/categoryModel";
import { IcategorySchema } from "../../../../database/schemas/categorySchema";
import { ICreateCategoryDTO } from "../ICategoryRepositorie";
import { ICategoryRepositorieMongo } from "../ICategoryRepositorieMongo";

class CategoriesRepositoryMongo implements ICategoryRepositorieMongo {

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        await categoryModel.create({name, description})
    }

    async list(): Promise<IcategorySchema[]> {
       const categories = await categoryModel.find();
       return categories;
    }

    async findByName(name: string): Promise<IcategorySchema> {
        const category = await categoryModel.findOne({name})
        return category;
    }
}

export { CategoriesRepositoryMongo };
