import "reflect-metadata";
import { container } from "tsyringe";
import { IHttpRequest, IHttpResponse } from "../../../protocols/IHttp";
import { User } from "../../infra/typeorm/entities/User";
import { CreateUserController } from "./CreateUserController"
import { ICreateUserDTO } from "./ICreateUser";


class CreateUserUseCaseStub {
  async execute({ name, password, username, email,driver_license }: ICreateUserDTO): Promise<User> {
   const user = {
    name:name,
    password:password,
    username:username,
    email:email,
    driver_license:driver_license,
    id:'any_id',
    isAdmin: false,
    avatar: 'any_avatar',
    created_at: new Date()
   }
   return user
}
}

interface ISut {
  sut: CreateUserController
  createUserUseCaseStub: CreateUserUseCaseStub

}


const makeSut = ():ISut => {
  const createUserUseCaseStub = new CreateUserUseCaseStub()
  const sut = new CreateUserController(createUserUseCaseStub)
  return {
    sut  ,
    createUserUseCaseStub
  }
}

const makeHttpRequest = ():IHttpRequest => {
  return {
    body: {
      name:'any_name',
      password:'any_password',
      username:'any_username',
      email:'any_email',
      driver_license:'any_driver_license'
    }
  }
}


describe('CreateUserController', () => {


  it('Should call CreateUserUseCase with correct value', async () => {
    const {  sut, createUserUseCaseStub } = makeSut()

    const executeSpy = jest.spyOn(createUserUseCaseStub, 'execute')

    await sut.handle(makeHttpRequest())

    expect(executeSpy).toHaveBeenCalledWith(makeHttpRequest().body)
    
  })

  it('Should throw if CreateUserUseCase throws', async () => {
    const {  sut, createUserUseCaseStub } = makeSut()

    jest.spyOn(createUserUseCaseStub, 'execute').mockImplementationOnce( () => {
      throw new Error()
    })

    const promise = sut.handle(makeHttpRequest())

    await expect(promise).rejects.toThrow()

  })
  it('Should return statusCode 200 on succes', async () => {
    const {  sut } = makeSut()



    const httpResponse = await sut.handle(makeHttpRequest())

     expect(httpResponse.statusCode).toBe(200)
     expect(httpResponse.body).toEqual( {Message: `User any_name registered with success`})

  })
})