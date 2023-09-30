import { Response, Request, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import utilsHelper from '~/utils/helpers'
const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY as Secret
const { AppError } = utilsHelper

export const loginRequired = (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenString = req.headers.authorization
    if (!tokenString) throw new AppError(401, 'Login required', 'Authentication Error')
    const token = tokenString.replace('Bearer ', '')
    jwt.verify(token, JWT_SECRET_KEY, (err: any, payload: any) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new AppError(401, 'Token expired', 'Authentication Error')
        } else {
          throw new AppError(401, 'Token is invalid', 'Authentication Error')
        }
      }
      req.userId = payload._id
    })
    next()
  } catch (error) {
    next(error)
  }
}
