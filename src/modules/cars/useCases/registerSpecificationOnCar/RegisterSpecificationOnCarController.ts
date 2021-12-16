import{Request, Response} from 'express'
import { container } from 'tsyringe'
import { RegisterSpecificationOnCarUseCase } from './RegisterSpecificationOnCarUseCase'



class RegisterSpecificationOnCarController{

    async handle(request:Request, response:Response): Promise<Response>{
        const { id } = request.params
        const {specifications_id} = request.body 

        const registerSpecificationOnCarUseCase = container.resolve(RegisterSpecificationOnCarUseCase)

        const car = await registerSpecificationOnCarUseCase.execute({car_id:id,specifications_id})

        return response.status(201).json(car)
    }

}

export{RegisterSpecificationOnCarController}