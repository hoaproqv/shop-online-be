import mongoose from 'mongoose'

const deliverySchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  status: {
    type: String,
    enum: ['created', 'delivered', 'success', 'return', 'cancel'],
    default: 'created'
  },
  address: { type: String, require: true },
  phone_number: { type: Number, require: true },
  listProduct: { type: Array }
})

const Delivery = mongoose.model('Delivery', deliverySchema)

export default Delivery
