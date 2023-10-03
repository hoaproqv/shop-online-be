"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedIdParams = exports.validateRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const validateRequest = (schema, requestType) => (req, res, next) => {
    const validatedRequest = schema.validate(req[requestType]);
    if (validatedRequest.error) {
        return res.status(400).send({
            code: 'BAD_REQUEST',
            errors: validatedRequest.error.details.map((err) => err.message)
        });
    }
    next();
};
exports.validateRequest = validateRequest;
const idParamsSchema = joi_1.default.object().keys({
    id: joi_1.default.string()
        .required()
        .regex(/^[a-z0-9]{24}$/)
        .message('id must be 24 characters, a-z, 0-9')
});
exports.validatedIdParams = (0, exports.validateRequest)(idParamsSchema, 'params');
