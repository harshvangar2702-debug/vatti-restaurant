"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const galleryController_1 = require("../controllers/galleryController");
const router = express_1.default.Router();
router.get('/', galleryController_1.getGalleryItems);
// These should be protected admin routes
router.post('/', galleryController_1.createGalleryItem);
router.put('/:id', galleryController_1.updateGalleryItem);
router.delete('/:id', galleryController_1.deleteGalleryItem);
exports.default = router;
