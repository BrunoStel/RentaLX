import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UpdateUserAvatarController } from "../../../../modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "../../../../config/upload"
import { adaptExpressRoute } from "../express adapter/express-route-adapter";
import { makeCreateUserController } from "../factories/createUserController-factorie";
import { makelistUsersController } from "../factories/listUsersController-factorie";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig)

const createUserController = makeCreateUserController()

const listUsersController = makelistUsersController()

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
adaptExpressRoute(createUserController))

userRoutes.get("/",
adaptExpressRoute(listUsersController))

userRoutes.patch("/avatar", 
ensureAuthenticated, 
uploadAvatar.single("avatar"), 
updateUserAvatarController.handle)

export { userRoutes }