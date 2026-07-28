import mongoose from 'mongoose';

export interface ISlotConfig extends mongoose.Document {
  time: string; // HH:mm
  maxGuests: number;
}

const SlotConfigSchema = new mongoose.Schema({
  time: { type: String, required: true, unique: true },
  maxGuests: { type: Number, required: true, default: 20 },
}, { timestamps: true });

export default mongoose.models.SlotConfig || mongoose.model<ISlotConfig>('SlotConfig', SlotConfigSchema);
