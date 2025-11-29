"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menuController_1 = require("../controllers/menuController");
const router = express_1.default.Router();
// Category routes (must be before /:id routes)
router.get('/categories', menuController_1.getCategories);
router.post('/categories', menuController_1.createCategory);
router.delete('/categories/:id', menuController_1.deleteCategory);
// Menu item routes
router.get('/', menuController_1.getMenuItems);
router.post('/', menuController_1.createMenuItem);
router.put('/:id', menuController_1.updateMenuItem);
router.delete('/:id', menuController_1.deleteMenuItem);
exports.default = router;
