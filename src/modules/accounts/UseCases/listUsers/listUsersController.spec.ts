import { Any } from "typeorm";
import { IHttpRequest } from "../../../protocols/IHttp";
import { User } from "../../infra/typeorm/entities/User";
import { ListUsersController } from "./listUsersController";
import { IListUsersUseCase } from "./protocols/IListUsersUseCase";


class ListUsersUseCaseStub implements IListUsersUseCase{
  async execute(): Promise<User[]> {
    const user = {
      name:'any_name',
      password:'any_password',
      username:'any_username',
      email:'any_email',
      driver_license:'any_driver_license',
      id:'any_id',
      isAdmin: false,
      avatar: 'any_avatar',
      created_at:  new Date(2022-1-18)
  }
  const user2 = {
      name:'any_name',
      password:'any_password',
      username:'any_username',
      email:'any_email',
      driver_license:'any_driver_license',
      id:'any_id',
      isAdmin: false,
      avatar: 'any_avatar',
      created_at:  new Date(2022-1-18)
  }

const users = [user, user2]

return users
}
}

interface ISut {
  sut: ListUsersController
  listUsersUseCaseStub: ListUsersUseCaseStub

}


const makeSut = ():ISut => {
  const listUsersUseCaseStub = new ListUsersUseCaseStub()
  const sut = new ListUsersController(listUsersUseCaseStub)
  return {
    sut  ,
    listUsersUseCaseStub
  }
}


describe('CreateUserController', () => {

  it('Should call ListUsersUseCase', async () => {
    const {  sut, listUsersUseCaseStub } = makeSut()

    const executeSpy = jest.spyOn(listUsersUseCaseStub, 'execute')

    await sut.handle({body:'any'})

    expect(executeSpy).toHaveBeenCalledTimes(1)
    
  })

  it('Should throw if ListUsersUseCase throws', async () => {
    const {  sut, listUsersUseCaseStub } = makeSut()

    jest.spyOn(listUsersUseCaseStub, 'execute').mockImplementationOnce( () => {
      throw new Error()
    })

    const promise = sut.handle({body:'any'})

    await expect(promise).rejects.toThrow()

  })
  // it('Should return statusCode 200 on succes', async () => {
  //   const {  sut } = makeSut()



  //   const httpResponse = await sut.handle(makeHttpRequest())

  //    expect(httpResponse.statusCode).toBe(200)
  //    expect(httpResponse.body).toEqual( {Message: `User any_name registered with success`})

  // })
})  