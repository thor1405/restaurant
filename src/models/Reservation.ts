import mongoose from 'mongoose';

export interface IReservation extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  occasion?: string;
  requests?: string;
  status: 'pending' | 'approved' | 'cancelled';
}

const ReservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  occasion: { type: String },
  requests: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'cancelled'], default: 'pending' }
}, { timestamps: true });

export default mongoose.models.Reservation || mongoose.model<IReservation>('Reservation', ReservationSchema);
