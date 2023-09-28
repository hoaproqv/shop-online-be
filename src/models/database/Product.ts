import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true, length: 24 },
    description: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
