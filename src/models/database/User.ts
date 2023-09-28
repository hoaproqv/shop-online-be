import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'guest', 'registered'] },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

// userSchema.methods.toJSON = function () {
//   const user = this._doc
//   delete user.password
//   delete user.isDeleted
// }

const User = mongoose.model('User', userSchema)

export default User
