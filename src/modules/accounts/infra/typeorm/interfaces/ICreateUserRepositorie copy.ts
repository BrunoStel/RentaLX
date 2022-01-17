import { User } from "../entities/User";
import { ICreateUserDTO } from "./IUserRepositorie";

export interface ICreateUserRepositorie {
  create(data: ICreateUserDTO): Promise<User>;
}