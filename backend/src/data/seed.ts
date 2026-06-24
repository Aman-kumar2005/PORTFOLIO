import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import dbConnection from '../config/db';
import Admin from '../models/Admin';
import Profile from '../models/Profile';
import Project from '../models/Project';

const seed = async (): Promise<void> => {
  await dbConnection();

  // Seed admin
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await Admin.create({ name: 'Admin', email: adminEmail, password: adminPassword });
    console.log(`Admin created -> email: ${adminEmail} password: ${adminPassword}`);
  } else {
    console.log('Admin already exists, skipping.');
  }

  // Seed profile
  const existingProfile = await Profile.findOne();
  if (!existingProfile) {
    await Profile.create({
      name: 'Aman Kumar',
      title: 'Full-Stack MERN Developer',
      bio: 'I build fast, accessible, and scalable web applications using the MERN stack and TypeScript.',
      about:
        'I am a full-stack developer with a passion for building clean, performant web applications. ' +
        'I specialize in the MERN stack (MongoDB, Express, React, Node.js) with TypeScript, and I enjoy ' +
        'solving challenging problems through data structures and algorithms. When I am not coding, I am ' +
        'contributing to open source or learning about new web technologies.',
      profileImage: 'https://placehold.co/400x400/png?text=Profile',
      resumeUrl: '/resume.pdf',
      skills: [
        'MERN Stack',
        'TypeScript',
        'React',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Tailwind CSS',
        'DSA & Problem Solving',
      ],
      socialLinks: {
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        twitter: 'https://x.com/yourusername',
        email: 'mailto:you@example.com',
      },
      experience: [
        {
          role: 'Full-Stack Developer',
          organization: 'Tech Solutions Inc.',
          startDate: '2023',
          endDate: 'Present',
          description: 'Building and maintaining MERN stack applications for enterprise clients.',
          type: 'work',
        },
        {
          role: 'B.Tech in Computer Science',
          organization: 'State University',
          startDate: '2023',
          endDate: '2027',
          description: 'Graduated with honors, focus on data structures, algorithms, and web technologies.',
          type: 'education',
        },
      ],
    });
    console.log('Profile seeded.');
  } else {
    console.log('Profile already exists, skipping.');
  }

  // Seed projects
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: 'E-Commerce Platform',
        description:
          'A full-featured e-commerce platform with cart, checkout, payments, and an admin dashboard.',
        image: 'https://placehold.co/600x400/png?text=E-Commerce',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        githubLink: 'https://github.com/yourusername/ecommerce-platform',
        liveLink: 'https://example-ecommerce.com',
        featured: true,
        order: 1,
      },
      {
        title: 'Real-Time Chat App',
        description: 'A real-time chat application with sockets, rooms, and message persistence.',
        image: 'https://placehold.co/600x400/png?text=Chat+App',
        technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
        githubLink: 'https://github.com/yourusername/chat-app',
        liveLink: 'https://example-chat.com',
        featured: true,
        order: 2,
      },
      {
        title: 'Task Management Tool',
        description: 'A Kanban-style task manager with drag-and-drop, teams, and deadlines.',
        image: 'https://placehold.co/600x400/png?text=Task+Manager',
        technologies: ['React', 'TypeScript', 'Express', 'MongoDB', 'Tailwind CSS'],
        githubLink: 'https://github.com/yourusername/task-manager',
        liveLink: 'https://example-tasks.com',
        featured: false,
        order: 3,
      },
    ]);
    console.log('Sample projects seeded.');
  } else {
    console.log('Projects already exist, skipping.');
  }

  console.log('Seeding complete.');
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});