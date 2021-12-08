import { Schema } from "mongoose"


interface IspecificationSchema {
    name:String,
    description:String
}


const specificationSchema = new Schema<IspecificationSchema>({
    name:String,
    description:String},
    {autoCreate:true, timestamps:true}
)


export { specificationSchema, IspecificationSchema }

//created_at: { type: Date, required: true, default: Date.now }