import mongoose, { Document, Schema } from 'mongoose'
import jwt, { Secret } from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY as Secret

interface IDUser extends Document {
  name: string
  role: string
  email: string
  password: string
  isDeleted: boolean
  generateToken: () => Promise<string>
}

const userSchema: Schema<IDUser> = new mongoose.Schema<IDUser>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'guest', 'registered'] },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isDeleted: { type: Boolean, default: false, select: false }
  },
  {
    timestamps: true
  }
)

userSchema.methods.toJSON = function () {
  const user = this._doc
  delete user.password
  delete user.isDeleted
  return user
}

userSchema.methods.generateToken = async function () {
  const accessToken: string = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: '1d' })
  return accessToken
}

const User = mongoose.model('User', userSchema)

export default User
