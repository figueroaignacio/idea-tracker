import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
  static isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "No autorizado" });
  }
}
