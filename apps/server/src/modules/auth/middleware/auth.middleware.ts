import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth.service';

export class AuthMiddleware {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Token cookie missing' });
    }

    const payload = this.authService.verifyJWT(token);

    if (!payload) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    (req as any).user = payload;

    next();
  };
}
