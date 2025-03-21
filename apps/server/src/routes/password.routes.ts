import { Router } from "express";
import { PasswordController } from "../controllers/password.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class PasswordRoutes {
  private router: Router;
  private passwordController: PasswordController;

  constructor() {
    this.router = Router();
    this.passwordController = new PasswordController();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(
      "/",
      AuthMiddleware.isAuthenticated,
      this.passwordController.getAllPasswords.bind(this.passwordController)
    );
    this.router.get(
      "/generate",
      this.passwordController.generatePassword.bind(this.passwordController)
    );
    this.router.get(
      "/:id",
      AuthMiddleware.isAuthenticated,
      this.passwordController.getPassword.bind(this.passwordController)
    );
    this.router.post(
      "/",
      AuthMiddleware.isAuthenticated,
      this.passwordController.createPassword.bind(this.passwordController)
    );
    this.router.put(
      "/:id",
      AuthMiddleware.isAuthenticated,
      this.passwordController.updatePassword.bind(this.passwordController)
    );
    this.router.delete(
      "/:id",
      AuthMiddleware.isAuthenticated,
      this.passwordController.deletePassword.bind(this.passwordController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
