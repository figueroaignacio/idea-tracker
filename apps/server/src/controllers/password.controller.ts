import { Request, Response } from "express";
import { PasswordService } from "../services/password.service";

export class PasswordController {
  private passwordService: PasswordService;

  constructor() {
    this.passwordService = new PasswordService();
  }

  async getAllPasswords(req: Request, res: Response): Promise<void> {
    try {
      if (!req.isAuthenticated() || !req.user) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      const userId = (req.user as any).id;
      const passwords = await this.passwordService.getAllUserPasswords(userId);

      res.status(200).json(passwords);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener contraseñas", error });
    }
  }

  async getPassword(req: Request, res: Response): Promise<void> {
    try {
      if (!req.isAuthenticated() || !req.user) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      const userId = (req.user as any).id;
      const passwordId = parseInt(req.params.id);

      const password = await this.passwordService.getPasswordById(
        passwordId,
        userId
      );

      if (!password) {
        res.status(404).json({ message: "Contraseña no encontrada" });
        return;
      }

      res.status(200).json(password);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener la contraseña", error });
    }
  }

  async createPassword(req: Request, res: Response): Promise<void> {
    try {
      if (!req.isAuthenticated() || !req.user) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      const userId = (req.user as any).id;

      const { title, username, password, website, notes, provider } = req.body;

      const newPassword = await this.passwordService.createPassword({
        title,
        username,
        password,
        website,
        notes,
        userId,
        provider,
      });

      res.status(201).json(newPassword);
    } catch (error) {
      console.error("Create Password Error:", error);
      res.status(500).json({
        message: "Error al crear la contraseña",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      if (!req.isAuthenticated() || !req.user) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      const userId = (req.user as any).id;
      const passwordId = parseInt(req.params.id);
      const updateData = req.body;

      const updatedPassword = await this.passwordService.updatePassword(
        passwordId,
        userId,
        updateData
      );

      if (!updatedPassword) {
        res.status(404).json({ message: "Contraseña no encontrada" });
        return;
      }

      res.status(200).json(updatedPassword);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al actualizar la contraseña", error });
    }
  }

  async deletePassword(req: Request, res: Response): Promise<void> {
    try {
      if (!req.isAuthenticated() || !req.user) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      const userId = (req.user as any).id;
      const passwordId = parseInt(req.params.id);

      const success = await this.passwordService.deletePassword(
        passwordId,
        userId
      );

      if (!success) {
        res.status(404).json({ message: "Contraseña no encontrada" });
        return;
      }

      res.status(200).json({ message: "Contraseña eliminada con éxito" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al eliminar la contraseña", error });
    }
  }

  async generatePassword(req: Request, res: Response): Promise<void> {
    try {
      const { length } = req.query;
      const passwordLength = length ? parseInt(length as string) : 16;

      if (passwordLength < 8 || passwordLength > 64) {
        res.status(400).json({
          message:
            "La longitud de la contraseña debe estar entre 8 y 64 caracteres",
        });
        return;
      }

      const password = await this.passwordService.generateRandomPassword(
        passwordLength
      );
      res.status(200).json({ password });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al generar la contraseña", error });
    }
  }
}
