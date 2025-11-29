import express from 'express';
import { register, login, getProfile, changePassword, forgotPassword } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/change-password', changePassword);
router.post('/forgot-password', forgotPassword);

export default router;

