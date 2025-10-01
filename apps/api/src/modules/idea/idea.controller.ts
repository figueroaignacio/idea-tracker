import { Request, Response } from 'express';
import * as service from './idea.service';

export const createIdeaHandler = async (req: Request, res: Response) => {
  const userId = (req as any).userId as number;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const idea = await service.createIdeaService(userId, req.body);
    res.status(201).json(idea);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserIdeasHandler = async (req: Request, res: Response) => {
  const userId = (req as any).userId as number;

  try {
    const ideas = await service.getUserIdeasService(userId);
    res.json(ideas);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getIdeaByIdHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const idea = await service.getIdeaByIdService(id);
    res.json(idea);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const updateIdeaHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = (req as any).userId as number;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid idea ID' });
  }

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const existingIdea = await service.getIdeaByIdService(id);

    if (existingIdea.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You can only update your own ideas' });
    }

    const updated = await service.updateIdeaService(id, req.body);
    res.json(updated);
  } catch (err: any) {
    console.error('Update error:', err);

    if (err.message === 'Idea not found') {
      return res.status(404).json({ error: 'Idea not found' });
    }

    res.status(500).json({ error: err.message });
  }
};

export const deleteIdeaHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await service.deleteIdeaService(id);
    res.status(204).send();
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
