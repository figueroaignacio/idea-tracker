import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { users } from '../../db/schema';

export async function createUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const [user] = await db
    .insert(users)
    .values({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
    .returning();

  return user;
}

export async function findUserByEmail(email: string) {
  const rows = await db.select().from(users).where(eq(users.email, email));

  return rows[0] ?? null;
}

export const findUserById = async (id: number) => {
  const rows = await db.select().from(users).where(eq(users.id, id));
  return rows[0] ?? null;
};

export const updateRefreshToken = async (id: number, hashedToken: string | null) => {
  await db
    .update(users)
    .set({ refresh_token: hashedToken ?? '' })
    .where(eq(users.id, id));
};
