"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.createCategory = void 0;
const helpers_1 = __importDefault(require("../utils/helpers"));
const { AppError, sendResponse, catchAsync } = helpers_1.default;
const Category_1 = __importDefault(require("../models/database/Category"));
exports.createCategory = catchAsync(async (req, res, next) => {
    //Get data from request
    const { name, description } = req.body;
    //Validation
    const checkNameCategory = await Category_1.default.findOne({ name });
    if (checkNameCategory)
        throw new AppError(401, 'Category name already exists', 'Create category error');
    //Process
    const category = await Category_1.default.create({ name, description });
    //Response
    sendResponse(res, 200, true, { category }, null, 'Create category success');
});
exports.getCategory = catchAsync(async (req, res, next) => {
    //Get data from request
    //Validation
    //Process
    const categories = await Category_1.default.find({});
    if (!categories)
        throw new AppError(401, "You don't have any category", 'Get category error');
    //Response
    sendResponse(res, 200, true, { categories }, null, 'Get category success');
});
exports.updateCategory = catchAsync(async (req, res, next) => {
    //Get data from request
    const { name, description } = req.body;
    const categoryId = req.params.id;
    //Process
    const updateCategory = await Category_1.default.findByIdAndUpdate(categoryId, { name, description }, { new: true });
    //Response
    sendResponse(res, 200, true, { updateCategory }, null, 'Update category success');
});
exports.deleteCategory = catchAsync(async (req, res, next) => {
    //Get data from request
    const categoryId = req.params.id;
    //Validation
    const checkCategory = await Category_1.default.findById(categoryId);
    if (!checkCategory)
        throw new AppError(401, 'Category not found', 'Delete category error');
    //Process
    await Category_1.default.findByIdAndDelete(categoryId);
    //Response
    sendResponse(res, 200, true, null, null, 'Delete category success');
});
