import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCarDTO } from "../../infra/dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { Specifications } from "../../infra/typeorm/entities/Specifications";
import { ICarsRepositorie } from "../../infra/typeorm/interfaces/ICarsRepositorie";



class CarsRepositorieInMemory implements ICarsRepositorie{
    
    async turnUnavailable(car_id: string): Promise<void> {
        this.cars.filter((elem,index)=> 
        {if(elem.id === car_id){
                this.cars[index].available = false 
        }} )
    }


    async turnAvailable(car_id: string): Promise<void> {
        this.cars.filter((elem,index)=> 
        {if(elem.id === car_id){
                this.cars[index].available = true 
        }} )
    }

    cars:Car[] = []

    async create({brand, category_id, daily_rate, description, fine_amount,name, license_plate, available=true, specifications}: ICreateCarDTO): Promise<Car> {
        const car = new Car()
        Object.assign(car,
            {
                brand, 
                category_id, 
                daily_rate, 
                description, 
                fine_amount,name, 
                license_plate,
                available,
                specifications
            })

        this.cars.push(car)
        return car;
    }

    async listAvailableCars({brand,category_id,name}): Promise<Car[]> {
        const cars = this.cars
        .filter(car => car.available === true)
        .filter(car =>{
            if(brand){
                 return car.brand === brand
            }else{
                return car
            }})
        .filter(car =>{
            if(category_id){
                 return car.category_id === category_id
            }else{
                return car
            }})
        .filter(car =>{
            if(name){
                 return car.name === name
            }else{
                return car
            }})
        
        return cars
    }

    async findByName(name: string): Promise<Car> {
       const car = this.cars.find(car => car.name === name)

       if(!car){
           throw new AppError("Car does not exists by that name")
       }

       return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(car => car.license_plate === license_plate)
        return car
     }

    async findById(car_id: string): Promise<Car> {
        const car = this.cars.find(car => car.id === car_id)
        return car 
    }

    async specificationsAlreadyRegistered(car_id: string): Promise<false | Specifications[]> {
        const car = this.cars.find(car => car.id === car_id )

        if(!car.specifications){
            return false
        }

        return car.specifications
    }


}

export { CarsRepositorieInMemory }