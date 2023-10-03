import { NextFunction, Request, Response } from 'express'
import utilsHelper from '~/utils/helpers'
const { AppError, sendResponse, catchAsync } = utilsHelper
import Delivery from '~/models/database/Delivery'
import User from '~/models/database/User'
import Cart from '~/models/database/Cart'

export const createDelivery = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const { status, address, phone_number } = req.body
  const { userId } = req
  //Validation
  const user = await User.findOne({ _id: userId, isDeleted: false })
  if (!user) throw new AppError(400, 'User not found', 'Get User Error')
  const checkDeliveryExists = await Delivery.findOne({ user_id: userId })
  if (checkDeliveryExists) throw new AppError(401, 'Delivery already exists', 'Create Delivery Error')
  //Process
  const carts = await Cart.find({ user_id: userId }, '-user_id -_id').populate({
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
  const delivery = await (
    await Delivery.create({ status, address, phone_number, user_id: userId, listProduct: listProductsInCart })
  ).populate({ path: 'user_id', model: 'User' })
  //Response
  sendResponse(res, 200, true, { delivery }, null, 'Create delivery success')
})

export const getDeliveriesOfUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const userId = req.userId
  //Validation
  const user = await User.findOne({ _id: userId, isDeleted: false })
  if (!user) throw new AppError(400, 'User not found', 'Get User Error')
  //Process
  const delivery = Delivery.findOne({ user_id: userId })
  if (!delivery) throw new AppError(401, 'Delivery not found', 'Get Deliveries of user error')
  //Response
  sendResponse(res, 200, true, { delivery }, null, 'Get deliver success')
})

export const getDelivery = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const deliveryId = req.params.id
  //Validation
  const delivery = await Delivery.findById(deliveryId)
  if (!delivery) throw new AppError(401, 'Delivery not found', 'Get Delivery Error')
  //Response
  sendResponse(res, 200, true, { delivery }, null, 'Get delivery success')
})

export const updateDeliveryStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const deliveryId = req.params.id
  const { status } = req.body
  //Process
  const delivery = await Delivery.findByIdAndUpdate(deliveryId, { status })
  //Validation
  if (!delivery) throw new AppError(401, 'Delivery not found', 'Update Delivery Error')
  //Response
  sendResponse(res, 200, true, { delivery }, null, 'Update delivery success')
})

export const deleteDelivery = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const deliveryId = req.params.id
  //Process
  const delivery = await Delivery.findByIdAndDelete(deliveryId)
  if (!delivery) throw new AppError(401, 'Delivery not found', 'Delete Delivery Error')
  //Response
  sendResponse(res, 200, true, null, null, 'Delete delivery success')
})
