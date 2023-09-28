import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
  {
    user: { type: String, require: true }
  },
  { timestamps: true }
)

const Cart = mongoose.model('Cart', cartSchema)

export default Cart
