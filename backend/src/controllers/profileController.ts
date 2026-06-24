import { Request, Response, NextFunction } from 'express';
import Profile from '../models/Profile';
import { ApiError } from '../middleware/errorHandler';

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const profile = await Profile.findOne();
    if (!profile) throw new ApiError(404, 'Profile not found. Please seed the database.');
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

// Admin only
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};