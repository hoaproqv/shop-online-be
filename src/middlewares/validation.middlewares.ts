import { NextFunction, Request, Response } from 'express'
import Joi, { ObjectSchema } from 'joi'

export const validateRequest =
  (schema: ObjectSchema, requestType: 'body' | 'params' | 'query') =>
  (req: Request, res: Response, next: NextFunction) => {
    const validatedRequest = schema.validate(req[requestType])
    if (validatedRequest.error) {
      return res.status(400).send({
        code: 'BAD_REQUEST',
        errors: validatedRequest.error.details.map((err) => err.message)
      })
    }
    next()
  }

const idParamsSchema = Joi.object().keys({
  id: Joi.string()
    .required()
    .regex(/^[a-z0-9]{24}$/)
    .message('id must be 24 characters, a-z, 0-9')
})

export const validatedIdParams = validateRequest(idParamsSchema, 'params')
