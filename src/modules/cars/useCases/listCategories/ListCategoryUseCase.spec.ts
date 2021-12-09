
import { CategoriesRepositorieInMemory } from "../../repositories/in-memory/CategoriesRepositorieInMemory"
import { ListCategoryUseCase } from "./ListCategoryUseCase"



describe("List Category", ()=>{
    
    let listCategoryUseCase: ListCategoryUseCase
    let categoriesRepositorieInMemory: CategoriesRepositorieInMemory

    
    beforeEach(()=>{
        categoriesRepositorieInMemory = new CategoriesRepositorieInMemory()
        listCategoryUseCase = new ListCategoryUseCase(categoriesRepositorieInMemory)
    })

    it("Should be able to list an array of category",async ()=>{
         await categoriesRepositorieInMemory.create({name:'Teste name', description:'Teste Description'})
         await categoriesRepositorieInMemory.create({name:'Teste name2', description:'Teste Description2'})
         await categoriesRepositorieInMemory.create({name:'Teste name3', description:'Teste Description3'})
         const category = await categoriesRepositorieInMemory.list()

        const listCategories = await listCategoryUseCase.execute()

        expect(listCategories).toEqual(expect.arrayContaining(category))

    })
    

})