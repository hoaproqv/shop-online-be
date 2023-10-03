"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//authApi
const auth_api_1 = __importDefault(require("./auth.api"));
router.use('/auth', auth_api_1.default);
//userApi
const user_api_1 = __importDefault(require("./user.api"));
router.use('/users', user_api_1.default);
//productApi
const product_api_1 = __importDefault(require("./product.api"));
router.use('/products', product_api_1.default);
//cartApi
const cart_api_1 = __importDefault(require("./cart.api"));
router.use('/carts', cart_api_1.default);
//categoryApi
const category_api_1 = __importDefault(require("./category.api"));
router.use('/categories', category_api_1.default);
//deliveryApi
const delivery_api_1 = __importDefault(require("./delivery.api"));
router.use('/deliveries', delivery_api_1.default);
exports.default = router;
