# PurrBook Portal

Provider dashboard for salon, vet clinic, and studio owners on the PurrBook platform. Built as a standalone app separate from the consumer-facing booking app (`amberpet-next`).

## Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | Overview — KPIs, today's schedule, quick actions |
| `/dashboard/bookings` | Booking list with status tabs (Pending / Confirmed / Completed / Cancelled) |
| `/dashboard/bookings/[id]` | Booking detail — pet info, owner contact, confirm/cancel actions |
| `/dashboard/services` | Service catalog — add/edit services, active toggles |
| `/dashboard/staff` | Team management — groomers, vets, boarding attendants |
| `/dashboard/analytics` | Revenue charts, top services, booking volume |
| `/dashboard/settings` | Business profile, operating hours, notification preferences |

## Stack

- **Next.js 16** (App Router)
- **React 19** / **TypeScript 5**
- **Tailwind CSS v4** with a shared design token system (warm amber/brown palette)
- **Plus Jakarta Sans** (headlines) · **Be Vietnam Pro** (body)
- Mock/seed data — no backend required to run

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the root redirects to `/dashboard`.

## Design System

Shares the same design tokens as `amberpet-next`. All color values are defined as CSS custom properties in `app/globals.css` and referenced via Tailwind utility classes (`bg-primary`, `text-on-surface`, etc.). Never use hardcoded hex values.

## Related Projects

- [`amberpet-next`](../amberpet-next) — consumer-facing booking app (purrbook.ph)
- `amberpet-portal` — this project, provider dashboard (portal.purrbook.ph)
