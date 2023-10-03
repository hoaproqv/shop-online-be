import express from 'express'
import Joi from 'joi'
import { createCategory, deleteCategory, getCategory, updateCategory } from '~/controllers/category.controllers'
import { adminAccess } from '~/middlewares/adminAccess.middlewares'
import { loginRequired } from '~/middlewares/authentication.middlewares'
import { validateRequest, validatedIdParams } from '~/middlewares/validation.middlewares'
const router = express.Router()

/**
 * @router POST /category
 * @description Create a new category
 * @body {name, description}
 * @access Admin only
 */
router.post('/', loginRequired, adminAccess, createCategory)

/**
 * @router GET /category
 * @description Get all categories
 * @body
 * @access Public
 */
router.get('/', getCategory)

/**
 * @router PUT /category/:id
 * @description Update a category
 * @body {name, description}
 * @access Admin only
 */

const updateCategoryBodySchema = Joi.object().keys({
  name: Joi.string(),
  description: Joi.string()
})

router.put(
  '/:id',
  loginRequired,
  adminAccess,
  validatedIdParams,
  validateRequest(updateCategoryBodySchema, 'body'),
  updateCategory
)

/**
 * @router DELETE /category/:id
 * @description Delete a category
 * @body
 * @access Admin only
 */
router.delete('/:id', loginRequired, adminAccess, validatedIdParams, deleteCategory)

export default router
