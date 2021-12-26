import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/usecases/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/usecases/devolutionRental/DevolutionRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureCarIDExists } from "../middlewares/ensureCarIDExists";



const rentalsRoutes = Router()


const createRentalController = new CreateRentalController()

const devolutionRentalController = new DevolutionRentalController()


rentalsRoutes.post("/:car_id", celebrate({
        [Segments.BODY]:{
            expected_return_date:Joi.date().required()
         }
    }),
        ensureAuthenticated,
        createRentalController.handle)

        rentalsRoutes.post("/devolution/:id",
            ensureAuthenticated,
            devolutionRentalController.handle)




export{rentalsRoutes}