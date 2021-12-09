
import { UserRepositoryInMemory } from "../../repositories/implementations/UserRepositoryInMemory"
import { ListUsersUseCase } from "./listUsersUseCase"



describe("List Users", ()=>{
    
    let listUsersUseCase: ListUsersUseCase
    let userRepositoryInMemory: UserRepositoryInMemory

    
    beforeEach(()=>{
        userRepositoryInMemory = new UserRepositoryInMemory()
        listUsersUseCase = new ListUsersUseCase(userRepositoryInMemory)
    })

    it("Should be able to list an array of Users",async ()=>{
        const user = {
            name:'Teste',
            password:'Senha teste',
            username:'User Teste',
            email:'userteste@email.com',
            driver_license:'DriverLicenseTest' 
        }
         await userRepositoryInMemory.create(user)
 
         const users = await userRepositoryInMemory.list()

        const listUsers = await listUsersUseCase.execute()

        expect(listUsers).toEqual(expect.arrayContaining(users))

    })
    

})