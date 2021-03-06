import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { ITokenVerify } from "../../../../shared/adapter/jwt-adapter/ITokenVerify";
import { IFindByIdTokenRepositorie } from "../../infra/typeorm/interfaces/UserTokensRepositorie/IFindByIdTokenRepositorie";
import { IDeleteByIdTokenRepositorie } from "../../infra/typeorm/interfaces/UserTokensRepositorie/IDeleteByIdTokenRepositorie";
import { ICreateTokenRepositorie } from "../../infra/typeorm/interfaces/UserTokensRepositorie/ICreateTokenRepositorie";
import { ITokenRefreshGenerator } from "../../../../shared/adapter/jwt-adapter/ITokenRefreshGenerator";
import { ITokenGenerator } from "../../../../shared/adapter/jwt-adapter/ITokenGenerator";
import { IRefreshTokenUseCase } from "./protocols/IRefreshTokenUseCase";



export interface ITokenResponse{
    refresh_token:string,
    token:string
}

class RefreshTokenUseCase implements IRefreshTokenUseCase{

    constructor(
        private tokenVerify: ITokenVerify,
        private findByIdTokenRepositorie : IFindByIdTokenRepositorie,
        private deleteByIdTokenRepositorie : IDeleteByIdTokenRepositorie,
        private tokenRefreshGenerator: ITokenRefreshGenerator,
        private dateProvider: IDateProvider,
        private createTokenRepositorie: ICreateTokenRepositorie,
        private tokenGenerator: ITokenGenerator
        
    ){}


    async execute(token:string):Promise<ITokenResponse>{

    const { secret_refresh_token,
            secret_token, 
            expires_in_token,
            expires_in_refresh_token ,
            expires_refresh_token_days
          } = auth

    const outPut = await this.tokenVerify.verify({token, secret_refresh_token})

    if(!outPut) {
        throw new AppError("Refresh token is not valid!")
    }

    const {email, sub: user_id} = outPut

    const userToken = await this.findByIdTokenRepositorie.findByUserIdAndRefreshToken({user_id, refresh_token: token})

    if(!userToken){
        throw new AppError("Refresh token does not exists!")
    }

    await this.deleteByIdTokenRepositorie.deleteById(userToken.id)

    const refresh_token = await this.tokenRefreshGenerator.generateRefreshToken({
        email,
        secretKey: auth.secret_refresh_token,
        value: user_id,
        expiresIn: expires_in_refresh_token
    })

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.createTokenRepositorie.create({
        expires_date,
        refresh_token,
        user_id:user_id
    })


    const newToken = await this.tokenGenerator.generateToken({
        secretKey: secret_token,
        value: user_id,
        expiresIn: expires_in_token
    })

    return {
        token:newToken,
        refresh_token
    }

    }

}


export { RefreshTokenUseCase }