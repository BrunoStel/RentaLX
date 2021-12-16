import {Request, Response} from "express"
import { container } from "tsyringe"
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase"


class ListAvailableCarsController {

    async handle(request:Request, response:Response): Promise<Response>{
        const {brand, name, category_id} = request.query;
        
     const listAvailableUseCase = container.resolve(ListAvailableCarsUseCase)

     const availableCars = await listAvailableUseCase.execute({
         brand: brand as string, 
         name: name as string, 
         category_id: category_id as string
        })

    return response.status(200).json(availableCars)
        
    }

}

export { ListAvailableCarsController }