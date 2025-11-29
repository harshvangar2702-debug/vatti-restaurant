import { Request, Response } from 'express';
import Review from '../models/Review';

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req: Request, res: Response) => {
  const review = new Review(req.body);
  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
    res.json(updatedReview);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
