import { NextFunction, Request, Response } from 'express';

// Service
import { AuthService } from './auth.service';

// Strategies
import { GithubStrategy } from './strategies/github.strategy';

interface AuthConfig {
  github: {
    clientId: string;
    clientSecret: string;
  };
}

export class AuthController {
  private authService: AuthService;
  private config: AuthConfig;
  private githubStrategy: GithubStrategy;

  constructor(authService: AuthService, config: AuthConfig) {
    this.authService = authService;
    this.config = config;
    this.githubStrategy = new GithubStrategy(config.github.clientId, config.github.clientSecret);
  }

  async githubCallback(req: Request, res: Response, next: NextFunction) {
    const code = req.query.code as string;
    if (!code) return res.status(400).send('Code is required');

    try {
      const accessToken = await this.githubStrategy.getAccessToken(code);
      const profile = await this.githubStrategy.getUserProfile(accessToken);

      const user = await this.authService.findOrCreateUser(profile);
      const token = this.authService.generateJWT(user);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ user, token });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Authentication failed');
    }
  }

  async getProviders(req: Request, res: Response) {
    try {
      const providers = await this.authService.getProviders();
      return res.json({ providers });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al obtener proveedores');
    }
  }

  async profile(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const dbUser = await this.authService.getUserProfile(user.id);
    return res.json({ user: dbUser });
  }

  logout(req: Request, res: Response) {
    this.authService.logout(res);
    return res.status(200).json({ message: 'Logged out' });
  }
}
