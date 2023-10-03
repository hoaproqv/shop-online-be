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
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'registered'] },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isDeleted: { type: Boolean, default: false, select: false }
}, {
    timestamps: true
});
userSchema.methods.toJSON = function () {
    const user = this._doc;
    delete user.role;
    delete user.password;
    delete user.isDeleted;
    return user;
};
userSchema.methods.generateToken = async function () {
    const accessToken = await jsonwebtoken_1.default.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: '1d' });
    return accessToken;
};
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
