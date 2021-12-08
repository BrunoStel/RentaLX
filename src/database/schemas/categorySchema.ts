import { Schema } from "mongoose"


interface IcategorySchema {
    name:String,
    description:String
}


const categorySchema = new Schema<IcategorySchema>({
    name:String,
    description:String},
    {autoCreate:true, timestamps:true}
)


export { categorySchema, IcategorySchema }