import { AppError } from "../../../../shared/errors/AppError"
import { CategoriesRepositorieInMemory } from "../../repositories/in-memory/CategoriesRepositorieInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"


describe("Create Category", ()=>{
    
    let createCategoryUseCase: CreateCategoryUseCase
    let categoriesRepositorieInMemory: CategoriesRepositorieInMemory
    
    beforeEach(()=>{
        categoriesRepositorieInMemory = new CategoriesRepositorieInMemory()
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositorieInMemory, categoriesRepositorieInMemory)
    })

    it("Should be able to create a new category",async ()=>{
        const category ={
            name:'Category test',
            description:'Category description test'
        }

       await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })
        
        const categoryCreated = await categoriesRepositorieInMemory.findByName(category.name)

        expect(categoryCreated).toHaveProperty("id")

    })
    
    it("Should not be able to create a category with the same name",async ()=>{
        expect(async ()=>{
            const category ={
                name:'Category test',
                description:'Category description test'
            }
    
           await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })
        }).rejects.toBeInstanceOf(AppError)

    })

})