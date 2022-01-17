import { User } from "../entities/User";

export interface IListUserRepositorie {
  list(): Promise<User[]>;
}