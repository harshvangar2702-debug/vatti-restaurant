"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGalleryItem = exports.updateGalleryItem = exports.createGalleryItem = exports.getGalleryItems = void 0;
const GalleryItem_1 = __importDefault(require("../models/GalleryItem"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Set up multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
}).single('image');
const getGalleryItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const galleryItems = yield GalleryItem_1.default.find();
        res.json(galleryItems);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getGalleryItems = getGalleryItems;
// ADMIN ONLY
const createGalleryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, image } = req.body;
        if (!title || !description || !image) {
            return res.status(400).json({ message: 'Title, description, and image URL are required' });
        }
        const newGalleryItem = new GalleryItem_1.default({
            title,
            description,
            image,
        });
        const savedItem = yield newGalleryItem.save();
        res.status(201).json(savedItem);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createGalleryItem = createGalleryItem;
// ADMIN ONLY
const updateGalleryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedItem = yield GalleryItem_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem)
            return res.status(404).json({ message: 'Gallery item not found' });
        res.json(updatedItem);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateGalleryItem = updateGalleryItem;
// ADMIN ONLY
const deleteGalleryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedGalleryItem = yield GalleryItem_1.default.findByIdAndDelete(req.params.id);
        if (!deletedGalleryItem)
            return res.status(404).json({ message: 'Gallery item not found' });
        res.json({ message: 'Gallery item deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteGalleryItem = deleteGalleryItem;
