import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import User from '../models/userModel';
import { EStatusCodes } from '../types/EStatusCodes';

export const validateUserData = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  console.log('User ID:', userId);

  if (!userId) {
    return res.status(EStatusCodes.UNAUTHORIZED).json({ error: 'User not authenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(EStatusCodes.BAD_REQUEST).json({ error: `Invalid user ID: ${userId}` });
  }

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(EStatusCodes.NOT_FOUND).json({ error: 'User not found' });
    }

    next();
  } catch (e) {
    const err = e as Error;
    console.error('Error in validateUserData middleware:', err.message);
    return res.status(EStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
  }
};
