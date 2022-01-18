import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository"
import { UserTokensRepositorie } from "../../../../modules/accounts/infra/typeorm/repositories/UserTokensRepositorie"
import { AuthenticateUserController } from "../../../../modules/accounts/UseCases/authenticateUser/AuthenticateUserController"
import { AuthenticateUserUseCase } from "../../../../modules/accounts/UseCases/authenticateUser/AuthenticateUserUseCase"
import { IController } from "../../../../modules/protocols/IController"
import { BCrypterAdapter } from "../../../adapter/hasher/Bcrypt/BCryptAdapter"
import { JwtAdapter } from "../../../adapter/jwt-adapter/jwt/jwt-adapter"
import { DayJsDateProvider } from "../../../providers/DateProvider/implementations/DayJsDateProvider"
import { FindByUsernameProvider } from "../../../providers/FindByUsername/implementations/FindByUsernameProvider"




export const makeAuthenticateUserController = (): IController => {

  const userRepositorie = new UserRepository()

  const findByUsernameProvider = new FindByUsernameProvider(userRepositorie)
  
  const encrypterCompare = new BCrypterAdapter(12)

  const tokenRepositorie = new UserTokensRepositorie()

  const tokenProvider = new JwtAdapter()

  const dateProvider = new DayJsDateProvider()



  const authenticateUserUseCase = new AuthenticateUserUseCase(
  findByUsernameProvider,
  encrypterCompare,
  tokenRepositorie,
  tokenProvider,
  tokenProvider,
  dateProvider
  )

  return new AuthenticateUserController(authenticateUserUseCase)
}
