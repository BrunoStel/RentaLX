import { IController } from "../../../protocols/IController";
import { IHttpRequest, IHttpResponse } from "../../../protocols/IHttp";
import { ICreateUserUseCase } from "./protocols/ICreateUser";

class CreateUserController implements IController {

    constructor(private readonly createUserUseCase: ICreateUserUseCase){}

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const { name, password, username, email, driver_license } = httpRequest.body;

        await this.createUserUseCase.execute({ name, password, username, email, driver_license});

        return {
            statusCode: 200,
            body: {
                Message: `User ${name} registered with success`
            }
        }
    }
}

export { CreateUserController };

