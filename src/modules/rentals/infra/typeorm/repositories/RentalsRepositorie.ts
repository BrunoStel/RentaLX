import { now } from "mongoose";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rentals";
import { IRentalsRepositorie } from "../../../../cars/infra/typeorm/interfaces/IRentalsRepositorie";



class RentalRepositorie implements IRentalsRepositorie{
    private repository:Repository<Rental>

    constructor(){
        this.repository = getRepository(Rental)
    }

    async findUserById(user_id:string): Promise<Boolean> {
        const userQuery = await this.repository
        .createQueryBuilder("rentals")
        .where("user_id = :user_id", { user_id:user_id })
        .where("finished = :finished", {finished: false} )

        const user = await userQuery.getMany()

        
        if(user.length === 0){
            return false
        }else{
            return true
        }

    }
    
    async create({car_id, user_id,expected_return_date}): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
            start_date:now(),
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