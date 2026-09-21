# Oussema Lammouchi — Portfolio

Personal portfolio for **Oussema Lammouchi**, Digital Innovation & Business student at FH Aachen.
Editorial layout, typography-led, fully bilingual (German / English), built for Vercel.

```
Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lucide
```

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

Node 18.18+ required.

## Deploying to Vercel

Push the repository and import it at vercel.com — no configuration needed.
Before the first deploy, set the real domain in `src/data/site.ts` (`url`), because the
canonical URL, Open Graph tags, `sitemap.xml` and `robots.txt` all derive from it.

---

## Before you go live — three things to replace

Everything personal lives in **`src/data/site.ts`**. Each placeholder is marked `TODO`:

| Field      | Currently                        | Replace with                  |
| ---------- | -------------------------------- | ----------------------------- |
| `url`      | `https://oussema-lammouchi.vercel.app` | your deployed domain    |
| `email`    | `oussema.lammouchi@example.com`  | your real address             |
| `linkedin` | `https://www.linkedin.com/in/example` | your profile URL         |
| `github`   | `https://github.com/example`     | your profile URL              |

Nothing else in the codebase hardcodes these.

---

## Project structure

```
src/
  app/
    layout.tsx            fonts, metadata, JSON-LD Person schema, language provider
    page.tsx              section order
    opengraph-image.tsx   generated 1200×630 social card
    icon.svg              favicon
    sitemap.ts robots.ts  SEO routes
  components/
    Navigation/           fixed bar, compacts on scroll, full-screen mobile menu
    Hero/                 editorial headline + cursor-reactive data field
    About/ Projects/ Skills/ Experience/ Education/
    Engagement/ Interests/ Languages/ Contact/ Footer/
    Cursor/               custom desktop cursor (dot → expanding label)
    LanguageSwitch/       DE / EN toggle
    ui/                   SplitWords, SectionLabel, Rule
  animations/
    useSectionReveal.ts   shared entrance choreography
    useDrawOnScroll.ts    SVG path drawing
  data/
    translations.ts       ALL German + English copy
    projects.ts experience.ts skills.ts site.ts
  lib/
    i18n.tsx gsap.ts utils.ts
  styles/
    globals.css           the entire design system
```

No user-facing prose lives inside a component — it all comes from `src/data/`.

---

## Changing the look

`src/styles/globals.css` holds every token in a single `@theme` block:

```css
--color-paper: #f4f3ef;   /* warm off-white background */
--color-ink:   #0d0d0c;   /* near-black text          */
--color-accent:#ccf23f;   /* acid lime, used sparingly */
--color-line:  #d6d3ca;   /* hairlines                */
```

Change `--color-accent` and the markers, hover fills, chart highlights, the
full-bleed 2025 block and the cursor all follow. The two fonts (Space Grotesk for
display, Inter for text) are loaded in `app/layout.tsx` via `next/font`.

Design rules the code sticks to: no cards, no gradients, no shadows, border radius
only 0–4px on small UI, hairlines instead of boxes, typography carries the identity.

---

## Editing content

**Copy (both languages)** — `src/data/translations.ts`. The German object defines the
shape; TypeScript will refuse to build if the English object drifts from it. Default
language is German; the choice is stored in `localStorage` under `ol-lang`.

**Projects** — prose in `translations.ts` (`projects.items`, in order), structure in
`src/data/projects.ts`. To make a project link out instead of opening the built-in
case-study overlay, add a `href`. The cursor label switches from "View" to "Open"
automatically.

**Real screenshots** — drop an image in `public/projects/` and add it to the project:

```ts
image: { src: "/projects/smartini.jpg", width: 1600, height: 1000 }
```

It replaces the generated visual and is served through `next/image`. Without one, the
coded SVG visual is used, so the site never ships an empty placeholder.

**Experience / skills** — `src/data/experience.ts` and `src/data/skills.ts` hold the
proper nouns (companies, locations, tool names, which are the same in both languages);
job titles and duties are in `translations.ts` and match by array position.

---

## Motion

GSAP with ScrollTrigger throughout: word-by-word headline reveals, hairlines drawing in,
batched section entrances, a pinned horizontal sequence for the three web projects, an
infinite interests marquee that pauses on hover, SVG paths that draw themselves, and
parallax on project visuals.

Every animation sits inside a `gsap.matchMedia()` query, and `globals.css` forces all
animated elements to their resting state under `prefers-reduced-motion: reduce`. A
`<noscript>` rule does the same when JavaScript is off, so content is never trapped
behind an animation.

The custom cursor and hero parallax are gated on `(pointer: fine)` and never load on touch.

## Accessibility

Semantic landmarks, a skip link, keyboard-reachable projects (each row is a real button
that opens the case study, Escape closes it), visible focus rings that invert on the dark
section, `aria-pressed` on the language switch, duplicated marquee text hidden from screen
readers, and language proficiency shown as words rather than invented percentages.
