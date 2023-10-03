"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Error handling
class AppError extends Error {
    statusCode;
    errorType;
    isOperational;
    constructor(statusCode, message, errorType) {
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
const utilsHelper = {
    sendResponse: (res, status, success, data, errors, message) => {
        const response = {};
        if (success)
            response.success = success;
        if (data)
            response.data = data;
        if (errors)
            response.errors = errors;
        if (message)
            response.message = message;
        return res.status(status).json(response);
    },
    catchAsync: (func) => (req, res, next) => func(req, res, next).catch((err) => next(err)),
    AppError: AppError
};
utilsHelper.AppError = AppError;
exports.default = utilsHelper;
