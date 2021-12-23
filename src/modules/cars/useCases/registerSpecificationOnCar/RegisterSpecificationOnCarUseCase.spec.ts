import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositorieInMemory } from "../../repositories/in-memory/CarsRepositorieInMemory"
import { SpecificationRepositorieInMemory } from "../../repositories/in-memory/SpecificationRepositorieInMemory"
import { RegisterSpecificationOnCarUseCase } from "./RegisterSpecificationOnCarUseCase"




describe("Registar Specification on Car",()=>{

    let registerSpecificationOnCarUseCase : RegisterSpecificationOnCarUseCase
    let carRepositorieInMemory: CarsRepositorieInMemory
    let specificationRepositorieInMemory: SpecificationRepositorieInMemory

    beforeEach(()=>{
        carRepositorieInMemory = new CarsRepositorieInMemory()
        specificationRepositorieInMemory= new SpecificationRepositorieInMemory()
        registerSpecificationOnCarUseCase = new  RegisterSpecificationOnCarUseCase(carRepositorieInMemory,specificationRepositorieInMemory)
    })

    it("should be able to register a new specification on the car, without removing the old ones",async ()=>{
   

        const specification = await specificationRepositorieInMemory.create({name:"NomeTeste",description:"DescriçãoTeste"})
        const specification2 = await specificationRepositorieInMemory.create({name:"NomeTeste2",description:"DescriçãoTeste2"})
        const specification3 = await specificationRepositorieInMemory.create({name:"NomeTeste3",description:"DescriçãoTeste3"})

        const specifications_id=[specification.id, specification2.id]

        const specification_id3 = [specification3.id]

        const car = await carRepositorieInMemory.create({
            name:"Nome teste",
            brand:"Brand",
            description:"Description car",
            daily_rate:100,
            license_plate:"ABC-1234",
            category_id:"Category ID",
            fine_amount:60,
        })

        await registerSpecificationOnCarUseCase.execute({
            car_id:car.id,
            specifications_id
        })

        const carUpdated = await carRepositorieInMemory.findByName(car.name)

        expect(carUpdated.specifications).toEqual(expect.arrayContaining([specification]))

        expect(carUpdated.specifications.length).toBe(2)


        await registerSpecificationOnCarUseCase.execute({
            car_id:car.id,
            specifications_id:specification_id3
        })

        expect(carUpdated.specifications.length).toBe(3)

    
    })

    it("should not be able to register a new specification to a non existing car", ()=>{
        expect(async ()=>{
        const car_id = "1234"
        const specifications_id=['54321']

        await registerSpecificationOnCarUseCase.execute({car_id,specifications_id})
        }).rejects.toBeInstanceOf(AppError)
    })

})