import { UserTokens } from "../../entities/UserTokens";

export interface IFindByIdTokenRepositorie {
  findByUserIdAndRefreshToken(user_id:string, refresh_token:string):Promise<UserTokens>
}
