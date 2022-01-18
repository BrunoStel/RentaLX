import { User } from "../../entities/User";

export interface IFindByEmailUserRepositorie {
  findByEmail(email:string): Promise<User>
}