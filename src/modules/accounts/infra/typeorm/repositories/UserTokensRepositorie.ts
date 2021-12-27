import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";
import { ICreateUserTokensDTO, IUserTokensRepositorie } from "../interfaces/IUserTokensRepositorie";



class UserTokensRepositorie implements IUserTokensRepositorie{
    private repository: Repository<UserTokens>

    constructor(){
        this.repository = getRepository(UserTokens)
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UserTokens> {
        const userToken = await this.repository.create({
            expires_date,
            refresh_token,
            user_id
        })

        await this.repository.save(userToken)

        return userToken
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token:string): Promise<UserTokens> {
        const userTokens = await this.repository.findOne({
            user_id,
            refresh_token
            })

        return userTokens
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }



}

export { UserTokensRepositorie }