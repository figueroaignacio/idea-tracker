import cookieParser from 'cookie-parser';
import express from 'express';
import { AuthRoutes } from './modules/auth/auth.routes';

export class App {
  public app: express.Application;
  private authRoutes: AuthRoutes;

  constructor() {
    this.app = express();
    this.authRoutes = new AuthRoutes();

    this.setupMiddlewares();
    this.loadRoutes();
  }

  private setupMiddlewares() {
    this.app.use(cookieParser());
    this.app.use(express.json());
  }

  private loadRoutes() {
    this.app.use('/api/auth', this.authRoutes.router);
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  }
}
