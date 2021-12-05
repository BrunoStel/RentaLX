import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateUserController } from "../modules/accounts/UseCases/createUser/CreateUserController";
import { ListUsersController } from "../modules/accounts/UseCases/listUsers/listUsersController";




const userRoutes = Router();

const createUserController = new CreateUserController;
userRoutes.post("/", celebrate({
    [Segments.BODY]:{
        name: Joi.string().required().min(3),
        password: Joi.string().required().min(6),
        username:Joi.string().required().min(3),
        email:Joi.string().required().email(),
        driver_license: Joi.string().required()
    }
}),
createUserController.handle)

const listUsersController = new ListUsersController;
userRoutes.get("/",
listUsersController.handle)

export { userRoutes }