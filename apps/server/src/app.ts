import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";
import { AppDataSource } from "./config/database";
import { PassportConfig } from "./config/passport";
import { UserRepository } from "./repositories/user-repository";
import { AuthRoutes } from "./routes/auth-routes";
import { PasswordRoutes } from "./routes/password-routes";
import { UsersService } from "./services/users-service";

export class App {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeDatabase();
    this.initializePassport();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "UPDATE", "DELETE"],
      })
    );
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET || "default_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === "production",
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: "lax",
          httpOnly: true,
        },
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log("Base de datos conectada correctamente");
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
    }
  }

  private initializePassport(): void {
    const userRepository = new UserRepository();
    const userService = new UsersService(userRepository);
    new PassportConfig(userService);
  }

  private initializeRoutes(): void {
    const authRoutes = new AuthRoutes();
    const passwordRoutes = new PasswordRoutes();

    this.app.use("/api/auth", authRoutes.getRouter());
    this.app.use("/api/passwords", passwordRoutes.getRouter());

    this.app.use("/api/*", (req, res) => {
      if (!req.isAuthenticated()) {
        return res.redirect("/api/auth/providers");
      }
      res.status(404).json({ message: "Ruta no encontrada" });
    });

    this.app.get("/", (req, res) => {
      if (req.isAuthenticated()) {
        return res.redirect("/api/auth/profile");
      }
      res.redirect("/api/auth/providers");
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor ejecutándose en http://localhost:${this.port}`);
    });
  }
}
