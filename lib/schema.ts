import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  date: timestamp('date', { mode: 'date' }).notNull(),
  location: text('location').notNull(),
  imageUrl: text('imageUrl'),
});

export const registrations = pgTable('registrations', {
  id: serial('id').primaryKey(),
  userId: serial('userId').references(() => users.id),
  eventId: serial('eventId').references(() => events.id),
  registeredAt: timestamp('registeredAt', { mode: 'date' }).defaultNow(),
  verified: boolean('verified').default(false),
});