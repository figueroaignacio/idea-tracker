import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  refresh_token: varchar('refresh_token', { length: 255 }),
});

export const ideaPriority = pgEnum('idea_priority', ['low', 'medium', 'high', 'urgent']);
export const ideaStatus = pgEnum('idea_status', ['idea', 'in-progress', 'completed', 'archived']);

export const ideas = pgTable('ideas', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  priority: ideaPriority('priority').notNull(),
  status: ideaStatus('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  tags: text('tags').array(),
});
