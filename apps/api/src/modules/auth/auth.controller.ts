import crypto from 'crypto';
import { Request, Response } from 'express';
import config from '../../config/config';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../shared/utils/jwt';
import * as repo from './auth.repository';
import * as service from './auth.service';

const cookieOptions = {
  httpOnly: true,
  secure: config.cookie.secure,
  sameSite: config.cookie.sameSite,
  maxAge: config.cookie.maxAge,
};

export const signupHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const { user, accessToken, refreshToken } = await service.signup(email, password);

    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.status(201).json({ user: { id: user.id, email: user.email }, accessToken });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const { user, accessToken, refreshToken } = await service.login(email, password);

    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.json({ user: { id: user.id, email: user.email }, accessToken });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const refreshHandler = async (req: Request, res: Response) => {
  try {
    const token = req.cookies['refreshToken'];
    if (!token) return res.status(401).json({ error: 'No refresh token' });

    let payload: any;
    try {
      payload = verifyRefreshToken(token);
    } catch (e) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const userId = Number(payload.sub);
    const user = await repo.findUserById(userId);
    if (!user) return res.status(401).json({ error: 'Invalid token' });

    const hashed = crypto.createHash('sha256').update(token).digest('hex');
    if (!user.refresh_token || user.refresh_token !== hashed) {
      // possible reuse or theft: clear stored token
      await repo.updateRefreshToken(user.id, null);
      return res.status(401).json({ error: 'Invalid token' });
    }

    // rotate tokens
    const newAccess = signAccessToken({ sub: user.id, email: user.email });
    const newRefresh = signRefreshToken({ sub: user.id });
    const newHashed = crypto.createHash('sha256').update(newRefresh).digest('hex');
    await repo.updateRefreshToken(user.id, newHashed);

    res.cookie('refreshToken', newRefresh, cookieOptions);
    res.json({ accessToken: newAccess });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    const token = req.cookies['refreshToken'];
    if (token) {
      try {
        const payload = verifyRefreshToken(token);
        if (payload?.sub) {
          await repo.updateRefreshToken(Number(payload.sub), null);
        }
      } catch (e) {}
    }
    res.clearCookie('refreshToken', cookieOptions);
    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
