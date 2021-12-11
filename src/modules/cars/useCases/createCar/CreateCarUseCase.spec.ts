import { CarsRepositorieInMemory } from "../../repositories/in-memory/CarsRepositorieInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"



describe("Create Car", ()=>{
    
    let createCarUseCase : CreateCarUseCase
    let carsRepositorieInMemory : CarsRepositorieInMemory

    beforeEach(()=>{
        carsRepositorieInMemory = new CarsRepositorieInMemory
        createCarUseCase = new CreateCarUseCase(carsRepositorieInMemory)
    })

    it("Should be able to create a car", async ()=>{
        await createCarUseCase.execute({
            name:"Nome teste",
            brand:"Brand",
            description:"Description car",
            daily_rate:100,
            license_plate:"ABC-1234",
            category_id:"Category ID",
            fine_amount:60
        })

        const car = await carsRepositorieInMemory.findByName("Nome teste")

        expect(car).toHaveProperty("category_id")
     
    })



})