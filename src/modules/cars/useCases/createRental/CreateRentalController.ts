
import {Request, Response} from 'express'
import { container } from 'tsyringe'
import { CreateRentalUseCase } from './CreateRentalUseCase'


class CreateRentalController {

    async handle(request:Request, response:Response): Promise<Response>{
        const {car_id, user_id} = request.body

        const createRentalUseCase = container.resolve(CreateRentalUseCase)

        const rental = createRentalUseCase.execute(car_id, user_id)

        return response.status(201).json(rental)
    }


}

export{CreateRentalController}