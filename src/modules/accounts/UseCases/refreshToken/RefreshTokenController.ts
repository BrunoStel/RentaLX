import { IController } from '../../../protocols/IController'
import { IHttpRequest, IHttpResponse } from '../../../protocols/IHttp'
import { IRefreshTokenUseCase } from './protocols/IRefreshTokenUseCase'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'


class  RefreshTokenController implements IController {

    constructor(private readonly refreshTokenUseCase:IRefreshTokenUseCase){}

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {

        const token =
        httpRequest.body.token 

        // httpRequest.headers['x-acess-token'] || 
        // httpRequest.query.token

        const refresh_token = await this.refreshTokenUseCase.execute(token)

        return {
            statusCode: 200,
            body: refresh_token
            
        }
    }


}


export { RefreshTokenController }