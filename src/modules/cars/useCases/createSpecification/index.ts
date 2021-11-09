import { SpecificationRepositorie } from "../../repositories/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationRepositorie = new SpecificationRepositorie();

const createSpecificationUseCase = new CreateSpecificationUseCase(
    specificationRepositorie
);

const createSpecificationController = new CreateSpecificationController(
    createSpecificationUseCase
);

export { createSpecificationController, specificationRepositorie };
