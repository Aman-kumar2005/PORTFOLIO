import { Schema, model, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100,minLength:3},
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true, maxlength: 2000 ,minLength:10,lowercase:true},
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IContact>('Contact', contactSchema);