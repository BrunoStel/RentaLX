import { ICreateCarDTO } from "../../infra/dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepositorie } from "../../infra/typeorm/interfaces/ICarsRepositorie";



class CarsRepositorieInMemory implements ICarsRepositorie{
    
    cars:Car[] = []

    async create({brand, category_id, daily_rate, description, fine_amount,name, license_plate}: ICreateCarDTO): Promise<void> {
        const car = new Car()
        Object.assign(car,
            {
                brand, 
                category_id, 
                daily_rate, 
                description, 
                fine_amount,name, 
                license_plate
            })

        this.cars.push(car)
    }

    async findByName(name: string): Promise<Car> {
       const car = this.cars.find(car => car.name === name)
       return car
    }


}

export { CarsRepositorieInMemory }