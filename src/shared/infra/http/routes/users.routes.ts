import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/accounts/UseCases/createUser/CreateUserController";
import { ListUsersController } from "../../../../modules/accounts/UseCases/listUsers/listUsersController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "../../../../config/upload"

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig)


const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController()


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

userRoutes.get("/",
listUsersController.handle)

userRoutes.patch("/avatar", 
ensureAuthenticated, 
uploadAvatar.single("avatar"), 
updateUserAvatarController.handle)

export { userRoutes }