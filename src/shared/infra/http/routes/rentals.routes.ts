import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/usecases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureCarIDExists } from "../middlewares/ensureCarIDExists";



const rentalsRoutes = Router()


const createRentalController = new CreateRentalController()


rentalsRoutes.post("/:car_id", celebrate({
        [Segments.BODY]:{
            expected_return_date:Joi.date().required()
         }
    }),
        ensureAuthenticated,
        createRentalController.handle)




export{rentalsRoutes}