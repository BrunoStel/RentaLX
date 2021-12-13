import express, {Request, Response, NextFunction } from "express";
import "express-async-errors"
import swaggerUI from "swagger-ui-express";
import { errors } from 'celebrate';

import "../database/typeorm"

import "../../container"

import { router } from "./routes";
import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(errors());

app.use((err:Error, request:Request, response:Response, next:NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({message:err.message})
    }

    return response.status(500).json({
        status:"Error",
        message:`Internal server error - ${err.message}`
    })
})


app.listen(3333,()=> console.log('Server is running'));
