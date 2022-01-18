import { UserTokens } from "../../entities/UserTokens";

export interface IFindByRefreshTokenRepositorie {
  findByRefreshToken(token:string):Promise<UserTokens>
}
