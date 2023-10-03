"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuantityInCart = exports.getAllProductsInCart = exports.createCart = void 0;
const helpers_1 = __importDefault(require("../utils/helpers"));
const { AppError, sendResponse, catchAsync } = helpers_1.default;
const Cart_1 = __importDefault(require("../models/database/Cart"));
const Product_1 = __importDefault(require("../models/database/Product"));
const User_1 = __importDefault(require("../models/database/User"));
exports.createCart = catchAsync(async (req, res, next) => {
    //Get data from request
    const { product_id, quantity } = req.body;
    const user_id = req.userId;
    //Validation
    const user = await User_1.default.findOne({ _id: user_id, isDeleted: false });
    if (!user)
        throw new AppError(400, 'User not found', 'Get User Error');
    const checkProduct = await Product_1.default.findById(product_id);
    if (!checkProduct)
        throw new AppError(401, 'Product not exist', 'Create cart error');
    const checkCartExists = await Cart_1.default.findOne({ product_id, user_id });
    if (checkCartExists)
        throw new AppError(401, 'Cart already exists', 'Create cart error');
    //Process
    const cart = await Cart_1.default.create({ user_id, product_id, quantity });
    //Response
    sendResponse(res, 200, true, { cart }, null, 'Create cart success');
});
exports.getAllProductsInCart = catchAsync(async (req, res, next) => {
    //Get data from request
    const user_id = req.userId;
    //validation
    const user = await User_1.default.findOne({ _id: user_id, isDeleted: false });
    if (!user)
        throw new AppError(400, 'User not found', 'Get User Error');
    const carts = await Cart_1.default.find({ user_id }, '-user_id -_id').populate({
        path: 'product_id',
        model: 'Product',
        select: 'name price imageURL'
    });
    if (carts.length === 0)
        throw new AppError(401, "Cart don't have any product", 'Get products of cart error');
    //Process
    const listProductsInCart = carts.map((item) => {
        const product = item.product_id;
        product.quantity = item.quantity;
        return product;
    });
    //Response
    sendResponse(res, 200, true, { listProductsInCart }, null, 'Get products of cart success');
});
exports.updateQuantityInCart = catchAsync(async (req, res, next) => {
    //Get data from request
    const { quantity, product_id } = req.body;
    const userId = req.userId;
    //Validation
    const user = await User_1.default.findOne({ _id: userId, isDeleted: false });
    if (!user)
        throw new AppError(400, 'User not found', 'Get User Error');
    //Process
    if (quantity == 0) {
        await Cart_1.default.findOneAndDelete({ user_id: userId, product_id: product_id });
        sendResponse(res, 200, true, null, null, 'Delete product in cart');
    }
    else {
        const cart = await Cart_1.default.findOneAndUpdate({ user_id: userId, product_id: product_id }, { quantity: quantity }, { new: true });
        if (!cart)
            throw new AppError(401, 'Cart not found', 'Update cart error');
        sendResponse(res, 200, true, { cart }, null, 'Update cart success');
    }
});
