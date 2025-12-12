import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { counter } from '../db/schema'
import type { CloudflareBindings } from '../server'

const api = new Hono<{ Bindings: CloudflareBindings }>()
  .get('/hello', (c) => {
    return c.json({ message: 'Hello!' })
  })
  .get('/count', async (c) => {
    const db = drizzle(c.env.DB)
    const result = await db.select().from(counter).all()
    return c.json({ count: result.length })
  })
  .post('/count', async (c) => {
    const db = drizzle(c.env.DB)
    await db.insert(counter).values({})
    const result = await db.select().from(counter).all()
    return c.json({ count: result.length })
  })

export type ApiType = typeof api
export default api
