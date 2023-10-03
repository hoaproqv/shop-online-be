import { NextFunction, Request, Response } from 'express'
import utilsHelper from '~/utils/helpers'
const { AppError, sendResponse, catchAsync } = utilsHelper
import Category from '~/models/database/Category'

export const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const { name, description } = req.body
  //Validation
  const checkNameCategory = await Category.findOne({ name })
  if (checkNameCategory) throw new AppError(401, 'Category name already exists', 'Create category error')
  //Process
  const category = await Category.create({ name, description })
  //Response
  sendResponse(res, 200, true, { category }, null, 'Create category success')
})

export const getCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  //Validation
  //Process
  const categories = await Category.find({})
  if (!categories) throw new AppError(401, "You don't have any category", 'Get category error')
  //Response
  sendResponse(res, 200, true, { categories }, null, 'Get category success')
})

export const updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const { name, description } = req.body
  const categoryId = req.params.id
  //Process
  const updateCategory = await Category.findByIdAndUpdate(categoryId, { name, description }, { new: true })
  //Response
  sendResponse(res, 200, true, { updateCategory }, null, 'Update category success')
})

export const deleteCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const categoryId = req.params.id
  //Validation
  const checkCategory = await Category.findById(categoryId)
  if (!checkCategory) throw new AppError(401, 'Category not found', 'Delete category error')
  //Process
  await Category.findByIdAndDelete(categoryId)
  //Response
  sendResponse(res, 200, true, null, null, 'Delete category success')
})
