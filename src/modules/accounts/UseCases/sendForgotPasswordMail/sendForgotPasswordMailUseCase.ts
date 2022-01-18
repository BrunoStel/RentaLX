import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/providers/MailProvider/IMailProvider";
import { IUserTokensRepositorie } from "../../infra/typeorm/interfaces/UserTokensRepositorie/IUserTokensRepositorie";
import {resolve} from 'path'
import { IUserRepositorie } from "../../infra/typeorm/interfaces/UserRepositorie/IUserRepositorie";


@injectable()
class sendForgotPasswordMailUseCaser {

    constructor(
        @inject("UserRepository")
        private usersRepositorie : IUserRepositorie,
        @inject('UserTokensRepositorie')
        private userTokensRepositorie : IUserTokensRepositorie,
        @inject("DayJsDateProvider")
        private dateProvides: IDateProvider,
        @inject('EtherealMailProvider')
        private mailProvider: IMailProvider
    ){}

    
    async execute(email:string):Promise<void>{
        
        const user = await this.usersRepositorie.findByEmail(email)

        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs")


        if(!user){
            throw new AppError("Email not found in the database")
        }

        const token = uuidV4()

        const expires_date = this.dateProvides.addHours(3)

        await this.userTokensRepositorie.create({
            refresh_token:token,
            user_id:  user.id,
            expires_date
        })

        const variables ={
            name:user.name,
            link:`${process.env.FORGOT_MAIL_URL}${token}`,
        }

        await this.mailProvider.sendMail(email, 
            "Recuperação de senha",
            variables,
            templatePath
        )
    }



}

export { sendForgotPasswordMailUseCaser }