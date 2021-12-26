
import {Request, Response} from 'express'
import { container } from 'tsyringe'
import { CreateRentalUseCase } from './CreateRentalUseCase'


class CreateRentalController {

    async handle(request:Request, response:Response): Promise<Response>{
        const {expected_return_date} = request.body

        const { car_id } = request.params

        const {id} = request.user


        const createRentalUseCase = container.resolve(CreateRentalUseCase)

        const rental = await createRentalUseCase.execute(car_id, id, expected_return_date)

        return response.status(201).json(rental)
    }


}

export{CreateRentalController}