import { mongooseConnection } from "../mongoConnection";
import { categorySchema } from "../schemas/categorySchema";


const categoryModel = mongooseConnection.model("Categories", categorySchema,"Categories")

export { categoryModel }