This is a [Next.js](https://nextjs.org) project.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Cloudflare Workers

This repo is set up to deploy to **Cloudflare Workers** (not Pages) using **OpenNext**.

### Prerequisites

- Install dependencies: `npm install`
- Configure environment variables for install URL endpoint:
  - `NEXT_PUBLIC_SARAVAFY_SUPABASE_URL`
  - `NEXT_PUBLIC_SARAVAFY_SUPABASE_ANON_KEY`

For local dev, create a `.env.local` file (dotenv format):

```
NEXT_PUBLIC_SARAVAFY_SUPABASE_URL=...
NEXT_PUBLIC_SARAVAFY_SUPABASE_ANON_KEY=...
```

### Incremental cache (R2)

OpenNext is configured to use an **R2-backed incremental cache**. The Worker expects an R2 bucket bound as `NEXT_INC_CACHE_R2_BUCKET` (see `wrangler.jsonc`).

Create the bucket once (example):

`wrangler r2 bucket create saravafy-web-inc-cache`

### Preview & Deploy

- Preview locally with the Worker runtime: `npm run preview`
- Deploy to Cloudflare Workers: `npm run deploy`

### Notes (Windows)

OpenNext/Wrangler can be flaky on Windows. For best results, run `npm run preview` and `npm run deploy` via **WSL** or a Linux CI runner.
