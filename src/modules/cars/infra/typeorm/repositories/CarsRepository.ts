import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../entities/Car";
import { ICarsRepositorie } from "../interfaces/ICarsRepositorie";
import { IRequestCarDTO } from "../../dtos/IRequestCarDTO";
import { Specifications } from "../entities/Specifications";


class CarsRepositorie implements ICarsRepositorie{
    private repository: Repository<Car>

    constructor(){
        this.repository =  getRepository(Car)
    }

    async create({
        brand, 
        category_id,
        category,
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
            category,
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

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.repository.findOne({license_plate})
        return car
    }
    
    async findById(car_id: string): Promise<Car> {
        const car = await this.repository.findOne(car_id)
        return car
    }

    async listAvailableCars({brand,category_id,name}:IRequestCarDTO): Promise<Car[]> {

        const carsQuery = await this.repository
        .createQueryBuilder("cars")
        .leftJoinAndSelect("cars.specifications","specifications")
        .leftJoinAndSelect("cars.category","category")
        .leftJoinAndSelect('cars.car_images', "car_images")
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

     async specificationsAlreadyRegistered (car_id:string): Promise<Specifications[] | false> {
        const carQuery = await this.repository
        .createQueryBuilder("cars")
        .leftJoinAndSelect("cars.specifications","specifications")
        .where("car_id = :car_id", { car_id:car_id })
        .getMany()

        if(carQuery.length === 0){
            return false
        }

        return carQuery[0].specifications
    }


    async turnUnavailable(car_id: string): Promise<void> {
       const car = await this.repository.findOne(car_id)

       await this.repository
        .createQueryBuilder()
        .update(car)
        .set({ available: false})
        .where("id= :id", {id:car_id})
        .execute()

    }
  

    async turnAvailable(car_id: string): Promise<void> {
        const car = await this.repository.findOne(car_id)
 
        await this.repository
         .createQueryBuilder()
         .update(car)
         .set({ available: true})
         .where("id= :id", {id:car_id})
         .execute()
    }
 
}

export { CarsRepositorie }