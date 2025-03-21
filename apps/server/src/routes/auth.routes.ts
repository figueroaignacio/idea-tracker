import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initRoutes();
  }

  private initRoutes(): void {
    // Proveedores disponibles
    this.router.get("/providers", this.authController.getAuthProviders);

    // GitHub
    this.router.get("/github", this.authController.githubAuth);
    this.router.get("/github/callback", this.authController.githubAuthCallback);

    // Google
    this.router.get("/google", this.authController.googleAuth);
    this.router.get("/google/callback", this.authController.googleAuthCallback);

    // Facebook
    this.router.get("/facebook", this.authController.facebookAuth);
    this.router.get(
      "/facebook/callback",
      this.authController.facebookAuthCallback
    );

    // Perfil y cierre de sesión
    this.router.get(
      "/profile",
      AuthMiddleware.isAuthenticated,
      this.authController.getProfile
    );
    this.router.post(
      "/logout",
      AuthMiddleware.isAuthenticated,
      this.authController.logout
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
