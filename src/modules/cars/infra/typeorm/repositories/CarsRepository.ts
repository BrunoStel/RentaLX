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
    
    async findById(car_id: string): Promise<Car> {
        const car = this.repository.findOne(car_id)
        return car
    }

    async create({
        brand, 
        category_id,
         daily_rate, 
         description, 
         fine_amount, 
         license_plate, 
         name,
         specifications,
         id
         
        }: ICreateCarDTO): Promise<Car> {
            
        const car = this.repository.create({
            brand, 
            category_id, 
            daily_rate, 
            description, 
            fine_amount, 
            license_plate, 
            name,
            specifications,
            id 
        })

        await this.repository.save(car)

        return car;
    }

    findByName(name: string): Promise<Car> {
        throw new Error("Method not implemented.");
    }

    async listAvailableCars({brand,category_id,name}:IRequestCarDTO): Promise<Car[]> {

        const carsQuery = await this.repository
        .createQueryBuilder("cars")
        .leftJoinAndSelect("cars.specifications","specifications")
        .where("available = :available", { available:true })

        if(brand){
            carsQuery.andWhere("cars.brand = :brand", {brand:brand})
        }
        if(category_id){
            carsQuery.andWhere("cars.category_id = :category_id", {category_id:category_id})
        }
        if(name){
            carsQuery.andWhere("cars.name = :name", {name:name})
        }

        const cars = carsQuery.getMany()


        return cars

     }
  

}

export { CarsRepositorie }