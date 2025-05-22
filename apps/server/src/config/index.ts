import dotenv from 'dotenv';
import { z } from 'zod';
import pkg from '../../package.json';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  DEBUG: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

const env = parsed.data;

export const config = {
  app: {
    name: 'MyApp',
    version: pkg.version,
    env: env.NODE_ENV,
    port: env.PORT,
    debug: env.DEBUG === 'true',
  },
  paths: {
    apiPrefix: '/api',
    userRoute: '/users',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'password',
    name: process.env.DB_NAME || 'myapp_db',
  },
};
