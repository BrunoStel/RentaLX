import { User } from "../../../modules/accounts/infra/typeorm/entities/User";

export interface IFindByUsernameProvider {
  userAlreadyExists: (username: string) => Promise<User>
}