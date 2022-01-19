import { Router } from "express";
import { RefreshTokenController } from "../../../../modules/accounts/UseCases/refreshToken/RefreshTokenController";
import { adaptExpressRoute } from "../express adapter/express-route-adapter";
import { makeAuthenticateUserController } from "../factories/authenticateUserController-factorie";



const authenticateRoutes = Router()


const authenticateUserController = makeAuthenticateUserController()

const refreshTokenController = new RefreshTokenController()


authenticateRoutes.post("/sessions", adaptExpressRoute(authenticateUserController))


authenticateRoutes.post("/refresh-token", refreshTokenController.handle)




export {authenticateRoutes}