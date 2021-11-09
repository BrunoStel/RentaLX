import { SpecificationRepositorie } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationRepositorie = SpecificationRepositorie.getInstance();

const createSpecificationUseCase = new CreateSpecificationUseCase(
    specificationRepositorie
);

const createSpecificationController = new CreateSpecificationController(
    createSpecificationUseCase
);

export { createSpecificationController };
