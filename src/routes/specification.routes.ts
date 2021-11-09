import { Router } from "express";

import { SpecificationRepositorie } from "../repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../services/CreateSpecificationService";

const specificationRoutes = Router();

const specificationRepositorie = new SpecificationRepositorie();

specificationRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createSpecification = new CreateSpecificationService(
        specificationRepositorie
    );

    createSpecification.execute({ name, description });

    return response.status(201).send();
});

specificationRoutes.get("/", (request, response) => {
    const categoriesAll = specificationRepositorie.list();

    return response.status(201).json(categoriesAll);
});

export { specificationRoutes };
