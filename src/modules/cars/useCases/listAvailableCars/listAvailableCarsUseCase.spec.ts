import { AppError } from "../../../../shared/errors/AppError"
import { Car } from "../../infra/typeorm/entities/Car"
import { CarsRepositorieInMemory } from "../../repositories/in-memory/CarsRepositorieInMemory"
import { CreateCarUseCase } from "../createCar/CreateCarUseCase"
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase"




describe("listAvailableCarsUseCase", ()=>{

    let carsRepositorie : CarsRepositorieInMemory
    let listAvailableCarsUseCase : ListAvailableCarsUseCase

    

    beforeEach(()=>{
        carsRepositorie = new CarsRepositorieInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositorie)
    })

    it("Should be able to list all avaible cars", async ()=>{
        await carsRepositorie.create({
            name:"Nome teste",
            brand:"Brand",
            description:"Description car",
            daily_rate:100,
            license_plate:"ABC-1234",
            category_id:"Category ID",
            fine_amount:60
        })

        await carsRepositorie.create({
            available:false,
            name:"Nome teste",
            brand:"Brand",
            description:"Description car",
            daily_rate:100,
            license_plate:"ABC-1235",
            category_id:"Category ID",
            fine_amount:60
          
        })

        await carsRepositorie.create({
            name:"Nome teste",
            brand:"Brand",
            description:"Description car",
            daily_rate:100,
            license_plate:"ABC-1236",
            category_id:"Category ID",
            fine_amount:60
        })

        const cars = await listAvailableCarsUseCase.execute()

        expect(cars).toEqual(expect.arrayContaining(cars))

        cars.forEach(obj =>{
            expect(obj.available).toBe(true)
        })

    })




})