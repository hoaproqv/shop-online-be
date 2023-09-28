"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_api_1 = __importDefault(require("./user.api"));
const product_api_1 = __importDefault(require("./product.api"));
const cart_api_1 = __importDefault(require("./cart.api"));
const category_api_1 = __importDefault(require("./category.api"));
const delivery_api_1 = __importDefault(require("./delivery.api"));
router.use('/user', user_api_1.default);
router.use('/product', product_api_1.default);
router.use('/cart', cart_api_1.default);
router.use('/category', category_api_1.default);
router.use('/delivery', delivery_api_1.default);
exports.default = router;
