import { inject, injectable } from "tsyringe";
import { IUserTokensRepositorie } from "../../infra/typeorm/interfaces/IUserTokensRepositorie";
import { sign, verify } from "jsonwebtoken";
import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepositorie } from "../../infra/typeorm/interfaces/IUserRepositorie";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";

interface IPayLoad{
    sub:string,
    email:string
}

interface ITokenResponse{
    refresh_token:string,
    token:string
}

@injectable()
class RefreshTokenUseCase{

    constructor(
        @inject("UserTokensRepositorie")
        private userTokensRepositorie : IUserTokensRepositorie,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider
    ){}


    async execute(token:string):Promise<ITokenResponse>{
        const {email, sub} = verify(token, auth.secret_refresh_token) as IPayLoad
        
       const user_id = sub

      const userToken = await this.userTokensRepositorie.findByUserIdAndRefreshToken(user_id, token)

      if(!userToken){
          throw new AppError("Refresh token does not exists!")
      }

      await this.userTokensRepositorie.deleteById(userToken.id)

     const refresh_token = sign({email},auth.secret_refresh_token,{
        subject:user_id,
        expiresIn:auth.expires_in_refresh_token
    })

    const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.userTokensRepositorie.create({
        expires_date,
        refresh_token,
        user_id:user_id
    })


    const newToken =sign({}, auth.secret_token, {
        subject:user_id,
        expiresIn:auth.expires_in_token
    })

    return {
        token:newToken,
        refresh_token
    }

    }

}


export { RefreshTokenUseCase }