"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const product_controllers_1 = require("../controllers/product.controllers");
const adminAccess_middlewares_1 = require("../middlewares/adminAccess.middlewares");
const authentication_middlewares_1 = require("../middlewares/authentication.middlewares");
const validation_middlewares_1 = require("../middlewares/validation.middlewares");
const router = express_1.default.Router();
/**
 * @route POST /products
 * @description Create a new product
 * @body {name, description, price, quantity, imageURL}
 * @access Admin only
 */
const createProductBodySchema = joi_1.default.object()
    .keys({
    name: joi_1.default.string().required(),
    category: joi_1.default.string()
        .required()
        .regex(/^[a-z0-9]{24}$/)
        .required(),
    price: joi_1.default.number().required(),
    quantity: joi_1.default.number().required(),
    imageURL: joi_1.default.string().required(),
    description: joi_1.default.string().required()
})
    .required()
    .options({ abortEarly: false });
router.post('/', authentication_middlewares_1.loginRequired, adminAccess_middlewares_1.adminAccess, (0, validation_middlewares_1.validateRequest)(createProductBodySchema, 'body'), product_controllers_1.createProduct);
/**
 * @router GET /products/:id
 * @description Get detail of product
 * @body
 * @access Public
 */
router.get('/:id', validation_middlewares_1.validatedIdParams, product_controllers_1.getProductDetail);
/**
 * @router PUT /products/:id
 * @description Update product
 * @body {name, category, description, price, quantity, imageURL}
 * @access Admin only
 */
router.put('/:id', authentication_middlewares_1.loginRequired, adminAccess_middlewares_1.adminAccess, validation_middlewares_1.validatedIdParams, product_controllers_1.updateProduct);
/**
 * @router DELETE /products/:id
 * @description Delete product
 * @body
 * @access Admin only
 */
router.delete('/:id', authentication_middlewares_1.loginRequired, adminAccess_middlewares_1.adminAccess, validation_middlewares_1.validatedIdParams, product_controllers_1.deleteProduct);
exports.default = router;
