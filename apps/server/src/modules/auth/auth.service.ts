import { Response } from 'express';

// DB
import { eq } from 'drizzle-orm';
import { db } from '../../db/client';
import { users } from '../../db/schema';

// Config
import authConfig from './config/auth.config';

// Service
import { JwtService } from './jwt.service';

export class AuthService {
  private jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService();
  }

  async findOrCreateUser(profile: {
    name: string;
    email: string;
    avatarUrl?: string;
    provider: string;
  }) {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, profile.email))
      .limit(1)
      .then((res) => res[0]);

    if (existingUser) return existingUser;

    const [newUser] = await db
      .insert(users)
      .values({
        name: profile.name,
        email: profile.email,
        avatarUrl: profile.avatarUrl || null,
        provider: profile.provider,
      })
      .returning();

    return newUser;
  }

  generateJWT(user: { id: string; email: string; provider: string }): string {
    return this.jwtService.generateToken({
      id: user.id,
      email: user.email,
      provider: user.provider,
    });
  }

  verifyJWT(token: string): object | null {
    const result = this.jwtService.verifyToken(token);
    if (typeof result === 'string' || result === null) {
      return null;
    }
    return result;
  }

  async getProviders(): Promise<string[]> {
    return Object.keys(authConfig).filter((key) => key !== 'jwtSecret');
  }

  async getUserProfile(userId: string) {
    return db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .then((res) => res[0]);
  }

  logout(res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }
}
