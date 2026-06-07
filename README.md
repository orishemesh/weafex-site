# Weafex — Marketing Site

A multi-page brand site for Weafex. It explains what Weafex is, what the name
means (WEAF + EX — the fifth element of the global economy), what we believe
about global trade, and what the app does.

Design: light, editorial, typography-led — big type, generous whitespace,
restrained color (coral used sparingly), one deliberate dark band per page.

## Pages

- **Home** (`/[lang]`) — typographic hero, the "fifth element" idea, a today→Weafex
  comparison, and links into About / Product.
- **About** (`/[lang]/about`) — the name broken down (Water/Earth/Air/Fire + EX)
  as a connected elemental flow into the EX core, the vision, and a pre-launch note.
- **Product** (`/[lang]/product`) — what we do, what we solve, and the app's
  features (globe, visual feed, verified profiles, direct outreach) shown as
  clean illustrated mockups in alternating rows.
- **Contact** (`/[lang]/contact`) — brand email + waitlist.
- **Waitlist** (`/[lang]/waitlist`) — the join CTA (front-end only for now).

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS (brand tokens in `tailwind.config.ts`)
- Heebo (Google Fonts, Hebrew + Latin)
- Framer Motion (page transitions, scroll reveals, mobile menu)
- lucide-react (icons)

## Languages

Hebrew (default, RTL) and English, at `/he` and `/en`. The globe icon in the nav
switches language (preserving the current page) and remembers the choice
(cookie + localStorage). `/` redirects to the remembered locale, default Hebrew.

## Run locally

```bash
./start.sh            # installs deps on first run, then starts on :3000
# or:
npm install
npm run dev           # http://localhost:3000  (locked to port 3000)
```

## Build

```bash
npm run build
npm run start
```

## Notes

- The waitlist is front-end only (no backend yet) — clicking confirms locally.
- Brand colors are the locked tokens: blue `#2563EB`, coral `#FF5F5F`,
  navy `#111827`. Logo is the swirl mark (`public/logo.svg`) + Heebo wordmark
  until a dedicated Weafex logo lands.
