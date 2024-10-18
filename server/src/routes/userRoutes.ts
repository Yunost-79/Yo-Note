import { Router } from 'express';

import { protectRoute } from '../middleware/protectRoute';
import { validateUserData } from '../middleware/validateUserData';

import { getUserData } from '../controller/userController';

const router = Router();

router.get('/data', protectRoute, validateUserData, getUserData);

export default router;
