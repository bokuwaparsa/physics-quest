# ⚛️ Physics Quest

A complete, free, browser-based **physics learning game** for middle-school and early high-school students.
30 interactive lessons across 7 worlds — each with a concept explainer, a live canvas simulation,
a worked example, guided practice with hints, a quiz, and a mastery badge. No account, no ads,
no tracking, no paywalls, no locked content.

> **Original content notice:** All lessons, text, diagrams, questions, and simulations are original
> works created for this project (CC0). No content is reproduced from any copyrighted book. The lesson
> *topic coverage* follows a standard physics curriculum outline (mechanics → fluids → thermal → waves →
> light → electricity & magnetism → modern physics). See the in-app **Licenses & Attribution** page
> (`#/licenses`) for the full list.

---

## ✨ Features

- **30 fully playable lessons** in 7 worlds (nothing locked, nothing gated — jump anywhere)
- **30 hand-built canvas simulations** with challenges, live readouts and correct physics (SI units)
- **Learning loop:** Learn → Simulate → Practice (hints + instant feedback) → Quiz (pass ≥ 70 %) → badge + XP
- **Game layer:** XP, levels & ranks, per-lesson badges, 8 special badges, day streaks, confetti
- **3 languages with full translations:** 🇬🇧 English · 🇮🇷 **فارسی (Persian, full RTL)** · 🇹🇷 Türkçe — every lesson, question, hint, simulation control and UI string is translated; the choice is saved and auto-detected from the browser. Physics terms use a consistent in-game glossary; math stays LTR/LaTeX everywhere.
- **Physics Playground** — 3 open-ended sandboxes (projectiles, collisions, waves) for free play
- **Find anything fast:** home search + filters (world, difficulty), persistent sidebar index, **direct URL per lesson** (`#/lesson/<id>`)
- **Progress saved locally** (localStorage via Zustand persist) with a one-click **reset**
- **Accessible:** keyboard-navigable controls, ARIA labels/roles, visible focus rings, reduced-motion toggle (and OS-level `prefers-reduced-motion` support), sound off-by-default with visual equivalents, light/dark theme
- **Fast & static-friendly:** one page, client-side rendering, no backend required

## 🗺️ Curriculum map

