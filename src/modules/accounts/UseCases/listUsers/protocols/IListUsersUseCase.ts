import { User } from "../../../infra/typeorm/entities/User";

export interface IListUsersUseCase {
   execute: () => Promise<User[]> 
}