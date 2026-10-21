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
