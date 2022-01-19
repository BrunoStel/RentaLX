import { User } from "../../infra/typeorm/entities/User"
import { IListUserRepositorie } from "../../infra/typeorm/interfaces/UserRepositorie/IListUserRepositorie"
import { ListUsersUseCase } from "./listUsersUseCase"



class ListUserRepositorieStub implements IListUserRepositorie {
    async list(): Promise<User[]> {
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
    listUserRepositorieStub: ListUserRepositorieStub
    sut: ListUsersUseCase
}

const makeSut = ():ISut => {
    const listUserRepositorieStub = new ListUserRepositorieStub ()
    const sut = new ListUsersUseCase(listUserRepositorieStub)

    return {
        listUserRepositorieStub,
        sut
    }
}

describe("ListUsersUseCase", ()=>{


it("Should call ListUserRepositorie",async ()=>{
    const { sut, listUserRepositorieStub } = makeSut()

    const listSpy = jest.spyOn(listUserRepositorieStub, 'list')

    await sut.execute()

    expect(listSpy).toHaveBeenCalledTimes(1)
})
    

})