import { Request, Response } from "express"
import { container } from "tsyringe"
import { ResetPasswordUseCase } from "./ResetPasswordUseCase"


class ResetPasswordController {

    async handle (request:Request, response:Response) : Promise<Response>{
        const {token} = request.query

        const {password} = request.body

        const resetPasswordUseCaser = container.resolve(ResetPasswordUseCase)

        await resetPasswordUseCaser.execute({password, token: String(token)})

        return response.status(200).send()

    }





}

export {ResetPasswordController}