import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepositorie } from "../../infra/typeorm/interfaces/IUserRepositorie";
import { IUserTokensRepositorie } from "../../infra/typeorm/interfaces/IUserTokensRepositorie";



interface IRequest{
    username:string,
    password:string
}

interface IResponse{
    user:{
        name:string,
        username:string,
        email:string
    },
    token:string,
    refresh_token:string
}

@injectable()
class AuthenticateUserUseCase{

    constructor(
        //@inject("UserRepository")
        private userRepository:IUserRepositorie,
        @inject("UserTokensRepositorie")
        private userTokensRepositorie: IUserTokensRepositorie,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider
        
    ){}



    async execute({username,password} : IRequest):Promise<IResponse>{
        const user = await this.userRepository.findByUsername(username)

        const email = user.email

        const { expires_in_token, 
            secret_refresh_token, 
            secret_token, 
            expires_in_refresh_token,
            expires_refresh_token_days} = auth

        if(!user){
            throw new AppError("Username or password incorrect!")
        }
        
        const passwordMatch = await compare(password, user.password) //Retorna um true or false

        if(!passwordMatch){
            throw new AppError("Username or password incorrect!")
        }

        const token =sign({}, secret_token, {
            subject:user.id,
            expiresIn:expires_in_token
        })

        const refresh_token = sign({email},secret_refresh_token,{
            subject:user.id,
            expiresIn:expires_in_refresh_token
        })


        const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

        await this.userTokensRepositorie.create({
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