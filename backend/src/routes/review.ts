import express from 'express';
import { getReviews, createReview, updateReview } from '../controllers/reviewController';

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);
router.put('/:id', updateReview);

export default router;
