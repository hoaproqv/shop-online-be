import { NextFunction, Request, Response } from 'express'
import Cart from '~/models/database/Cart'
import Product from '~/models/database/Product'
import utilsHelper from '~/utils/helpers'
const { AppError, sendResponse, catchAsync } = utilsHelper

export const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const product = req.body
  //Validation
  const checkProductName = await Product.findOne({ name: product.name, isDeleted: false })
  if (checkProductName) throw new AppError(401, `Product ${product.name} already exists`, 'Create product error')
  //Process
  const newProduct = await Product.create(product)
  sendResponse(res, 200, true, { newProduct }, null, 'Create product success')
  //Response
})

export const getProductDetail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const productId = req.params.id
  //Validation
  const product = await Product.findOne({ _id: productId, isDeleted: false }).populate({
    path: 'category',
    model: 'Category',
    select: 'name -_id'
  })
  if (!product) throw new AppError(401, `Product not found`, 'Get product detail error')
  //Response
  sendResponse(res, 200, true, { product }, null, 'Get product detail success')
})

export const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const productId = req.params.id
  //Validation
  const product = Product.findOne({ _id: productId, isDeleted: false }).populate({
    path: 'category',
    model: 'Category'
  })
  if (!product) throw new AppError(401, `Product not found`, 'Get product error')
  //Process
  const updateProduct = await Product.findByIdAndUpdate(productId, { ...req.body }, { new: true })
  //Response
  sendResponse(res, 200, true, { updateProduct }, null, 'Product update success')
})

export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const productId = req.params.id
  //Process
  const product = await Product.findOneAndUpdate({ _id: productId, isDeleted: false }, { isDeleted: true })
  if (!product) throw new AppError(401, 'Product not found', 'Delete product error')
  //Response
  sendResponse(res, 200, true, null, null, 'Delete product success')
})
