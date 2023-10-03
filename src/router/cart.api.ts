import express from 'express'
import { createCart, getAllProductsInCart, updateQuantityInCart } from '~/controllers/cart.controllers'
import { loginRequired } from '~/middlewares/authentication.middlewares'
import { validatedIdParams } from '~/middlewares/validation.middlewares'
const router = express.Router()

/**
 * @router POST /carts
 * @description Create a new cart
 * @body {userID, productID}
 * @access Login required
 */
router.post('/', loginRequired, createCart)

/**
 * @router GET /carts
 * @description Get all product in cart of user
 * @body
 * @access Login required
 */
router.get('/', loginRequired, getAllProductsInCart)

/**
 * @router PATCH /carts
 * @description Update quantity of product in cart
 * @body {quantity, product_id}
 * @access Login required
 */
router.patch('/', loginRequired, updateQuantityInCart)

export default router
