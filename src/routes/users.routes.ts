import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { CreateUserController } from "../modules/cars/useCases/createUser/CreateUserController";



const userRoutes = Router();

const createUserController = new CreateUserController;
userRoutes.post("/", celebrate({
    [Segments.BODY]:{
        name: Joi.string().required().min(3),
        password: Joi.string().required().min(6),
        email:Joi.string().required().email(),
        driver_license: Joi.string().required(),
        avatar:Joi.string().required()
    }
}),
createUserController.handle)


export { userRoutes }