| World | Lessons |
|---|---|
| **Mechanics** (10) | 1 Motion & Graphs · 2 Acceleration · 3 Balanced & Unbalanced Forces · 4 Newton's Second Law (F = ma) · 5 Newton's Third Law & Rockets · 6 Gravity & Projectiles · 7 Work, Energy & Power · 8 Momentum & Collisions · 9 Circular Motion · 10 Simple Machines |
| **Fluids & Pressure** (3) | 1 Pressure · 2 Density & Buoyancy · 3 Pressure in Fluids & Pascal's Principle |
| **Heat & Thermal Physics** (3) | 1 Temperature vs Heat · 2 Heat Transfer (conduction/convection/radiation) · 3 Changes of State |
| **Waves & Sound** (3) | 1 Wave Anatomy · 2 Sound: Pitch, Loudness & Speed · 3 The Doppler Effect & Echoes |
| **Light & Optics** (4) | 1 Reflection · 2 Refraction · 3 Lenses & Images · 4 Color: Mixing Lights & Filters |
| **Electricity & Magnetism** (4) | 1 Static Electricity & Fields · 2 Current, Voltage & Resistance (Ohm's law) · 3 Series & Parallel Circuits · 4 Magnets & Electromagnets |
| **Modern Physics** (3) | 1 Inside the Atom · 2 Radioactivity & Half-Life · 3 Relativity & the Quantum World |

Every lesson = concept explainer (KaTeX-rendered math) + interactive sim with a challenge +
worked example + 2–3 guided practice questions + 4–5 question quiz + mastery badge (100 XP total).

## 🚀 Run it

```bash
bun install        # or: npm install / pnpm install
bun run dev        # or: npm run dev  → http://localhost:3000
```

Production:

```bash
bun run build
bun run start
```

### Deploying to free static hosting

The game is a single client-rendered page with **zero API routes and zero server dependencies**
(progress lives in localStorage), so it exports cleanly to a static site:

1. In `next.config.ts` add:
   ```ts
   const nextConfig = { output: 'export' };      // plus: images: { unoptimized: true } if needed
   ```
2. Build & upload:
   ```bash
   npm run build        # produces ./out
   ```
3. **GitHub Pages:** push `out/` to a `gh-pages` branch (e.g. with `npx gh-pages -d out`).
   Because routing is hash-based (`#/lesson/...`), no 404 rewrite rules are needed.
4. **Netlify / Cloudflare Pages / Vercel:** set the build command to `npm run build` and the publish
   directory to `out`. Same story — hash routing means zero server config.

## 🧱 Tech stack (all free & open source)

| Layer | Choice | License |
|---|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript 5 | MIT / Apache-2.0 |
| Styling | Tailwind CSS 4 + shadcn/ui (Radix primitives) | MIT |
| Icons | lucide-react | ISC |
| State | Zustand (+persist → localStorage) | MIT |
| Math | KaTeX | MIT (fonts: SIL OFL) |
| Sims | Hand-written HTML5 Canvas 2D — no third-party physics engine, no image assets | — |
| Theme | next-themes | MIT |
| i18n | Custom locale store + typed dictionaries (`src/lib/game/dict/`) + lesson translation overlays (`src/data/i18n/`); Vazirmatn font for Persian | MIT / SIL OFL |

Full attribution table: open the app → **Licenses & Attribution** (or `#/licenses`).

## 📁 Project structure

```
src/
├── app/                    # layout + the single page (client shell, hash routing)
├── data/                   # lesson content (typed Lesson[] per unit)
├── lib/game/               # types, curriculum registry, progress store, router, helpers
└── components/
    ├── game/               # shell, home/world map, lesson view, practice/quiz, playground,
    │                       # progress page, licenses page, KaTeX renderers, celebration
    └── sims/               # sim-kit (canvas hook + controls) and 30 sims in unit folders
docs/AGENT-SPEC.md          # conventions used by content/sim authors
docs/QA.md                  # QA checklist & test notes
```

### Adding a lesson

1. Append a `Lesson` object to the right `src/data/lessons-*.ts` file (unique `id`, `order`, `simKey`).
2. Create the sim component and register it in the matching `src/components/sims/slice-*.ts`.
3. Done — it appears in the world map, sidebar, search, and gets a direct URL automatically.
4. (Optional) add its Persian/Turkish translation to a `src/data/i18n/<fa|tr>/part-*.ts` overlay — otherwise it gracefully falls back to English.

## 🌍 Languages & translations

The language is switchable from **Settings → Language** (globe icon in the header) and persists in
`localStorage` (`pq.locale`); a browser-language hint (`fa`/`tr`) is used on first visit. Persian sets
`<html dir="rtl">`, loads the **Vazirmatn** typeface, mirrors the layout via CSS logical properties and
keeps KaTeX math, code and numeric readouts left-to-right.

How the translation layers fit together:

| Layer | Where | Notes |
|---|---|---|
| UI chrome (~200 keys) | `src/lib/game/dict/en|fa|tr.ts` | header, home, lesson view, practice/quiz, pages, ranks, badges, unit names |
| Simulation vocabulary (~330 terms) | `src/lib/game/dict/terms-fa.ts`, `terms-tr.ts` | applied automatically inside sim-kit controls — sliders, readouts, selects, buttons, legends, sim titles/briefs. English fallback for unmapped terms (e.g. text drawn inside canvas art) |
| Lesson content (30 lessons × 2 locales) | `src/data/i18n/fa/part-01..10.ts`, `src/data/i18n/tr/part-01..10.ts` | typed overlays (`schema.ts`) merged over the English base per lesson/question id — any missing field falls back to English |

**Adding a language** (e.g. Spanish): add `dict/es.ts` + `dict/terms-es.ts`, register them in `src/lib/game/i18n.tsx`
(`LOCALES`, `DICTS`, `TERMS`), add `dirFor` if the language is RTL, then create `src/data/i18n/es/part-*.ts`
overlays (or ship English-content fallback first and translate incrementally).

Known fallbacks (by design): text drawn inside canvas artwork (axis labels like *time (s)*) and canvas
`aria-label` summaries remain English; everything else is fully translated.

## ♿ Accessibility notes

- Every interactive control is a native button/input/slider with a label; canvas sims expose `aria-label` + `role="img"` summaries.
- Full keyboard support (Radix primitives), visible focus rings, semantic landmarks (`header/nav/main/footer`).
- **Reduced motion** toggle in the settings menu (header) disables confetti/celebration animations and autonomous sim motion; the OS-level `prefers-reduced-motion` setting is honored too.
- Optional sim sounds are **off by default**, always paired with visual feedback (no audio-only information).
- Checkable contrast in both themes; difficulty is conveyed by text labels, not color alone.

## ✅ QA

See [`docs/QA.md`](docs/QA.md) for the full manual QA checklist and the test log
(all 30 lessons browser-verified: load, sim mount, quiz flow, search, reset, mobile, dark mode).

## 📜 License

- **Code:** MIT (see `LICENSE`).
- **Game content** (lesson text, questions, diagrams, sim visuals): **CC0 1.0** — public domain, remix freely.

---

Made for curious minds. 100 % free, forever. 💛
