import express from 'express';

// Middlewares
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Config
import { corsConfig, rateLimitConfig } from './config/middlewares.config';

// Routes
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
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: corsConfig.origin,
        credentials: corsConfig.credentials,
        methods: corsConfig.methods,
      }),
    );
    this.app.use(
      rateLimit({
        windowMs: rateLimitConfig.windowMs,
        max: rateLimitConfig.max,
        standardHeaders: rateLimitConfig.standardHeaders,
        legacyHeaders: rateLimitConfig.legacyHeaders,
      }),
    );
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
function cors(arg0: any): any {
  throw new Error('Function not implemented.');
}
