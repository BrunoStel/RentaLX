import { Specifications } from "../../cars/entities/Specifications";
import { User } from "../entities/User";

interface ICreateUserDTO {
    name: string;
    password: string;
    username:string;
    email: string;
    driver_license: string;
}

interface IUserRepositorie {
    create(data: ICreateUserDTO): Promise<void>;
    findByUsername(username: string): Promise<User>;
    list(): Promise<User[]>;
    findByID(id:string): Promise<User>
}

export { IUserRepositorie, ICreateUserDTO };
