"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const deliverySchema = new mongoose_1.default.Schema({
    user_id: { type: String, required: true },
    status: {
        type: String,
        enum: ['created', 'delivered', 'success', 'return', 'cancel'],
        default: 'created'
    },
    address: { type: String, require: true },
    phone_number: { type: Number, require: true },
    listProduct: { type: Array }
});
const Delivery = mongoose_1.default.model('Delivery', deliverySchema);
exports.default = Delivery;
