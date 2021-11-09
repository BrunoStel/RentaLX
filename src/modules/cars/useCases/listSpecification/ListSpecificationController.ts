import { Request, Response } from "express";

import { ListEspecificationUseCase } from "./ListSpecificationUseCase";

class ListEspecificationController {
    constructor(private listSpecificationUseCase: ListEspecificationUseCase) {}

    handle(request: Request, response: Response): Response {
        const categoriesAll = this.listSpecificationUseCase.execute();

        return response.status(201).json(categoriesAll);
    }
}

export { ListEspecificationController };
