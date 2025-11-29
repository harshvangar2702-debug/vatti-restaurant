import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  partySize: number;
  specialRequests: string;
}

const ReservationSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  partySize: { type: Number, required: true },
  specialRequests: { type: String },
});

export default mongoose.model<IReservation>('Reservation', ReservationSchema);
