import { Request, Response } from "express";
import { IController } from "../../../protocols/IController";
import { IHttpRequest, IHttpResponse } from "../../../protocols/IHttp";
import { IListUsersUseCase } from "./protocols/IListUsersUseCase";



class ListUsersController implements IController{

    constructor(private readonly listUsersUseCase: IListUsersUseCase){}

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {

        const users = await this.listUsersUseCase.execute()

        return {
            statusCode: 200,
            body: users
        }
    }

}

export { ListUsersController }