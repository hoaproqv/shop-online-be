import express from 'express'
import Joi from 'joi'
import {
  createDelivery,
  deleteDelivery,
  getDeliveriesOfUser,
  getDelivery,
  updateDeliveryStatus
} from '~/controllers/delivery.controllers'
import { adminAccess } from '~/middlewares/adminAccess.middlewares'
import { loginRequired } from '~/middlewares/authentication.middlewares'
import { validateRequest } from '~/middlewares/validation.middlewares'
const router = express.Router()

/**
 * @router POST /deliveries
 * @description Create a delivery
 * @body { address, phone_number}
 * @access Login required
 */
const createDeliveryBodySchema = Joi.object().keys({
  address: Joi.string().required(),
  phone_number: Joi.string().required()
})
router.post('/', loginRequired, validateRequest(createDeliveryBodySchema, 'body'), createDelivery)

/**
 * @router GET /deliveries
 * @description Get deliveries of user
 * @body
 * @access Login required
 */
router.get('/', loginRequired, getDeliveriesOfUser)

/**
 * @router GET /deliveries/:id
 * @description Get single delivery
 * @body
 * @access Login required
 */
router.get('/:id', loginRequired, getDelivery)

/**
 * @router Patch /deliveries
 * @description Update status of delivery
 * @body {status}
 * @access Admin only
 */
router.patch('/:id', loginRequired, adminAccess, updateDeliveryStatus)

/**
 * @router DELETE /deliveries
 * @description Delete delivery
 * @body
 * @access Admin only
 */
router.delete('/:id', loginRequired, adminAccess, deleteDelivery)

export default router
