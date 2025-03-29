import express, { Router } from "express";
import { VaultController } from "../controllers/vault-controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class VaultRoutes {
  public router: express.Router;
  private vaultController: VaultController;

  constructor() {
    this.router = express.Router();
    this.vaultController = new VaultController();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(
      "/",
      AuthMiddleware.isAuthenticated,
      this.vaultController.createVault.bind(this.vaultController)
    );
    this.router.get(
      "/:userId",
      AuthMiddleware.isAuthenticated,
      this.vaultController.getVaults.bind(this.vaultController)
    );
    this.router.post(
      "/fields",
      AuthMiddleware.isAuthenticated,
      this.vaultController.addFieldToVault.bind(this.vaultController)
    );
    this.router.post(
      "/records",
      AuthMiddleware.isAuthenticated,
      this.vaultController.createVaultRecord.bind(this.vaultController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
