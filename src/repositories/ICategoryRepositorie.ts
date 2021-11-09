import { Category } from "../model/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoryRepositorie {
    create({ name, description }: ICreateCategoryDTO): void;
    list(): Category[];
    findByName(name: string): Category;
}

export { ICategoryRepositorie, ICreateCategoryDTO };
