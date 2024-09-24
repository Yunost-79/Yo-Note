import { Request, Response } from 'express';

import Note from '../models/notesModel';
import { EStatusCodes } from '../types/EStatusCodes';

type TypedRequestBody<T> = Request<{}, {}, T>;

type CreateNoteRequestBody = Document & {
  title: string;
  content?: string;
  tags?: string[];
};

type UpdateNoteRequestBody = Document & {
  title?: string;
  content?: string;
  tags?: string[];
  isPinned?: boolean;
};

//createNote controller

export const createNote = async (req: TypedRequestBody<CreateNoteRequestBody>, res: Response) => {
  const { title, content, tags } = req.body;
  const userId = req.user.id;
  try {
    const newNote = new Note({
      title,
      content,
      tags,
      userId,
    });

    const createdNote = await newNote.save();

    return res
      .status(EStatusCodes.CREATED)
      .json({ createdNote, message: 'Note created successfully' });
  } catch (e) {
    const err = e as Error;

    console.log('Error in createNote controller', err.message);
    res.status(EStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

//getNoteList controller

export const getNoteList = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const notesList = await Note.find({ userId });
    return res.status(EStatusCodes.OK).json({ notesList });
  } catch (e) {
    const err = e as Error;

    console.log('Error in getNoteList controller', err.message);
    res.status(EStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

//getNote controller

export const getNote = async (req: Request, res: Response) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findById(noteId);

    return res.status(EStatusCodes.OK).json({ note });
  } catch (e) {
    const err = e as Error;

    console.log('Error in getNote controller', err.message);
    res.status(EStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

//deleteNoteList controller

export const deleteNoteList = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    await Note.deleteMany({ userId });
    return res
      .status(EStatusCodes.OK)
      .json({ message: 'All notes for the user have been deleted' });
  } catch (e) {
    const err = e as Error;

    console.log('Error in deleteNoteList controller', err.message);
    res.status(EStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

//deleteNote controller

export const deleteNote = async (req: Request, res: Response) => {
  const noteId = req.params.id;
  try {
    await Note.findByIdAndDelete(noteId);
    return res
      .status(EStatusCodes.OK)
      .json({ message: `Note with ID: ${noteId} has been deleted` });
  } catch (e) {
    const err = e as Error;

    console.log('Error in deleteNote controller', err.message);
    res.status(EStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

//updateNote controller

export const updateNote = async (req: TypedRequestBody<UpdateNoteRequestBody>, res: Response) => {
  const noteId = (req.params as { id: string }).id;
  const { title, content, tags, isPinned } = req.body;

  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res
        .status(EStatusCodes.NOT_FOUND)
        .json({ message: `Note with ID: ${noteId} not found` });
    }

    const isValidField = (field: string | undefined) => {
      return field !== undefined && field.trim() !== '';
    };

    const noteFields = {
      title: isValidField(title) ? title : note.title,
      content: isValidField(content) ? content : note.content,
      tags: Array.isArray(tags) && tags.length > 0 ? tags : note.tags,
      isPinned: isPinned !== undefined ? isPinned : note.isPinned,
    };

    const updatedNote = await Note.findByIdAndUpdate(noteId, noteFields, {
      new: true,
      runValidators: true,
    });
    return res
      .status(EStatusCodes.OK)
      .json({ updatedNote, message: `Note with ID: ${noteId} updated successfully` });
  } catch (e) {
    const err = e as Error;

    console.log('Error in updateNote controller', err.message);
    res.status(EStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
