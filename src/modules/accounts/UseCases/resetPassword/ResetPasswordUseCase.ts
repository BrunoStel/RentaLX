import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { IUserRepositorie } from "../../infra/typeorm/interfaces/UserRepositorie/IUserRepositorie";
import { IUserTokensRepositorie } from "../../infra/typeorm/interfaces/UserTokensRepositorie/IUserTokensRepositorie";

interface IRequest{
    token:string,
    password:string
}

@injectable()
class ResetPasswordUseCase{

    constructor(
        @inject("UserRepository")
        private userRepostiroy: IUserRepositorie,
        @inject("UserTokensRepositorie")
        private userTokensRepositorie: IUserTokensRepositorie,
        @inject('DayJsDateProvider')
        private dateProvider: IDateProvider
    ){}


    async execute({token, password}:IRequest):Promise<void>{
        const userToken = await this.userTokensRepositorie.findByRefreshToken(token)

        if(!userToken){
            throw new AppError('Token invalid.')
        }

        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())){
            throw new AppError('Token is expired.')
        }


        const user = await this.userRepostiroy.findByID(userToken.user_id)

        user.password = await hash(password, 8)

        await this.userRepostiroy.create(user)

        await this.userTokensRepositorie.deleteById(userToken.id)
    }


}

export { ResetPasswordUseCase}