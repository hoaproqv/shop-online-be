import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true, length: 24 },
    description: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: Number, required: true },
    imageURL: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
)

productSchema.methods.toJSON = function () {
  const product = this._doc
  delete product.isDeleted
  return product
}

const Product = mongoose.model('Product', productSchema)

export default Product
