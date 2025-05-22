import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { db } from '../../db/client';
import { users } from '../../db/schema';
import authConfig from './config/auth.config';

export class AuthService {
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

  generateJWT(user: { id: string; email: string }) {
    return jwt.sign({ id: user.id, email: user.email }, authConfig.jwtSecret, {
      expiresIn: '7d',
    });
  }

  verifyJWT(token: string) {
    try {
      return jwt.verify(token, authConfig.jwtSecret);
    } catch {
      return null;
    }
  }

  async getProviders(): Promise<string[]> {
    return Object.keys(authConfig).filter((key) => key !== 'jwtSecret');
  }
}
