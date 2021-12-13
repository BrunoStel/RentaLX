import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../entities/Car";
import { ICarsRepositorie } from "../interfaces/ICarsRepositorie";


class CarsRepositorie implements ICarsRepositorie{
    private repository: Repository<Car>

    constructor(){
        this.repository =  getRepository(Car)
    }

    async listAvailableCars(): Promise<Car[]> {
       const cars = (await this.repository.find()).filter(obj => obj.available === true)
       return cars
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.repository.findOne({license_plate})
        return car
    }

    async create({
        brand, 
        category_id,
         daily_rate, 
         description, 
         fine_amount, 
         license_plate, 
         name
        }: ICreateCarDTO): Promise<Car> {
            
        const car = this.repository.create({
            brand, 
            category_id, 
            daily_rate, 
            description, 
            fine_amount, 
            license_plate, 
            name})

        await this.repository.save(car)

        return car;
    }

    findByName(name: string): Promise<Car> {
        throw new Error("Method not implemented.");
    }
  

}

export { CarsRepositorie }