import 'reflect-metadata';
import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositorieInMemory } from "../../repositories/in-memory/CarsRepositorieInMemory"
import { CategoriesRepositorieInMemory } from '../../repositories/in-memory/CategoriesRepositorieInMemory';
import { CreateCarUseCase } from "./CreateCarUseCase"



describe("Create Car", ()=>{
    
    let createCarUseCase : CreateCarUseCase
    let carsRepositorieInMemory : CarsRepositorieInMemory

    beforeEach(()=>{
        carsRepositorieInMemory = new CarsRepositorieInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositorieInMemory)
    })

    it("Should be able to create a car", async ()=>{
        const car = await createCarUseCase.execute({
            name:"Nome teste",
            brand:"Brand",
            description:"Description car",
            daily_rate:100,
            license_plate:"ABC-1234",
            category_id:"Category ID",
            fine_amount:60
        })

        expect(car).toHaveProperty("id")
     
    })

    it("The car should be registered with availability", async ()=>{
       const car = await createCarUseCase.execute({
            name:"Nome teste",
            brand:"Brand",
            description:"Description car",
            daily_rate:100,
            license_plate:"ABC-1234",
            category_id:"Category ID",
            fine_amount:60
        })

        expect(car.available).toBe(true)
     
    })


    it("Should not be able to create a car with the same license_plate", async ()=>{
        expect(async ()=>{
                await createCarUseCase.execute({
                    name:"Nome teste",
                    brand:"Brand",
                    description:"Description car",
                    daily_rate:100,
                    license_plate:"ABC-1234",
                    category_id:"Category ID",
                    fine_amount:60
                })
                
                await createCarUseCase.execute({
                    name:"Nome teste2",
                    brand:"Brand2",
                    description:"Description car2",
                    daily_rate:100,
                    license_plate:"ABC-1234",
                    category_id:"Category ID2",
                    fine_amount:60
                })

            }).rejects.toBeInstanceOf(AppError)
        })
    

})