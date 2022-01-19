import { IEncrypterAdapter } from "../../../../shared/adapter/hasher/IEncrypterAdapter"
import { ICompareEncrypter, IEncrypterAdapterCompare } from "../../../../shared/adapter/hasher/IEncrypterAdapterCompare"
import { ITokenGenerator } from "../../../../shared/adapter/jwt-adapter/ITokenGenerator"
import { ITokenRefreshGenerator } from "../../../../shared/adapter/jwt-adapter/ITokenRefreshGenerator"
import { IGenerateInput } from "../../../../shared/adapter/jwt-adapter/jwt/jwt-adapter"
import { AppError } from "../../../../shared/errors/AppError"
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider"
import { IFindByUsernameProvider } from "../../../../shared/providers/FindByUsername/IFindByUsernameProvider"
import { User } from "../../infra/typeorm/entities/User"
import { UserTokens } from "../../infra/typeorm/entities/UserTokens"
import { ICreateTokenRepositorie } from "../../infra/typeorm/interfaces/UserTokensRepositorie/ICreateTokenRepositorie"
import { ICreateUserTokensDTO } from "../../infra/typeorm/interfaces/UserTokensRepositorie/IUserTokensRepositorie"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


class FindByUsernameProviderStub implements IFindByUsernameProvider {
    async userAlreadyExists (username: string): Promise<User> {
        const user = {
            name:'any_name',
            password:'any_password',
            username:'any_username',
            email:'any_email@email.com',
            driver_license:'any_driver_license',
            id:'any_id',
            isAdmin: false,
            avatar: 'any_avatar',
            created_at: new Date(2022-1-18)
        }
        return user
    }
    
}

class EncrypterStub implements IEncrypterAdapterCompare {
    async compare({value, hash}: ICompareEncrypter): Promise<boolean> {
        return true
    }
    
    
}

class TokenGeneratorStub implements ITokenGenerator {
    async generateToken ({ secretKey, value, expiresIn }: IGenerateInput): Promise<string> {
        return 'any_token'
    }

}

class TokenRefreshGeneratorStub implements ITokenRefreshGenerator {
    async generateRefreshToken ({ email, secretKey, value, expiresIn }: IGenerateInput): Promise<string> {
        return 'any_token'
    }

}

class DateProviderStun implements IDateProvider {
    compareInHours(star_date: Date, expected_return_date: Date): Number {
        throw new Error("Method not implemented.")
    }
    convertToUTC(date: Date): string {
        throw new Error("Method not implemented.")
    }
    dateNow(): Date {
        throw new Error("Method not implemented.")
    }
    addDays(days: number): Date {
        return new Date(2022-1-18)
    }
    addHours(hours: number): Date {
        throw new Error("Method not implemented.")
    }
    compareIfBefore(start_date: Date, end_date: Date): Boolean {
        throw new Error("Method not implemented.")
    }

}

class CreateTokenRepositorieStub implements ICreateTokenRepositorie {
    async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UserTokens> {
        return {
            id: 'any_token_id',
            refresh_token: 'any_refresh_token',
            user_id: 'any_id',
            user: {
                name:'any_name',
                password:'any_password',
                username:'any_username',
                email:'any_email@email.com',
                driver_license:'any_driver_license',
                id:'any_id',
                isAdmin: false,
                avatar: 'any_avatar',
                created_at: new Date(2022-1-18)
            },
            expires_date: new Date(2022-1-18),
            created_at: new Date(2022-1-18)
        }
    }
    
}

interface ISut {
    findByUsernameProviderStub: FindByUsernameProviderStub
    encrypterStub: EncrypterStub
    tokenGeneratorStub: TokenGeneratorStub
    tokenRefreshGeneratorStub : TokenRefreshGeneratorStub
    dateProviderStun: DateProviderStun
    createTokenRepositorieStub: CreateTokenRepositorieStub
    sut: AuthenticateUserUseCase
}

const makeSut = (): ISut => {
    const findByUsernameProviderStub = new FindByUsernameProviderStub()

    const encrypterStub = new EncrypterStub()

    const tokenGeneratorStub = new TokenGeneratorStub()

    const tokenRefreshGeneratorStub = new TokenRefreshGeneratorStub()

    const dateProviderStun = new  DateProviderStun()

    const createTokenRepositorieStub = new CreateTokenRepositorieStub()

    const sut = new AuthenticateUserUseCase(
        findByUsernameProviderStub,
        encrypterStub,
        tokenGeneratorStub,
        tokenRefreshGeneratorStub,
        dateProviderStun,
        createTokenRepositorieStub
    )

    return {
        findByUsernameProviderStub,
        encrypterStub,
        tokenGeneratorStub,
        tokenRefreshGeneratorStub,
        dateProviderStun,
        createTokenRepositorieStub,
        sut
    }

}


describe("AuthenticateUserUseCase", ()=>{

    it('Should call FindByUsernameProvider with correct value', async () => {
        const { sut, findByUsernameProviderStub }= makeSut()

        const spy = jest.spyOn(findByUsernameProviderStub, 'userAlreadyExists')

        await sut.execute({username:'any_username', password:'any_password'})

        expect(spy).toHaveBeenCalledWith('any_username')

    })
    it('Should throw new AppError if FindByUsernameProvider returns null', async () => {
    const { sut, findByUsernameProviderStub } = makeSut ()

    jest.spyOn(findByUsernameProviderStub, 'userAlreadyExists').mockResolvedValueOnce(null)

    const promise = sut.execute({username:'any_username', password:'any_password'})
        
    await expect(promise).rejects.toEqual(new AppError("Username or password incorrect!"))

    })
    it('Should throws if FindByUsernameProvider throws ', async ()=>{
        const { sut, findByUsernameProviderStub } = makeSut ()
    
        jest.spyOn(findByUsernameProviderStub, 'userAlreadyExists').mockImplementationOnce(() => {
            throw new Error()
          })
    
        const promise = sut.execute({username:'any_username', password:'any_password'})
    
            
        await expect(promise).rejects.toThrow()
    
    })
})