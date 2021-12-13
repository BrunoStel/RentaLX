import {Request, Response} from "express"
import { container } from "tsyringe"
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase"


class ListAvailableCarsController {

    async handle(request:Request, response:Response): Promise<Response>{
        
     const listAvailableUseCase = container.resolve(ListAvailableCarsUseCase)

     const availableCars = await listAvailableUseCase.execute()

    return response.status(200).json(availableCars)
        
    }

}

export { ListAvailableCarsController }