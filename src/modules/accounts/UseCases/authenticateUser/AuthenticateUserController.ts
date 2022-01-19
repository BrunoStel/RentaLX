import { IController } from "../../../protocols/IController";
import { IHttpRequest, IHttpResponse } from "../../../protocols/IHttp";
import { IAuthenticateUserUseCase } from "./protocols/IAuthenticateUserUseCase";


class AuthenticateUserController implements IController{

    constructor (private readonly authenticateUserUseCase: IAuthenticateUserUseCase){}

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        const {username, password} = httpRequest.body

        const token = await this.authenticateUserUseCase.execute({username, password})

        return {
            statusCode: 200,
            body: {
                token
            }
        }
    }


}


export{AuthenticateUserController}