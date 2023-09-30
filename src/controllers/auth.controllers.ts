import { NextFunction, Request, Response } from 'express'
import User from '../models/database/User'
import utilsHelper from '~/utils/helpers'
import bcrypt from 'bcryptjs'
const { AppError, sendResponse, catchAsync } = utilsHelper

export const register = catchAsync(
  async (
    req: Request<object, object, { name: string; role: string; email: string; password: string }>,
    res: Response,
    next: NextFunction
  ) => {
    //Get data from request
    const { name, email, password } = req.body
    //Validation
    const checkExistEmail = await User.findOne({ email })
    if (checkExistEmail) throw new AppError(400, 'Email already exists', 'Registration Error')
    //Process
    const salt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash(password, salt)
    const newUser = await User.create({ name, role: 'registered', email, password: newPassword })
    const accessToken = await newUser.generateToken()
    //Response
    sendResponse(res, 200, true, { newUser, accessToken }, null, 'Create User successful')
  }
)

export const login = catchAsync(
  async (req: Request<object, object, { email: string; password: string }>, res: Response, next: NextFunction) => {
    //Get data from request
    const { email, password } = req.body
    //Validation
    const user = await User.findOne({ email, isDeleted: false }, '+password')
    if (!user) throw new AppError(400, 'Email Incorrect', 'Login Error')
    //Process
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new AppError(400, 'Password Incorrect', 'Login Error')
    const accessToken = await user.generateToken()
    //Response
    sendResponse(res, 200, true, { user, accessToken }, null, 'Login successful')
  }
)
