// JWT
import jwt from 'jsonwebtoken';

// Config
import authConfig from './config/auth.config';

export class JwtService {
  generateToken(payload: object) {
    return jwt.sign(payload, authConfig.jwtSecret, { expiresIn: '7d' });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, authConfig.jwtSecret);
    } catch {
      return null;
    }
  }
}
