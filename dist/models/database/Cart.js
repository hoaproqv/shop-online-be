"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    quantity: { type: Number, default: 1 }
});
const Cart = mongoose_1.default.model('Cart', cartSchema);
exports.default = Cart;
