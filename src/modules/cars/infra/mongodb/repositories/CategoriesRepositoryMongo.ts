import { categoryModel } from "../models/categoryModel";
import { IcategorySchema } from "../schemas/categorySchema";
import {ICreateCategoryDTO,} from "../../typeorm/interfaces/ICategoryRepositorie";
import { ICategoryRepositorieMongo } from "../interfaces/ICategoryRepositorieMongo";

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
