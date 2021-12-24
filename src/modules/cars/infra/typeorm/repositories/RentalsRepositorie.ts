import { Rental } from "../entities/Rentals";
import { IRentalsRepositorie } from "../interfaces/IRentalsRepositorie";



class RentalRepositorie implements IRentalsRepositorie{
    
    findUserById(user_id:string): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    
    create(): Promise<Rental> {
        throw new Error("Method not implemented.");
    }
    
}

export { RentalRepositorie }