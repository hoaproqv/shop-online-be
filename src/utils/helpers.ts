import { NextFunction, Request, Response } from 'express'

const utilsHelper = {
  sendResponse: {},
  AppError: {},
  catchAsync: {}
}

utilsHelper.sendResponse = (
  res: Response,
  status: number,
  success: string,
  data: object,
  errors: null,
  message: string
) => {
  const response = {
    success: '',
    data: {},
    errors: null,
    message: ''
  }
  if (success) response.success = success
  if (data) response.data = data
  if (errors) response.errors = errors
  if (message) response.message = message

  return res.status(status).json(response)
}
// eslint-disable-next-line @typescript-eslint/ban-types
utilsHelper.catchAsync = (func: Function) => (req: Request, res: Response, next: NextFunction) =>
  func(req, res, next).catch((err: Error) => next(err))

class AppError extends Error {
  public statusCode: number
  public errorType: string
  public isOperational: boolean
  constructor(statusCode: number, message: string, errorType: string) {
    super(message)
    this.statusCode = statusCode
    this.errorType = errorType
    this.isOperational = true
  }
}

utilsHelper.AppError = AppError
