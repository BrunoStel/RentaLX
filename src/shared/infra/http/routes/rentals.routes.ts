import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ListUsersController } from "../../../../modules/accounts/UseCases/listUsers/listUsersController";
import { CreateRentalController } from "../../../../modules/rentals/usecases/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/usecases/devolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "../../../../modules/rentals/usecases/listRentalByUser/ListRentalByUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";




const rentalsRoutes = Router()


const createRentalController = new CreateRentalController()

const devolutionRentalController = new DevolutionRentalController()

const listRentalByUserController = new ListRentalByUserController()


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


rentalsRoutes.get("/list",
        ensureAuthenticated,
        listRentalByUserController.handle)





export{rentalsRoutes}