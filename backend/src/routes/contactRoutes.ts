import { Router } from 'express';
import { body } from 'express-validator';
import {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} from '../controllers/contactController';
import { validate } from '../middleware/validate';
import { protect } from '../middleware/auth';

const router = Router();

router.post(
  '/',
  validate([
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 ,min:3 }),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ max: 2000,min:10 })
      .withMessage('Message is too long'),
  ]),
  createContact
);

router.get('/', getContacts);
router.post('/', createContact);

router.patch('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteContact);

export default router;