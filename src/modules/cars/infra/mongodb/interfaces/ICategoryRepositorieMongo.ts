import { Category } from "../../typeorm/entities/Category";
import { IcategorySchema } from "../schemas/categorySchema";


interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoryRepositorieMongo {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    list(): Promise<IcategorySchema[]>;
    findByName(name: string): Promise<IcategorySchema>;
}

export { ICategoryRepositorieMongo, ICreateCategoryDTO };
