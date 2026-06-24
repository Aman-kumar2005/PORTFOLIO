export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  featured: boolean;
  order: number;
}
 
export interface Experience {
  role: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description: string;
  type: 'work' | 'education';
}
 
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}
 
export interface Profile {
  _id: string;
  name: string;
  title: string;
  bio: string;
  about: string;
  profileImage: string;
  resumeUrl: string;
  skills: string[];
  socialLinks: SocialLinks;
  experience: Experience[];
}
 
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}