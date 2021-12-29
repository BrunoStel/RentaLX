import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { UserTokensRepositorie } from "../../../../modules/accounts/infra/typeorm/repositories/UserTokensRepositorie";
import auth from "../../../../config/auth";

interface IPaylod{
    sub:string;
}


export async function ensureAuthenticated(request:Request, response:Response, next: NextFunction){

    const authHeader = request.headers.authorization


    if(!authHeader){
        throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")


    try {
       const { sub:user_id } = verify(token, auth.secret_token) as IPaylod //sub retorna o ID do usuario

        request.user = {
            id: user_id
        }

       next()
    } catch (error) {
        throw new AppError("Invalid token", 401)
    }
  


}