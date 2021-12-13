import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { CategoriesRepository } from "../../../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { AppError } from "../../../errors/AppError";


export async function ensureIsAdmin(request:Request, response:Response, next: NextFunction){

    const {id} = request.user

    const userRepository = new UserRepository();

    const user = await userRepository.findByID(id)

    if(!user.isAdmin){
        throw new AppError("User is not Admin", 401)
    }

    next()
 
}