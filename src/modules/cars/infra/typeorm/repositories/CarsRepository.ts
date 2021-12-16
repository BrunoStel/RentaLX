import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../entities/Car";
import { ICarsRepositorie } from "../interfaces/ICarsRepositorie";
import { IRequestCarDTO } from "../../dtos/IRequestCarDTO";


class CarsRepositorie implements ICarsRepositorie{
    private repository: Repository<Car>

    constructor(){
        this.repository =  getRepository(Car)
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

    async listAvailableCars({brand,category_id,name}:IRequestCarDTO): Promise<Car[]> {

        const carsQuery = await this.repository
        .createQueryBuilder("c")
        .where("available = :available", { available:true })

        if(brand){
            carsQuery.andWhere("c.brand = :brand", {brand:brand})
        }
        if(category_id){
            carsQuery.andWhere("c.category_id = :category_id", {category_id:category_id})
        }
        if(name){
            carsQuery.andWhere("c.name = :name", {name:name})
        }

        const cars = await carsQuery.getMany()

        return cars

     }
  

}

export { CarsRepositorie }