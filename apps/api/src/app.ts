import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import config from './config/config';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  }),
);

// Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// health
app.get('/health', (req, res) => res.sendStatus(200));

export default app;
