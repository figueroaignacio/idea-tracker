import { Router } from 'express';

// Controller and Service
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// Config
import authConfig from './config/auth.config';

// Middleware
import { AuthMiddleware } from './middleware/auth.middleware';

export class AuthRoutes {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    const authService = new AuthService();
    const config = authConfig;
    const authMiddleware = new AuthMiddleware(authService);

    this.authController = new AuthController(authService, config);
    this.registerRoutes(authMiddleware);
  }

  private registerRoutes(authMiddleware: AuthMiddleware) {
    this.router.get('/github/callback', (req, res, next) => {
      this.authController.githubCallback(req, res, next).catch(next);
    });

    this.router.get('/providers', (req, res, next) => {
      this.authController.getProviders(req, res).catch(next);
    });

    this.router.get(
      '/profile',
      (req, res, next) => {
        authMiddleware.authenticate(req, res, next);
      },
      (req, res, next) => {
        this.authController.profile(req, res).catch(next);
      },
    );

    this.router.post('/logout', async (req, res, next) => {
      try {
        this.authController.logout(req, res);
      } catch (err) {
        next(err);
      }
    });
  }
}
