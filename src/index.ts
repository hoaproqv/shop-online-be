import * as dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import indexRouter from './router/index'

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

app.use('/', indexRouter)

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found')
  next(err)
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).send(err.message)
})
