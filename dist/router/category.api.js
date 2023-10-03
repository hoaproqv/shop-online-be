"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const category_controllers_1 = require("../controllers/category.controllers");
const adminAccess_middlewares_1 = require("../middlewares/adminAccess.middlewares");
const authentication_middlewares_1 = require("../middlewares/authentication.middlewares");
const validation_middlewares_1 = require("../middlewares/validation.middlewares");
const router = express_1.default.Router();
/**
 * @router POST /category
 * @description Create a new category
 * @body {name, description}
 * @access Admin only
 */
router.post('/', authentication_middlewares_1.loginRequired, adminAccess_middlewares_1.adminAccess, category_controllers_1.createCategory);
/**
 * @router GET /category
 * @description Get all categories
 * @body
 * @access Public
 */
router.get('/', category_controllers_1.getCategory);
/**
 * @router PUT /category/:id
 * @description Update a category
 * @body {name, description}
 * @access Admin only
 */
const updateCategoryBodySchema = joi_1.default.object().keys({
    name: joi_1.default.string(),
    description: joi_1.default.string()
});
router.put('/:id', authentication_middlewares_1.loginRequired, adminAccess_middlewares_1.adminAccess, validation_middlewares_1.validatedIdParams, (0, validation_middlewares_1.validateRequest)(updateCategoryBodySchema, 'body'), category_controllers_1.updateCategory);
/**
 * @router DELETE /category/:id
 * @description Delete a category
 * @body
 * @access Admin only
 */
router.delete('/:id', authentication_middlewares_1.loginRequired, adminAccess_middlewares_1.adminAccess, validation_middlewares_1.validatedIdParams, category_controllers_1.deleteCategory);
exports.default = router;
