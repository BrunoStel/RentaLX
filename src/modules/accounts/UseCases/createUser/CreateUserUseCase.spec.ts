import { AppError } from "../../../../shared/errors/AppError"
import { User } from "../../infra/typeorm/entities/User"
import { ICreateUserDTO, IUserRepositorie } from "../../infra/typeorm/interfaces/IUserRepositorie"
import { CreateUserUseCase } from "./CreateUserUseCase"

const makeUserRepositoryStub = (): IUserRepositorie => {
    class UserRepositoryStub implements IUserRepositorie {
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
        list(): Promise<User[]> {
            throw new Error("Method not implemented.")
        }
        findByID(id: string): Promise<User> {
            throw new Error("Method not implemented.")
        }
        findByEmail(email: string): Promise<User> {
            throw new Error("Method not implemented.")
        }
    }

    const userRepositoryStub = new UserRepositoryStub()

    return userRepositoryStub
}

interface ISut {
    sut: CreateUserUseCase
    userRepositoryStub: IUserRepositorie
}

const makeSut = (): ISut => {
    const userRepositoryStub = makeUserRepositoryStub()
    const sut = new CreateUserUseCase(userRepositoryStub)
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