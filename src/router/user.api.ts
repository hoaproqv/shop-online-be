import express from 'express'
const router = express.Router()
import { createUser, getUser } from '../controllers/users.controllers'
import Joi from 'joi'
import { validateRequest, validatedIdParams } from '~/middlewares/validation.middlewares'

const createUserRequestBodySchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    role: Joi.string().required().valid('admin', 'guest', 'registered'),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
  .required()
  .options({ abortEarly: false })

router.post('/', validateRequest(createUserRequestBodySchema, 'body'), createUser)

router.get('/me', validatedIdParams, getUser)

const updateUserRequestBodySchema = Joi.object()
  .keys({
    name: Joi.string(),
    role: Joi.string().valid('admin', 'guest', 'registered'),
    email: Joi.string(),
    password: Joi.string()
  })
  .options({ abortEarly: false })

router.put('/me', validatedIdParams, validateRequest(updateUserRequestBodySchema, 'body'), updateUser)

router.delete('/me', validatedIdParams, deleteUser)

export default router
