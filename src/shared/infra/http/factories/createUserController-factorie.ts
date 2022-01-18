import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository"
import { CreateUserController } from "../../../../modules/accounts/UseCases/createUser/CreateUserController"
import { CreateUserUseCase } from "../../../../modules/accounts/UseCases/createUser/CreateUserUseCase"
import { IController } from "../../../../modules/protocols/IController"
import { BCrypterAdapter } from "../../../adapter/hasher/Bcrypt/BCryptAdapter"
import { FindByUsernameProvider } from "../../../providers/FindByUsername/implementations/FindByUsernameProvider"


export const makeCreateUserController = (): IController => {
  const encrypter = new BCrypterAdapter(12)
  const userRepositorie = new UserRepository()
  const findByUsernameProvider = new FindByUsernameProvider(userRepositorie)
  const createUserUseCase = new CreateUserUseCase(findByUsernameProvider,userRepositorie,encrypter)
  return new CreateUserController(createUserUseCase)
}
