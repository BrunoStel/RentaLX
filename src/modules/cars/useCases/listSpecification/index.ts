import { SpecificationRepositorie } from "../../repositories/implementations/SpecificationsRepository";
import { ListEspecificationController } from "./ListSpecificationController";
import { ListEspecificationUseCase } from "./ListSpecificationUseCase";

const specificationRepositorie = SpecificationRepositorie.getInstance();

const listSpecificationUseCase = new ListEspecificationUseCase(
    specificationRepositorie
);

const listSpecificationController = new ListEspecificationController(
    listSpecificationUseCase
);

export { listSpecificationController };
