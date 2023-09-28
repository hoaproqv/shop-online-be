import mongoose from 'mongoose'

const successSchema = new mongoose.Schema({
  statusCode: { type: Number, require: true },
  message: { type: String, require: true }
})

const Success = mongoose.model('Error', successSchema)

export default Success
