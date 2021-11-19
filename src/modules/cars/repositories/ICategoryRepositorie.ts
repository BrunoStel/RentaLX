import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoryRepositorie {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    list(): Promise<Category[]>;
    findByName(name: string): Promise<Category>;
}

export { ICategoryRepositorie, ICreateCategoryDTO };
