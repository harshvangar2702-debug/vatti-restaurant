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
exports.deleteReservation = exports.getReservationsByUser = exports.getAllReservations = exports.createReservation = void 0;
const Reservation_1 = __importDefault(require("../models/Reservation"));
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservation = new Reservation_1.default(req.body);
    try {
        const newReservation = yield reservation.save();
        // Here you would typically send an email confirmation
        res.status(201).json(newReservation);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createReservation = createReservation;
const getAllReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield Reservation_1.default.find().sort({ date: -1 });
        res.json(reservations);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllReservations = getAllReservations;
const getReservationsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // This assumes you have a way to associate reservations with users,
        // for example, by storing a userId in the reservation document.
        // As the current model doesn't have it, this is a placeholder.
        // const reservations = await Reservation.find({ userId: req.params.userId });
        // res.json(reservations);
        res.status(501).json({ message: 'Not implemented' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getReservationsByUser = getReservationsByUser;
const deleteReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedReservation = yield Reservation_1.default.findByIdAndDelete(req.params.id);
        if (!deletedReservation)
            return res.status(404).json({ message: 'Reservation not found' });
        res.json({ message: 'Reservation deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteReservation = deleteReservation;
