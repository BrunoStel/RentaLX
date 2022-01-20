
import { UserTokensRepositorie } from "../../../../modules/accounts/infra/typeorm/repositories/UserTokensRepositorie"
import { RefreshTokenController } from "../../../../modules/accounts/UseCases/refreshToken/RefreshTokenController"
import { RefreshTokenUseCase } from "../../../../modules/accounts/UseCases/refreshToken/RefreshTokenUseCase"
import { IController } from "../../../../modules/protocols/IController"
import { JwtAdapter } from "../../../adapter/jwt-adapter/jwt/jwt-adapter"
import { DayJsDateProvider } from "../../../providers/DateProvider/implementations/DayJsDateProvider"


export const makeRefreshTokenController= (): IController => {

  const jwtAdapter = new JwtAdapter()

  const tokenRepositorie = new UserTokensRepositorie()

  const dateProvider = new DayJsDateProvider()

  const refreshTokenUseCase = new RefreshTokenUseCase(
    jwtAdapter,
    tokenRepositorie,
    tokenRepositorie,
    jwtAdapter,
    dateProvider,
    tokenRepositorie,
    jwtAdapter
  )

  return new RefreshTokenController(refreshTokenUseCase)
}
