import { Response } from "express";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
    constructor(private listCategoryUseCase: ListCategoryUseCase) {}

    handle(response: Response): Response {
        const categoriesAll = this.listCategoryUseCase.execute();

        return response.status(201).json(categoriesAll);
    }
}

export { ListCategoryController };
