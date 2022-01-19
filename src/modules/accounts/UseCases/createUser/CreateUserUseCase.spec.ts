import { IEncrypterAdapter } from "../../../../shared/adapter/hasher/IEncrypterAdapter"
import { AppError } from "../../../../shared/errors/AppError"
import { IFindByUsernameProvider } from "../../../../shared/providers/FindByUsername/IFindByUsernameProvider"
import { User } from "../../infra/typeorm/entities/User"
import { ICreateUserRepositorie } from "../../infra/typeorm/interfaces/UserRepositorie/ICreateUserRepositorie"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { ICreateUserDTO } from "./ICreateUser"

class UserRepositoryStub implements ICreateUserRepositorie {
    async create(data: ICreateUserDTO): Promise<User> {
        const user = {
            name:data.name,
            password:data.password,
            username:data.username,
            email:data.email,
            driver_license:data.driver_license,
            id:'any_id',
            isAdmin: false,
            avatar: 'any_avatar',
            created_at:  new Date(2022-1-18)
        }
        return user
    }
}

class FindByUsernameProviderStub implements IFindByUsernameProvider {
    async userAlreadyExists (username: string): Promise<User> {
        return null
    }
    
}

class EncrypterStub implements IEncrypterAdapter {
    async hash (password: string): Promise<string> {
        return 'password_hash'
    }
    
}

interface ISut {
    sut: CreateUserUseCase
    userRepositoryStub: UserRepositoryStub
    findByUsernameProviderStub: FindByUsernameProviderStub
    encrypterStub: EncrypterStub
}

const makeSut = (): ISut => {
    const userRepositoryStub = new UserRepositoryStub()
    const findByUsernameProviderStub = new FindByUsernameProviderStub()
    const encrypterStub = new EncrypterStub()
    const sut = new CreateUserUseCase(findByUsernameProviderStub,userRepositoryStub, encrypterStub)
    return {
        sut,
        userRepositoryStub,
        findByUsernameProviderStub,
        encrypterStub
    }
}

const makeUser = (): ICreateUserDTO => {
    const user = {
        name:'any_name',
        password:'any_password',
        username:'any_username',
        email:'any_email@email.com',
        driver_license:'any_driverLicense' 
    }

    return user
}


describe("CreateUserUseCase", ()=>{

    it('Should throws if Encrypter throws ', async ()=>{
        const { sut, encrypterStub } = makeSut ()
    
        const user = makeUser()
    
        jest.spyOn(encrypterStub, 'hash').mockImplementationOnce(() => {
            throw new Error()
          })
    
        const promise = sut.execute(user)
    
            
        await expect(promise).rejects.toThrow()
    
    })
    it('Should call Encrypter with correct password ', async ()=>{
        const { sut, encrypterStub } = makeSut ()
        const user = makeUser()
        const findByUserNameSpy = jest.spyOn(encrypterStub, 'hash')

        await sut.execute(user)
        
        expect(findByUserNameSpy).toHaveBeenCalledWith(user.password)

    })
    it('Should call FindByUsernameProvider with correct username ', async ()=>{
        const { sut, findByUsernameProviderStub } = makeSut ()
        const user = makeUser()
        const findByUserNameSpy = jest.spyOn(findByUsernameProviderStub, 'userAlreadyExists')

        await sut.execute(user)
        
        expect(findByUserNameSpy).toHaveBeenCalledWith(user.username)

    })
    it('Should return new AppError if FindByUsernameProvider returns an user ', async ()=>{
    const { sut, findByUsernameProviderStub } = makeSut ()

    const user = makeUser()

    jest.spyOn(findByUsernameProviderStub, 'userAlreadyExists').mockResolvedValueOnce( {
        name:'any_name',
        password:'any_password',
        username:'any_username',
        email:'any_email@email.com',
        driver_license:'any_driver_license',
        id:'any_id',
        isAdmin: false,
        avatar: 'any_avatar',
        created_at: new Date(2022-1-18)
    })

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
    it('Should call CreateUserRepositorie with correct username ', async ()=>{
        const { sut, userRepositoryStub } = makeSut ()
        const user = makeUser()
        const createUserNameSpy = jest.spyOn(userRepositoryStub, 'create')

        user.password = 'password_hash'
        await sut.execute(user)
        
        expect(createUserNameSpy).toHaveBeenCalledWith(user)

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
    it('Should return an user on sucess ', async ()=>{
        const { sut, userRepositoryStub } = makeSut ()
        const user = makeUser()

        const userCreated = await sut.execute(user)

        
        expect(userCreated).toHaveProperty('id')
        expect(userCreated).toEqual({
            name:'any_name',
            password:'password_hash',
            username:'any_username',
            email:'any_email@email.com',
            driver_license:'any_driverLicense',
            id:'any_id',
            isAdmin: false,
            avatar: 'any_avatar',
            created_at: new Date(2022-1-18)
        })

    })

})