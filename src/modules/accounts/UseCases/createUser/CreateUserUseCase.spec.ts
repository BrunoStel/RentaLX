import { AppError } from "../../../../shared/errors/AppError"
import { User } from "../../infra/typeorm/entities/User"
import { ICreateUserRepositorie } from "../../infra/typeorm/interfaces/ICreateUserRepositorie copy"
import { IFindByUsernameUserRepositorie } from "../../infra/typeorm/interfaces/IFindByUsernameUserRepositorie"
import { ICreateUserDTO } from "../../infra/typeorm/interfaces/IUserRepositorie"
import { CreateUserUseCase } from "./CreateUserUseCase"

class UserRepositoryStub implements ICreateUserRepositorie, IFindByUsernameUserRepositorie {
    async create(data: ICreateUserDTO): Promise<User> {
        const user = {
            name:'any_name',
            password:'any_password',
            username:'any_username',
            email:'ane_email@email.com',
            driver_license:'any_driverLicense',
            id:'any_id',
            isAdmin: false,
            avatar: 'any_avatar',
            created_at: new Date()
        }
        return user
    }
   async findByUsername(username: string): Promise<User> {
        return null
    }
}

const makeUserRepositoryStub = (): UserRepositoryStub => {

    const userRepositoryStub = new UserRepositoryStub()

    return userRepositoryStub
}

interface ISut {
    sut: CreateUserUseCase
    userRepositoryStub: UserRepositoryStub
}

const makeSut = (): ISut => {
    const userRepositoryStub = makeUserRepositoryStub()
    const sut = new CreateUserUseCase(userRepositoryStub,userRepositoryStub)
    return {
        sut,
        userRepositoryStub
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
    it('Should call findByUsername with correct username ', async ()=>{
        const { sut, userRepositoryStub } = makeSut ()
        const user = makeUser()
        const findByUserNameSpy = jest.spyOn(userRepositoryStub, 'findByUsername')

        await sut.execute(user)
        
        expect(findByUserNameSpy).toHaveBeenCalledWith(user.username)

    })
    it('Should return new AppError if findByUsername returns an user ', async ()=>{
        const { sut, userRepositoryStub } = makeSut ()
        const user = makeUser()
        jest.spyOn(userRepositoryStub, 'findByUsername').mockResolvedValue({
            name:'any_name',
            password:'any_password',
            username:'any_username',
            email:'ane_email@email.com',
            driver_license:'any_driverLicense',
            id:'any_id',
            isAdmin: false,
            avatar: 'any_avatar',
            created_at: new Date()
        })

    const promise = sut.execute(user)
        
    await expect(promise).rejects.toEqual(new AppError("Username already in use"))

    })

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