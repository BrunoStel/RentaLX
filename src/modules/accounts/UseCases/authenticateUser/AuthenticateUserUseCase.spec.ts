import auth from "../../../../config/auth"
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
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


class FindByUsernameProviderStub implements IFindByUsernameProvider {
    async userAlreadyExists (username: string): Promise<User> {
        const user = {
            name:'any_name',
            password:'hash_password',
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
        return 'any_refresh_token'
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
                password:'hash_password',
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

const { expires_in_token, 
    secret_refresh_token, 
    secret_token, 
    expires_in_refresh_token,
    expires_refresh_token_days} = auth

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
    it('Should throws if FindByUsernameProvider throws', async ()=>{
        const { sut, findByUsernameProviderStub } = makeSut ()
    
        jest.spyOn(findByUsernameProviderStub, 'userAlreadyExists').mockImplementationOnce(() => {
            throw new Error()
          })
    
        const promise = sut.execute({username:'any_username', password:'any_password'})
    
            
        await expect(promise).rejects.toThrow()
    
    })
    it('Should call EncrypterCompare with correct value', async () => {
        const { sut, encrypterStub }= makeSut()

        const spy = jest.spyOn(encrypterStub, 'compare')

        await sut.execute({username:'any_username', password:'any_password'})

        expect(spy).toHaveBeenCalledWith({value:'any_password', hash:'hash_password' })

    })
    it('Should throw new AppError if EncrypterCompare returns false', async () => {
        const { sut, encrypterStub } = makeSut ()
    
        jest.spyOn(encrypterStub, 'compare').mockResolvedValueOnce(false)
    
        const promise = sut.execute({username:'any_username', password:'any_password'})
            
        await expect(promise).rejects.toEqual(new AppError("Username or password incorrect!"))
    
    })
    it('Should throws if EncrypterCompare throws', async ()=>{
        const { sut, encrypterStub } = makeSut ()
    
        jest.spyOn(encrypterStub, 'compare').mockImplementationOnce(() => {
            throw new Error()
          })
    
        const promise = sut.execute({username:'any_username', password:'any_password'})
    
            
        await expect(promise).rejects.toThrow()
    
    })
    it('Should call TokenGenerator with correct value', async () => {
        const { sut, tokenGeneratorStub }= makeSut()

        const spy = jest.spyOn(tokenGeneratorStub, 'generateToken')

        await sut.execute({username:'any_username', password:'any_password'})

        expect(spy).toHaveBeenCalledWith({
            secretKey: secret_token,
            value: 'any_id', 
            expiresIn: expires_in_token
        })

    })
    it('Should throws if EncrypterCompare throws', async ()=>{
        const { sut, tokenGeneratorStub } = makeSut ()
    
        jest.spyOn(tokenGeneratorStub, 'generateToken').mockImplementationOnce(() => {
            throw new Error()
          })
    
        const promise = sut.execute({username:'any_username', password:'any_password'})
    
            
        await expect(promise).rejects.toThrow()
    
    })
    it('Should call TokenGenerator with correct value', async () => {
        const { sut, tokenRefreshGeneratorStub }= makeSut()

        const spy = jest.spyOn(tokenRefreshGeneratorStub, 'generateRefreshToken')

        await sut.execute({username:'any_username', password:'any_password'})

        expect(spy).toHaveBeenCalledWith({
            email: 'any_email@email.com',
            secretKey: secret_refresh_token,
            value: 'any_id',
            expiresIn: expires_in_refresh_token
        })

    })
    it('Should throws if EncrypterCompare throws', async ()=>{
        const { sut, tokenRefreshGeneratorStub } = makeSut ()
    
        jest.spyOn(tokenRefreshGeneratorStub, 'generateRefreshToken').mockImplementationOnce(() => {
            throw new Error()
          })
    
        const promise = sut.execute({username:'any_username', password:'any_password'})
    
            
        await expect(promise).rejects.toThrow()
    
    })
    it('Should call DateProvider with correct value', async () => {
        const { sut, dateProviderStun }= makeSut()

        const spy = jest.spyOn(dateProviderStun, 'addDays')

        await sut.execute({username:'any_username', password:'any_password'})

        expect(spy).toHaveBeenCalledWith(expires_refresh_token_days)

    })
    it('Should throws if EncrypterCompare throws', async ()=>{
        const { sut, dateProviderStun } = makeSut ()
    
        jest.spyOn(dateProviderStun, 'addDays').mockImplementationOnce(() => {
            throw new Error()
          })
    
        const promise = sut.execute({username:'any_username', password:'any_password'})
    
            
        await expect(promise).rejects.toThrow()
    
    })
    it('Should call CreateTokenRepositorie with correct value', async () => {
        const { sut, createTokenRepositorieStub }= makeSut()

        const spy = jest.spyOn(createTokenRepositorieStub, 'create')

        await sut.execute({username:'any_username', password:'any_password'})

        expect(spy).toHaveBeenCalledWith({
            expires_date: new Date(2022-1-18),
            refresh_token: 'any_refresh_token',
            user_id:'any_id'
        })

    })
    it('Should throws if CreateTokenRepositorie throws', async ()=>{
        const { sut, createTokenRepositorieStub } = makeSut ()
    
        jest.spyOn(createTokenRepositorieStub, 'create').mockImplementationOnce(() => {
            throw new Error()
          })
    
        const promise = sut.execute({username:'any_username', password:'any_password'})
    
            
        await expect(promise).rejects.toThrow()
    
    })
    it('Should return token, user and refresh_token on succes', async ()=>{
        const { sut } = makeSut ()
    
    
        const tokenReturn = await sut.execute({username:'any_username', password:'any_password'})
    
            
        expect(tokenReturn).toEqual({
            token: 'any_token',
            user:{
                name: 'any_name',
                username: 'any_username',
                email: 'any_email@email.com'
            },
            refresh_token: 'any_refresh_token'
        })
    
    })
})