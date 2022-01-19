import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository"
import { ListUsersController } from "../../../../modules/accounts/UseCases/listUsers/listUsersController"
import { ListUsersUseCase } from "../../../../modules/accounts/UseCases/listUsers/listUsersUseCase"
import { IController } from "../../../../modules/protocols/IController"


export const makelistUsersController = (): IController => {

  const listUserRepositorie = new UserRepository()
  
  const listUsersUseCase = new ListUsersUseCase(listUserRepositorie)

  return new ListUsersController(listUsersUseCase)
}
