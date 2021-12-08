import { mongooseConnection } from "../mongoConnection";
import { specificationSchema } from "../schemas/specificationSchema";

const specificationModel = mongooseConnection.model("Specifications", specificationSchema,"Specifications")

export { specificationModel }