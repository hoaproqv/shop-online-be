"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, length: 24 },
    description: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: Number, required: true },
    imageURL: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });
productSchema.methods.toJSON = function () {
    const product = this._doc;
    delete product.isDeleted;
    return product;
};
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
