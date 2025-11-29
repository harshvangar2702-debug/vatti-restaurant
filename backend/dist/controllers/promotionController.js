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
exports.deletePromotion = exports.updatePromotion = exports.createPromotion = exports.getPromotions = void 0;
const Promotion_1 = __importDefault(require("../models/Promotion"));
const getPromotions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotions = yield Promotion_1.default.find();
        res.json(promotions);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getPromotions = getPromotions;
// ADMIN ONLY
const createPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const promotion = new Promotion_1.default(req.body);
    try {
        const newPromotion = yield promotion.save();
        res.status(201).json(newPromotion);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createPromotion = createPromotion;
// ADMIN ONLY
const updatePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPromotion = yield Promotion_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPromotion)
            return res.status(404).json({ message: 'Promotion not found' });
        res.json(updatedPromotion);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updatePromotion = updatePromotion;
// ADMIN ONLY
const deletePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPromotion = yield Promotion_1.default.findByIdAndDelete(req.params.id);
        if (!deletedPromotion)
            return res.status(404).json({ message: 'Promotion not found' });
        res.json({ message: 'Promotion deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deletePromotion = deletePromotion;
