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
exports.deleteCategory = exports.createCategory = exports.getCategories = exports.deleteMenuItem = exports.updateMenuItem = exports.createMenuItem = exports.getMenuItems = void 0;
const MenuItem_1 = __importDefault(require("../models/MenuItem"));
const Category_1 = __importDefault(require("../models/Category"));
const getMenuItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuItems = yield MenuItem_1.default.find().populate('category');
        res.json(menuItems);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getMenuItems = getMenuItems;
const createMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menuItem = new MenuItem_1.default(req.body);
    try {
        const newMenuItem = yield menuItem.save();
        res.status(201).json(newMenuItem);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createMenuItem = createMenuItem;
const updateMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedMenuItem = yield MenuItem_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMenuItem)
            return res.status(404).json({ message: 'Menu item not found' });
        res.json(updatedMenuItem);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedMenuItem = yield MenuItem_1.default.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem)
            return res.status(404).json({ message: 'Menu item not found' });
        res.json({ message: 'Menu item deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteMenuItem = deleteMenuItem;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getCategories = getCategories;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const existingCategory = yield Category_1.default.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }
        const category = new Category_1.default({ name });
        const newCategory = yield category.save();
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createCategory = createCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCategory = yield Category_1.default.findByIdAndDelete(req.params.id);
        if (!deletedCategory)
            return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteCategory = deleteCategory;
