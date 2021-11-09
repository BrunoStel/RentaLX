import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationRoutes = Router();

specificationRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

// specificationRoutes.get("/", (request, response) => {
//     const categoriesAll = specificationRepositorie.list();

//     return response.status(201).json(categoriesAll);
// });

export { specificationRoutes };
