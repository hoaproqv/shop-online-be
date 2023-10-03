"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controllers_1 = require("../controllers/cart.controllers");
const authentication_middlewares_1 = require("../middlewares/authentication.middlewares");
const router = express_1.default.Router();
/**
 * @router POST /carts
 * @description Create a new cart
 * @body {userID, productID}
 * @access Login required
 */
router.post('/', authentication_middlewares_1.loginRequired, cart_controllers_1.createCart);
/**
 * @router GET /carts
 * @description Get all product in cart of user
 * @body
 * @access Login required
 */
router.get('/', authentication_middlewares_1.loginRequired, cart_controllers_1.getAllProductsInCart);
/**
 * @router PATCH /carts
 * @description Update quantity of product in cart
 * @body {quantity, product_id}
 * @access Login required
 */
router.patch('/', authentication_middlewares_1.loginRequired, cart_controllers_1.updateQuantityInCart);
exports.default = router;
