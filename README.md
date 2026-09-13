# Platan Capital Management — Website

Next.js 14 (App Router) + Sanity CMS + trilingual routing (EN / AM / RU),
built to deploy on Vercel under the existing `platan.capital` domain.

## Stack

- **Next.js 14** — App Router, server components, ISR (60s revalidation on content pages)
- **next-intl** — locale routing at `/en`, `/am`, `/ru` (middleware-based)
- **Sanity** — headless CMS, embedded Studio at `/studio`, content localized per-field (`{ en, am, ru }`)
- **Tailwind CSS** — styled per the Platan brand book (Nocturne Navy & Platinum)

## Brand system (from the brand book)

- **Colors** — `page` #EFECE6 (Bone), `ink` #101D34 (Nocturne Navy), `chrome` #1B2B47 (Ink Slate), `accent` #8C8A86 (Platinum), `muted` #5A6473. See `tailwind.config.ts`.
- **Type** — Cormorant Garamond (display/wordmark) + Archivo (body/labels) for EN and RU; Noto Serif Armenian + Noto Sans Armenian for AM. Both pairings load through `app/fonts.ts` onto the same `--font-display` / `--font-sans` CSS variables, so components never branch on locale for type.
- **Logo** — `components/Logo.tsx`, the horizontal lockup (name + fine rule + "CAPITAL MANAGEMENT" descriptor), localized per language. Full name always appears together outside tightly-branded contexts.
- **Voice** — one accent per view, generous whitespace, hairline rules as the one structural device. Homepage copy (`messages/*.json` → `home`) is the brand book's own fixed marketing language, not Sanity content.

## Project structure

```
app/
  [locale]/          # all public pages, one subtree per locale
    layout.tsx        # header, footer, i18n provider
    page.tsx           # home
    about/
    strategy/
    contact/
    legal/
  studio/[[...tool]]  # embedded Sanity Studio (yourdomain.com/studio)
sanity/
  schemaTypes/        # siteSettings, page, teamMember, localeString, localeText
  lib/                # queries, image url builder, locale-picking helper
messages/              # UI chrome strings (nav, footer) per locale — NOT page content
```

Page *content* that changes (Strategy detail, team bios, Insights articles)
lives in Sanity. Fixed brand-locked copy (nav labels, footer, homepage hero
and principles) lives in `messages/*.json`, matching the brand book verbatim.

## Setup

1. **Install dependencies**
   ```
   npm install
   ```

2. **Create a Sanity project** (free tier is fine for this size)
   ```
   npx sanity@latest init
   ```
   This gives you a `projectId`. Copy `.env.local.example` to `.env.local` and fill it in.

3. **Run locally**
   ```
   npm run dev
   ```
   - Site: http://localhost:3000/en
   - CMS: http://localhost:3000/studio

4. **Add starting content in Studio**
   - One `Site Settings` document (firm name, email, office address, legal disclaimer)
   - `Page` documents with slugs: `home`, `about`, `strategy`, `legal`
   - `Team Member` documents for the About page

## Deploying

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add the same env vars from `.env.local` in Vercel's project settings.
4. Point `platan.capital`'s DNS A/CNAME record at Vercel (leave MX/email records
   as they are — this doesn't touch the existing Microsoft 365 email setup).

## Regulatory Information page

`app/[locale]/regulatory/page.tsx` is a disclosure hub for the eight
sections the Central Bank of Armenia's Regulation 8/03 (Chapter 4, point 16)
requires on a licensed financial company's homepage — About, Reports,
Services, Shareholders & Investors, Regulation, Feedback, Customer Rights,
Financial System Mediator. It's linked from the footer rather than the
primary nav, keeping the brand book's four-item header intact.

**This is scaffolding, not a compliance determination.** Regulation 8/03
point 5.1 exempts companies that, per their charter, don't offer services
to individuals via public offer — which may describe Platan's
qualified/professional-investor-only positioning. Confirm with counsel
whether the regulation applies before treating this page as satisfying it.

Content comes from a Sanity `page` document (slug: `regulatory`) with
sections matched by a `key` field (`about`, `reports`, `services`, etc.) —
any section without matching Sanity content renders a "pending" placeholder
so the required structure is visible even before real content exists. The
page also surfaces the document's Sanity `_updatedAt` timestamp, since the
regulation requires a visible last-updated date per page.

## Not yet wired up

The homepage and global chrome (header/footer/logo) now follow the brand
book. Still to do:
- Approach, Strategy, Insights, Legal are structurally styled but need real
  content and the actual page layouts (only the homepage was sketched in the
  brand book)
- Swap the generic `page.sections` schema for typed sections once Strategy's
  real layout is known
- Add a contact form handler
- Add an `insight` Sanity document type once the Insights section's content
  shape is decided
- Source real architectural photography for the homepage hero panel
  (currently a labeled placeholder)
- Decide whether Track Record/Performance is public or investor-gated
