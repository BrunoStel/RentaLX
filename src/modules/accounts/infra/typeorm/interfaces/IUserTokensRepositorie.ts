import { UserTokens } from "../entities/UserTokens";


interface ICreateUserTokensDTO{
    user_id:string,
    expires_date:Date,
    refresh_token:string
}


interface IUserTokensRepositorie{
    create({expires_date, refresh_token,user_id}:ICreateUserTokensDTO) : Promise<UserTokens>

    findByUserIdAndRefreshToken(user_id:string, refresh_token:string):Promise<UserTokens>

    deleteById(id:string):Promise<void>
}

export {IUserTokensRepositorie, ICreateUserTokensDTO}