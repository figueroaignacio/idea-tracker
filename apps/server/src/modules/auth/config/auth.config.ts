import dotenv from 'dotenv';
dotenv.config();

export default {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackUrl: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3001/auth/github/callback',
  },
  jwtSecret: process.env.JWT_SECRET || 'secret_dev',
};
