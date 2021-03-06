import { IRentalsRepositorie, IRequest } from "../infra/typeorm/interfaces/IRentalsRepositorie";
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

    async findById(id: string): Promise<Rental> {
        const rental = this.rentals.find(elem => elem.id === id)
        return rental
    }

   async findRentalsById(id: string): Promise<Rental[]> {
        const rentals = this.rentals.filter(elem => elem.id === id)

        return rentals
    }
   
    
}

export { RentalRepositorieInMemory }