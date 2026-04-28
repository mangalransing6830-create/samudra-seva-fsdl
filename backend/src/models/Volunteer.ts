import mongoose, { Document, Schema } from 'mongoose';

export interface IVolunteer extends Document {
  name: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  joinedAt: Date;
}

const volunteerSchema = new Schema<IVolunteer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    availability: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Volunteer = mongoose.model<IVolunteer>('Volunteer', volunteerSchema);
