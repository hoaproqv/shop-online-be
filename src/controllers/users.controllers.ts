import { NextFunction, Request, Response } from 'express'
import User from '../models/database/User'
import utilsHelper from '~/utils/helpers'

const { AppError, sendResponse, catchAsync } = utilsHelper

export const getUser = async (req: Request<object, object, { email: string }>, res: Response, next: NextFunction) => {
  // Get data from request
  const { email } = req.body
  // Check email

  const user = await User.findOne({ email })
  if (!user) throw new AppError(400, 'User not found', 'Get user Error')

  sendResponse(res, 200, true, { user }, null, 'Get user success')
}
