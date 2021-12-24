import { Rental } from "../entities/Rentals";

interface IRequest{
    user_id:string,
    car_id:string,
    expected_return_date:Date,
    start_date:Date
}

export interface IRentalsRepositorie {
    create({}:IRequest):Promise<Rental>
    findUserById(user_id:string):Promise<Boolean>
    carReturn(id:string, total:number):Promise<void>
}
