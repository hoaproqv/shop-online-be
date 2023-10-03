"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductDetail = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/database/Product"));
const helpers_1 = __importDefault(require("../utils/helpers"));
const { AppError, sendResponse, catchAsync } = helpers_1.default;
exports.createProduct = catchAsync(async (req, res, next) => {
    //Get data from request
    const product = req.body;
    //Validation
    const checkProductName = await Product_1.default.findOne({ name: product.name, isDeleted: false });
    if (checkProductName)
        throw new AppError(401, `Product ${product.name} already exists`, 'Create product error');
    //Process
    const newProduct = await Product_1.default.create(product);
    sendResponse(res, 200, true, { newProduct }, null, 'Create product success');
    //Response
});
exports.getProductDetail = catchAsync(async (req, res, next) => {
    //Get data from request
    const productId = req.params.id;
    //Validation
    const product = await Product_1.default.findOne({ _id: productId, isDeleted: false }).populate({
        path: 'category',
        model: 'Category',
        select: 'name -_id'
    });
    if (!product)
        throw new AppError(401, `Product not found`, 'Get product detail error');
    //Response
    sendResponse(res, 200, true, { product }, null, 'Get product detail success');
});
exports.updateProduct = catchAsync(async (req, res, next) => {
    //Get data from request
    const productId = req.params.id;
    //Validation
    const product = Product_1.default.findOne({ _id: productId, isDeleted: false }).populate({
        path: 'category',
        model: 'Category'
    });
    if (!product)
        throw new AppError(401, `Product not found`, 'Get product error');
    //Process
    const updateProduct = await Product_1.default.findByIdAndUpdate(productId, { ...req.body }, { new: true });
    //Response
    sendResponse(res, 200, true, { updateProduct }, null, 'Product update success');
});
exports.deleteProduct = catchAsync(async (req, res, next) => {
    //Get data from request
    const productId = req.params.id;
    //Process
    const product = await Product_1.default.findOneAndUpdate({ _id: productId, isDeleted: false }, { isDeleted: true });
    if (!product)
        throw new AppError(401, 'Product not found', 'Delete product error');
    //Response
    sendResponse(res, 200, true, null, null, 'Delete product success');
});
