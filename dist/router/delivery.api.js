"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const delivery_controllers_1 = require("../controllers/delivery.controllers");
const adminAccess_middlewares_1 = require("../middlewares/adminAccess.middlewares");
const authentication_middlewares_1 = require("../middlewares/authentication.middlewares");
const validation_middlewares_1 = require("../middlewares/validation.middlewares");
const router = express_1.default.Router();
/**
 * @router POST /deliveries
 * @description Create a delivery
 * @body { address, phone_number}
 * @access Login required
 */
const createDeliveryBodySchema = joi_1.default.object().keys({
    address: joi_1.default.string().required(),
    phone_number: joi_1.default.string().required()
});
router.post('/', authentication_middlewares_1.loginRequired, (0, validation_middlewares_1.validateRequest)(createDeliveryBodySchema, 'body'), delivery_controllers_1.createDelivery);
/**
 * @router GET /deliveries
 * @description Get deliveries of user
 * @body
 * @access Login required
 */
router.get('/', authentication_middlewares_1.loginRequired, delivery_controllers_1.getDeliveriesOfUser);
/**
 * @router GET /deliveries/:id
 * @description Get single delivery
 * @body
 * @access Login required
 */
router.get('/:id', authentication_middlewares_1.loginRequired, delivery_controllers_1.getDelivery);
/**
 * @router Patch /deliveries
 * @description Update status of delivery
 * @body {status}
 * @access Admin only
 */
router.patch('/:id', authentication_middlewares_1.loginRequired, adminAccess_middlewares_1.adminAccess, delivery_controllers_1.updateDeliveryStatus);
/**
 * @router DELETE /deliveries
 * @description Delete delivery
 * @body
 * @access Admin only
 */
router.delete('/:id', authentication_middlewares_1.loginRequired, adminAccess_middlewares_1.adminAccess, delivery_controllers_1.deleteDelivery);
exports.default = router;
