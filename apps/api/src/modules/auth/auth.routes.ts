import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { loginHandler, logoutHandler, refreshHandler, signupHandler } from './auth.controller';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 6,
  message: { error: 'Too many login attempts, try again later' },
});

router.post('/signup', signupHandler);
router.post('/login', loginLimiter, loginHandler);
router.post('/refresh', refreshHandler);
router.post('/logout', logoutHandler);

export default router;
