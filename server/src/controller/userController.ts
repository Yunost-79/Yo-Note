import { Request, Response } from 'express';
import User from '../models/userModel';
import { EStatusCodes } from '../types/EStatusCodes';

export const getUserData = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select('-password');
    return res.status(EStatusCodes.OK).json({ user });
  } catch (e) {
    const err = e as Error;

    console.log('Error in getUserData controller', err.message);
    res.status(EStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
