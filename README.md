# Hono + Preact on Cloudflare

This is an original boilerplate for the following tech stack:

- Hono + Preact with SSR, hydration and routing
- TailwindCSS
- Vite
- Cloudflare Worker
- Cloudflare D1 + Drizzle ORM

# Usage

```bash
pnpm install
pnpm run dev
```

```bash
pnpm run deploy # Don't miss `run`, otherwise pnpm tries to deploy as pnpm package
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
pnpm run cf-typegen
```

Pass your Cloudflare Bindings as generics when instantiation `Hono`:

```ts
// src/server.ts
type Bindings = {
  DB: D1Database
}
const app = new Hono<{ Bindings: Bindings }>()
```

## Cloudflare D1 + Drizzle ORM

```bash
# This writes `d1_databases` section in wrangler.jsonc
❯ npx wrangler@latest d1 create your-db
✅ Successfully created DB your-db in region XXX
Created your new D1 database.

{
  "d1_databases": [
    {
      "binding": "your-db", # Rename this whatever you like such as "DB"
      "database_name": "your-db",
      "database_id": "<unique-ID-for-your-database>"
    }
  ]
}
```

Configuration file is placed at `drrizzle.config.ts`, in which I defined schema at `src/db/schema.ts`.

Drizzle generates migration script based on the schema:

```bash
❯ pnpm drizzle-kit generate
No config path provided, using default 'drizzle.config.ts'
Reading config file '/Users/nozoe/dev/hono-preact-on-cloudflare/drizzle.config.ts'
1 tables
counts 2 columns 0 indexes 0 fks

[✓] Your SQL migration file ➜ drizzle/0000_absurd_shockwave.sql 🚀
```

### References

- [Drizzle <> Cloudflare D1](https://orm.drizzle.team/docs/connect-cloudflare-d1)
