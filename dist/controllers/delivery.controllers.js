"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDelivery = exports.updateDeliveryStatus = exports.getDelivery = exports.getDeliveriesOfUser = exports.createDelivery = void 0;
const helpers_1 = __importDefault(require("../utils/helpers"));
const { AppError, sendResponse, catchAsync } = helpers_1.default;
const Delivery_1 = __importDefault(require("../models/database/Delivery"));
const User_1 = __importDefault(require("../models/database/User"));
const Cart_1 = __importDefault(require("../models/database/Cart"));
exports.createDelivery = catchAsync(async (req, res, next) => {
    //Get data from request
    const { status, address, phone_number } = req.body;
    const { userId } = req;
    //Validation
    const user = await User_1.default.findOne({ _id: userId, isDeleted: false });
    if (!user)
        throw new AppError(400, 'User not found', 'Get User Error');
    const checkDeliveryExists = await Delivery_1.default.findOne({ user_id: userId });
    if (checkDeliveryExists)
        throw new AppError(401, 'Delivery already exists', 'Create Delivery Error');
    //Process
    const carts = await Cart_1.default.find({ user_id: userId }, '-user_id -_id').populate({
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
    const delivery = await (await Delivery_1.default.create({ status, address, phone_number, user_id: userId, listProduct: listProductsInCart })).populate({ path: 'user_id', model: 'User' });
    //Response
    sendResponse(res, 200, true, { delivery }, null, 'Create delivery success');
});
exports.getDeliveriesOfUser = catchAsync(async (req, res, next) => {
    //Get data from request
    const userId = req.userId;
    //Validation
    const user = await User_1.default.findOne({ _id: userId, isDeleted: false });
    if (!user)
        throw new AppError(400, 'User not found', 'Get User Error');
    //Process
    const delivery = Delivery_1.default.findOne({ user_id: userId });
    if (!delivery)
        throw new AppError(401, 'Delivery not found', 'Get Deliveries of user error');
    //Response
    sendResponse(res, 200, true, { delivery }, null, 'Get deliver success');
});
exports.getDelivery = catchAsync(async (req, res, next) => {
    //Get data from request
    const deliveryId = req.params.id;
    //Validation
    const delivery = await Delivery_1.default.findById(deliveryId);
    if (!delivery)
        throw new AppError(401, 'Delivery not found', 'Get Delivery Error');
    //Response
    sendResponse(res, 200, true, { delivery }, null, 'Get delivery success');
});
exports.updateDeliveryStatus = catchAsync(async (req, res, next) => {
    //Get data from request
    const deliveryId = req.params.id;
    const { status } = req.body;
    //Process
    const delivery = await Delivery_1.default.findByIdAndUpdate(deliveryId, { status });
    //Validation
    if (!delivery)
        throw new AppError(401, 'Delivery not found', 'Update Delivery Error');
    //Response
    sendResponse(res, 200, true, { delivery }, null, 'Update delivery success');
});
exports.deleteDelivery = catchAsync(async (req, res, next) => {
    //Get data from request
    const deliveryId = req.params.id;
    //Process
    const delivery = await Delivery_1.default.findByIdAndDelete(deliveryId);
    if (!delivery)
        throw new AppError(401, 'Delivery not found', 'Delete Delivery Error');
    //Response
    sendResponse(res, 200, true, null, null, 'Delete delivery success');
});
