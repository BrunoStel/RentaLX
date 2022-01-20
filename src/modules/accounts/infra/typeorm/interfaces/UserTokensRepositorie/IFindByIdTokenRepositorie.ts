import { UserTokens } from "../../entities/UserTokens";

export interface IFindByIDTokenDTO {
  user_id:string
  refresh_token:string
}

export interface IFindByIdTokenRepositorie {
  findByUserIdAndRefreshToken({user_id, refresh_token}:IFindByIDTokenDTO):Promise<UserTokens>
}
