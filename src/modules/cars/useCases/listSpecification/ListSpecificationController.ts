import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListEspecificationUseCase } from "./ListSpecificationUseCase";

class ListEspecificationController {

    async handle(request: Request, response: Response): Promise<Response> {


        const listSpecificationUseCase = container.resolve(ListEspecificationUseCase)

        const categoriesAll = await listSpecificationUseCase.execute();

        return response.status(201).json(categoriesAll);
    }
}

export { ListEspecificationController };
