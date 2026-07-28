import mongoose from 'mongoose';

export interface IMenu extends mongoose.Document {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Menu || mongoose.model<IMenu>('Menu', MenuSchema);
