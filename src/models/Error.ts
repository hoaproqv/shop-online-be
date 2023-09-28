import mongoose from 'mongoose'

const errorSchema = new mongoose.Schema({
  statusCode: { type: Number, require: true },
  message: { type: String, require: true }
})

const Error = mongoose.model('Error', errorSchema)

export default Error
