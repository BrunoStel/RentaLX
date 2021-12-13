import { SpecificationRepositorieInMemory } from "../../repositories/in-memory/SpecificationRepositorieInMemory"
import { CreateSpecificationUseCase } from "../createSpecification/CreateSpecificationUseCase"
import { ListEspecificationUseCase } from "./ListSpecificationUseCase"


describe("List Especification Use Case", ()=>{

    let specificationRepositorieInMemory: SpecificationRepositorieInMemory
    let createSpecificationUseCase: CreateSpecificationUseCase
    let listSpecificationUseCase: ListEspecificationUseCase

    beforeEach(()=>{
        specificationRepositorieInMemory = new SpecificationRepositorieInMemory()
        createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepositorieInMemory)
        listSpecificationUseCase = new ListEspecificationUseCase(specificationRepositorieInMemory)
    })


    it("Should return an array of specifications", async ()=>{
        await specificationRepositorieInMemory.create({name:'Specification1', description:"Specification Desc1"})
        await specificationRepositorieInMemory.create({name:'Specification2', description:"Specification Desc2"})
        await specificationRepositorieInMemory.create({name:'Specification3', description:"Specification Desc3"})
        const specificationsList = await specificationRepositorieInMemory.list()

        const specifications = await listSpecificationUseCase.execute()

        expect(specifications).toEqual(expect.arrayContaining(specificationsList))

    })




})