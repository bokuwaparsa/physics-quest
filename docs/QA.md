# Physics Quest — QA Checklist & Test Notes

Test date: build verification session (see git history).
Environment: Chromium (agent-browser) against `bun run dev` on http://localhost:3000; viewports 1280×800 (desktop) and 390×844 (mobile); light & dark themes.

## A. Acceptance criteria → status

| # | Criterion | Status |
|---|---|---|
| 1 | Every listed lesson loads and is playable | ✅ All 30 lessons opened via direct URL; Simulate tab clicked on each; canvas mounted with **zero page errors** |
| 2 | No locked, paid, disabled or placeholder lessons | ✅ No gating logic exists; every world-map node, sidebar row and search result navigates directly |
| 3 | All lessons reachable via home grid, sidebar, search, direct URL | ✅ Verified all four paths (home world map nodes, sidebar index, home search + world/difficulty filters, `#/lesson/<id>`) |
| 4 | Progress saves locally and can be reset | ✅ Zustand persist (`physics-quest-v1`); survived reload; **Reset all progress** dialog wipes XP/badges/streak (verified: header returned to 0 XP, 0/30) |
| 5 | No console errors; works on mobile & desktop | ✅ `agent-browser errors` clean after full sweep; layout verified at 390×844 and 1280×800 |
| 6 | No paid dependencies or copyrighted assets/text | ✅ Only MIT/ISC/Apache-2.0/OFL packages; all content original (CC0); graphics procedural; sounds synthesized & off by default |
| 7 | Physics content correct, with units and feedback | ✅ SI units on every readout; numeric answers checked against formulas; every quiz question shows an explanation; practice has 2 hints + instant feedback |
| 8 | Feels like a game | ✅ XP/levels/ranks, badges, streaks, confetti celebration, challenge goals in every sim, world-map progression |

## B. Golden-path test (performed on m1, pattern shared by all lessons)

1. Home → world card → lesson node opens `#/lesson/m1-motion-graphs` ✅
2. **Learn**: objectives, KaTeX formulas ($v = d/t$), table, key-idea callout, collapsible worked example ✅
3. **Simulate**: Robot Race Lab renders, slider drives robot + live d–t graph, challenge completes with beep ✅
4. **Practice**: Q1 multiple-choice (correct → explanation), Q2 numeric 96 m (hints, tolerance check) → +30 XP ✅
5. **Quiz**: 5 questions answered, per-question explanations, 100 % → **confetti celebration**, +70 XP, badge, “Mastered” chip; header XP bar and streak update ✅
6. Retry path: re-quiz allowed anytime; wrong answers → friendly feedback, unlimited retries, “Show me the solution” after 2 tries ✅

## C. Page-by-page

- **Home** (`#/`): hero, stats cards (XP, level/rank, mastered, streak), search + world/difficulty filters, 7 world cards with per-lesson completion nodes, how-to-play strip ✅
- **Lesson** (`#/lesson/<id>`): step rail (Learn/Simulate/Practice/Quiz) with completion ticks; prev/next navigation; direct URLs shareable ✅
- **Playground** (`#/playground`): Launch lab / Collision lab / Wave machine tabs (sandbox versions of sims); visit awards the “Open Mind” badge ✅
- **My Progress** (`#/progress`): stats, per-world progress bars, 8 special badges (locked/unlocked states), full lesson score table, reset dialog ✅
- **Licenses** (`#/licenses`): library table + content/asset attribution ✅
- **404-ish route** (`#/lesson/unknown`): friendly “Lesson not found” panel with way home ✅

## D. Accessibility spot checks

- Canvas sims: `aria-label` + `role="img"` ✅
- Sliders/buttons/tabs: labeled, keyboard-operable (Radix) ✅
- Settings: theme (light/dark/system), **Reduced motion** toggle (disables confetti — verified), **Sim sounds** toggle (off by default) ✅
- `prefers-reduced-motion: reduce` handled in CSS as well ✅
- Semantic landmarks: `header / nav / main / footer`; sticky footer verified (footer sits at document bottom on tall pages, pinned to viewport bottom on short pages) ✅

## E. Known cosmetic notes (non-blocking)

- Registry fallback (“Simulation not registered”) exists as a dev safety net; currently unreachable — all 30 simKeys verified registered.
- KaTeX display math scrolls horizontally on very narrow screens (by design).

