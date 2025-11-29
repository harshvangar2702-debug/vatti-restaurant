"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservationController_1 = require("../controllers/reservationController");
const router = express_1.default.Router();
router.post('/', reservationController_1.createReservation);
router.get('/', reservationController_1.getAllReservations);
router.get('/:userId', reservationController_1.getReservationsByUser);
router.delete('/:id', reservationController_1.deleteReservation);
exports.default = router;
