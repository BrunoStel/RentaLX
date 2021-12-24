import { now } from "mongoose";
import { getRepository, IsNull, Repository } from "typeorm";
import { Rental } from "../entities/Rentals";
import { IRentalsRepositorie } from "../interfaces/IRentalsRepositorie";



class RentalRepositorie implements IRentalsRepositorie{
    private repository:Repository<Rental>

    constructor(){
        this.repository = getRepository(Rental)
    }

    async findUserById(user_id:string): Promise<Boolean> {
        const user = await this.repository
        .createQueryBuilder("rentals")
        .where("user_id = :user_id", { user_id:user_id })
        .andWhere("end_date = :end_date", {end_date: IsNull() } )

        if(!user){
            return false
        }else{
            return true
        }

    }
    
    async create({car_id, user_id,expected_return_date, start_date}): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
            start_date,
            end_date:null,
            updated_date:now()
        })

        await this.repository.save(rental)

        return rental

    }

    async carReturn(id:string, total:number): Promise<void> {
        const rental = this.repository.create({
            id,
            end_date: now(),
            updated_date:now(),
            total
        })

        await this.repository.save(rental)
    }
    
}

export { RentalRepositorie }