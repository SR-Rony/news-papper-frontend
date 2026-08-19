# The Daily Column — Frontend

Next.js 16 (App Router) frontend for The Daily Column, a full digital newspaper platform. Talks to the companion NestJS API in `../backend`.

## Stack

Next.js · TypeScript · Tailwind CSS v4 · TanStack Query · React Hook Form + Zod · Tiptap · next-themes · Recharts · lucide-react

## Getting started

Make sure the backend is running first (see `../backend/README.md`), then:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

`.env.local` (see `.env.example`):

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

## ⚠️ Production build order matters

The homepage and a few other pages are statically generated with ISR (`revalidate: 60`) for performance. **The backend must be reachable when you run `next build`**, or those pages will bake in empty data until the next revalidation window. In CI/CD, always deploy/start the backend before building the frontend. If you'd rather trade caching for guaranteed freshness, add `export const dynamic = "force-dynamic"` to `app/(public)/page.tsx`.

## Architecture

- `lib/api-client.ts` — client-side API calls (attaches the JWT from session storage)
- `lib/server-fetch.ts` — Server Component data fetching (no auth; public endpoints only)
- `hooks/` — TanStack Query hooks wrapping the API client
- `components/dashboard/dashboard-guard.tsx` — client-side route protection for `/dashboard` (staff roles only; the real authorization boundary is enforced server-side by the API)

## What's included

- Full public site, auth, account area, and admin dashboard, all wired to the real backend (see project root notes)
- Light/dark theme, English/Bangla toggle, SEO metadata + sitemap, accessible throughout
- Video news currently uses local placeholder data — there's no backend Video entity yet

## Login

Seeded accounts from the backend (password `password123`): `admin@dailycolumn.test` (SUPER_ADMIN), `editor@dailycolumn.test` (EDITOR). Register a new account via `/auth/register` to test as a regular reader.
