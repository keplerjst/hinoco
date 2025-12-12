import { D1Database, Fetcher } from '@cloudflare/workers-types'
import { Hono } from 'hono'
import App from './App'
import api from './api'
import { ssr } from './lib/ssr'

export type CloudflareBindings = {
  ASSETS: Fetcher
  DB: D1Database
}

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.route('/api', api)
app.get('*', ssr(App))

export default app
