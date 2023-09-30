import express from 'express'
import Joi from 'joi'
import { login, register } from '~/controllers/auth.controllers'
import { validateRequest } from '~/middlewares/validation.middlewares'
const router = express.Router()

/**
 * @route POST /auth/register
 * @description Register in with name, email and password
 * @body {name, email, password}
 * @access Public
 */
const registerRequestBodySchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5)
  })
  .required()
  .options({ abortEarly: false })

router.post('/register', validateRequest(registerRequestBodySchema, 'body'), register)

/**
 * @route POST /auth/login
 * @description Log in with email and password
 * @body {email, password}
 * @access Public
 */
const loginRequestBodySchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})
router.post('/login', validateRequest(loginRequestBodySchema, 'body'), login)

export default router
