import { Request, Response } from 'express';
import Reservation from '../models/Reservation';

export const createReservation = async (req: Request, res: Response) => {
  const reservation = new Reservation(req.body);
  try {
    const newReservation = await reservation.save();
    // Here you would typically send an email confirmation
    res.status(201).json(newReservation);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find().sort({ date: -1 });
    res.json(reservations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getReservationsByUser = async (req: Request, res: Response) => {
  try {
    // This assumes you have a way to associate reservations with users,
    // for example, by storing a userId in the reservation document.
    // As the current model doesn't have it, this is a placeholder.
    // const reservations = await Reservation.find({ userId: req.params.userId });
    // res.json(reservations);
    res.status(501).json({ message: 'Not implemented' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json({ message: 'Reservation deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
