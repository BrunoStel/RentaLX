import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationRoutes } from "./specification.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);

router.use("/specifications", specificationRoutes);

router.use("/users", userRoutes);

router.use(authenticateRoutes)

router.use("/cars", carsRoutes)

router.use("/rentals", rentalsRoutes)

router.use("/password", passwordRoutes)

router.use("/healthy", (req, res)=> { return res.sendStatus(200)})

export { router };
