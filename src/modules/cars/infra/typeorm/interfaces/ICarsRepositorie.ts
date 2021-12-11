import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../entities/Car";

interface ICarsRepositorie {
    create(data:ICreateCarDTO): Promise<void>
    findByName(name:string):Promise<Car>
}

export { ICarsRepositorie }