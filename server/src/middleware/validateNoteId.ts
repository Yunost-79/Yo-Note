import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import Note from '../models/notesModel';
import { EStatusCodes } from '../types/EStatusCodes';

export const validateNoteId = async (req: Request, res: Response, next: NextFunction) => {
  const noteId = req.params.id;

  if (noteId && !mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(EStatusCodes.BAD_REQUEST).json({ error: `Invalid note ID: ${noteId}` });
  }

  const note = await Note.findById(noteId);

  if (!note) {
    return res.status(EStatusCodes.NOT_FOUND).json({ error: `Note with ID: ${noteId} not found` });
  }

  next();
};
