import { Request, Response } from 'express';
import Promotion from '../models/Promotion';

export const getPromotions = async (req: Request, res: Response) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN ONLY
export const createPromotion = async (req: Request, res: Response) => {
  const promotion = new Promotion(req.body);
  try {
    const newPromotion = await promotion.save();
    res.status(201).json(newPromotion);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ADMIN ONLY
export const updatePromotion = async (req: Request, res: Response) => {
  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPromotion) return res.status(404).json({ message: 'Promotion not found' });
    res.json(updatedPromotion);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ADMIN ONLY
export const deletePromotion = async (req: Request, res: Response) => {
  try {
    const deletedPromotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!deletedPromotion) return res.status(404).json({ message: 'Promotion not found' });
    res.json({ message: 'Promotion deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
