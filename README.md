# The Bell — Homepage Blocks (Frontend Test Assignment)

A demo implementation of two new homepage blocks for [thebell.io](https://thebell.io) — a rotating
product promo and a webinars list — built to live inside their existing grid "constructor", plus a
full subscription flow (tariffs → payment → success) reachable from either block.

This is a take-home test assignment, not production code for The Bell. All real data (product
pricing, webinars, grid behaviour) was sourced by inspecting the live site and its public GraphQL
endpoint; see [Key decisions](#key-decisions) for what's real vs. simulated.

## Tech stack

- **Angular 22** (standalone components, signals, `@if`/`@for` control flow)
- **@ngrx/signals** — SignalStore for both widget data loading and the subscription flow state
- **Reactive Forms** with custom validators (Luhn check, expiry-in-the-past check)
- **@ngx-translate** — runtime i18n, dictionary in `public/i18n/ru.json`
- **Tailwind CSS v4** — utility classes in templates, with a small `@layer components` escape
  hatch for the handful of patterns that repeat across the app (`.btn-brand`, `.card-outline`,
  `.cell-shadow`)
- **Vitest** (via Angular's own unit-test builder) for tests and coverage

## Getting started

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Available scripts

| Command                 | What it does                         |
| ----------------------- | ------------------------------------ |
| `npm start`             | Dev server with live reload          |
| `npm run build`         | Production build to `dist/`          |
| `npm test`              | Run the unit test suite once         |
| `npm run test:coverage` | Run tests with a coverage report     |
| `npm run lint`          | ESLint (TS + Angular template rules) |
| `npm run format`        | Format `src/**` with Prettier        |
| `npm run format:check`  | Check formatting without writing     |

## Project structure

```
src/app/
  shared/components/   Generic, content-agnostic UI primitives
    grid-line/          Row of the grid — basis 25/33/50/100, mirrors their real layout system
    grid-cell/          A cell inside a row — plain card or photo card with a gradient overlay
    modal/              Backdrop + card shell reused by every modal in the subscription flow

  features/
    widgets/             The two homepage blocks
      product-promo-widget/   Rotating "product of the day" card
      webinars-widget/        Row of webinar cards + a link to the real donation page
      webinar-card/            A single webinar card (presentational)
    subscription/          Tariffs → payment → success flow, opened from either widget
      subscription-flow.store.ts   Shared state: which product/step/tariff is active
      tariff-modal/ payment-modal/ success-modal/

  data/                 Mock data seeded with real values pulled from the live site
  models/               Shared TypeScript interfaces/enums
  services/             Repositories (`of()`-wrapped, simulate an HTTP data source) and small
                         pure-logic services (date-based rotation, webinar status)
  testing/              Shared test helpers (e.g. in-memory translations for specs)

public/i18n/ru.json      Translation dictionary (UI copy only — not the mock content data)
```

## Key decisions

The brief intentionally leaves a lot unspecified. Where it did, here's what was decided and why:

- **Grid system** — mirrors the real site's `app-line`/`line-widget` pattern: rows have a fixed
  `basis` (25/33/50/100 → 4/3/2/1 columns) and a basis-specific default `min-height`. On mobile
  every row simply stacks into a single column — the real site does **not** turn dense rows into a
  horizontal carousel by default (that's an opt-in editorial flag, confirmed by reading their CSS).
- **Product data** — The Bell.Tech and The Bell.Pro have real cover images and real tariff pricing
  (trial / monthly / yearly) pulled from their subscription pages. The Bell.Invest and Bell.Club
  have no self-serve price on the site, so their CTA opens an external link instead of the tariff
  modal.
- **Webinars data** — pulled from `the-chat.io`, matched to the correct photo via each Tilda
  block's field id (not document order, which is misleading since the image column precedes the
  text column for every card but the first).
- **Webinars monetisation** — their real payment path is a separate Stripe-based donation page
  (`donate.osetinskaya.io`), not tied to any of the four Bell products. The widget links there
  directly rather than forcing an arbitrary tariff modal on top of it.
- **Payment modal** — a self-contained fake form (Luhn-validated card number, expiry, CVV) rather
  than a redirect to their real checkout, per the brief's explicit "build the modal windows" ask.
  Field labels and layout match their real checkout form.
- **No SSR** — the real site is Angular Universal for SEO, but this demo is static hosting
  (GitHub Pages/Vercel/StackBlitz), so client-side rendering only. Noted as a real constraint to
  flag, not solved here.

## Testing

Coverage currently sits around 98% statements / 99% branches / 99% lines. The two remaining gaps
are an empty root component class and a defensive template branch that the public store API can't
actually reach — both deliberately left as-is rather than written around.
