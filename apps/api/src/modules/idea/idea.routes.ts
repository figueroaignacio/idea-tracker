import { Router } from 'express';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import {
  createIdeaHandler,
  deleteIdeaHandler,
  getIdeaByIdHandler,
  getUserIdeasHandler,
  updateIdeaHandler,
} from './idea.controller';

const router = Router();

router.post('/', authMiddleware, createIdeaHandler);
router.get('/', authMiddleware, getUserIdeasHandler);
router.get('/:id', authMiddleware, getIdeaByIdHandler);
router.put('/:id', authMiddleware, updateIdeaHandler);
router.delete('/:id', authMiddleware, deleteIdeaHandler);

export default router;
