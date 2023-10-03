"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/database/User"));
const helpers_1 = __importDefault(require("../utils/helpers"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { AppError, sendResponse, catchAsync } = helpers_1.default;
exports.getUser = catchAsync(async (req, res, next) => {
    // Get data from request
    const id = req.userId;
    // Validation
    const user = await User_1.default.findOne({ _id: id, isDeleted: false });
    if (!user)
        throw new AppError(400, 'User not found', 'Get User Error');
    //Response
    sendResponse(res, 200, true, { user }, null, 'Get User success');
});
exports.updateUser = catchAsync(async (req, res, next) => {
    //Get data from request
    const { name, password, newPassword } = req.body;
    const id = req.userId;
    //Validation
    const user = await User_1.default.findOne({ _id: id, isDeleted: false }, '+password');
    if (!user)
        throw new AppError(400, 'User not found', 'Update User Error');
    const dataUpdate = {};
    if (name)
        dataUpdate.name = name;
    if (password && newPassword) {
        if (password === newPassword)
            throw new AppError(401, 'You have used this password', 'Update User Error');
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (isMatch) {
            const salt = await bcryptjs_1.default.genSalt(10);
            const updatePassword = await bcryptjs_1.default.hash(newPassword, salt);
            dataUpdate.password = updatePassword;
        }
        else {
            throw new AppError(401, 'Password Incorrect', 'Update User Error');
        }
    }
    //Process
    const updateUser = await User_1.default.findOneAndUpdate({ _id: id, isDeleted: false }, dataUpdate, { new: true });
    //Response
    sendResponse(res, 200, true, { updateUser }, null, 'Update User success');
});
exports.deleteUser = catchAsync(async (req, res, next) => {
    //Get data from request
    const id = req.userId;
    //Validation
    const user = await User_1.default.findOne({ _id: id, isDeleted: false });
    if (!user)
        throw new AppError(400, 'User not found', 'Delete User Error');
    //Process
    await User_1.default.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true });
    //Response
    sendResponse(res, 200, true, null, null, 'Delete User success');
});
