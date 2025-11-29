import express from 'express';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem, getCategories, createCategory, deleteCategory } from '../controllers/menuController';

const router = express.Router();

// Category routes (must be before /:id routes)
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.delete('/categories/:id', deleteCategory);

// Menu item routes
router.get('/', getMenuItems);
router.post('/', createMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

export default router;
