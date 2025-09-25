import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../../config/config';

export const signAccessToken = (payload: object) => {
  const options: SignOptions = {
    expiresIn: config.jwt.accessTokenExpiresIn as any,
  };

  return jwt.sign(payload, config.jwt.accessTokenSecret, options);
};

export const signRefreshToken = (payload: object) => {
  const options: SignOptions = {
    expiresIn: config.jwt.refreshTokenExpiresIn as any,
  };

  return jwt.sign(payload, config.jwt.refreshTokenSecret, options);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.jwt.accessTokenSecret) as any;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwt.refreshTokenSecret) as any;
};
