import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  service?: string;
  address?: string;
  plzOrt?: string;
  createdAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    service: { type: String },
    address: { type: String },
    plzOrt: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "contact_submissions" }
);

export const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ??
  mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);
