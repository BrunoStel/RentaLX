import { ICreateUserDTO } from "../../../../UseCases/createUser/protocols/ICreateUser";
import { User } from "../../entities/User";

export interface ICreateUserRepositorie {
  create(data: ICreateUserDTO): Promise<User>;
}