import { Request, Response } from 'express';
import * as repo from './user.repository';

export const meHandler = async (req: Request, res: Response) => {
  const userId = (req as any).userId as number;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const user = await repo.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
};
