import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";
import { ICreateTokenRepositorie } from "../interfaces/UserTokensRepositorie/ICreateTokenRepositorie";
import { IDeleteByIdTokenRepositorie } from "../interfaces/UserTokensRepositorie/IDeleteByIdTokenRepositorie";
import { IFindByIDTokenDTO, IFindByIdTokenRepositorie } from "../interfaces/UserTokensRepositorie/IFindByIdTokenRepositorie";
import { IFindByRefreshTokenRepositorie } from "../interfaces/UserTokensRepositorie/IFindByRefreshTokenRepositorie";
import { ICreateUserTokensDTO } from "../interfaces/UserTokensRepositorie/IUserTokensRepositorie";



class UserTokensRepositorie implements ICreateTokenRepositorie, IFindByIdTokenRepositorie, IDeleteByIdTokenRepositorie, IFindByRefreshTokenRepositorie{
    private repository: Repository<UserTokens>


    async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UserTokens> {
        this.repository = getRepository(UserTokens)

        const userToken = await this.repository.create({
            expires_date,
            refresh_token,
            user_id
        })

        await this.repository.save(userToken)

        return userToken
    }

    async findByUserIdAndRefreshToken({user_id, refresh_token}:IFindByIDTokenDTO): Promise<UserTokens> {
        this.repository = getRepository(UserTokens)
        
        const userTokens = await this.repository.findOne({
            user_id,
            refresh_token
            })

        return userTokens
    }

    async deleteById(id: string): Promise<void> {
        this.repository = getRepository(UserTokens)

        await this.repository.delete(id)
    }


    async findByRefreshToken(token: string): Promise<UserTokens> {
        this.repository = getRepository(UserTokens)

        const userToken = await this.repository.findOne({
            refresh_token:token
            })

        return userToken
    }




}

export { UserTokensRepositorie }