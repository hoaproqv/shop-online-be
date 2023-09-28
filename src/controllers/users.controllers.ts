import { NextFunction, Request, Response } from 'express'
import User from '../models/database/User'

/**
 * @route POST api/user
 * @description Create a new user
 * @body {name, email, password}
 * @access Public
 */
export const createUser = async (
  req: Request<object, object, { name: string; role: string; email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    //Get data from request
    const { name, email, password } = req.body
    const checkExistEmail = await User.findOne({ email })
    if (checkExistEmail) throw new Error('Email already exists')

    const newUser = await User.create({ name, email, password })
    res.status(200).json(newUser)
  } catch (error) {
    next(error)
  }
}

export const getUser = async (
  req: Request<object, object, { name: string; role: string; email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json('success')
}
