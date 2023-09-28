import mongoose from 'mongoose'

const deliverySchema = new mongoose.Schema(
  {
    user: { type: String, require: true },
    cart: { type: String, require: true },
    status: { type: String, require: true, enum: ['created', 'delivered', 'success', 'return', 'cancel'] },
    address: { type: String, require: true },
    contact_number: { type: Number, require: true }
  },
  {
    timestamps: true
  }
)

const Delivery = mongoose.model('Delivery', deliverySchema)

export default Delivery
