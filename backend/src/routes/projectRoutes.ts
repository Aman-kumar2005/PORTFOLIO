import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { validate } from '../middleware/validate';
import { protect } from '../middleware/auth';

const router = Router();

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('image').trim().notEmpty().withMessage('Image URL is required'),
  body('githubLink').trim().notEmpty().withMessage('GitHub link is required'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
];

router.get('/', getProjects);
router.get('/:id', getProject);

router.post('/', protect, validate(projectValidation), createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;