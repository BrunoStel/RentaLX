import { User } from "../../entities/User";

interface ICreateUserDTO {
    name: string;
    password: string;
    username:string;
    email: string;
    driver_license: string;
    avatar?:string;
    id?:string
}

interface IUserRepositorie {
    create(data: ICreateUserDTO): Promise<User>;
    findByUsername(username: string): Promise<User>;
    list(): Promise<User[]>;
    findByID(id:string): Promise<User>
    findByEmail(email:string): Promise<User>
}

export { IUserRepositorie, ICreateUserDTO };