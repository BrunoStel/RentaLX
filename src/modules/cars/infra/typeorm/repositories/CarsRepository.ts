import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../entities/Car";
import { ICarsRepositorie } from "../interfaces/ICarsRepositorie";


class CarsRepositorie implements ICarsRepositorie{
    create(data: ICreateCarDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<Car> {
        throw new Error("Method not implemented.");
    }
  

}

export { CarsRepositorie }