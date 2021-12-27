import { Request, response, Response } from 'express'
import { container } from 'tsyringe'
import { sendForgotPasswordMailUseCaser } from './sendForgotPasswordMailUseCase'



class SendForgotPasswordMailController {

    async handle(request:Request, response:Response):Promise<Response>{
        const {email} = request.body

        const sendForgotPasswordUseCase = container.resolve(sendForgotPasswordMailUseCaser)

        const recovery = sendForgotPasswordUseCase.execute(email)

        return response.status(200).json()
    }


}

export { SendForgotPasswordMailController }