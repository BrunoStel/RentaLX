import { NextFunction, Request, Response } from "express";
import { CarsRepositorie } from "../../../../modules/cars/infra/typeorm/repositories/CarsRepository";
import { AppError } from "../../../errors/AppError";


export async function ensureCarIDExists(request:Request, response:Response, next: NextFunction){

    const {id} = request.params
    
    const carRepositorie = new CarsRepositorie()

    const car = await carRepositorie.findById(id)


    if(!car){
        throw new AppError("Car ID does not exists", 401)
    }

    next()
 
}