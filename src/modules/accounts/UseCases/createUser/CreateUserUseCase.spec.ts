import { AppError } from "../../../../shared/errors/AppError"
import { IFindByUsernameProvider } from "../../../../shared/providers/FindByUsername/IFindByUsernameProvider"
import { User } from "../../infra/typeorm/entities/User"
import { ICreateUserRepositorie } from "../../infra/typeorm/interfaces/ICreateUserRepositorie copy"
import { IFindByUsernameUserRepositorie } from "../../infra/typeorm/interfaces/IFindByUsernameUserRepositorie"
import { ICreateUserDTO } from "../../infra/typeorm/interfaces/IUserRepositorie"
import { CreateUserUseCase } from "./CreateUserUseCase"

class UserRepositoryStub implements ICreateUserRepositorie {
    async create(data: ICreateUserDTO): Promise<User> {
        const user = {
            name:'any_name',
            password:'any_password',
            username:'any_username',
            email:'any_email@email.com',
            driver_license:'any_driverLicense',
            id:'any_id',
            isAdmin: false,
            avatar: 'any_avatar',
            created_at: new Date()
        }
        return user
    }
}

class FindByUsernameProviderStub implements IFindByUsernameProvider {
    async userAlreadyExists (username: string): Promise<Boolean> {
        return false
    }
    
}

interface ISut {
    sut: CreateUserUseCase
    userRepositoryStub: UserRepositoryStub,
    findByUsernameProviderStub: FindByUsernameProviderStub
}

const makeSut = (): ISut => {
    const userRepositoryStub = new UserRepositoryStub()
    const findByUsernameProviderStub = new FindByUsernameProviderStub()
    const sut = new CreateUserUseCase(findByUsernameProviderStub,userRepositoryStub)
    return {
        sut,
        userRepositoryStub,
        findByUsernameProviderStub
    }
}

const makeUser = (): ICreateUserDTO => {
    const user = {
        name:'any_name',
        password:'any_password',
        username:'any_username',
        email:'ane_email@email.com',
        driver_license:'any_driverLicense' 
    }

    return user
}


describe("CreateUserUseCase", ()=>{
    

    // it('Should return an user on sucess ', async ()=>{
    //     const { sut, userRepositoryStub } = makeSut ()
    //     const user = makeUser()

    //     await sut.execute(user)

    //     await userRepositoryStub.findByUsername(user.username)
        
    //     // expect(userExpected).toHaveProperty('id')

    // })
    it('Should call FindByUsernameProvider with correct username ', async ()=>{
        const { sut, findByUsernameProviderStub } = makeSut ()
        const user = makeUser()
        const findByUserNameSpy = jest.spyOn(findByUsernameProviderStub, 'userAlreadyExists')

        await sut.execute(user)
        
        expect(findByUserNameSpy).toHaveBeenCalledWith(user.username)

    })
    it('Should return new AppError if FindByUsernameProvider returns true ', async ()=>{
    const { sut, findByUsernameProviderStub } = makeSut ()

    const user = makeUser()

    jest.spyOn(findByUsernameProviderStub, 'userAlreadyExists').mockResolvedValueOnce(true)

    const promise = sut.execute(user)
        
    await expect(promise).rejects.toEqual(new AppError("Username already in use"))

    })
    it('Should throws if FindByUsernameProvider throws ', async ()=>{
    const { sut, findByUsernameProviderStub } = makeSut ()

    const user = makeUser()

    jest.spyOn(findByUsernameProviderStub, 'userAlreadyExists').mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute(user)

        
    await expect(promise).rejects.toThrow()

    })
    it('Should throws if CreateUserRepositorie throws ', async ()=>{
        const { sut, userRepositoryStub } = makeSut ()
    
        const user = makeUser()
    
        jest.spyOn(userRepositoryStub, 'create').mockImplementationOnce(() => {
            throw new Error()
          })
    
        const promise = sut.execute(user)
    
            
        await expect(promise).rejects.toThrow()
    
        })

})