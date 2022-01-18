import { User } from "../../entities/User";

export interface IFindByIDUserRepositorie {
  findByID(id:string): Promise<User>
}