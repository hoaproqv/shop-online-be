"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./router/index"));
const helpers_1 = __importDefault(require("./utils/helpers"));
const { sendResponse, AppError } = helpers_1.default;
dotenv.config();
/**
 * App Variables
 */
const PORT = parseInt(process.env.PORT || '8000', 10);
const app = (0, express_1.default)();
/**
 * App Configuration
 */
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
/**
 * MongoDB connection
 */
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.log(err);
});
/**
 * Router
 */
app.use('/', index_1.default);
/**
 * Not found handler
 */
app.use((req, res, next) => {
    const err = new AppError(404, 'Not Found', 'Not Found Error');
    next(err);
});
/**
 * Error handler
 */
app.use((err, req, res, next) => {
    console.log('ERROR', err);
    if (err.isOperational) {
        return sendResponse(res, err.statusCode ? err.statusCode : 500, false, null, { message: err.message }, err.errorType);
    }
    else {
        return sendResponse(res, err.statusCode ? err.statusCode : 500, false, null, { message: err.message }, 'Internal Server Error');
    }
});
