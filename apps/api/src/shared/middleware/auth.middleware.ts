import { NextFunction, Request, Response } from 'express';
import { signAccessToken, verifyAccessToken, verifyRefreshToken } from '../utils/jwt';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'];
  let payload: any;

  try {
    if (auth && auth.startsWith('Bearer ')) {
      const token = auth.split(' ')[1];
      payload = verifyAccessToken(token);
    } else if (req.cookies?.refreshToken) {
      const refreshToken = req.cookies.refreshToken;
      payload = verifyRefreshToken(refreshToken);

      const accessToken = signAccessToken({ sub: payload.sub, email: payload.email });
      res.setHeader('x-access-token', accessToken);
    } else {
      return res.status(401).json({ error: 'No token' });
    }

    (req as any).userId = Number(payload.sub);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
