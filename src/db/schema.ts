import { sqliteTable, text, integer as int } from 'drizzle-orm/sqlite-core'

const uuidFn = () => crypto.randomUUID()
const timestampFn = () => new Date()

export const counter = sqliteTable('counts', {
  id: text('id').primaryKey().$defaultFn(uuidFn),
  createdAt: int('created_at', { mode: 'timestamp' }).$defaultFn(timestampFn),
})

// Example:
// export const users = sqliteTable('users', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   name: text('name').notNull(),
//   email: text('email').notNull().unique(),
//   createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
//     () => new Date()
//   ),
// })

// export const posts = sqliteTable('posts', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   title: text('title').notNull(),
//   content: text('content'),
//   userId: integer('user_id').references(() => users.id),
// })
