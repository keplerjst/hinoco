# Hinoco

An opinionated full-stack template for building modern web apps on Cloudflare.

## Why

Building a full-stack app with Hono and Preact? You'll quickly find that SSR, hydration, and routing aren't straightforward—and resources are scarce.

Hinoco solves this. It's a ready-to-deploy template that handles the infrastructure, so you can focus on your product.

[Demo](https://hinoco.keplerjst.workers.dev/)

## Features

- SSR, Hydration, Routing and Data Loader
- Hono + Preact
- Vite
- Tailwind CSS
- Cloudflare Workers
- Cloudflare D1 + Drizzle ORM
- Dark mode support

## Project Structure

```
src/
├── server.ts          # Hono server entry point
├── client.tsx         # Client-side hydration entry point
├── App.tsx            # Root Preact component
├── routes.ts          # Route definitions
├── style.css          # Global styles (Tailwind)
├── api/
│   └── index.ts       # API routes (/api/*)
├── app/
│   ├── routes/        # Page components with loaders
│   │   ├── home.tsx
│   │   └── about.tsx
│   ├── components/    # Shared components
│   │   ├── Header.tsx
│   │   └── ThemeProvider.tsx
│   └── NotFound.tsx   # 404 page
├── db/
│   └── schema.ts      # Drizzle schema
└── lib/
    └── ssr.tsx        # SSR middleware
```

## Prerequisites

- Node.js v18+
- pnpm
- Cloudflare account
- Wrangler CLI

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourname/hinoco.git
cd hinoco
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Create a D1 database

```bash
npx wrangler d1 create hinoco-db
```

This command automatically updates `wrangler.jsonc`. Remove the duplicate `d1_databases` entry if needed.

### 4. Run migrations (local)

```bash
npx wrangler d1 migrations apply hinoco-db --local
```

### 5. Start development server

```bash
pnpm run dev
```

## Deployment

This project uses GitHub Actions for automatic deployment. On every push to `main`, it will:

1. Build the project
2. Run D1 migrations
3. Deploy to Cloudflare Workers

### Setup GitHub Secrets

Add the following secrets to your repository (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` - Create at [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
- `CLOUDFLARE_ACCOUNT_ID` - Found in your Cloudflare dashboard URL

Following permissions are required for the API token:

- Account > D1: Edit
- Account > Workers Scripts: Edit

### Manual deployment (optional)

```bash
npx wrangler d1 migrations apply hinoco-db --remote
pnpm run deploy
```

## Database

Schema is defined in `src/db/schema.ts`. To generate new migrations:

```bash
npx drizzle-kit generate
```

## Author

Built by [@keplerjst](https://x.com/keplerjst)

## License

MIT
