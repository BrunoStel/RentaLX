import { AppError } from "../../../../errors/AppError"
import { CategoriesRepositorieInMemory } from "../../repositories/in-memory/CategoriesRepositorieInMemory"
import { SpecificationRepositorieInMemory } from "../../repositories/in-memory/SpecificationRepositorieInMemory"
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase"



describe("Create Category", ()=>{
    
    let createSpecificationUseCase: CreateSpecificationUseCase
    let specificationRepositorieInMemory: SpecificationRepositorieInMemory
    
    beforeEach(()=>{
        specificationRepositorieInMemory = new SpecificationRepositorieInMemory()
        createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepositorieInMemory, specificationRepositorieInMemory)
    })

    it("Should be able to create a new specification",async ()=>{
        const specification ={
            name:'specification test',
            description:'specification description test'
        }

       await createSpecificationUseCase.execute({
            name: specification.name,
            description: specification.description
        })
        
        const specificationCreated = await specificationRepositorieInMemory.findByName(specification.name)

        expect(specificationCreated).toHaveProperty("id")

    })
    
    it("Should not be able to create a specification with the same name",async ()=>{
        expect(async ()=>{
            const specification ={
                name:'specification test',
                description:'specification description test'
            }
    
           await createSpecificationUseCase.execute({
                name: specification.name,
                description: specification.description
            })
    
            await createSpecificationUseCase.execute({
                name: specification.name,
                description: specification.description
            })
        }).rejects.toBeInstanceOf(AppError)

    })

})