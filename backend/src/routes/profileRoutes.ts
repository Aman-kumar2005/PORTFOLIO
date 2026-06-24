import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getProfile);
router.put('/', protect, updateProfile);

export default router;