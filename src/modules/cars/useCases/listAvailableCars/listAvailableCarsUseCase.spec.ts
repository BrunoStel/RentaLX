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
       const car = await carsRepositorie.create({
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

        const cars = await listAvailableCarsUseCase.execute({})

        expect(cars).toEqual(expect.arrayContaining([car]))

        cars.forEach(obj =>{
            expect(obj.available).toBe(true)
        })

    })

    it("Should be able to list all avaible cars by name, brand and description_id", async ()=>{
        const carByName = await carsRepositorie.create({
            name:"TESTE1",
            brand:"Brand",
            description:"Description car",
            daily_rate:100,
            license_plate:"ABC-1234",
            category_id:"Category ID",
            fine_amount:60
        })

        const carByBrand = await carsRepositorie.create({
             name:"Nome teste",
            brand:"BRAND1",
            description:"Description car",
            daily_rate:100,
            license_plate:"ABC-1235",
            category_id:"Category ID",
            fine_amount:60
          
        })

        const carByCaterogyID =  await carsRepositorie.create({
            name:"Nome teste",
            brand:"BRAND1",
            description:"Description car",
            daily_rate:100,
            license_plate:"ABC-1236",
            category_id:"CategoryID1",
            fine_amount:60
        })

        const carsByBrand = await listAvailableCarsUseCase.execute({brand:'BRAND1'})

        const carsByCategoryID = await listAvailableCarsUseCase.execute({category_id:"CategoryID1"})

        const carsByName = await listAvailableCarsUseCase.execute({name:"TESTE1"})


        expect(carsByBrand).toEqual(expect.arrayContaining([carByBrand]))

        expect(carsByCategoryID).toEqual(expect.arrayContaining([carByCaterogyID]))

        expect(carsByName).toEqual(expect.arrayContaining([carByName]))
        

    })




})