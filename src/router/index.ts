import express from 'express'
const router = express.Router()
import users from './user.api'
import products from './product.api'
import carts from './cart.api'
import category from './category.api'
import delivery from './delivery.api'
import auth from './auth.api'

router.use('/auth', auth)

router.use('/user', users)

router.use('/product', products)

router.use('/cart', carts)

router.use('/category', category)

router.use('/delivery', delivery)

export default router
