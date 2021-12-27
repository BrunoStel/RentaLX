import { now } from "mongoose";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rentals";
import { IRentalsRepositorie } from "../interfaces/IRentalsRepositorie";



class RentalRepositorie implements IRentalsRepositorie{
    private repository:Repository<Rental>

    constructor(){
        this.repository = getRepository(Rental)
    }
    
    async create({car_id, user_id,expected_return_date,id,end_date, total, finished}): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
            id,
            end_date,
            total,
            finished

        })
        await this.repository.save(rental)

        return rental
    }

    async findUserById(user_id:string): Promise<Boolean> {
        const userQuery = await this.repository
        .createQueryBuilder("rentals")
        .where("user_id = :user_id", { user_id:user_id })
        .andWhere("finished = :finished", {finished: false} )

        const user = await userQuery.getMany()

        if(user.length === 0){
            return false
        }else{
            return true
        }
    }


    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id)

        return rental
    }

     async findRentalsById(id: string): Promise<Rental[]> {
        const rentalsQuery = await this.repository
        .createQueryBuilder("rentals")
        .where("user_id =:user_id",{user_id:id})

        const rentals = await rentalsQuery.getMany()

        return rentals

    }
    
}

export { RentalRepositorie }