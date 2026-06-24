import { Router } from 'express';
import { body } from 'express-validator';
import { login, getMe } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { protect } from '../middleware/auth';

const router = Router();

router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  login
);

router.get('/me', protect, getMe);

export default router;