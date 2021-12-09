import { AppError } from "../../../../shared/errors/AppError"
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory"
import { CreateUserUseCase } from "./CreateUserUseCase"


describe("Create User", ()=>{
    
    let userRepositoryInMemory: UserRepositoryInMemory
    let createUserUseCase: CreateUserUseCase

    beforeEach(()=>{
        userRepositoryInMemory = new UserRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })



    it('Should create a new user', async ()=>{
        const user = {
            name:'Teste',
            password:'Senha teste',
            username:'User Teste',
            email:'userteste@email.com',
            driver_license:'DriverLicenseTest' 
        }
        await createUserUseCase.execute(user)

        const userExpected = await userRepositoryInMemory.findByUsername(user.username)
        
        expect(userExpected).toHaveProperty('id')

    })

    it('Should not create user with the same username', async ()=>{
        
        expect(async()=>{

            const user = {
                name:'Teste',
                password:'Senha teste',
                username:'User Teste',
                email:'userteste@email.com',
                driver_license:'DriverLicenseTest' 
            }
            await createUserUseCase.execute(user)

            await createUserUseCase.execute(user)

        }).rejects.toBeInstanceOf(AppError)
       

    })
})