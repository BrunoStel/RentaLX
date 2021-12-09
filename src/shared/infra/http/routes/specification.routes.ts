import { Router } from "express";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListEspecificationController } from "../../../../modules/cars/useCases/listSpecifications/ListSpecificationController";


const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController;
specificationRoutes.post("/",createSpecificationController.handle)


const listSpecificationController = new ListEspecificationController;
specificationRoutes.get("/", listSpecificationController.handle);

export { specificationRoutes };
