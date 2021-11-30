import { Specifications } from "../entities/Specifications";
import { User } from "../entities/User";

interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    driver_license: string;
    avatar: string;
}

interface IUserRepositorie {
    create({ name, password, email, driver_license, avatar }: ICreateUserDTO): Promise<void>;
    findByEmail(name: string): Promise<User>;
    list(): Promise<User[]>;
}

export { IUserRepositorie, ICreateUserDTO };
