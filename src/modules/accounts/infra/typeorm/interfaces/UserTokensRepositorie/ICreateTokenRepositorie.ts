import { UserTokens } from "../../entities/UserTokens";
import { ICreateUserTokensDTO } from "./IUserTokensRepositorie";

export interface ICreateTokenRepositorie {
  create({expires_date, refresh_token,user_id}:ICreateUserTokensDTO) : Promise<UserTokens>
}