import { Rental } from "../entities/Rentals";



export interface IRentalsRepositorie {
    create():Promise<Rental>
    findUserById(user_id:string):Promise<Boolean>
}
