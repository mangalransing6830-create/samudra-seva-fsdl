import mongoose, { Document, Schema } from 'mongoose';

export interface IBeach extends Document {
  name: string;
  location: string;
  cleanlinessLevel: number; // e.g., 1 to 5
  wasteLevel: 'low' | 'moderate' | 'high';
  description: string;
  latitude: number;
  longitude: number;
}

const beachSchema = new Schema<IBeach>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    cleanlinessLevel: { type: Number, required: true, min: 1, max: 5 },
    wasteLevel: { type: String, enum: ['low', 'moderate', 'high'], required: true },
    description: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Beach = mongoose.model<IBeach>('Beach', beachSchema);
