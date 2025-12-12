# Hono + Preact on Cloudflare

This is an original boilerplate for my favorite tech stack:

- Hono + Preact with SSR, hydration and routing
- TailwindCSS
- Vite
- Cloudflare Worker
- Cloudflare D1 + Drizzle ORM

# Usage

## Cloudflare D1 + Drizzle ORM

```bash
# This writes `d1_databases` section in wrangler.jsonc
npx wrangler@latest d1 create your-db
```

```bash
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
pnpm drizzle-kit generate
```

### References

- [Drizzle <> Cloudflare D1](https://orm.drizzle.team/docs/connect-cloudflare-d1)

## Commands

```txt
pnpm install
pnpm run dev
```

```txt
pnpm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
pnpm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
