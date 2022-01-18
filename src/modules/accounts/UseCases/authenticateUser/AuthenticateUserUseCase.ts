import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IFindByUsernameProvider } from "../../../../shared/providers/FindByUsername/IFindByUsernameProvider";
import { IEncrypterAdapterCompare } from "../../../../shared/adapter/hasher/IEncrypterAdapterCompare";
import { ITokenGenerator } from "../../../../shared/adapter/jwt-adapter/ITokenGenerator";
import { ITokenRefreshGenerator } from "../../../../shared/adapter/jwt-adapter/ITokenRefreshGenerator";
import { IRequest, IResponse } from "./IAuthenticateUserUseCase";
import { ICreateTokenRepositorie } from "../../infra/typeorm/interfaces/UserTokensRepositorie/ICreateTokenRepositorie";




class AuthenticateUserUseCase{

    constructor(
        private findByUsernameProvider: IFindByUsernameProvider,
        private encrypterCompare: IEncrypterAdapterCompare,
        private createTokenRepositorie: ICreateTokenRepositorie,
        private tokenGenerator: ITokenGenerator,
        private tokenRefreshGenerator: ITokenRefreshGenerator,
        private dateProvider: IDateProvider
        
    ){}



    async execute({username,password} : IRequest):Promise<IResponse>{
        const user = await this.findByUsernameProvider.userAlreadyExists(username)

        const { expires_in_token, 
            secret_refresh_token, 
            secret_token, 
            expires_in_refresh_token,
            expires_refresh_token_days} = auth

        if(!user){
            throw new AppError("Username or password incorrect!")
        }
        
        const passwordMatch = await this.encrypterCompare.compare({
            value: password,
            hash: user.password
        }) 

        if(!passwordMatch){
            throw new AppError("Username or password incorrect!")
        }

        const email = user.email

        const token = await this.tokenGenerator.generateToken({
            secretKey: secret_token,
            value: user.id, 
            expiresIn: expires_in_token
        })
        
      
        const refresh_token = await this.tokenRefreshGenerator.generateRefreshToken({
            email,
            secretKey: secret_refresh_token,
            value: user.id,
            expiresIn: expires_in_refresh_token
        })

        const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

        await this.createTokenRepositorie.create({
            expires_date,
            refresh_token,
            user_id:user.id
        })

        const tokenReturn:IResponse={
            token,
            user:{
                name:user.name,
                username:user.username,
                email:user.email
            },
            refresh_token
        }

        return tokenReturn


    }
}

export { AuthenticateUserUseCase }