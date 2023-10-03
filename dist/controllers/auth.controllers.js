"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/database/User"));
const helpers_1 = __importDefault(require("../utils/helpers"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { AppError, sendResponse, catchAsync } = helpers_1.default;
exports.register = catchAsync(async (req, res, next) => {
    //Get data from request
    const { name, email, password } = req.body;
    //Validation
    const checkExistEmail = await User_1.default.findOne({ email });
    if (checkExistEmail)
        throw new AppError(400, 'Email already exists', 'Registration Error');
    //Process
    const salt = await bcryptjs_1.default.genSalt(10);
    const newPassword = await bcryptjs_1.default.hash(password, salt);
    const newUser = await User_1.default.create({ name, role: 'registered', email, password: newPassword });
    const accessToken = await newUser.generateToken();
    //Response
    sendResponse(res, 200, true, { newUser, accessToken }, null, 'Create User successful');
});
exports.login = catchAsync(async (req, res, next) => {
    //Get data from request
    const { email, password } = req.body;
    //Validation
    const user = await User_1.default.findOne({ email, isDeleted: false }, '+password');
    if (!user)
        throw new AppError(400, 'Email Incorrect', 'Login Error');
    //Process
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new AppError(400, 'Password Incorrect', 'Login Error');
    const accessToken = await user.generateToken();
    //Response
    sendResponse(res, 200, true, { user, accessToken }, null, 'Login successful');
});
