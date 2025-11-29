import mongoose, { Schema, Document } from 'mongoose';

export interface IPromotion extends Document {
  title: string;
  description: string;
  discount: number;
  code: string;
  expiryDate: Date;
  image: string;
}

const PromotionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  expiryDate: { type: Date, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<IPromotion>('Promotion', PromotionSchema);
