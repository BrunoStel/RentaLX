import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepositorie } from "../../infra/typeorm/interfaces/IUserRepositorie";



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
    token:string
}

@injectable()
class AuthenticateUserUseCase{

    constructor(
        @inject("UserRepository")
        private userRepository:IUserRepositorie
    ){}



    async execute({username,password} : IRequest):Promise<IResponse>{
        const user = await this.userRepository.findByUsername(username)

        if(!user){
            throw new AppError("Username or password incorrect!")
        }
        
        const passwordMatch = await compare(password, user.password) //Retorna um true or false

        if(!passwordMatch){
            throw new AppError("Username or password incorrect!")
        }

        const token =sign({}, "147306a8cee4fdd27bec7ea2f3638673", {
            subject:user.id,
            expiresIn:"1d"
        })

        const tokenReturn:IResponse={
            token,
            user:{
                name:user.name,
                username:user.username,
                email:user.email
            }
        }

        return tokenReturn


    }
}

export { AuthenticateUserUseCase }