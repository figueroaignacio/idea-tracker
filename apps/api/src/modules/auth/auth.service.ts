import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { signAccessToken, signRefreshToken } from '../../shared/utils/jwt';
import * as repo from './auth.repository';

const SALT_ROUNDS = 10;

export const signup = async (email: string, password: string) => {
  const existing = await repo.findUserByEmail(email);
  if (existing) throw new Error('Email already in use');

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await repo.createUser({
    email,
    password: hashed,
    firstName: '',
    lastName: '',
  });

  const accessToken = signAccessToken({ sub: user.id, email: user.email });
  const refreshToken = signRefreshToken({ sub: user.id });

  const hashedRefresh = crypto.createHash('sha256').update(refreshToken).digest('hex');
  await repo.updateRefreshToken(user.id, hashedRefresh);

  return { user, accessToken, refreshToken };
};

export const login = async (email: string, password: string) => {
  const user = await repo.findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const accessToken = signAccessToken({ sub: user.id, email: user.email });
  const refreshToken = signRefreshToken({ sub: user.id });
  const hashedRefresh = crypto.createHash('sha256').update(refreshToken).digest('hex');
  await repo.updateRefreshToken(user.id, hashedRefresh);

  return { user, accessToken, refreshToken };
};
