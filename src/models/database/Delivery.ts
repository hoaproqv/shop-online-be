import mongoose from 'mongoose'

const deliverySchema = new mongoose.Schema({
  user_id: { type: String, require: true },
  status: {
    type: String,
    enum: ['created', 'delivered', 'success', 'return', 'cancel'],
    default: 'created'
  },
  address: { type: String, require: true },
  contact_number: { type: Number, require: true }
})

const Delivery = mongoose.model('Delivery', deliverySchema)

export default Delivery
