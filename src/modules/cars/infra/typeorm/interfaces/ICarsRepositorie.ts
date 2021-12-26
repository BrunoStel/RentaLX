import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { IRequestCarDTO } from "../../dtos/IRequestCarDTO";
import { Car } from "../entities/Car";
import { Specifications } from "../entities/Specifications";

interface ICarsRepositorie {
    create(data:ICreateCarDTO): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car>
    listAvailableCars({brand,category_id,name}:IRequestCarDTO):Promise<Car[]> 
    findById(car_id:string):Promise<Car>
    specificationsAlreadyRegistered(car_id:string):Promise<Specifications[] | false>
    turnUnavailable(car_id:string):Promise<void>
    turnAvailable(car_id:string):Promise<void>
}

export { ICarsRepositorie }