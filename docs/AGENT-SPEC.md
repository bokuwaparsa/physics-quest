# Physics Quest — Content & Sim Build Spec (for build agents)

Read this fully before writing code. Also read the golden examples:
- `src/lib/game/types.ts` — all shared types
- `src/data/lessons-mech.ts` — GOLDEN content example (m1)
- `src/components/sims/m1-motion-graphs.tsx` — GOLDEN sim example
- `src/components/sims/sim-kit.tsx` — shared sim toolkit
- `/home/z/my-project/worklog.md` — shared worklog

## Iron rules
1. **Only create/edit the files assigned to you** (listed in your task). NEVER edit shared files
   (registry.tsx, curriculum.ts, sim-kit.tsx, shell/home/lesson-view, other agents' files).
2. No new npm packages. No network calls. No `fs`. No test files. No route files — the whole game runs on `/`.
3. All content must be **original** (CC0): friendly tone for ages 11–15, SI units everywhere, correct physics.
4. Inline math goes in `$…$` (KaTeX). Bold with `**…**`. Do not use `$` for anything except math.
5. Numeric answers must be round numbers with sensible units; default tolerance 2% is fine.
6. TypeScript strict — no `any`, no unused imports.

## Lesson data file
Export a typed array, e.g. `export const lessonsFluids: Lesson[] = [ … ]`.
Each lesson needs: `id, unitId, order, title, tagline, difficulty ('easy'|'standard'|'challenge'), minutes, xp: 100, objectives (3), concept (6–9 blocks), simKey, workedExample (3–4 steps), practice (2–3 questions, each 2 hints), quiz (4–5 questions with explanations)`.
Question ids: `<lessonId>-p1`, `-q1`, … `. Every quiz question MUST have an `explanation` (2–3 sentences, includes the math).

## Simulation component
File: `<unit-dir>/<simkey>.tsx`, export a named component (no props required):

```tsx
'use client'
import { useRef, useState } from 'react'
import { CANVAS, SimFrame, SimSlider, SimButton, SimToggle, SimSelect, Readout,
         useSimCanvas, useReducedMotion, useSimBeep, drawGrid } from '@/components/sims/sim-kit'
export function MySim() { … }
```

Requirements:
- Wrap everything in `<SimFrame title="…" brief="…">` with a `<canvas>` (height 360–420, `aria-label` describing the scene, `role="img"`) + controls + `Readout` chips **with units**.
- Use `useSimCanvas((ctx, w, h, t, dt) => { … })`. Mutate a `useRef` state object; the draw callback runs every frame.
- Canvas is pre-scaled: draw in CSS pixels. Start every frame with a fill of `CANVAS.bg`.
- Palette (dark-lab look in both themes): use `CANVAS.amber/orange/emerald/teal/rose/red/violet/yellow/white/muted/panel/panelLight/grid/fg`.
- Physics must be correct (real formulas, SI units, g = 9.8 m/s²). Show the numbers live.
- Every sim has ONE small **challenge** (button → measurable goal → success/failure message with the physics explained, `useSimBeep()` on success). Failure is friendly, retries unlimited.
- Respect `useReducedMotion()`: no autonomous looping animation when true (user-triggered actions are OK).
- Controls: `SimSlider`/`SimButton`/`SimToggle`/`SimSelect` from the kit. Keep them in a `flex flex-wrap gap-3 items-end` row.
- Optional WebAudio only via `useSimBeep()` (respects the sound setting). Visual feedback always present.
- Keep each sim self-contained in ONE file, ~150–300 lines.

## Register your sims
In **your own** slice file (e.g. `src/components/sims/slice-a.ts`):

```ts
import type { SimComponent } from '@/lib/game/types'
import { AccelerationLabSim } from './a/m2-acceleration-lab'
export const simsA: Record<string, SimComponent> = {
  'acceleration-lab': AccelerationLabSim,
}
```

The `simKey` in the lesson data must match the registry key exactly.

## Self-check before finishing
```
bunx tsc --noEmit 2>&1 | grep -E "(your file paths)"   # must be empty
bun run lint 2>&1 | grep -E "(your file paths)"        # must be empty
```
Other agents' in-progress errors may appear — ignore anything not in your files.
Do NOT start a dev server (one is already running on :3000 with HMR).

Finally append your section to `/home/z/my-project/worklog.md` (template at top of that file).
