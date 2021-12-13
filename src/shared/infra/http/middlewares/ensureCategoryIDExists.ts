import { NextFunction, Request, Response } from "express";
import { CategoriesRepository } from "../../../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { AppError } from "../../../errors/AppError";


export async function ensureCategoryIDExists(request:Request, response:Response, next: NextFunction){

    const {category_id} = request.body
    
    const categoryRepository = new CategoriesRepository()

    const category = await categoryRepository.findById(category_id)


    if(!category){
        throw new AppError("Category ID does not exists", 401)
    }

    next()
 
}