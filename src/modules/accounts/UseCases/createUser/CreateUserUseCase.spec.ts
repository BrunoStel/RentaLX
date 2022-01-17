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
    
    // let userRepositoryInMemory: UserRepositoryInMemory
    // let createUserUseCase: CreateUserUseCase

    // beforeEach(()=>{
    //     userRepositoryInMemory = new UserRepositoryInMemory()
    //     createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    // })


    // it('Should return user on sucess ', async ()=>{
    //     const { sut, userRepositoryStub } = makeSut ()
    //     const user = makeUser()

    //     await sut.execute(user)

    //     await userRepositoryStub.findByUsername(user.username)
        
    //     // expect(userExpected).toHaveProperty('id')

    // })
    it('Should call findByUsernameProvider with correct username ', async ()=>{
        const { sut, findByUsernameProviderStub } = makeSut ()
        const user = makeUser()
        const findByUserNameSpy = jest.spyOn(findByUsernameProviderStub, 'userAlreadyExists')

        await sut.execute(user)
        
        expect(findByUserNameSpy).toHaveBeenCalledWith(user.username)

    })
    it('Should return new AppError if findByUsernameProvider returns true ', async ()=>{
    const { sut, findByUsernameProviderStub } = makeSut ()

    const user = makeUser()

    jest.spyOn(findByUsernameProviderStub, 'userAlreadyExists').mockResolvedValue(true)

    const promise = sut.execute(user)
        
    await expect(promise).rejects.toEqual(new AppError("Username already in use"))

    })

    // it('Should throws if findByUsername throws ', async ()=>{
    // const { sut, userRepositoryStub } = makeSut ()

    // const user = makeUser()

    // jest.spyOn(userRepositoryStub, 'findByUsername').mockResolvedValueOnce(
    //     new Promise((resolve, reject) => reject(new Error()))
    //     )

    // user.username = 'another_user'
    // const promise = sut.execute(user)

        
    // await expect(promise).rejects.toEqual(new Error())

    // })

    // it('Should not create user with the same username', async ()=>{
        
    //     expect(async()=>{

    //         const user = {
    //             name:'Teste',
    //             password:'Senha teste',
    //             username:'User Teste',
    //             email:'userteste@email.com',
    //             driver_license:'DriverLicenseTest' 
    //         }
    //         await createUserUseCase.execute(user)

    //         await createUserUseCase.execute(user)

    //     }).rejects.toBeInstanceOf(AppError)
       

    // })
})