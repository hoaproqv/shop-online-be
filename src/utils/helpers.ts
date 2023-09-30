/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from 'express'

interface UtilsHelper {
  sendResponse: (
    res: Response,
    status: number,
    success?: boolean,
    data?: any,
    errors?: any,
    message?: string
  ) => Response
  catchAsync: (func: Function) => (req: Request, res: Response, next: NextFunction) => Promise<void>
  AppError: typeof AppError
}

//Error handling

class AppError extends Error {
  public statusCode: number
  public errorType: string
  public isOperational: boolean

  constructor(statusCode: number, message: string, errorType: string) {
    super(message)
    this.statusCode = statusCode
    this.errorType = errorType
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

const utilsHelper: UtilsHelper = {
  sendResponse: (res, status, success, data, errors, message) => {
    const response: any = {}
    if (success) response.success = success
    if (data) response.data = data
    if (errors) response.errors = errors
    if (message) response.message = message
    return res.status(status).json(response)
  },
  catchAsync: (func) => (req, res, next) => func(req, res, next).catch((err: any) => next(err)),
  AppError: AppError
}

utilsHelper.AppError = AppError

export default utilsHelper
