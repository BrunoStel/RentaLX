import { ICarsRepositorie } from "../../../cars/infra/typeorm/interfaces/ICarsRepositorie"
import { IRentalsRepositorie } from "../../infra/typeorm/interfaces/IRentalsRepositorie"
import { CarsRepositorieInMemory } from "../../../cars/repositories/in-memory/CarsRepositorieInMemory"
import { RentalRepositorieInMemory } from "../../repositories/RentalRepositorieInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { IUserRepositorie} from "../../../accounts/infra/typeorm/interfaces/IUserRepositorie"
import { UserRepositoryInMemory } from "../../../accounts/repositories/in-memory/UserRepositoryInMemory"
import { AppError } from "../../../../shared/errors/AppError"
import dayjs from "dayjs"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"
import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider"


describe("Create Rental", ()=>{
    let createRentalUseCase: CreateRentalUseCase
    let rentalRepositorie: IRentalsRepositorie
    let carRepositorie: ICarsRepositorie
    let userRepositorieInMemory: IUserRepositorie
    let dayJsDateProvider : IDateProvider

    beforeEach(()=>{
        rentalRepositorie = new RentalRepositorieInMemory()
        carRepositorie = new CarsRepositorieInMemory()
        dayJsDateProvider = new DayJsDateProvider()
        createRentalUseCase = new CreateRentalUseCase(rentalRepositorie,carRepositorie,dayJsDateProvider)
        userRepositorieInMemory = new UserRepositoryInMemory()
        
    })

    it("Should be able to create a new rental", async()=>{
        const car =  await carRepositorie.create({
            name:"Nome teste",
            brand:"Brand",
            description:"Description car",
            daily_rate:100,
            license_plate:"ABC-1234",
            category_id:"Category ID",
            fine_amount:60
        })

        const user = await userRepositorieInMemory.create({
            name:'Teste',
            password:'Senha teste',
            username:'User Teste',
            email:'userteste@email.com',
            driver_license:'DriverLicenseTeste'
        })

        const expected_return_date = dayjs().add(1, "day").toDate()

        const rental = await createRentalUseCase.execute(car.id, user.id, expected_return_date)

        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')

    })

    it("Should not be able to create a new rental if user has one already opened", async()=>{
        expect(async ()=>{
            const car =  await carRepositorie.create({
                name:"Nome teste",
                brand:"Brand",
                description:"Description car",
                daily_rate:100,
                license_plate:"ABC-1234",
                category_id:"Category ID",
                fine_amount:60
            })

            const car2 =  await carRepositorie.create({
                name:"Nome teste",
                brand:"Brand",
                description:"Description car",
                daily_rate:100,
                license_plate:"ABC-1234",
                category_id:"Category ID",
                fine_amount:60
            })

            const user = await userRepositorieInMemory.create({
                name:'Teste',
                password:'Senha teste',
                username:'User Teste',
                email:'userteste@email.com',
                driver_license:'DriverLicenseTeste'
            })

            const expected_return_date = dayjs().add(1, "day").toDate()

            await createRentalUseCase.execute(car.id, user.id, expected_return_date)

            await createRentalUseCase.execute(car2.id, user.id, expected_return_date)

         }).rejects.toBeInstanceOf(AppError)
    })

    it("Should not be able to create a new rental if a car is already in use", async()=>{
        expect(async ()=>{
            const car =  await carRepositorie.create({
                name:"Nome teste",
                brand:"Brand",
                description:"Description car",
                daily_rate:100,
                license_plate:"ABC-1234",
                category_id:"Category ID",
                fine_amount:60
            })

            const user = await userRepositorieInMemory.create({
                name:'Teste',
                password:'Senha teste',
                username:'User Teste',
                email:'userteste@email.com',
                driver_license:'DriverLicenseTeste'
            })

            const user2 = await userRepositorieInMemory.create({
                name:'Teste',
                password:'Senha teste',
                username:'User Teste',
                email:'userteste@email.com',
                driver_license:'DriverLicenseTeste'
            })

            const expected_return_date = dayjs().add(1, "day").toDate()

            await createRentalUseCase.execute(car.id, user.id, expected_return_date)

            await createRentalUseCase.execute(car.id, user2.id, expected_return_date)

         }).rejects.toBeInstanceOf(AppError)
    })

    it("Should not be able to create a new rental with less then 24hours of rent", async()=>{
        expect(async ()=>{
            const car =  await carRepositorie.create({
                name:"Nome teste",
                brand:"Brand",
                description:"Description car",
                daily_rate:100,
                license_plate:"ABC-1234",
                category_id:"Category ID",
                fine_amount:60
            })

            const user = await userRepositorieInMemory.create({
                name:'Teste',
                password:'Senha teste',
                username:'User Teste',
                email:'userteste@email.com',
                driver_license:'DriverLicenseTeste'
            })


            const expected_return_date = dayjs().add(12, "hours").toDate()

            await createRentalUseCase.execute(car.id, user.id, expected_return_date)


         }).rejects.toBeInstanceOf(AppError)
    })

})