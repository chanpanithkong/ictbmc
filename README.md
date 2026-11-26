# ICT Banteay Meanchey — Corporate Website

Frontend-only corporate website for ICT Banteay Meanchey, built with Next.js 16 (App Router, Cache Components), TypeScript and Tailwind CSS v4. There is no backend, API, database or authentication. All content lives in static TypeScript data files.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Configuration

| What | Where |
| --- | --- |
| Production URL (used for canonical URLs, sitemap, robots, Open Graph) | `NEXT_PUBLIC_SITE_URL` env var, e.g. `https://www.example.com` |
| Email, phone, WhatsApp, address, hours | `data/company.ts` → `contact` |
| Office map pin (latitude/longitude) | `data/company.ts` → `officeLocation` |
| Social media links | `data/company.ts` → `socialLinks` |
| Contact form behaviour | `data/company.ts` → `contactFormConfig` |

Contact details are intentionally empty. Empty values show as "To be announced" and are left out of structured data. Empty social links show as disabled icons.

### Contact form

By default the form runs in **demo mode**. It validates in the browser and shows a success state, and it tells the user clearly that nothing was sent. To connect an approved form service or email provider later, set `mode: "endpoint"` and an `endpoint` URL. The form then POSTs its fields as JSON.

## Languages (English / Khmer)

Every page is available in Khmer at `/kh/...` (the default) and English at `/en/...`. The `<html lang>` and hreflang value for Khmer is `km`, the ISO language code.

- `proxy.ts` redirects `/` (and any path without a locale) to Khmer, unless the visitor chose English with the switcher (`NEXT_LOCALE` cookie). The browser language is ignored. The default is set by `defaultLocale` in `lib/i18n/config.ts`.
- The EN / KH switch in the navbar keeps the current page and remembers the choice in that cookie.
- **UI strings:** `lib/i18n/dictionaries/en.ts` and `kh.ts`. The Khmer file is type-checked against the English keys, so a missing key fails the build.
- **Content:** English stays in `data/*.ts`. Khmer translations live in `data/kh/*.ts`, keyed by slug or list order, and `lib/i18n/content.ts` merges them. A missing Khmer entry falls back to English.
- Server components read the locale through `next/root-params` (`getI18n()` in `lib/i18n/server.ts`). Client components use `useI18n()`.
- Use `@/components/i18n/link` instead of `next/link`. It adds the `/en` or `/kh` prefix to internal paths automatically.
- Khmer text uses the Kantumruy Pro font, with taller line-height and no negative letter-spacing.
- Left in English on purpose: the product UI preview sample screens and the Open Graph image, which would need an embedded Khmer font file.

Have a native Khmer speaker review the Khmer translations before launch.

## Content

| File | Content |
| --- | --- |
| `data/services.ts` | 8 services (home + `/services`) |
| `data/solutions.ts` | 6 solutions |
| `data/products.ts` | 12 products, used to generate `/products/[slug]` pages |
| `data/projects.ts` | Portfolio entries. **All current entries are demo concepts** (`isDemo: true`). Replace them with real case studies once clients approve. |
| `data/process.ts` | "How we work" and consulting processes |
| `data/industries.ts`, `data/about.ts`, `data/consulting.ts` | Supporting page content |
| `data/navigation.ts` | Navbar and footer links |

Product UI previews are rendered from each product's `mockup` data. Their figures are illustrative sample values, not real statistics.

## Structure

```
app/            routes, metadata, sitemap.ts, robots.ts, opengraph-image.tsx
components/
  layout/       navbar, mobile menu, footer, back-to-top
  home/         homepage sections
  products/     product card, explorer (search/filter), detail template
  projects/     portfolio explorer + visuals
  contact/      contact form
  services/     service card
  shared/       page hero, CTA, timeline, mockups, JSON-LD, reveal observer
  ui/           button, badge, section heading, icon tile, check list
data/           static content
lib/utils.ts    cn(), absoluteUrl(), revealDelay()
types/          shared TypeScript types
```
