import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../entities/Car";

interface ICarsRepositorie {
    create(data:ICreateCarDTO): Promise<Car>
    findByName(name:string):Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car>
    listAvailableCars():Promise<Car[]> 
}

export { ICarsRepositorie }