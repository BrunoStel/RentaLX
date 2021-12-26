import { IRentalsRepositorie, IRequest } from "../../cars/infra/typeorm/interfaces/IRentalsRepositorie";
import { Rental } from "../infra/typeorm/entities/Rentals";



class RentalRepositorieInMemory implements IRentalsRepositorie{
    rentals: Rental[] = []

    async create({car_id, user_id,expected_return_date}): Promise<Rental> {
        const rental = new Rental() 

        Object.assign(rental,{
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date()
        })

        this.rentals.push(rental)

        return rental
    }

    async findUserById(user_id: string): Promise<Boolean> {

        const user = this.rentals.find(elem => elem.user_id === user_id)

        if(!user){
            return false
        }

        return true

    }

    async carReturn(id: string, total: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}

export { RentalRepositorieInMemory }