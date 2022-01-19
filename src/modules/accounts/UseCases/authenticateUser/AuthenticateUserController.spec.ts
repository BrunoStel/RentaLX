import { IHttpRequest } from "../../../protocols/IHttp"
import { AuthenticateUserController } from "./AuthenticateUserController"
import { IRequest, IResponse } from "./protocols/IAuthenticateUserUseCase"



class AuthenticateUserUseCaseStub {
  async execute({username,password} : IRequest):Promise<IResponse> {
   const response = {
    user:{
        name:'any_name',
        username: 'any_username',
        email: 'any_email@email.com'
    },
    token: 'any_token',
    refresh_token: 'any_refresh_token'
  }
  return response
}
}

interface ISut {
  sut: AuthenticateUserController
  authenticateUserUseCaseStub: AuthenticateUserUseCaseStub

}


const makeSut = ():ISut => {
  const authenticateUserUseCaseStub = new AuthenticateUserUseCaseStub()
  const sut = new AuthenticateUserController(authenticateUserUseCaseStub)
  return {
    sut  ,
    authenticateUserUseCaseStub
  }
}

const makeHttpRequest = ():IHttpRequest => {
  return {
    body: {
      password:'any_password',
      username:'any_username',
    }
  }
}


describe('CreateUserController', () => {

  it('Should call AuthenticateUserUseCase with correct values', async () => {
    const {  sut, authenticateUserUseCaseStub } = makeSut()

    const executeSpy = jest.spyOn(authenticateUserUseCaseStub, 'execute')

    await sut.handle(makeHttpRequest())

    expect(executeSpy).toHaveBeenCalledWith(makeHttpRequest().body)
    
  })

  it('Should throw if AuthenticateUserUseCase throws', async () => {
    const {  sut, authenticateUserUseCaseStub } = makeSut()

    jest.spyOn(authenticateUserUseCaseStub, 'execute').mockImplementationOnce( () => {
      throw new Error()
    })

    const promise = sut.handle(makeHttpRequest())

    await expect(promise).rejects.toThrow()

  })
  it('Should return statusCode 200 and token on succes', async () => {
    const {  sut } = makeSut()



    const httpResponse = await sut.handle(makeHttpRequest())

     expect(httpResponse.statusCode).toBe(200)
     expect(httpResponse.body).toEqual({
      token:{
        user:{
            name:'any_name',
            username: 'any_username',
            email: 'any_email@email.com'
        },
        token: 'any_token',
        refresh_token: 'any_refresh_token'
        } 
    })

  })
})  