"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = __importDefault(require("../utils/helpers"));
const { AppError, catchAsync } = helpers_1.default;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
exports.loginRequired = catchAsync(async (req, res, next) => {
    const tokenString = req.headers.authorization;
    if (!tokenString)
        throw new AppError(401, 'Login required', 'Authentication Error');
    const token = tokenString.replace('Bearer ', '');
    jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                throw new AppError(401, 'Token expired', 'Authentication Error');
            }
            else {
                throw new AppError(401, 'Token is invalid', 'Authentication Error');
            }
        }
        req.userId = payload._id;
    });
    next();
});
