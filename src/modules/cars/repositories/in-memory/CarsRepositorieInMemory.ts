import { ICreateCarDTO } from "../../infra/dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepositorie } from "../../infra/typeorm/interfaces/ICarsRepositorie";



class CarsRepositorieInMemory implements ICarsRepositorie{
 
    cars:Car[] = []

    async create({brand, category_id, daily_rate, description, fine_amount,name, license_plate, available=true}: ICreateCarDTO): Promise<Car> {
        const car = new Car()
        Object.assign(car,
            {
                brand, 
                category_id, 
                daily_rate, 
                description, 
                fine_amount,name, 
                license_plate,
                available
            })

        this.cars.push(car)
        return car;
    }

    async listAvailableCars(): Promise<Car[]> {
        const cars = this.cars.filter(car => car.available === true)
        return cars
    }

    async findByName(name: string): Promise<Car> {
       const car = this.cars.find(car => car.name === name)
       return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(car => car.license_plate === license_plate)
        return car
     }


}

export { CarsRepositorieInMemory }