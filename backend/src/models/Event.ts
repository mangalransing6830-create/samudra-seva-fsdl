import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  beachId: mongoose.Types.ObjectId;
  date: string;
  time: string;
  organizer: string;
  volunteersCount: number;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    beachId: { type: Schema.Types.ObjectId, ref: 'Beach', required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    organizer: { type: String, required: true },
    volunteersCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Event = mongoose.model<IEvent>('Event', eventSchema);
