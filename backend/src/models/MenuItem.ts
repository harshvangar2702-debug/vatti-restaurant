import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: Schema.Types.ObjectId;
  dietary: string[];
}

const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  dietary: [{ type: String }],
});

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
