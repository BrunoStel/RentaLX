import { Request, RequestHandler, Response } from 'express'
import { IController } from '../../../../modules/protocols/IController'
import { IHttpRequest } from '../../../../modules/protocols/IHttp'


export const adaptExpressRoute = (controller: IController): RequestHandler => {
  return async (request: Request, response: Response) => {
    const httpRequest: IHttpRequest = {
      body: request.body
    }
    const httpResponse = await controller.handle(httpRequest)

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
