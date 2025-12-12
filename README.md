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
# Rename hono-preact-on-cloudflare-db to whatever you like
❯ npx wrangler@latest d1 create hono-preact-on-cloudflare-db
✅ Successfully created DB hono-preact-on-cloudflare-db in region XXX
Created your new D1 database.

{
  "d1_databases": [
    {
      "binding": "DB", # Rename this whatever you like
      "database_name": "hono-preact-on-cloudflare-db",
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

[✓] Your SQL migration file ➜ drizzle/0000_xxx.sql 🚀
```

```bash
❯ npx wrangler d1 execute hono-preact-on-cloudflare-db --local --file=./drizzle/0000_xxx.sql

 ⛅️ wrangler 4.53.0 (update available 4.54.0)
─────────────────────────────────────────────
Resource location: local

Use --remote if you want to access the remote instance.

🌀 Executing on local database hono-preact-on-cloudflare-db (9aaf7222-da79-4967-915e-d7080b66edac) from .wrangler/state/v3/d1:
🌀 To execute on your remote database, add a --remote flag to your wrangler command.
🚣 1 command executed successfully.
```

```bash
npx wrangler d1 execute hono-preact-on-cloudflare-db --local --command="SELECT * FROM counts"
```

### References

- [Drizzle <> Cloudflare D1](https://orm.drizzle.team/docs/connect-cloudflare-d1)
