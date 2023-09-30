import express from 'express'
const router = express.Router()
import { deleteUser, getUser, updateUser } from '../controllers/users.controllers'
import Joi from 'joi'
import { validateRequest } from '~/middlewares/validation.middlewares'
import { loginRequired } from '~/middlewares/authentication.middlewares'

/**
 * @router GET /users/me
 * @description Get current user
 * @body {email}
 * @access Login required
 */

router.get('/me', loginRequired, getUser)

/**
 * @router PUT /users/me
 * @description Update current user
 * @body {name, email, password, newPassword}
 * @access Login required
 */
const updateUserRequestBodySchema = Joi.object({
  name: Joi.string(),
  password: Joi.string().min(5).message('Password must be at least 5 characters'),
  newPassword: Joi.string().min(5).message('New password must be at least 5 characters')
}).options({ abortEarly: false })

router.put('/me', loginRequired, validateRequest(updateUserRequestBodySchema, 'body'), updateUser)

router.delete('/me', loginRequired, deleteUser)

export default router
