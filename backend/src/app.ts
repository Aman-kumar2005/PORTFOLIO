import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import projectRoutes from './routes/projectRoutes';
import profileRoutes from './routes/profileRoutes';
import { notFound, errorHandler } from './middleware/errorHandler';
import router from './routes/authRoutes';
import { createContact } from './controllers/contactController';

const app: Application = express();

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',');

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/contact', contactRoutes);
router.post('/api/contact',createContact);
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/profile', profileRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;