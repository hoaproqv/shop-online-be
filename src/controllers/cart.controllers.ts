import { NextFunction, Request, Response } from 'express'
import utilsHelper from '~/utils/helpers'
const { AppError, sendResponse, catchAsync } = utilsHelper
import Cart from '~/models/database/Cart'
import Product from '~/models/database/Product'
import { updateProduct } from './product.controllers'
import User from '~/models/database/User'

export const createCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const { product_id, quantity } = req.body
  const user_id = req.userId
  //Validation
  const user = await User.findOne({ _id: user_id, isDeleted: false })
  if (!user) throw new AppError(400, 'User not found', 'Get User Error')
  const checkProduct = await Product.findById(product_id)
  if (!checkProduct) throw new AppError(401, 'Product not exist', 'Create cart error')
  const checkCartExists = await Cart.findOne({ product_id, user_id })
  if (checkCartExists) throw new AppError(401, 'Cart already exists', 'Create cart error')
  //Process
  const cart = await Cart.create({ user_id, product_id, quantity })
  //Response
  sendResponse(res, 200, true, { cart }, null, 'Create cart success')
})

export const getAllProductsInCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const user_id = req.userId
  //validation
  const user = await User.findOne({ _id: user_id, isDeleted: false })
  if (!user) throw new AppError(400, 'User not found', 'Get User Error')
  const carts = await Cart.find({ user_id }, '-user_id -_id').populate({
    path: 'product_id',
    model: 'Product',
    select: 'name price imageURL'
  })
  if (carts.length === 0) throw new AppError(401, "Cart don't have any product", 'Get products of cart error')
  //Process
  const listProductsInCart = carts.map((item) => {
    const product: any = item.product_id
    product.quantity = item.quantity
    return product
  })
  //Response
  sendResponse(res, 200, true, { listProductsInCart }, null, 'Get products of cart success')
})

export const updateQuantityInCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const { quantity, product_id } = req.body
  const userId = req.userId
  //Validation
  const user = await User.findOne({ _id: userId, isDeleted: false })
  if (!user) throw new AppError(400, 'User not found', 'Get User Error')
  //Process
  if (quantity == 0) {
    await Cart.findOneAndDelete({ user_id: userId, product_id: product_id })
    sendResponse(res, 200, true, null, null, 'Delete product in cart')
  } else {
    const cart = await Cart.findOneAndUpdate(
      { user_id: userId, product_id: product_id },
      { quantity: quantity },
      { new: true }
    )
    if (!cart) throw new AppError(401, 'Cart not found', 'Update cart error')
    sendResponse(res, 200, true, { cart }, null, 'Update cart success')
  }
})
