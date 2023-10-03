import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  product_id: { type: String, required: true },
  quantity: { type: Number, default: 1 }
})

const Cart = mongoose.model('Cart', cartSchema)

export default Cart
