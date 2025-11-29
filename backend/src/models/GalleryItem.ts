import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  title: string;
  description: string;
  image: string;
}

const GalleryItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
