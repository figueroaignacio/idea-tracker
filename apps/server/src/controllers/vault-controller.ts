import { Request, Response } from "express";
import { VaultService } from "../services/vault-service";

export class VaultController {
  private vaultService: VaultService;

  constructor() {
    this.vaultService = new VaultService();
  }

  async createVault(req: Request, res: Response) {
    try {
      const userId = (req.user as any)?.id || req.body.userId;

      const { name, fields } = req.body;

      const vault = await this.vaultService.createVault(userId, name);

      if (fields && Array.isArray(fields)) {
        for (const field of fields) {
          await this.vaultService.addFieldToVault(
            vault.id,
            field.name,
            field.type
          );
        }
      }

      const updatedVault = await this.vaultService.getVaultById(vault.id);
      res.status(201).json(updatedVault);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ message: errorMessage });
    }
  }

  async getVaults(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const vaults = await this.vaultService.getVaults(userId);
      res.status(200).json(vaults);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ message: errorMessage });
    }
  }

  async addFieldToVault(req: Request, res: Response) {
    try {
      const { vaultId, name, type } = req.body;
      const field = await this.vaultService.addFieldToVault(
        vaultId,
        name,
        type
      );
      res.status(201).json(field);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ message: errorMessage });
    }
  }

  async createVaultRecord(req: Request, res: Response) {
    try {
      const { vaultId, data } = req.body;
      const record = await this.vaultService.createVaultRecord(vaultId, data);
      res.status(201).json(record);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ message: errorMessage });
    }
  }
}
