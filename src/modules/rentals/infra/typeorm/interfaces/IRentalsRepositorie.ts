import { Rental } from "../entities/Rentals";

export interface IRequest{
    user_id:string,
    car_id:string,
    expected_return_date:Date,
    id?:string,
    end_date?: Date,
    total?:number,
    finished?:Boolean
}

export interface IRentalsRepositorie {
    create({}:IRequest):Promise<Rental>
    findUserById(user_id:string):Promise<Boolean>
    findById(id:string):Promise<Rental>
    findRentalsById(id:string):Promise<Rental[]>
}
