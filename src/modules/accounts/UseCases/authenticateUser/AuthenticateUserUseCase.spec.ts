import { AppError } from "../../../../shared/errors/AppError"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"



describe("Authenticate User", ()=>{
    
    let authenticateUserUseCase: AuthenticateUserUseCase
    let createUserUsecase : CreateUserUseCase

    
    beforeEach(()=>{

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

    it("Should be able to authenticate an nonxistent user",async ()=>{
        expect(async ()=>{
            const user = {
                name:'Teste',
                password:'Senha teste',
                username:'User Teste',
                email:'userteste@email.com',
                driver_license:'DriverLicenseTest' 
            }
    
            await authenticateUserUseCase.execute(user)

        }).rejects.toBeInstanceOf(AppError)

    })

    it("Should be able to authenticate with incorrect password",async ()=>{
        expect(async ()=>{
            const user = {
                name:'Teste',
                password:'Senha teste',
                username:'User Teste',
                email:'userteste@email.com',
                driver_license:'DriverLicenseTest' 
            }
            await createUserUsecase.execute(user)

           await authenticateUserUseCase.execute({username:user.username, password:'12345678'})
           
        }).rejects.toBeInstanceOf(AppError)

    })
})