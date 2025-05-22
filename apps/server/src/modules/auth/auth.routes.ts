import { Request, Response, Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import authConfig from './config/auth.config';

export class AuthRoutes {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    const authService = new AuthService();
    const config = authConfig;

    this.authController = new AuthController(authService, config);
    this.registerRoutes();
  }

  private registerRoutes() {
    this.router.get('/github/callback', (req: Request, res: Response, next) => {
      this.authController.githubCallback(req, res).catch(next);
    });

    this.router.get('/providers', (req: Request, res: Response, next) => {
      this.authController.getProviders(req, res).catch(next);
    });
  }
}
