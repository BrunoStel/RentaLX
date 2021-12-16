import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { RegisterSpecificationOnCarController } from "../../../../modules/cars/useCases/registerSpecificationOnCar/RegisterSpecificationOnCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureCategoryIDExists } from "../middlewares/ensureCategoryIDExists";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";


const carsRoutes = Router()



const createCarController = new CreateCarController()

const listAvailableCarsController = new ListAvailableCarsController()

const registerSpecificationOnCarController = new RegisterSpecificationOnCarController()

carsRoutes.post("/", celebrate({
    [Segments.BODY]:{
        name: Joi.string().required().min(3),
        brand:Joi.string().required().min(3),
        description:Joi.string().required().min(3),
        daily_rate:Joi.number().required(),
        license_plate:Joi.string().required().min(7).max(8),
        fine_amount:Joi.number().required(),
        category_id: Joi.string().required().uuid()
    }
}),
    ensureAuthenticated,
    ensureIsAdmin,
    ensureCategoryIDExists, 
    createCarController.handle)



carsRoutes.post("/specifications/:id", celebrate({
    [Segments.BODY]:{
        specifications_id: Joi.array().required()
    }
}),
    ensureAuthenticated,
    ensureIsAdmin, 
    registerSpecificationOnCarController.handle)


carsRoutes.get("/available",listAvailableCarsController.handle)

export{carsRoutes}