import { IHttpRequest } from "../../../protocols/IHttp";
import { RefreshTokenController } from "./RefreshTokenController";
import { ITokenResponse } from "./RefreshTokenUseCase";


class RefreshTokenUseCaseStub {
  async execute(token:string):Promise<ITokenResponse> {

   return {
    token:'new_token',
    refresh_token: 'any_refresh_token'
}
}
}

interface ISut {
  sut: RefreshTokenController
  refreshTokenUseCaseStub: RefreshTokenUseCaseStub

}


const makeSut = ():ISut => {
  const refreshTokenUseCaseStub = new RefreshTokenUseCaseStub()
  const sut = new RefreshTokenController(refreshTokenUseCaseStub)
  return {
    sut  ,
    refreshTokenUseCaseStub
  }
}

const makeHttpRequest = ():IHttpRequest => {
  return {
    body: {
      token: 'any_token'
    }
  }
}


describe('CreateUserController', () => {

  it('Should call RefreshTokenUseCase with correct value', async () => {
    const {  sut, refreshTokenUseCaseStub } = makeSut()

    const executeSpy = jest.spyOn(refreshTokenUseCaseStub, 'execute')

    await sut.handle(makeHttpRequest())

    expect(executeSpy).toHaveBeenCalledWith(makeHttpRequest().body.token)
    
  })

  // it('Should throw if CreateUserUseCase throws', async () => {
  //   const {  sut, createUserUseCaseStub } = makeSut()

  //   jest.spyOn(createUserUseCaseStub, 'execute').mockImplementationOnce( () => {
  //     throw new Error()
  //   })

  //   const promise = sut.handle(makeHttpRequest())

  //   await expect(promise).rejects.toThrow()

  // })
  // it('Should return statusCode 200 on succes', async () => {
  //   const {  sut } = makeSut()



  //   const httpResponse = await sut.handle(makeHttpRequest())

  //    expect(httpResponse.statusCode).toBe(200)
  //    expect(httpResponse.body).toEqual( {Message: `User any_name registered with success`})

  // })
})  