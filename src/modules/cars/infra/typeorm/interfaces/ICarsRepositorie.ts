import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { IRequestCarDTO } from "../../dtos/IRequestCarDTO";
import { Car } from "../entities/Car";

interface ICarsRepositorie {
    create(data:ICreateCarDTO): Promise<Car>
    findByName(name:string):Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car>
    listAvailableCars({brand,category_id,name}:IRequestCarDTO):Promise<Car[]> 
    findById(car_id:string):Promise<Car>
}

export { ICarsRepositorie }