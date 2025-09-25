import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { users } from '../../db/schema';

export const findById = async (id: number) => {
  const rows = await db.select().from(users).where(eq(users.id, id));
  return rows[0] ?? null;
};
