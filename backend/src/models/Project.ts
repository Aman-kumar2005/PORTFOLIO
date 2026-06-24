import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  featured: boolean;
  order: number;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    technologies: { type: [String], default: [] },
    githubLink: { type: String, required: true },
    liveLink: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<IProject>('Project', projectSchema);