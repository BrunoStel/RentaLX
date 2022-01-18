import { container } from "tsyringe";
import { IController } from "../../../protocols/IController";
import { IHttpRequest, IHttpResponse } from "../../../protocols/IHttp";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController implements IController {

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const { name, password, username, email, driver_license } = httpRequest.body;

        const  createUserUseCase = container.resolve(CreateUserUseCase)

        await createUserUseCase.execute({ name, password, username, email, driver_license});

        return {
            statusCode: 200,
            body: {
                Message: `User ${name} registered with success`
            }
        }
    }
}

export { CreateUserController };

