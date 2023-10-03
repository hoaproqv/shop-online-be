"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAccess = void 0;
const User_1 = __importDefault(require("../models/database/User"));
const helpers_1 = __importDefault(require("../utils/helpers"));
const { AppError, catchAsync } = helpers_1.default;
exports.adminAccess = catchAsync(async (req, res, next) => {
    //Get data from request
    const id = req.userId;
    //Validation
    const checkAdmin = await User_1.default.findOne({ _id: id, role: 'admin', isDeleted: false });
    if (!checkAdmin)
        throw new AppError(401, 'User not admin', 'Admin access error');
    next();
});
