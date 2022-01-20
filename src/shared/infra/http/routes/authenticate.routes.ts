import { Router } from "express";
import { adaptExpressRoute } from "../express adapter/express-route-adapter";
import { makeAuthenticateUserController } from "../factories/authenticateUserController-factorie";
import { makeRefreshTokenController } from "../factories/refreshTokenController-factorie";



const authenticateRoutes = Router()


const authenticateUserController = makeAuthenticateUserController()

const refreshTokenController = makeRefreshTokenController()


authenticateRoutes.post("/sessions", adaptExpressRoute(authenticateUserController))


authenticateRoutes.post("/refresh-token", adaptExpressRoute(refreshTokenController))




export {authenticateRoutes}