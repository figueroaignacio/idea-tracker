import { Request, Response } from 'express';
import { AuthService } from './auth.service';

interface AuthConfig {
  github: {
    clientId: string;
    clientSecret: string;
  };
}

export class AuthController {
  private authService: AuthService;
  private config: AuthConfig;

  constructor(authService: AuthService, config: AuthConfig) {
    this.authService = authService;
    this.config = config;
  }

  async githubCallback(req: Request, res: Response) {
    const code = req.query.code as string;
    if (!code) return res.status(400).send('Code is required');

    try {
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.config.github.clientId,
          client_secret: this.config.github.clientSecret,
          code,
        }),
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      if (!accessToken) return res.status(400).send('No access token from GitHub');

      const userResponse = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!userResponse.ok) return res.status(400).send('Failed to fetch user profile');

      const profile = await userResponse.json();

      const user = await this.authService.findOrCreateUser({
        name: profile.name || profile.login,
        email: profile.email || '',
        avatarUrl: profile.avatar_url,
        provider: 'github',
      });

      const token = this.authService.generateJWT(user);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ user });
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
}
