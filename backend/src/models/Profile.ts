import { Schema, model, Document } from 'mongoose';

interface ISocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

interface IExperience {
  role: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description: string;
  type: 'work' | 'education';
}

export interface IProfile extends Document {
  name: string;
  title: string;
  bio: string;
  about: string;
  profileImage: string;
  resumeUrl: string;
  skills: string[];
  socialLinks: ISocialLinks;
  experience: IExperience[];
}

const profileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    about: { type: String, required: true },
    profileImage: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    skills: { type: [String], default: [] },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      email: String,
    },
    experience: [
      {
        role: { type: String, required: true },
        organization: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String },
        description: { type: String, required: true },
        type: { type: String, enum: ['work', 'education'], required: true },
      },
    ],
  },
  { timestamps: true }
);

export default model<IProfile>('Profile', profileSchema);