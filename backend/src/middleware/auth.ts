import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from './errorHandler';
import Admin from '../models/Admin';

export interface AuthRequest extends Request {
  admin?: { id: string; email: string };
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized, no token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };

    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      throw new ApiError(401, 'Not authorized, admin not found');
    }

    req.admin = { id: admin.id, email: admin.email };
    next();
  } catch (error) {
    next(new ApiError(401, 'Not authorized, token failed'));
  }
};