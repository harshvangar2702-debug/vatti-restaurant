import { Request, Response } from 'express';
import GalleryItem from '../models/GalleryItem';
import multer from 'multer';
import path from 'path';

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
}).single('image');

export const getGalleryItems = async (req: Request, res: Response) => {
  try {
    const galleryItems = await GalleryItem.find();
    res.json(galleryItems);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN ONLY
export const createGalleryItem = async (req: Request, res: Response) => {
  try {
    const { title, description, image } = req.body;
    
    if (!title || !description || !image) {
      return res.status(400).json({ message: 'Title, description, and image URL are required' });
    }

    const newGalleryItem = new GalleryItem({
      title,
      description,
      image,
    });

    const savedItem = await newGalleryItem.save();
    res.status(201).json(savedItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ADMIN ONLY
export const updateGalleryItem = async (req: Request, res: Response) => {
  try {
    const updatedItem = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Gallery item not found' });
    res.json(updatedItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ADMIN ONLY
export const deleteGalleryItem = async (req: Request, res: Response) => {
  try {
    const deletedGalleryItem = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!deletedGalleryItem) return res.status(404).json({ message: 'Gallery item not found' });
    res.json({ message: 'Gallery item deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};