import auth from "../../../../config/auth"
import { ITokenGenerator } from "../../../../shared/adapter/jwt-adapter/ITokenGenerator"
import { ITokenRefreshGenerator } from "../../../../shared/adapter/jwt-adapter/ITokenRefreshGenerator"
import { IPayLoad, ITokenVerify, IVerifyInput } from "../../../../shared/adapter/jwt-adapter/ITokenVerify"
import { IGenerateInput } from "../../../../shared/adapter/jwt-adapter/jwt/jwt-adapter"
import { AppError } from "../../../../shared/errors/AppError"
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider"
import { UserTokens } from "../../infra/typeorm/entities/UserTokens"
import { ICreateTokenRepositorie } from "../../infra/typeorm/interfaces/UserTokensRepositorie/ICreateTokenRepositorie"
import { IDeleteByIdTokenRepositorie } from "../../infra/typeorm/interfaces/UserTokensRepositorie/IDeleteByIdTokenRepositorie"
import { IFindByIDTokenDTO, IFindByIdTokenRepositorie } from "../../infra/typeorm/interfaces/UserTokensRepositorie/IFindByIdTokenRepositorie"
import { ICreateUserTokensDTO } from "../../infra/typeorm/interfaces/UserTokensRepositorie/IUserTokensRepositorie"
import { RefreshTokenUseCase } from "./RefreshTokenUseCase"

class TokenVerifyStub implements ITokenVerify {
  async verify({ token, secret_refresh_token }: IVerifyInput): Promise<IPayLoad> {
    return {
      email: 'any_email',
      user_id: 'user_id'
    }
  }
}

class FindByUserIdAndRefreshTokenStub implements IFindByIdTokenRepositorie{
  async findByUserIdAndRefreshToken({user_id, refresh_token}:IFindByIDTokenDTO): Promise<UserTokens> {
    
    return {
      id: 'any_id',
      refresh_token: 'any_refresh_token',
      user_id: 'user_id',
      user: {
        name:'any_name',
        password:'hash_password',
        username:'any_username',
        email:'any_email@email.com',
        driver_license:'any_driver_license',
        id:'user_id',
        isAdmin: false,
        avatar: 'any_avatar',
        created_at: new Date(2022-1-18)
      },
      expires_date: new Date(2022-1-18),
      created_at: new Date(2022-1-18)
    }

  }
}

class DeleteByIdTokenRepositorieStub implements IDeleteByIdTokenRepositorie{
  async deleteById(id: string): Promise<void> {
  }
}

class TokenRefreshGeneratorStub implements ITokenRefreshGenerator {
  async generateRefreshToken ({ email, secretKey, value, expiresIn }: IGenerateInput): Promise<string> {
      return 'any_refresh_token'
  }

}

class DateProviderStub implements IDateProvider {
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

class TokenGeneratorStub implements ITokenGenerator {
  async generateToken ({ secretKey, value, expiresIn }: IGenerateInput): Promise<string> {
      return 'any_token'
  }

}

interface ISut {
  tokenVerify: TokenVerifyStub
  findByUserIdAndRefreshTokenStub: FindByUserIdAndRefreshTokenStub
  deleteByIdTokenRepositorieStub: DeleteByIdTokenRepositorieStub
  tokenRefreshGeneratorStub: TokenRefreshGeneratorStub
  dateProviderStub: DateProviderStub
  createTokenRepositorieStub: CreateTokenRepositorieStub
  tokenGeneratorStub: TokenGeneratorStub
  sut: RefreshTokenUseCase
}

const makeSut = (): ISut => {
  const tokenVerify = new TokenVerifyStub()

  const findByUserIdAndRefreshTokenStub = new FindByUserIdAndRefreshTokenStub()
    
  const deleteByIdTokenRepositorieStub = new DeleteByIdTokenRepositorieStub()

  const tokenRefreshGeneratorStub = new TokenRefreshGeneratorStub()

  const dateProviderStub = new DateProviderStub()

  const createTokenRepositorieStub = new CreateTokenRepositorieStub()

  const tokenGeneratorStub = new TokenGeneratorStub()

  const sut = new RefreshTokenUseCase(
    tokenVerify,
    findByUserIdAndRefreshTokenStub,
    deleteByIdTokenRepositorieStub,
    tokenRefreshGeneratorStub,
    dateProviderStub,
    createTokenRepositorieStub,
    tokenGeneratorStub,
  )

  return {
    tokenVerify,
    findByUserIdAndRefreshTokenStub,
    deleteByIdTokenRepositorieStub,
    tokenRefreshGeneratorStub,
    dateProviderStub,
    createTokenRepositorieStub,
    tokenGeneratorStub,
    sut
  }
}

const token = 'token_execute'

const { secret_refresh_token,
  secret_token, 
  expires_in_token,
  expires_in_refresh_token ,
  expires_refresh_token_days
} = auth

describe('RefreshTokenUseCase', () => {

  it('Should call TokenVerify with correct value', async () => {
    const {sut, tokenVerify } = makeSut()

    const tokenSpy = jest.spyOn(tokenVerify, 'verify')

    await sut.execute(token)

    expect(tokenSpy).toBeCalledWith({token,secret_refresh_token})


  })
  it('Should call AppError if TokenVerify returns null', async () => {
    const {  sut, tokenVerify } = makeSut()

    jest.spyOn(tokenVerify, 'verify').mockImplementationOnce( () => {
      return null 
    })

    const promise = sut.execute(token)

    await expect(promise).rejects.toEqual(new AppError("Refresh token does not exists!"))

  })
  it('Should throws if TokenVerify throws', async () => {
    const {  sut, tokenVerify } = makeSut()

    jest.spyOn(tokenVerify, 'verify').mockImplementationOnce( () => {
      throw new Error()
    })

    const promise = sut.execute(token)

    await expect(promise).rejects.toThrow()

  })

  it('Should call FindByUserIdAndRefreshToken with correct values', async () => {
    const {sut, findByUserIdAndRefreshTokenStub } = makeSut()

    const tokenSpy = jest.spyOn(findByUserIdAndRefreshTokenStub, 'findByUserIdAndRefreshToken')

    await sut.execute(token)

    expect(tokenSpy).toBeCalledWith({refresh_token:token, user_id:'user_id'})


  })
  it('Should call AppError if TokenVerify returns null', async () => {
    const {  sut, findByUserIdAndRefreshTokenStub } = makeSut()

    jest.spyOn(findByUserIdAndRefreshTokenStub, 'findByUserIdAndRefreshToken').mockImplementationOnce( () => {
      return null 
    })

    const promise = sut.execute(token)

    await expect(promise).rejects.toEqual(new AppError("Refresh token does not exists!"))

  })
  it('Should throws if TokenVerify throws', async () => {
    const {  sut, findByUserIdAndRefreshTokenStub } = makeSut()

    jest.spyOn(findByUserIdAndRefreshTokenStub, 'findByUserIdAndRefreshToken').mockImplementationOnce( () => {
      throw new Error()
    })

    const promise = sut.execute(token)

    await expect(promise).rejects.toThrow()

  })

  it('Should call DeleteByIdTokenRepositorie with correct value', async () => {
    const {sut, deleteByIdTokenRepositorieStub } = makeSut()

    const tokenSpy = jest.spyOn(deleteByIdTokenRepositorieStub, 'deleteById')

    await sut.execute(token)

    expect(tokenSpy).toBeCalledWith('any_id')
  })

})