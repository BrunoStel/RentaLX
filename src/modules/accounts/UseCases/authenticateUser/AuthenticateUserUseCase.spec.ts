
import { compare, hash } from "bcryptjs"
import { UserRepositoryInMemory } from "../../repositories/implementations/UserRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"



describe("Authenticate User", ()=>{
    
    let authenticateUserUseCase: AuthenticateUserUseCase
    let userRepositoryInMemory: UserRepositoryInMemory
    let createUserUsecase : CreateUserUseCase

    
    beforeEach(()=>{
        userRepositoryInMemory = new UserRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory)
        createUserUsecase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it("Should be able to return a valid token",async ()=>{

        const user = {
            name:'Teste',
            password:'Senha teste',
            username:'User Teste',
            email:'userteste@email.com',
            driver_license:'DriverLicenseTest' 
        }

        await createUserUsecase.execute(user)

        const token = await authenticateUserUseCase.execute(user)

        expect(token).toHaveProperty('token')

    })
})