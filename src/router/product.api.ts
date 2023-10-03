import express from 'express'
import Joi from 'joi'
import { createProduct, deleteProduct, getProductDetail, updateProduct } from '~/controllers/product.controllers'
import { adminAccess } from '~/middlewares/adminAccess.middlewares'
import { loginRequired } from '~/middlewares/authentication.middlewares'
import { validateRequest, validatedIdParams } from '~/middlewares/validation.middlewares'
const router = express.Router()

/**
 * @route POST /products
 * @description Create a new product
 * @body {name, description, price, quantity, imageURL}
 * @access Admin only
 */
const createProductBodySchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    category: Joi.string()
      .required()
      .regex(/^[a-z0-9]{24}$/)
      .required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    imageURL: Joi.string().required(),
    description: Joi.string().required()
  })
  .required()
  .options({ abortEarly: false })
router.post('/', loginRequired, adminAccess, validateRequest(createProductBodySchema, 'body'), createProduct)

/**
 * @router GET /products/:id
 * @description Get detail of product
 * @body
 * @access Public
 */
router.get('/:id', validatedIdParams, getProductDetail)

/**
 * @router PUT /products/:id
 * @description Update product
 * @body {name, category, description, price, quantity, imageURL}
 * @access Admin only
 */
router.put('/:id', loginRequired, adminAccess, validatedIdParams, updateProduct)

/**
 * @router DELETE /products/:id
 * @description Delete product
 * @body
 * @access Admin only
 */
router.delete('/:id', loginRequired, adminAccess, validatedIdParams, deleteProduct)

export default router
