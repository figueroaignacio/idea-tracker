import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { ideas } from '../../db/schema';

export const createIdea = async (data: {
  userId: number;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'idea' | 'in-progress' | 'completed' | 'archived';
  tags?: string[];
}) => {
  const [idea] = await db.insert(ideas).values(data).returning();
  return idea;
};

export const findIdeasByUser = async (userId: number) => {
  return await db.select().from(ideas).where(eq(ideas.userId, userId));
};

export const findIdeaById = async (id: number) => {
  const rows = await db.select().from(ideas).where(eq(ideas.id, id));
  return rows[0] ?? null;
};

export const updateIdea = async (
  id: number,
  data: Partial<{
    title: string;
    description: string;
    category: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'idea' | 'in-progress' | 'completed' | 'archived';
    tags: string[];
  }>,
) => {
  const [updatedIdea] = await db
    .update(ideas)
    .set({
      ...data,
      tags: data.tags ? data.tags : undefined,
    })
    .where(eq(ideas.id, id))
    .returning();

  if (!updatedIdea) {
    throw new Error('Idea not found');
  }

  return updatedIdea;
};

export const deleteIdea = async (id: number) => {
  await db.delete(ideas).where(eq(ideas.id, id));
};
