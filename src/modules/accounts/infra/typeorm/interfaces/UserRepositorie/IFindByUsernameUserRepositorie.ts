import { User } from "../../entities/User";

export interface IFindByUsernameUserRepositorie {
  findByUsername(username: string): Promise<User>;
}