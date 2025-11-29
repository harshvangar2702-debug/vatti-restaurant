import express from 'express';
import { createReservation, getAllReservations, getReservationsByUser, deleteReservation } from '../controllers/reservationController';

const router = express.Router();

router.post('/', createReservation);
router.get('/', getAllReservations);
router.get('/:userId', getReservationsByUser);
router.delete('/:id', deleteReservation);

export default router;