## F. Automated checks used

- `bunx tsc --noEmit` — clean for `src/`
- `bun run lint` (eslint 9 + next/react-hooks rules) — 0 errors
- Content integrity script — 30 lessons: unique ids, every simKey registered, every question has hints + explanation, quiz ≥ 4 questions, concept ≥ 5 blocks, worked example present.

---

## 🌍 Language setting (English · فارسی · Türkçe) — added Task 9/10

### Acceptance criteria

| # | Criterion | Status |
|---|---|---|
| L1 | Language switcher in Settings → Language with 3 entries (English / فارسی / Türkçe) | ✅ verified in browser |
| L2 | Choice persists in `localStorage` (`pq.locale`) and survives reload | ✅ verified (`tr` kept after reload) |
| L3 | First-visit browser-language detection (`fa`/`tr` → UI language) | ✅ implemented (`detectLocale`) |
| L4 | Persian sets `<html lang="fa" dir="rtl">`; Turkish/Latin sets LTR | ✅ verified via `document.documentElement` |
| L5 | Full RTL mirror: sidebar, header order, logical spacing (ps/pe/ms/me), arrows flipped (`rtl:rotate-180`) | ✅ screenshots verified (desktop + 390 px mobile) |
| L6 | All 30 lessons fully translated (title, tagline, objectives, every concept block, worked example, all practice + quiz questions) in fa AND tr | ✅ automated coverage check: `30 lessons × 2 locales fully covered` |
| L7 | `$…$` math preserved byte-for-byte in translations, `$`-count even in every string | ✅ per-part agent validators + global merge smoke |
| L8 | UI chrome (~200 keys) translated in fa/tr, English fallback for any missing key | ✅ |
| L9 | Sim controls translated via term glossary (~330 terms): sliders, readouts, selects, buttons (incl. icon+text JSX children), toggles, legends, sim titles/briefs | ✅ verified on m1 (Robot Race) + o2 (Refraction Tank incl. select options) |
| L10 | KaTeX math + numeric readouts remain LTR inside RTL pages (CSS isolation) | ✅ verified visually |
| L11 | Vazirmatn typeface for Persian; Inter for Turkish; graceful offline fallback | ✅ |
| L12 | Complete game loop works in Persian: lesson → sim → practice → quiz (5/5 = 100 %) → mastery celebration → XP/badge/streak update | ✅ executed end-to-end in fa |
| L13 | Reset progress works in Persian; locale choice survives reset | ✅ |
| L14 | No console/page errors during any language session | ✅ `agent-browser errors` empty |
| L15 | Adding a new locale = 1 dict + 1 term glossary + optional overlays (documented in README) | ✅ documented |

### Notes / intentional fallbacks

- Text drawn **inside canvas artwork** (e.g. axis labels `time (s)`, `air · n₁ = 1.0`) and canvas
  `aria-label` summaries remain English by design — they are procedural drawings, not DOM text.
- Numbers use Western digits in all locales (consistent with the numeric answer inputs).
- Brand name “Physics Quest” stays Latin in all locales (logo + metadata).

### Test log (Task 11, browser-verified via agent-browser)

- `#/` EN → Settings → **فارسی**: home, sidebar, lesson index, world map all Persian; layout mirrored; screenshot reviewed.
- `#/lesson/m1-motion-graphs` fa: Learn tab (objectives, concept with inline KaTeX), Simulate tab
  (تندی slider, زمان/فاصله/تندی readouts, پخش/بازنشانی/چالش buttons), Quiz tab: answered all 5
  questions (numeric 300 m, 6 m/s included) → 100 % → mastery celebration in Persian, +70 XP,
  header 70 XP · 1/30 · streak 1.
- Switch to **Türkçe**: entire UI + quiz result card + ranks (Lv 1 · Kıvılcım) re-render in Turkish, LTR.
- Reload → locale persisted (`tr`), no hydration errors.
- Mobile 390×844 fa: lesson page, RTL layout, drawer sidebar; screenshot reviewed.
- `#/progress` fa: reset dialog fully Persian → confirmed reset → progress wiped, locale kept.
- Switched back to English — no errors; `agent-browser errors` + console clean throughout.
