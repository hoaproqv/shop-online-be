"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const validation_middlewares_1 = require("../middlewares/validation.middlewares");
const router = express_1.default.Router();
/**
 * @route POST /auth/register
 * @description Register in with name, email and password
 * @body {name, email, password}
 * @access Public
 */
const registerRequestBodySchema = joi_1.default.object()
    .keys({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(5)
})
    .required()
    .options({ abortEarly: false });
router.post('/register', (0, validation_middlewares_1.validateRequest)(registerRequestBodySchema, 'body'), auth_controllers_1.register);
/**
 * @route POST /auth/login
 * @description Log in with email and password
 * @body {email, password}
 * @access Public
 */
const loginRequestBodySchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
router.post('/login', (0, validation_middlewares_1.validateRequest)(loginRequestBodySchema, 'body'), auth_controllers_1.login);
exports.default = router;
