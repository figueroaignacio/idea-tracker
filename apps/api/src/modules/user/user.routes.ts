import { Router } from 'express';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { meHandler } from './user.controller';

const router = Router();

router.get('/me', authMiddleware, meHandler);

export default router;
