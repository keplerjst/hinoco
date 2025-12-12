# Hinoco

An opinionated template for Hono + Preact on Cloudflare stack.

- Hono + Preact
- SSR, Hydration, Routing, Data Loader
- Vite + TailwindCSS
- Cloudflare Worker (deployment via Github Actions)
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
# Rename hinoco-db to whatever you like
❯ npx wrangler@latest d1 create hinoco-db
✅ Successfully created DB hinoco-db in region XXX
Created your new D1 database.

{
  "d1_databases": [
    {
      "binding": "DB", # Rename this whatever you like
      "database_name": "hinoco-db",
      "database_id": "<unique-ID-for-your-database>"
    }
  ]
}
```

Configuration file is placed at `drizzle.config.ts`, in which I defined schema at `src/db/schema.ts`.

Drizzle generates migration script based on the schema:

```bash
❯ pnpm drizzle-kit generate
No config path provided, using default 'drizzle.config.ts'
Reading config file '/Users/nozoe/dev/hono-preact-on-cloudflare/drizzle.config.ts'
1 tables
counts 2 columns 0 indexes 0 fks

[✓] Your SQL migration file ➜ drizzle/0000_xxx.sql 🚀
```

```bash
❯ npx wrangler d1 migrations apply

🌀 Executing on local database hinoco-db from .wrangler/state/v3/d1:
🌀 To execute on your remote database, add a --remote flag to your wrangler command.
🚣 1 command executed successfully.
```

```bash
npx wrangler d1 execute hinoco-db --local --command="SELECT * FROM counts"
```

### References

- [Drizzle <> Cloudflare D1](https://orm.drizzle.team/docs/connect-cloudflare-d1)
