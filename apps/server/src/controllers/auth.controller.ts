import { Request, Response } from "express";
import passport from "passport";

export class AuthController {
  getAuthProviders(req: Request, res: Response): void {
    res.status(200).json({
      providers: [
        { name: "GitHub", url: "/api/auth/github" },
        { name: "Google", url: "/api/auth/google" },
      ],
    });
  }

  githubAuth(req: Request, res: Response): void {
    passport.authenticate("github")(req, res);
  }

  githubAuthCallback(req: Request, res: Response): void {
    passport.authenticate("github", {
      successRedirect: "/api/auth/profile",
      failureRedirect: "/api/auth/providers",
    })(req, res);
  }

  googleAuth(req: Request, res: Response): void {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
  }

  googleAuthCallback(req: Request, res: Response): void {
    passport.authenticate("google", {
      successRedirect: "/api/auth/profile",
      failureRedirect: "/api/auth/providers",
    })(req, res);
  }

  getProfile(req: Request, res: Response): void {
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }

    res.status(200).json({ user: req.user });
  }

  logout(req: Request, res: Response): void {
    req.logout(function (err) {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }
      res.status(200).json({ message: "Sesión cerrada con éxito" });
    });
  }
}
