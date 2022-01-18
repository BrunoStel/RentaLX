import { UserTokens } from "../../entities/UserTokens";


export interface ICreateUserTokensDTO{
    user_id:string,
    expires_date:Date,
    refresh_token:string
}


export interface IUserTokensRepositorie{
    create({expires_date, refresh_token,user_id}:ICreateUserTokensDTO) : Promise<UserTokens>

    findByUserIdAndRefreshToken(user_id:string, refresh_token:string):Promise<UserTokens>

    deleteById(id:string):Promise<void>

    findByRefreshToken(token:string):Promise<UserTokens>
}


