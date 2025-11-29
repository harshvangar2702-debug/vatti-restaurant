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
exports.updateReview = exports.createReview = exports.getReviews = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Review_1.default.find();
        res.json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getReviews = getReviews;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = new Review_1.default(req.body);
    try {
        const newReview = yield review.save();
        res.status(201).json(newReview);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createReview = createReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedReview = yield Review_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReview)
            return res.status(404).json({ message: 'Review not found' });
        res.json(updatedReview);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateReview = updateReview;
