import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'No token' });

  const parts = String(auth).split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer')
    return res.status(401).json({ error: 'Invalid auth header' });

  try {
    const payload = verifyAccessToken(parts[1]);
    (req as any).userId = Number(payload.sub);
    next();
  } catch (e: any) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
