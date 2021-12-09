import mongoose from 'mongoose'

const mongooseConnection = mongoose


mongooseConnection.connect('mongodb+srv://brunostel:784539126@cluster0.d0no9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')  

export { mongooseConnection }