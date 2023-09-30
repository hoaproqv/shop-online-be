import express from 'express'
const router = express.Router()

//authApi
import authApi from './auth.api'
router.use('/auth', authApi)

//userApi
import userApi from './user.api'
router.use('/users', userApi)

//productApi
import product from './product.api'
router.use('/products', product)

//cartApi
import cartApi from './cart.api'
router.use('/carts', cartApi)

//categoryApi
import categoryApi from './category.api'
router.use('/categories', categoryApi)

//deliveryApi
import deliveryApi from './delivery.api'
router.use('/deliveries', deliveryApi)

export default router
