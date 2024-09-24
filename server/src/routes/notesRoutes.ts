import { Router } from 'express';

import { protectRoute } from '../middleware/protectRoute';
import { validateNoteId } from '../middleware/validateNoteId';

import {
  createNote,
  getNoteList,
  getNote,
  deleteNoteList,
  deleteNote,
  updateNote,
} from '../controller/notesController';

const router = Router();

router.post('/create', protectRoute, createNote);
router.get('/list', protectRoute, getNoteList);
router.get('/list/:id', protectRoute, validateNoteId, getNote);
router.delete('/delete', protectRoute, deleteNoteList);
router.delete('/delete/:id', protectRoute, validateNoteId, deleteNote);
router.put('/update/:id', protectRoute, validateNoteId, updateNote);

export default router;
