import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel';
import { EStatusCodes } from '../types/EStatusCodes';
import mongoose from 'mongoose';

type JwtPayloadWithUserId = jwt.JwtPayload & {
  userId?: string;
};

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(EStatusCodes.UNAUTHORIZED)
        .json({ error: 'Unauthorized - No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadWithUserId;

    if (decoded.userId) {
      if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
        return res
          .status(EStatusCodes.BAD_REQUEST)
          .json({ error: `Invalid user ID: ${decoded.userId}` });
      }

      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(EStatusCodes.NOT_FOUND).json({ error: 'User not found' });
      }
      req.user = { id: user.id };
    } else {
      return res.status(EStatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized - Invalid token' });
    }

    next();
  } catch (e) {
    const err = e as Error;
    console.log('Error in protectRoute middleware', err.message);
    res.status(EStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
