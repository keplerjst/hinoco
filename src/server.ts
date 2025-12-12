import { D1Database, Fetcher } from '@cloudflare/workers-types'
import { Hono } from 'hono'
import api from './api'
import { ssrWithLoader } from './lib/ssr'
import { routes } from './routes'

export type CloudflareBindings = {
  ASSETS: Fetcher
  DB: D1Database
}

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.route('/api', api)

routes.forEach((route) => {
  app.get(route.path, ssrWithLoader(route))
})

export default app
