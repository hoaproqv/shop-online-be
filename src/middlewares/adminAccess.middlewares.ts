import { NextFunction, Request, Response } from 'express'
import User from '~/models/database/User'
import utilsHelper from '~/utils/helpers'
const { AppError, catchAsync } = utilsHelper

export const adminAccess = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //Get data from request
  const id = req.userId
  //Validation
  const checkAdmin = await User.findOne({ _id: id, role: 'admin', isDeleted: false })
  if (!checkAdmin) throw new AppError(401, 'User not admin', 'Admin access error')
  next()
})
