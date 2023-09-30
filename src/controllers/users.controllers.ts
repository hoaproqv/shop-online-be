import { NextFunction, Request, Response } from 'express'
import User from '../models/database/User'
import utilsHelper from '~/utils/helpers'
import bcrypt from 'bcryptjs'
const { AppError, sendResponse, catchAsync } = utilsHelper

export const getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Get data from request
  const id = req.userId
  // Validation
  const user = await User.findOne({ _id: id, isDeleted: false })
  if (!user) throw new AppError(400, 'User not found', 'Get User Error')
  //Response
  sendResponse(res, 200, true, { user }, null, 'Get User success')
})

export const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const { name, password, newPassword } = req.body
  const id = req.userId
  //Validation
  const user = await User.findOne({ _id: id, isDeleted: false }, '+password')
  if (!user) throw new AppError(400, 'User not found', 'Update User Error')
  interface DataUpdate {
    name?: string
    password?: string
  }
  const dataUpdate: DataUpdate = {}
  if (name) dataUpdate.name = name
  if (password && newPassword) {
    if (password === newPassword) throw new AppError(401, 'You have used this password', 'Update User Error')
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const salt = await bcrypt.genSalt(10)
      const updatePassword = await bcrypt.hash(newPassword, salt)
      dataUpdate.password = updatePassword
    } else {
      throw new AppError(401, 'Password Incorrect', 'Update User Error')
    }
  }
  //Process
  const updateUser = await User.findOneAndUpdate({ _id: id, isDeleted: false }, dataUpdate, { new: true })
  //Response
  sendResponse(res, 200, true, { updateUser }, null, 'Update User success')
})

export const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const id = req.userId
  //Validation
  const user = await User.findOne({ _id: id, isDeleted: false })
  if (!user) throw new AppError(400, 'User not found', 'Delete User Error')
  //Process
  await User.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true })
  //Response
  sendResponse(res, 200, true, null, null, 'Delete User success')
})
