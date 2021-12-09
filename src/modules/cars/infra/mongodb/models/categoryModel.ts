import { mongooseConnection } from "../../../../../shared/infra/database/mongodb/mongoConnection";
import { categorySchema } from "../schemas/categorySchema";


const categoryModel = mongooseConnection.model("Categories", categorySchema,"Categories")

export { categoryModel }