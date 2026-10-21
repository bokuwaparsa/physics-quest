# Physics Quest — Shared Worklog

Project: browser-based physics learning game (Next.js 16 + TypeScript + Tailwind + shadcn/ui + Zustand + KaTeX + custom canvas sims).
All agents MUST read this file before working and append their section when done.

---

Task ID: 1
Agent: orchestrator (main)
Task: Initialize project plan, foundation architecture, and agent coordination.

Work Log:
- Inspected scaffold: Next.js 16 App Router, Tailwind 4, shadcn/ui complete, zustand, framer-motion, next-themes present.
- Installed katex + @types/katex.
- Defined 30-lesson curriculum across 7 units (mechanics x10, fluids x3, thermal x3, waves x3, optics x4, em x4, modern x3).
- Architecture: single page + hash routing (#/lesson/<id>), Zustand persist for localStorage progress, custom canvas sims registered in a registry.

Stage Summary:
- Foundation files to be written by orchestrator: src/lib/game/types.ts, progress.ts, router.ts, curriculum.ts, xp.ts, format.ts
- Sim framework: src/components/sims/sim-kit.tsx (canvas hook + controls)
- Agents must ONLY create/edit their own files (see task assignments) and follow the golden example lesson m1.

---
Task ID: 1-5
Agent: orchestrator (main)
Task: Build the full game foundation + golden example lesson.

Work Log:
- Core libs: types.ts (Lesson/Question/ContentBlock/SimProps), progress.ts (zustand+persist, XP/streak/badges, PASS=70%), router.ts (hash routes #/lesson/<id> etc.), curriculum.ts (7 units, ranks, special badges), format.ts.
- Sim kit (src/components/sims/sim-kit.tsx): useSimCanvas (DPR+RAF+resize), CANVAS palette, SimFrame, SimSlider/Button/Toggle/Select, Readout, Legend, useSimBeep (sound setting), useReducedMotion.
- UI shell: shell.tsx (header XP bar/level/streak/badges + settings popover: theme, reduced motion, sound; sticky footer), sidebar.tsx (search + unit index, desktop rail + mobile sheet), home.tsx (hero, stats, search+filters, 7 world cards with lesson nodes, how-to), lesson-view.tsx (Learn/Simulate/Practice/Quiz tabs + step rail), practice-panel.tsx (hints+retries+immediate feedback), quiz-panel.tsx (best score, mastery), celebration.tsx (confetti, reduced-motion aware), playground.tsx, progress-page.tsx (reset dialog), licenses-page.tsx, tex.tsx (KaTeX), content-blocks.tsx.
- Golden example: lesson m1 'motion-graphs' + sims/m1-motion-graphs.tsx registered in sims/mech-core.ts.
- Sim registry: sims/registry.tsx merges slices mech-core, slice-a..slice-f (currently empty stubs).
- Agent spec: docs/AGENT-SPEC.md (read it before building).

Stage Summary:
- Browser-verified: home renders, lesson m1 Learn/Simulate tabs work, KaTeX renders, no console errors.
- NEXT: agents A–F fill lessons + sims per docs/AGENT-SPEC.md. simKey contract below.
- simKey map: m2 acceleration-lab(A), m3 force-balance(A), m4 newton-cart(A), m5 rocket-third-law(A), m6 projectile-range(B), m7 energy-coaster(B), m8 collision-lab(B), m9 circular-motion(B), m10 simple-machines(B), f1 pressure-lab(C), f2 buoyancy-tank(C), f3 pascal-lift(C), t1 heat-mixing(C), t2 heat-transfer(C), t3 phase-change(C), w1 wave-machine(D), w2 sound-lab(D), w3 doppler-echo(D), o1 mirror-laser(D), o2 refraction-tank(D), o3 lens-bench(E), o4 color-mixer(E), e1 charge-field(E), e2 ohm-circuit(E), e3 series-parallel(F), e4 electromagnet(F), p1 atom-builder(F), p2 half-life(F), p3 relativity-clock(F).
- Data files: A=lessons-mech-a.ts(m2-m5) B=lessons-mech-b.ts(m6-m10) C=lessons-fluids.ts+lessons-thermal.ts D=lessons-waves.ts+lessons-optics-a.ts(o1,o2) E=lessons-optics-b.ts(o3,o4)+lessons-em-a.ts(e1,e2) F=lessons-em-b.ts(e3,e4)+lessons-modern.ts(p1-p3). Slice files: slice-a..slice-f.ts.

---
Task ID: 6-d
Agent: D (waves + optics o1–o2)
Task: Build 3 waves lessons + 2 optics lessons with sims, register slice D.

Work Log:
- Sims (src/components/sims/d/): w1-wave-machine.tsx (live y = A·sin(2π(x/λ − f·t)) string with labelled crest/trough, λ double-arrow, bobbing corks "energy not matter", sliders A/λ/f, readouts T = 1/f and v = f·λ, pulse-mode button, challenge v = 8 m/s ±0.1); w2-sound-lab.tsx (speaker cone + pressure rings spaced by λ (not to scale) + oscilloscope trace (height = amplitude, cycles = frequency), medium select air/water/steel with 1 km crossing time, optional "Play tone" via useSimBeep only, challenge λ = 0.5 m in air → 686 Hz ±5); w3-doppler-echo.tsx (top-down road, moving siren emits wavefront circles every 0.5 s — bunching ratios honest, scale marked "not to scale", listener blips at heard pitch, f′ ahead/behind readouts; echo/sonar toggle: hidden wall + "Send chirp" + return-time readout d = 343·t/2; challenge: echo returns in 2.00 s → type 343 m ±1%, then "New hidden wall" randomizer); o1-mirror-laser.tsx (fixed laser → centre mirror, tilt slider 0–90° + drag, dashed normal, protractor arcs θi/θr, ray-marched beam, 3 targets (2 right wall, 1 floor), auto-detected glowing-target hit with beep/flash/new target, hit counter); o2-refraction-tank.tsx (Snell's law ray vs dashed no-bend reference, θ1 0–85°, medium water/glass/diamond, v = c/n readout, reverse mode with total internal reflection + critical-angle readout, challenge: find θc for water→air ≈ 48.8° ±1°).
- All sims follow sim-kit exactly: SimFrame/canvas 400 px with aria-label + role="img", CANVAS palette, Readouts with units, sliders/buttons/toggle/select in flex rows, useSimCanvas RAF loop with ref state, useSimBeep on success, useReducedMotion respected (w1 phase frozen, w2 static cone/rings, w3 starts paused, o1 static pulse halo).
- Data: lessons-waves.ts (w1-wave-anatomy, w2-sound, w3-doppler-echo) and lessons-optics-a.ts (o1-reflection, o2-refraction) — 8–9 concept blocks each, 3–4-step worked examples with tex, 2 practice Qs with 2 hints each, 4–5 quiz Qs with math-bearing explanations, SI units, original CC0 wording for ages 11–15.
- slice-d.ts registers 'wave-machine', 'sound-lab', 'doppler-echo', 'mirror-laser', 'refraction-tank'.
- QA script (bun): verified ids/orders/unitIds/simKeys vs registry, block/hint/explanation counts, $-parity, every inline math string compiles in KaTeX (throwOnError), and 16 key numeric answers incl. tolerances (w2 q2 0.68±3% accepts 0.7; o2 q4 41.8±5%).
- Note: spec's w3 quiz item said "40 m/s → 618 Hz" but 600·343/303 ≈ 679; kept the intended answer 618 Hz by using vs = 10 m/s (600·343/333) so the physics is correct.

Stage Summary:
- Self-check clean: `bunx tsc --noEmit` and `bun run lint` both grep-empty for lessons-waves.ts, lessons-optics-a.ts, sims/d/*, slice-d.ts (remaining errors are other agents' in-progress files: sims/b/m8, sims/f/*).
- Dev server was NOT listening on :3000 during this task (connection refused), so browser smoke-testing was skipped per "never start a dev server"; all verification done via tsc/lint/bun QA scripts.
- No shared files touched: only lessons-waves.ts, lessons-optics-a.ts, sims/d/w1–w3 + o1–o2, slice-d.ts, this worklog.
- NEXT: agents with remaining units register their slices; orchestrator can browser-verify all 5 D-lessons once the dev server is back up.

---
Task ID: 6-a
Agent: Agent A (mechanics m2–m5)
Task: Build the four mechanics lessons m2–m5 — lesson data (lessons-mech-a.ts), four canvas sims (sims/a/*), and the slice-a registry.

Work Log:
- Read worklog, AGENT-SPEC, types.ts, golden lesson m1, golden sim m1-motion-graphs.tsx and sim-kit.tsx before writing anything.
- src/data/lessons-mech-a.ts: replaced stub with 4 complete lessons (unitId 'mechanics', xp 100, fixed ids/orders/simKeys):
  - m2-acceleration (order 2, easy, 'acceleration-lab'): 9 concept blocks (definition a=Δv/Δt formula, m/s² meaning, positive/negative, v–t slope list, typical-accelerations table, key idea), motorbike 0→24 m/s in 8 s worked example (3 steps), practice mc+numeric, 4-question quiz (rising v–t line; v=at=20; constant velocity → a=0; bus 20→4 m/s in 8 s → −2 m/s²).
  - m3-forces-balanced (order 3, easy, 'force-balance'): 9 blocks (force=N, balanced → no change, Newton's 1st law key, net-force formula, free-body diagram list), tug-of-war crate 12 N vs 5 N → 7 N → a=0.7 m/s² worked example, practice (book on table; 25−10=15 N), 4-question quiz (balanced ⇒ rest OR constant v; a=6/3=2; friction unbalanced; 1 kg vs 2 kg → 2×).
  - m4-newtons-second-law (order 4, standard, 'newton-cart'): 9 blocks (F=ma formula, double-force/double-mass rules, 1 N = 1 kg·m/s², inertia, fixed-10 N table, key), 50 N on 2 kg → 25 m/s² worked example, practice (18/6=3; double mass → halves), 5-question quiz (24/8=3; 4× mass → ¼; F=400×2.5=1000; 15 N is the force; 100/20=5).
  - m5-newtons-third-law (order 5, standard, 'rocket-third-law'): 9 blocks (third-law key, why pairs don't cancel, walking/swimming/rocket/boat list, rocket formula a=(Fthrust−W)/m, key), 200 kg + 5000 N → 15.2 m/s² worked example (W=1960 N), practice (bird flight mc; 500 kg hover → 4900 N), 4-question quiz (different objects; (8000−4900)/500=6.2 tol 3%; rockets push exhaust; boat moves backward). All quiz questions have 2–3 sentence explanations with the math; practice hints ×2; inline KaTeX in $…$; original wording, ages 11–15.
- sims/a/m2-acceleration-lab.tsx (~250 lines): dragster on 100 m strip, throttle slider 0–10 m/s², Go/Pause/Reset, integrated v=∫a·dt, live v–t graph (target crosshair at 4 s/20 m/s in challenge mode), distance ticks, readouts t/v/a/distance. Challenge "20 m/s in 4 s": success when |a_meas−5|≤0.25 at crossing (a_meas=20/t), friendly fail + 12 s timeout, useSimBeep on win.
- sims/a/m3-force-balance.tsx (~230 lines): 10 kg crate on frictionless floor, left/right rope sliders 0–30 N, scaled force arrows + labelled net-force arrow ("balanced!" badge at |Fnet|<0.5), a=Fnet/m integration with end bumpers, Release/Pause, readouts F-left/F-right/Fnet/a/v. Challenge "zero net force": hold |Fnet|<0.5 N with crate at rest for 3.0 s (live hold progress, timer resets when broken, beep on win).
- sims/a/m4-newton-cart.tsx (~250 lines): 20 m track, mass 1–10 kg + force 0–50 N sliders, stopwatch readout, a=F/m and predicted t=√(2d/a) readouts, force + acceleration arrows, checker start/finish lines. Challenge "cross 20 m in exactly 4.0 s" (±0.15 s; fail message teaches a=2d/t²=2.5 m/s², suggests 25 N on 10 kg), 12 s timeout.
- sims/a/m5-rocket-third-law.tsx (~370 lines): rocket mode (thrust 0–6000 N step 10, m=200 kg, W=1960 N shown, a=(thrust−W)/m, pad holds rocket when thrust ≤ weight with on-canvas hint, exhaust particles suppressed under reduced motion, altitude ruler, thrust/weight force arrows) + two-skaters toggle scene (equal/opposite push-off arrows, equal glide speeds on frictionless ice). Challenge "hover 3 s": |Fnet|≤20 N and altitude ≤2 m held 3.0 s → success explains thrust=weight. Readouts thrust/weight/net/a/altitude (+hold); skater mode readouts speed/separation.
- sims/slice-a.ts: exports simsA mapping the 4 simKeys ('acceleration-lab', 'force-balance', 'newton-cart', 'rocket-third-law') → components; registry.tsx untouched.
- Lint compliance: the new react-hooks/refs rule flags render-time ref syncs (golden m1 has the same pattern), so all four sims sync state→ref inside a no-deps useEffect; m5 scene painters are module-scope functions to satisfy react-hooks ordering rules.
- Self-check: `bunx tsc --noEmit | grep (lessons-mech-a|sims/a/|slice-a)` → empty; `bun run lint | grep …` → empty (remaining project lint errors are in other agents'/orchestrator files).
- Browser-verified on the running dev server (agent-browser): all 4 lessons appear in the sidebar with correct titles; m2 Learn content + worked example render; all 4 sims mount a canvas with zero page errors; live-tested m2 challenge win (a=5 → t=4.0 s, a_meas≈4.98), m3 zero-net-force win after 3 s hold, m5 hover win (thrust=weight=1960 N) and skaters push-off toggle — no console/page errors.

Stage Summary:
- Mechanics unit lessons m2–m5 are complete and playable: data in src/data/lessons-mech-a.ts, sims in src/components/sims/a/, registered via slice-a.ts (simKeys match lesson simKeys exactly).
- Sim physics verified live in-browser (challenge win paths for m2/m3/m5, canvas mounting for m4); reduced-motion and sound settings respected via sim-kit hooks.
- No shared files touched (registry/curriculum/sim-kit/shell untouched). NEXT: agent B (m6–m10) fills slice-b; later agents follow the same useEffect-ref-sync pattern to stay lint-clean.

---
Task ID: 6-e
Agent: E
Task: Build optics o3–o4 + EM e1–e2 (lessons + sims + slice registration).

Work Log:
- Data: src/data/lessons-optics-b.ts (lessonsOpticsB: o3-lenses 'Lenses & Images' standard, o4-color 'Color: Mixing Lights & Filters' easy) and src/data/lessons-em-a.ts (lessonsEmA: e1-static-fields 'Static Electricity & Fields' standard, e2-ohms-law 'Current, Voltage & Resistance' easy). Each: 3 objectives, 8–9 concept blocks (p/h/formula/list/key/table), worked example 3 steps w/ tex, 2 practice Qs (2 hints each), 4–5 quiz Qs with math explanations. Question ids follow <lessonId>-p1/-q1… simKeys: lens-bench, color-mixer, charge-field, ohm-circuit.
- Sims (src/components/sims/e/): o3-lens-bench (thin-lens bench, f=2 m, F/2F marks, three principal rays + dashed virtual extensions, d_i = 1/(1/f − 1/d_o), m = −d_i/d_o, draggable object via canvasPos+pointer capture, readouts d_i/m/type, challenge: image at 4 m → d_o = 4, beep on success); o4-color-mixer (R/G/B spotlights with additive 'lighter' cones + wall hex readout, presets, FILTER mode with per-channel pass/absorb audit dots, challenge: make white ≥240/channel); e1-charge-field (place up to 8 +/− charges by tapping, drag charges/test charge, softened Coulomb superposition field arrows, releasable +1 test charge drifting under the field, goal-flag challenge, force-direction readout); e2-ohm-circuit (series loop: battery, resistor, lamp; electron dots with speed ∝ I, ammeter I=V/R, voltmeter, lamp glow ∝ P=V²/R with off/dim/bright/blinding label, challenge: exactly 0.50 A, e.g. 12 V/24 Ω).
- Registration: slice-e.ts exports simsE {'lens-bench','color-mixer','charge-field','ohm-circuit'} — merged by registry.tsx (no shared files touched).
- All sims use sim-kit primitives (SimFrame/Slider/Button/Toggle/Select/Readout/Legend, useSimCanvas, canvasPos, useSimBeep, useReducedMotion, drawGrid, CANVAS palette), canvas heights 380–400, aria-labels + role="img", reduced-motion pauses autonomous animation (photons/electron drift/cone pulse) with visual fallbacks.
- Note: React lint rule flags ref writes during render (golden m1 has 3 such errors); kept agent-E files clean by syncing loop state only inside the RAF draw callback / event handlers (closure reads fresh React state each frame via the kit's drawRef pattern).

Stage Summary:
- Self-check: `bunx tsc --noEmit` and `bun run lint` filtered to (lessons-optics-b|lessons-em-a|sims/e/|slice-e) → empty.
- Browser smoke test not possible in this sandbox: nothing was listening on :3000 at run time (connection refused); per instructions no dev server was started. Static checks + code review passed; recommend orchestrator spot-check #/lesson/o3-lenses, o4-color, e1-static-fields, e2-ohms-law.
- No files outside the assignment touched (worklog.md excepted).

---
Task ID: 6-b
Agent: Agent B (mechanics m6–m10) — worklog backfilled by orchestrator after agent timeout
Task: Build lessons m6–m10 + sims (projectiles, energy, momentum, circular motion, simple machines).

Work Log:
- Created src/data/lessons-mech-b.ts (5 lessons), sims in src/components/sims/b/ (m6-projectile-range, m7-energy-coaster, m8-collision-lab, m9-circular-motion, m10-simple-machines), registered in slice-b.ts.
- Agent session hit a context deadline after writing all files; orchestrator verified + lint-fixed m8 (moved slider sync to useEffect, replaced functional setState inside draw loop with plain object, extracted drawFlash helper).

Stage Summary:
- simKeys projectile-range, energy-coaster, collision-lab, circular-motion, simple-machines registered and passing tsc/eslint; content verified by orchestrator's automated checks.

---
Task ID: 6-c
Agent: Agent C (fluids f1–f3 + thermal t1–t3) — worklog backfilled by orchestrator after agent timeout
Task: Build fluids + thermal lessons and sims.

Work Log:
- Created src/data/lessons-fluids.ts (f1 pressure, f2 buoyancy, f3 pascal) and src/data/lessons-thermal.ts (t1 heat-mixing, t2 heat-transfer, t3 phase-change).
- Sims in src/components/sims/c/ (pressure-lab, buoyancy-tank, pascal-lift, heat-mixing, heat-transfer, phase-change), registered in slice-c.ts.
- Agent session hit a context deadline after writing all files; orchestrator verified tsc/eslint clean.

Stage Summary:
- All 6 simKeys registered; automated content checks passed (concept blocks, hints, explanations, numeric answers).

---
Task ID: 6-f
Agent: Agent F (EM e3–e4 + modern p1–p3) — worklog backfilled by orchestrator after agent timeout
Task: Build series/parallel, electromagnet, atom builder, half-life, relativity lessons + sims.

Work Log:
- Created src/data/lessons-em-b.ts (e3 series-parallel, e4 electromagnet) and src/data/lessons-modern.ts (p1 atom-builder, p2 half-life, p3 relativity-clock).
- Sims in src/components/sims/f/, registered in slice-f.ts.
- Agent session hit a context deadline after writing all files; orchestrator verified tsc/eslint clean.

Stage Summary:
- All 5 simKeys registered; automated content checks passed.

---
Task ID: 7
Agent: orchestrator (main)
Task: Integration, lint fixes, verification.

Work Log:
- Fixed new react-hooks lint rule violations: sim-kit drawRef sync → useEffect; m1 render-time ref sync → useEffect; lesson-view removed setState-in-effect (relies on key remount) + createElement for dynamic sim; shell/playground mounted gates → useSyncExternalStore; m8 restructured.
- bunx tsc --noEmit: clean for src/; bun run lint: 0 errors.
- Automated curriculum verification: 30 lessons, all simKeys registered, all questions have hints+explanations, no duplicate ids.

Stage Summary:
- Project compiles and lints clean; next: full browser E2E of every lesson + README/QA/licenses.

---
Task ID: 8
Agent: orchestrator (main)
Task: E2E verification + deliverables.

Work Log:
- E2E via agent-browser: all 30 lessons opened through direct URLs, Simulate tab clicked on each → zero page errors.
- Golden path on m1: practice (hints, +30 XP) → quiz (5 Qs, 100%) → confetti celebration, +70 XP, badge, header updates (100 XP, 1/30, streak 1).
- Verified: playground (3 sandbox tabs + Open-Mind badge), progress page (stats, world bars, special badges, lesson table, reset dialog wipes state), licenses page, search ("circuits" → 1 result), difficulty/world filters present.
- Dark mode + mobile 390×844 verified; sticky footer confirmed at document bottom on tall pages.
- Fixed taglines containing math to render via RichText (lesson header + home world list).
- Wrote README.md (features, curriculum map, run/deploy guides incl. static export), LICENSE (MIT code + CC0 content), docs/QA.md (acceptance criteria matrix + test notes).
- Final gates: bunx tsc --noEmit clean (src/), bun run lint 0 errors, dev.log clean (GET / 200).

Stage Summary:
- Physics Quest complete: 30 lessons / 30 sims / 7 worlds, all playable, no gating, no placeholders. Ready to preview.
