import * as dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import indexRouter from './router/index'
import utilHelper from './utils/helpers'

const { sendResponse, AppError } = utilHelper

dotenv.config()

/**
 * App Variables
 */
const PORT: number = parseInt((process.env.PORT as string) || '8000', 10)

const app = express()

/**
 * App Configuration
 */
app.use(helmet())
app.use(cors())
app.use(express.json())

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
/**
 * MongoDB connection
 */
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })

/**
 * Router
 */
app.use('/', indexRouter)

/**
 * Not found handler
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(404, 'Not Found', 'Not Found Error')
  next(err)
})

/**
 * Error handler
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('ERROR', err)
  if (err.isOperational) {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      { message: err.message },
      err.errorType
    )
  } else {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      { message: err.message },
      'Internal Server Error'
    )
  }
})
