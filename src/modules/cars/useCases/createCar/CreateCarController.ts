import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";



class CreateCarController {
    handle(){
        const createCarUseCase = container.resolve(CreateCarUseCase)
    }
}

export { CreateCarController }