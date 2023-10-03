"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_controllers_1 = require("../controllers/users.controllers");
const joi_1 = __importDefault(require("joi"));
const validation_middlewares_1 = require("../middlewares/validation.middlewares");
const authentication_middlewares_1 = require("../middlewares/authentication.middlewares");
/**
 * @router GET /users/me
 * @description Get current user
 * @body {email}
 * @access Login required
 */
router.get('/me', authentication_middlewares_1.loginRequired, users_controllers_1.getUser);
/**
 * @router PUT /users/me
 * @description Update current user
 * @body {name, email, password, newPassword}
 * @access Login required
 */
const updateUserRequestBodySchema = joi_1.default.object({
    name: joi_1.default.string(),
    password: joi_1.default.string().min(5).message('Password must be at least 5 characters'),
    newPassword: joi_1.default.string().min(5).message('New password must be at least 5 characters')
}).options({ abortEarly: false });
router.put('/me', authentication_middlewares_1.loginRequired, (0, validation_middlewares_1.validateRequest)(updateUserRequestBodySchema, 'body'), users_controllers_1.updateUser);
router.delete('/me', authentication_middlewares_1.loginRequired, users_controllers_1.deleteUser);
exports.default = router;
