import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  stars: number;
  text: string;
  user: string; // For simplicity, using string. Could be a ref to User model.
  date: Date;
}

const ReviewSchema: Schema = new Schema({
  stars: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>('Review', ReviewSchema);
