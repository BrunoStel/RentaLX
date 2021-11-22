import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListEspecificationUseCase } from "./ListSpecificationUseCase";

class ListEspecificationController {

    handle(request: Request, response: Response): Response {


        const listSpecificationUseCase = container.resolve(ListEspecificationUseCase)

        const categoriesAll = listSpecificationUseCase.execute();

        return response.status(201).json(categoriesAll);
    }
}

export { ListEspecificationController };
