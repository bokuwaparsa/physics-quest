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
---
Task ID: 10-2
Agent: translator fa+tr (part-02)
Task: Translate lessons m4, m5, m6 to Persian and Turkish.

Work Log:
- Read worklog, i18n/schema.ts, game/types.ts and translate.ts (merge semantics: overlay concept must match base length/type/order, questions keyed by exact base ids).
- Extracted base lessons: m4-newtons-second-law + m5-newtons-third-law (lessons-mech-a.ts) and m6-projectiles (lessons-mech-b.ts); noted exact question ids ('m4-newtons-second-law-p1…q5', 'm5-newtons-third-law-p1…q4', 'm6-p1…q5').
- Wrote complete overlays in src/data/i18n/fa/part-02.ts and src/data/i18n/tr/part-02.ts: title, tagline, 3 objectives, all 9 concept blocks each (same t/order; formula captions translated; table headers/rows translated with numbers+units Latin), worked example (text-only steps, no tex), and EVERY practice+quiz question (prompt, all 4 choices in order, both hints, explanation).
- All LaTeX copied byte-for-byte; $-parity even in every string; Western digits; units Latin (m/s, N, kg, m/s²); **bold** markers wrap corresponding translated words; fa uses «» quotes and ؟, tr uses proper ş/ğ/İ/ı with ’ for suffix apostrophes.
- Validation: (1) `bunx tsc --noEmit | grep i18n/(fa|tr)/part-02` → empty. (2) bun check script: imported both overlay files + both base data files; verified per lesson per locale: concept length/type/order match, table header/row dims, example steps count, every base question id covered with no unknown keys, choices/hints counts equal, every string non-empty with even $ count, and every $…$ segment byte-identical to the base segment (caught and fixed 2 Turkish sentences where translation reordered "$50 N"/"$2 kg"; reordered the sentences to preserve math order) → ALL CHECKS PASSED.

Stage Summary:
- Files written: src/data/i18n/fa/part-02.ts, src/data/i18n/tr/part-02.ts
- Lessons fully covered: m4-newtons-second-law, m5-newtons-third-law, m6-projectiles × 2 locales
- Glossary notes: mandatory glossary applied (نیرو/kuvvet, جرم/kütle, شتاب/ivme, گرانش/yer çekimi, وزن/ağırlık, پرتابه/mermi, برد/menzil, نیروی خالص/net kuvvet, اصطکاک/sürtünme). Coined beyond glossary: thrust=رانش (fa) / itki (tr); inertia=لختی (fa) / atalet (tr); (motion) component=مؤلفه (fa) / bileşen (tr); exhaust gas=گاز خروجی (fa) / egzoz gazı (tr); frictionless=بی‌اصطکاک (fa) / sürtünmesiz (tr); hover=معلق ماندن (fa) / havada asılı kalmak (tr); arc=قوس (fa) / yay (tr); action–reaction=کنش–واکنش (fa) / etki–tepki (tr); trolley=چرخ خرید (fa) / market arabası (tr).
---
Task ID: 10-1
Agent: translator fa+tr (part-01)
Task: Translate lessons m1, m2, m3 to Persian and Turkish.

Work Log:
- Read worklog, i18n/schema.ts, lib/game/types.ts, then extracted the full base content of m1-motion-graphs (lessons-mech.ts) and m2-acceleration + m3-forces-balanced (lessons-mech-a.ts).
- Wrote src/data/i18n/fa/part-01.ts and src/data/i18n/tr/part-01.ts as full LessonOvFile overlays: title, tagline, objectives, concept (same block count/type/order: m1=10 blocks, m2=9, m3=9; formula captions translated, tex not duplicated), worked example (title/problem/steps text/answer; tex omitted), and EVERY practice + quiz question keyed by exact base ids (m1: p1,p2,q1–q5; m2-acceleration: p1,p2,q1–q4; m3-forces-balanced: p1,p2,q1–q4) with prompt, all choices (order preserved, answerIndex untouched), all hints, explanation.
- All $…$ LaTeX copied byte-for-byte; validated programmatically that every inline math token in each overlay string equals the corresponding base token in order (strictest check: per-string token-by-token comparison, not just counts), plus even-$ parity on every string, table row/column shapes, and no Eastern digits/placeholders.
- Tricky terminology: fa speed/velocity kept strictly as تندی/سرعت (e.g. m1-q5 contrasts «سرعت» vs «تندی»); fa "deceleration" coined as کندشوندی alongside شتاب منفی; fa m2 table "pedal down" rendered idiomatically as پدال تا ته. tr velocity rendered with the mandated phrase "hız (yön ile)" wherever the base contrasts velocity vs speed, while velocity–time graphs use the standard Turkish "hız–zaman grafiği"; tr "deceleration" = yavaşlama ivmesi; avoided Turkish suffixes glued to closing $ (e.g. no "$10 kg$'lık") to keep math islands clean; arrows in fa RTL hint rewritten with "یعنی" instead of → to avoid bidi confusion.
- Persian quotes use «», Turkish uses “”; Western digits everywhere; unit symbols (m/s, m/s², N, kg) kept Latin in both locales.
- Validation: bunx tsc --noEmit grep for i18n/(fa|tr)/part-01 → empty; bun run lint grep → empty; custom bun validator imported base lessons + both overlays and verified: lesson ids present, concept block length/type/order, question-id coverage (no missing/extra), choices/hints/steps counts, per-string math-token equality, $-parity, no tex keys in overlay steps → ALL CHECKS PASSED (temp validator deleted afterwards; no project files touched besides the two part files and this worklog).

Stage Summary:
- Files written: src/data/i18n/fa/part-01.ts, src/data/i18n/tr/part-01.ts
- Lessons fully covered: m1-motion-graphs, m2-acceleration, m3-forces-balanced × 2 locales
- Glossary notes: followed mandatory glossary exactly (fa: تندی/سرعت/شتاب/نیرو/جرم/نیروی خالص/شیب/نمودار مسافت–زمان/نمودار نیرو/یکای SI; tr: hız/hız (yön ile)/ivme/kuvvet/kütle/net kuvvet/eğim/konum–zaman grafiği/seri cisim diyagramı/SI birimi). Coined beyond glossary: fa کندشوندی = deceleration, نیروی برآیند = resultant force, نیروی عمودی سطح = normal force, کارتینگ = go-kart, چرخ‌دستی = cart, پیکان = arrow (force vector); tr yavaşlama ivmesi = deceleration, bileşke kuvvet = resultant force, normal kuvvet = normal force, arabacık = cart, gokart = go-kart.

---
Task ID: 10-3
Agent: translator fa+tr (part-03)
Task: Translate lessons m7, m8, m9 to Persian and Turkish.

Work Log:
- Read worklog, i18n/schema.ts, lib/game/types.ts and extracted lessons m7-energy, m8-momentum, m9-circular-motion from src/data/lessons-mech-b.ts (7 concept blocks for m8/m9, 10 for m7; 2 practice + 5 quiz questions each).
- Replaced stubs entirely: src/data/i18n/fa/part-03.ts and src/data/i18n/tr/part-03.ts with full overlays (title, tagline, 3 objectives, all concept blocks in base order/types, worked example with text-only steps, every question keyed by exact base id).
- Verified with a bun QA script (/tmp/validate-103.ts): $-parity on every string; per-lesson concept length + block-type alignment vs base; byte-for-byte math-segment fidelity (same segments, same order) for every text field, caption, list item, choice, hint; question id coverage with no extras; choices/hints/steps/objectives counts. 3 initial Turkish math-order mismatches (m9 example problem, m9-p1, m9-q2 prompts) fixed by rephrasing sentences to keep the base segment order — final run: ALL CHECKS PASSED.
- `bunx tsc --noEmit | grep "i18n/(fa|tr)/part-03"` → empty.
- Tricky terminology: fa impulse = ضربه (momentum already = تکانه), inertia = اینرسی, tangent = مماس, period = دوره; tr impulse = impuls, inertia = eylemsizlik, centrifugal = merkezkaç (vs glossary centripetal = merkezcil), tangent = teğet, period = periyot. Kept **bold** markers on translated words; dropped the base's stray single-asterisk "italics" (RichText only supports **bold**; asterisks would render literally). Kept unit symbols Latin (m/s, m/s², kg·m/s, J, N, W); spelled unit names in prose. Used Western digits; "10,000 J" (fa) and "10 000 J" (tr, space separator to avoid clash with decimal-point convention used in answers); decimal points kept as "." in both locales to match the numeric answer input.

Stage Summary:
- Files written: src/data/i18n/fa/part-03.ts, src/data/i18n/tr/part-03.ts
- Lessons fully covered: m7-energy, m8-momentum, m9-circular-motion × 2 locales
- Glossary notes: beyond the mandatory glossary — fa: impulse=ضربه, vector=بردار, inertia=اینرسی, tangent=مماس, period=دوره, radius=شعاع, thermal energy=انرژی گرمایی, gravitational potential energy=انرژی پتانسیل گرانشی; tr: impulse=impuls, vector=vektör, inertia=eylemsizlik, centrifugal=merkezkaç, tangent=teğet, period=periyot, radius=yarıçap, thermal energy=ısı enerjisi, gravitational potential energy=yer çekimi potansiyel enerjisi.

---
Task ID: 10-4
Agent: translator fa+tr (part-04)
Task: Translate lessons m10, f1, f2 to Persian and Turkish.

Work Log:
- Read worklog, i18n schema.ts, game types.ts, then extracted the exact base lessons: m10-simple-machines (lessons-mech-b.ts), f1-pressure and f2-buoyancy (lessons-fluids.ts).
- Wrote src/data/i18n/fa/part-04.ts and src/data/i18n/tr/part-04.ts from scratch (stubs replaced): full LessonOv for all 3 lessons × 2 locales — title, tagline, 3 objectives each, every concept block in base order (m10: 10 blocks, f1: 9, f2: 10), formula captions translated (formula blocks carry caption only, no tex), tables with identical row/col counts and Latin unit symbols, worked example (title/problem/answer + text-only steps, no tex), and every practice+quiz question keyed by exact base ids (m10: p1-p2, q1-q5; f1: p1-p2, q1-q4; f2: p1-p2, q1-q5) with prompt, all choices in base order (answerIndex untouched — overlays never carry it), both hints, and explanation.
- Math hygiene: every $…$ substring copied byte-for-byte from the base TS sources (including \\, escapes like $F = mg\\sin\\theta$, $10{,}000\\ \\mathrm{cm^2}$, $\\rho_{\\text{body}}/\\rho_{\\text{fluid}}$); verified per-field that base and overlay math segment arrays are identical in order.
- Persian style: warm «quoted» phrasing for ages 11–15, ZWNJ in compound words (می‌کند، ماشین‌های، به‌عنوان), Western digits, Latin units (N, Pa, kPa, kg/m³, m/s²), **bold** wrapped around the corresponding translated words.
- Turkish style: proper ş/ğ/İ/ı, TDK-style apostrophe suffixes on numerals (91.7'sini, 80'i) escaped in TS strings, glossary-exact terms (kaldırma kuvveti, eğik düzlem, yer çekimi, akışkan…).
- Terminology decisions: lever vocabulary — fa: نیروی محرک (effort) / بار (load) / بازوی محرک / بازوی بار / تکیه‌گاه (fulcrum), tr: kuvvet / yük / kuvvet kolu / yük kolu / dayanak noktası (standard middle-school textbook terms); crowbar = levye (tr) / میله اهرمی + چرخ‌دستی (فرقون) (fa); "levers in disguise" kept playful in both; snowshoe = kar ayakkabısı / کفش برفی; ballast tanks = balast tankları / مخزن‌های بالاست; submerged fraction = batan kesir / کسر زیر آب.
- QA (temporary bun script, deleted afterwards): imports both overlay files + base lesson arrays; checks per lesson-locale: concept length & block types, table headers/rows counts, objectives/example-steps counts, every base question id present with no extra keys, choices/hints counts match, even $ count in every string, math segments byte-identical, ** marker parity, no empty strings/TODO/placeholder, steps carry no tex. First run caught 2 missing ** bold markers in tr f1 list items → fixed → rerun clean: 6/6 lesson-locale pairs.
- Validation: `bunx tsc --noEmit | grep i18n/(fa|tr)/part-04` → empty; no eastern digits (۰-۹/٠-٩) in either file.

Stage Summary:
- Files written: src/data/i18n/fa/part-04.ts, src/data/i18n/tr/part-04.ts
- Lessons fully covered: m10-simple-machines, f1-pressure, f2-buoyancy × 2 locales (fa, tr)
- Glossary notes: used only the mandatory glossary plus these additions — fa: نیروی محرک/بازوی محرک/بازوی بار (lever arms), تکیه‌گاه (fulcrum), انرژی پتانسیل (PE), سنجاق ته‌گرد (drawing pin), گوه (wedge), چرخ و محور (wheel & axle), مخزن بالاست (ballast tank), کوه یخ (iceberg), کسر زیر آب (submerged fraction); tr: kuvvet kolu/yük kolu, dayanak noktası, kama, çark ve mil, balast tankı, buzdağı, batan kesir, temas alanı (contact area), çakmak (drawing pin), levye (crowbar).

---
Task ID: 10-5
Agent: translator fa+tr (part-05)
Task: Translate lessons f3, t1, t2 to Persian and Turkish.

Work Log:
- Read worklog.md, i18n/schema.ts, lib/game/types.ts, then extracted the exact base content for f3-pascal (lessons-fluids.ts) and t1-heat-vs-temperature, t2-heat-transfer (lessons-thermal.ts).
- Wrote src/data/i18n/fa/part-05.ts and src/data/i18n/tr/part-05.ts as full overlay files (LessonOvFile): title, tagline, 3 objectives, concept blocks (same count/type/order as base — f3: p/formula/list/h/key/h/p/formula/list = 9 blocks; t1: 10 blocks; t2: 10 blocks incl. the 4-col × 3-row transfer-modes table), worked example (steps translated text-only: f3 ×3, t1 ×4, t2 ×3), and all questions keyed by exact base ids.
- Question coverage: f3 (p1, p2, q1–q4), t1 (p1, p2, q1–q4), t2 (p1, p2, q1–q5) = 19 questions × 2 locales; all choices (same order/count, answerIndex untouched), 2 hints each, prompt + explanation translated; numeric questions kept choice-free.
- All $…$ LaTeX copied byte-for-byte (e.g. $P_{\text{total}} \approx 101.3\ \mathrm{kPa} + \rho g h$, $c = 4186\ \text{J/(kg·°C)}$, $2^2 = 4\times$); western digits everywhere; unit symbols (Pa, N, kg, m², m³, J, °C) kept Latin; **bold** and *italic* markers re-wrapped around the corresponding translated words.
- Terminology followed the mandatory glossary strictly (fa: فشار/شناوری/گرما/گرمای ویژه/رسانش/همرفت/تابش/چگالی/رسانا/نارسانا…; tr: basınç/kaldırma kuvveti/ısı/öz ısı/iletim/taşınım/ışınım/yoğunluk/iletken/yalıtkan…). Tricky decisions: "fluid" → fa شاره / tr akışkan; "pascal's principle" per glossary; "latent heat" → fa گرمای نهان / tr gizli ısı; "inverse-square law" → fa قانون عکس مجذور / tr ters kare yasası; ear "popping" → fa گوش‌هایت می‌ترکند / tr “çat” diye ses verir; avoided bidi-hostile mixed-direction strings in hints by phrasing "intensity ∝ 1/distance²" in words (fa/tr) where the base had it as plain text, while keeping ∝ + $1/d^2$ where the base itself used inline math; Turkish possessive suffixes attached to math-free text only (no ASCII apostrophes — used U+2019).
- Validation: `bunx tsc --noEmit | grep i18n/(fa|tr)/part-05` → empty (run twice). Bun QA script (temp, deleted after run) verified: $-parity on every string; math-span multiset ⊆ base math spans (byte-identical); concept length/type/order; table header/row/cell counts; list item counts; formula caption presence matches base; example step counts + text-only steps; every base question id present with matching choices/hints counts and no empty fields; no unexpected overlay ids/keys → ALL CHECKS PASSED for both locales. Temp script removed so only the two part files + worklog were touched.

Stage Summary:
- Files written: src/data/i18n/fa/part-05.ts, src/data/i18n/tr/part-05.ts
- Lessons fully covered: f3-pascal, t1-heat-vs-temperature, t2-heat-transfer × 2 locales
- Glossary notes: beyond the mandatory glossary — fluid=شاره/akışkan; piston=پیستون/piston; emit=گسیل کردن/yaymak; infrared radiation=تابش فروسرخ/kızılötesi ışınım; convection current=جریان همرفتی/taşınım akıntısı; heat sink=گرماگیر/ısı emici; vacuum flask=فلاسک خلأ/vakumlu termos; car jack=جک خودرو/araba kriko; brake fluid=روغن ترمز/fren hidroliği; dam=سد/baraj; specific heat capacity rendered with glossary terms گرمای ویژه/öz ısı;joule=ژول/joule; atmosphere (unit)=اتمسفر/atmosfer; sensor=حسگر/sensör; insulation=عایق‌کاری/yalıtım.
---
Task ID: 10-6
Agent: translator fa+tr (part-06)
Task: Translate lessons t3, w1, w2 to Persian and Turkish.

Work Log:
- Read worklog, i18n/schema.ts, lib/game/types.ts, then extracted full English source for 't3-phase-change' (lessons-thermal.ts) and 'w1-wave-anatomy', 'w2-sound' (lessons-waves.ts); studied fa/tr part-02 overlays to match established tone and formatting (ZWNJ in fa, typographic ’ in tr, single-quoted strings).
- Wrote src/data/i18n/fa/part-06.ts: 3 lessons fully translated (titles/taglines/objectives, 9+9+8 concept blocks with tables/lists/formula captions, worked examples as text-only steps, 6+7+7 questions incl. all MC choices and numeric questions without choices).
- Wrote src/data/i18n/tr/part-06.ts: same coverage in Turkish with correct ş/ğ/İ/ı orthography.
- Copied every $…$ LaTeX segment byte-for-byte; kept **bold** and *italic* markers wrapping the corresponding translated words; used «» in fa and “ ” in tr; Western digits and Latin unit symbols (m/s, Hz, J/kg, °C, km, cm) everywhere; never changed answer order (answerIndex untouched — choices only relabeled in place).
- Built a temporary bun validator (removed after use) that imported both overlay files plus the base lessons and checked: (1) even $-count in every string field, (2) concept block count/type/table-row alignment vs base, (3) objectives count, worked-example step count and absence of tex in overlay steps, (4) full question-id coverage for practice+quiz with matching hints/choices counts, (5) multiset equality of every LaTeX segment vs the base (byte-for-byte). ALL CHECKS PASSED for both locales.
- `bunx tsc --noEmit | grep "i18n/(fa|tr)/part-06"` → no output (clean). Remaining repo tsc errors are pre-existing in src/lib/game/i18n.tsx and translate.ts (other agents' files).

Stage Summary:
- Files written: src/data/i18n/fa/part-06.ts, src/data/i18n/tr/part-06.ts
- Lessons fully covered: t3-phase-change, w1-wave-anatomy, w2-sound × 2 locales
- Glossary notes: mandatory glossary applied as-is; coins — fa: تناوب=period, ذوب‌شوندگی avoided, انجماد=freezing, میعان=condensation, موج عرضی/موج طولی=transverse/longitudinal wave, تراکم/انبساط=compression/rarefaction, دیاپازن=tuning fork, فروصدا/فراصوت=infrasound/ultrasound, آذرخش/رعد=lightning/thunder, تک‌موج=pulse, فلات=plateau; tr: hâl (state) vs hal değişimi (phase change) per glossary split, donma=freezing, yoğuşma=condensation, enine/boyuna dalga=transverse/longitudinal, sıkışma/seyrekleşme=compression/rarefaction, diyapazon=tuning fork, infrases/ultrases=infrasound/ultrasound, şimşek/gök gürültüsü=lightning/thunder, atım=pulse, plato=plateau, periyot=period.
---
Task ID: 10-9
Agent: translator fa+tr (part-09)
Task: Translate lessons e3, e4, p1 to Persian and Turkish.

Work Log:
- Read worklog.md, i18n/schema.ts, lib/game/types.ts, and the runtime merge code (src/lib/game/translate.ts, l10n.ts) to confirm contract: overlays are keyed by full lesson id, questions must use the base question's EXACT full id (e.g. 'e3-series-parallel-p1'), and ovList/ovBlock silently fall back to English if any string is empty or any count mismatches.
- Extracted e3-series-parallel, e4-magnets from lessons-em-b.ts and p1-atom from lessons-modern.ts; wrote full Persian and Turkish overlays (title, tagline, objectives, all concept blocks in identical order/types, worked example with text-only steps, all 7 practice+quiz questions per lesson).
- Copied every $…$ LaTeX segment byte-for-byte (\\dfrac, \\Omega, \\mathrm{A}, R_{\text{total}}, I \times N, (±n) charge segments); kept **bold** markers wrapping translated words and the *italic* right-hand rule marker; Western digits and Latin unit symbols throughout; «» quotes in Persian, proper ş/ğ/İ/ı in Turkish.
- Validation: bunx tsc --noEmit | grep "i18n/(fa|tr)/part-09" → no output; bun script (temp, deleted afterwards) imported both overlays + base lessons and checked: even $ parity on every string, $-count equality vs base field-by-field, concept block count/type/order, table header/row/column counts, question id coverage (no missing, no extra), choices/hints counts, no empty strings. Fixed 4 failures (dropped $…$ wrappers around plain numerals 8/11 in p1-p1 and p1-q5 explanations) → ALL CHECKS PASSED.
- Tricky terminology: e3 table's first header is an empty string in the base; runtime ovList would discard the whole header row (falling back to English 'Series'/'Parallel') if any entry is length 0, so the empty cell is rendered as a single space ' ' to keep the translated «سری/موازی» and 'Seri/Paralel' headers. e4-q4 choice “North is simply ‘up’ for magnets” → «شمال برای آهن‌رباها به‌سادگی یعنی «بالا»» / “kuzey basitçe ‘yukarı’ demektir”. 'field strength (units)' for e4 kept as an abstract I×N "unit": fa «واحد», tr 'birim'.

Stage Summary:
- Files written: src/data/i18n/fa/part-09.ts, src/data/i18n/tr/part-09.ts
- Lessons fully covered: e3-series-parallel, e4-magnets, p1-atom × 2 locales (fa, tr)
- Glossary notes: used mandatory glossary strictly (مدار سری/موازی, مقاومت, جریان الکتریکی, الکتروآهن‌ربا, قطب مغناطیسی, قطب‌نما, سیم‌پیچ, عدد جرمی, لایه, ایزوتوپ, یون; seri/paralel devre, gerilim, direnç, elektromıknatıs, mıknatıs kutbu, pusula, solenoid→sarmal for "coil" per context, kütle numarası, kabuk, izotop, iyon). Coined beyond glossary: fa branch/شاخه (parallel branch), رانش/کشش (repel/attract), قطب‌های هم‌نام/ناهمنام (like/unlike poles), قاعدهٔ دست راست (right-hand grip rule), برق شهر (mains), خط‌های میدان (field lines), برآیند بارها (net charge); tr kol (branch), itme/çekme (repel/attract), aynı cins/zıt kutup (like/unlike poles), sağ el tutma kuralı (right-hand grip rule), şebeke (mains), alan çizgileri (field lines), net yük (net charge), sarım (turn/winding).
---
Task ID: 10-10
Agent: translator fa+tr (part-10)
Task: Translate lessons p2, p3 to Persian and Turkish.

Work Log:
- Read worklog, i18n schema, game types, and lessons-modern.ts; extracted p2-radioactivity (9 concept blocks: p/table/h/p/formula/p/list/key/p) and p3-modern (9 blocks: p/key/h/p/formula/p/h/p/list), each with 1 worked example (3 steps), 2 practice + 5 quiz questions (7 ids per lesson).
- Dumped runtime strings of the base lessons with a bun script before translating, to confirm exact LaTeX escape sequences (\\gamma, \\tfrac, \\ldots, \\mathrm, backslash-space units) byte-for-byte.
- Wrote full fa and tr overlays: title, tagline, 3 objectives, all 9 concept blocks (same order/types), worked example (title/problem/3 step texts/answer), and all 14 question ids per lesson (prompt, 4 choices for MC in base order, 2 hints, explanation). Numeric questions got no choices. answerIndex untouched.
- Validation: bunx tsc --noEmit | grep "i18n/(fa|tr)/part-10" → empty; bun script verified per lesson: concept length/types/row-col/list-item/step counts match base, all 14 question ids present with matching choices/hints counts, every string non-empty, even $-parity everywhere, and every $…$ math segment byte-identical to a base LaTeX segment. All green.

Stage Summary:
- Files written: src/data/i18n/fa/part-10.ts, src/data/i18n/tr/part-10.ts
- Lessons fully covered: p2-radioactivity, p3-modern × 2 locales
- Glossary notes: mandatory glossary applied (پرتوزایی/نیمه‌عمر/واپاشی، radyoaktiflik/yarı ömür/bozunum, کندی زمان/zaman genişlemesi, ساعت متحرک/hareket eden saat, طول سکون/durgun uzunluk coined from rest-energy entries). Persian: nuclear "radiation" rendered پرتو (from glossary پرتو گاما/پرتوزایی) instead of تابش, which stays thermal-only; "quanta" = کوانتا / kuanta (plural of کوانتوم/kuantum); "Scale honesty" = صداقت درباره‌ی مقیاس / Ölçek dürüstlüğü; "tracer" = ردیاب / izleyici; "interference pattern" = الگوی تداخل / girişim örüntüsü. RTL shielding chain "paper → aluminium → lead" rephrased as «کاغذ، سپس آلومینیم، سپس سرب» to avoid bidi-arrow ambiguity; numeric chains (400 → 200 → ?) kept with → since they render LTR. Decimal points kept as-is (1.25) in all locales for consistency with KaTeX math.
---
Task ID: 10-7
Agent: translator fa+tr (part-07)
Task: Translate lessons w3, o1, o2 to Persian and Turkish.

Work Log:
- Read worklog, schema.ts, types.ts; extracted base lessons w3-doppler-echo (lessons-waves.ts), o1-reflection and o2-refraction (lessons-optics-a.ts); read translate.ts to confirm overlay merge rules (lesson keyed by lesson id, questions keyed by FULL base question ids, e.g. 'w3-doppler-echo-q5' — note m1-style short ids in part-01 only work because that lesson's base ids are short).
- Wrote src/data/i18n/fa/part-07.ts and src/data/i18n/tr/part-07.ts from scratch, replacing stubs: full overlay for w3 (9 concept blocks, 3-step example, 7 questions), o1 (9 blocks, example, 6 questions), o2 (9 blocks incl. 3×4 table, example, 7 questions) × 2 locales.
- Kept every $…$ LaTeX segment byte-identical (incl. $f'$ strings via double-quoted TS literals), Western digits, Latin unit symbols, **bold** and *italic* markers mapped to translated words, «» quotes in Persian, “ ” in Turkish, ZWNJ half-spaces in Persian compounds.
- Validation: `bunx tsc --noEmit` filtered on i18n/(fa|tr)/part-07 → clean. Wrote a throwaway bun checker (outside the repo) that imports both overlays + base lessons and verifies: even '$' parity in every string, concept block count/type/order match, table header/row/col counts, list item counts, example step counts, every base practice+quiz id present with no extras, choices/hints counts equal to base, no empty strings/placeholders, and every $…$ segment exists in the corresponding base string. Result: ALL CHECKS PASSED for both locales; checker deleted afterwards.
- Tricky terminology: Persian «جبههٔ موج» / Turkish «dalga cephesi» for wavefront; pitch rendered contextually (fa «زیر/بم، زیرِ صدا», tr «tiz/pes»); fa «پژواک‌یابی» coined for echolocation (tr uses standard «ekolokasyon»); fa «بازتاب منظم (آینه‌ای)» + «بازتاب پخشی» and tr «düzenli/dağınık yansıma» for specular/diffuse; fa «بازتابندهٔ بازگشتی», tr «geri yansıtıcı» for retroreflector; fa «تنگ آزمایش» for the refraction-tank sim reference; onomatopoeia «نیی-ناااو» (fa) / “ni-naaav” (tr) for the siren; Persian uses «قانون اسنل», Turkish «Snell'in yasası»; vacuum = fa «خلأ» / tr «boşluk».

Stage Summary:
- Files written: src/data/i18n/fa/part-07.ts, src/data/i18n/tr/part-07.ts
- Lessons fully covered: w3-doppler-echo, o1-reflection, o2-refraction × 2 locales
- Glossary notes: terms coined beyond mandatory glossary — wavefront=جبههٔ موج/dalga cephesi; echolocation=پژواک‌یابی/ekolokasyon; specular=بازتاب منظم/düzenli yansıma; diffuse=بازتاب پخشی/dağınık yansıma; retroreflector=بازتابندهٔ بازگشتی/geri yansıtıcı; ultrasound=فراصوت/ultrason; pitch=زیر و بمی (زیر/بم)/tizlik (tiz/pes); medium=محیط/ortam; refractive index per glossary (ضریب شکست/kırılma indisi); Snell's law=قانون اسنل/Snell'in yasası; wavefront spacing kept descriptive. All other terms followed the mandatory glossary exactly.
---
Task ID: 10-8
Agent: translator fa+tr (part-08)
Task: Translate lessons o3, o4, e1, e2 to Persian and Turkish.

Work Log:
- Read worklog, i18n/schema.ts, lib/game/types.ts, and source files lessons-optics-b.ts (o3-lenses, o4-color) + lessons-em-a.ts (e1-static-fields, e2-ohms-law).
- Wrote full Persian overlay src/data/i18n/fa/part-08.ts: 4 lessons, all 9+8+8+9 concept blocks aligned with base types/order, worked examples (text-only steps), all 25 questions (o3 p1–p2/q1–q4, o4 p1–p2/q1–q4, e1 p1–p2/q1–q4, e2 p1–p2/q1–q5) with prompts, choices (same count/order), hints (same count) and explanations.
- Wrote full Turkish overlay src/data/i18n/tr/part-08.ts with identical coverage and structure.
- Copied all $…$ LaTeX byte-for-byte (lens equation, m = -d_i/d_o, I=Q/t, V=IR, Ω/V/A/C unit macros, R+G=\text{yellow}, \text{white}-\text{red}=\text{cyan}, etc.); kept **bold** and *italic* markers on translated words; Western digits; Latin unit symbols; Persian «» quotes, Turkish “” quotes and proper ş/ğ/İ/ı.
- Validation: `bunx tsc --noEmit` grep for i18n/(fa|tr)/part-08 → clean. Bun script checked: even $-count in every string field, concept block count/type/order per lesson, table header/row/col counts, list item counts, formula captions present, example step counts, every base question id covered with no extras, choices/hints counts equal to base, no empty strings → ALL PASSED. Second script verified every $…$ math segment in overlays exists verbatim in the base data → ALL MATCH.

Stage Summary:
- Files written: src/data/i18n/fa/part-08.ts, src/data/i18n/tr/part-08.ts
- Lessons fully covered: o3-lenses, o4-color, e1-static-fields, e2-ohms-law × 2 locales (fa, tr)
- Glossary notes: mandatory glossary applied throughout. Additional coinages — fa: attraction/repulsion = ربایش/رانش, upright (image) = راست‌به‌راست, discharge = تخلیهٔ الکتریکی ساکن, lightning = آذرخش, induction = القای الکتریکی, superposition = برهم‌نهی, test charge = بار آزمون, optical bench = نیمکت نوری, searchlight = نورافکن جست‌وجوگر, cyan/magenta = فیروزه‌ای/سرخابی, additive/subtractive = افزایشی/کاهنده; tr: attraction/repulsion = çekme/itme, upright = dik, lightning = yıldırım, induction = endüksiyon (etki ile elektriklenme), superposition = süperpozisyon, test charge = deneme yükü, coulomb = kulomb, cyan/magenta = camgöbeği/macenta, additive/subtractive = toplamsal/çıkarıcı, violet = eflatun (mor kept for purple).

---

Task ID: 9
Agent: orchestrator (main)
Task: Add a language setting with full Persian (RTL) and Turkish support across the whole game.

Work Log:
- Built i18n core `src/lib/game/i18n.tsx`: hydration-safe external locale store (useSyncExternalStore), `t(key, vars)` dictionary hook, `simT()` term glossary hook, `setLocale` persists to `localStorage('pq.locale')`, syncs `<html lang/dir>` (RTL for fa), browser-language detection on first visit (`bootstrapLocale`).
- UI dictionaries (~200 keys each): `src/lib/game/dict/{en,fa,tr}.ts` — header/settings/footer, sidebar, home, lesson view, practice/quiz, playground, progress, licenses, unit names, ranks, special badges.
- Physics-term glossaries (`dict/terms-fa.ts`, `terms-tr.ts`, ~330 entries each) translated all sim UI automatically by wiring sim-kit controls (SimFrame title/brief, SimSlider, SimButton incl. icon+text JSX children via deep text-node translation, SimToggle, SimSelect options, Readout, Legend) through `simT` — zero edits needed in the 30 sim files.
- Content overlay system: `src/data/i18n/schema.ts` (typed LessonOv) + `src/lib/game/translate.ts` (validated merge: positional concept blocks, question overrides by id, per-field English fallback) + `l10n.ts` hooks (useLessons/useLesson/useUnits/useRankFor/useSpecialBadges with per-locale memoization).
- Spawned 10 translator agents (Task 10-1..10-10): all 30 lessons fully translated to fa + tr in `src/data/i18n/{fa,tr}/part-01..10.ts` with mandatory glossaries; each agent validated math-token byte-equality, counts, and $-parity.
- Refactored 10 chrome components to i18n + RTL logical properties; language switcher (3 buttons) added to settings; celebration/progress/licenses pages fully localized.
- RTL & fonts: globals.css (Vazirmatn for fa, Inter hint for tr, KaTeX/font-mono/canvas LTR isolation in RTL, letter-spacing fixes), search icons to `start-*`, arrows `rtl:rotate-180`.
- Fixed en route: locale store lint (setState-in-effect → external store), conditional hook order in lesson-view, whitespace-preserving simT for JSX-fragment buttons, missing challenge-label terms.

Stage Summary:
- `bunx tsc --noEmit` clean for src/; `bun run lint` 0 errors; overlay coverage check: ALL 30 lessons × 2 locales fully covered; dev.log 200s.
- Browser-verified end-to-end (agent-browser): EN→FA switch mirrors layout (html dir=rtl), full Persian quiz run (5/5, mastery celebration, +70 XP, streak), TR switch (ranks/UI re-render), persistence across reload, mobile 390×844 RTL, Persian reset dialog (wipes progress, keeps locale), zero console/page errors.
- Intentional fallbacks documented in README: canvas-art text and canvas aria-labels remain English.
---
Task ID: 11
Agent: orchestrator (main)
Task: Fix Persian (RTL) correctness, sidebar title UI, and mobile responsiveness bugs reported by the user.

Work Log:
- RTL root causes fixed:
  - app/layout.tsx: added a pre-hydration inline script that sets <html lang/dir> from localStorage('pq.locale')/browser language BEFORE first paint — kills the LTR→RTL flash and layout jump on every load for Persian users.
  - shell.tsx header: physical `ml-auto` → logical `ms-auto` (in RTL, ml-auto absorbs free space on the wrong side, so the stats cluster stuck to the brand instead of pushing to the far edge — exactly the bunched header in the user's screenshot).
  - content-blocks.tsx: key-idea callout `border-l-4` → `border-s-4` (accent now on the start/right side in RTL); table headers `text-left` → `text-start`.
  - home.tsx: decorative orbit insets `-right-*` → `-end-*` (mirrors in RTL); home filter selects now `min-w-0 flex-1` on mobile (fixed widths used to overflow 320–390 px screens).
  - fa dict: 'lesson.min' '~{n} دقیقه' → 'حدود {n} دقیقه' (leading tilde is a bidi-hostile neutral that rendered as «۱۲~»).
  - lesson-view.tsx: XP chip wrapped in dir="ltr" span; footer made flex-wrap.
  - sims: bulk-replaced icon margins `mr-1` → `me-1` across all 30 sim files (icons sat on the wrong side of their labels in RTL buttons).
- Sidebar title UI root cause found & fixed:
  - Radix ScrollArea's viewport uses display:table, so rows sized to max-content and title truncation never engaged (long titles clipped hard at the rail edge — the user's "(F = ma)" floating-line artifact). Replaced ScrollArea with a plain `overflow-y-auto pq-scroll` container; rows now ellipsize correctly in every locale.
  - Titles (sidebar/home/h1) wrapped in <bdi> + min-w-0/flex-1/overflow-hidden so mixed Persian+Latin titles stay atomic and single-line.
- Bidi hardening: new `isolateLatin()` in tex.tsx wraps Latin/unit islands ("10 N", "m/s²", "(kg)") in Unicode LRI…PDI isolates inside RTL text — fixes digits tearing away from units in table headers («…هُل 10 N») and similar strings. Applied inside RichText plain segments + all raw title render sites. Strings without RTL script pass through untouched (EN/TR safe).
- Mobile responsiveness:
  - lesson step rail `grid-cols-4` → `grid-cols-2 sm:grid-cols-4` (Persian labels no longer crush at 390 px).
  - All 30 sim button groups `flex gap-2` → `flex flex-wrap gap-2` (challenge button no longer clips off-screen).
  - Practice/quiz layouts verified at 390×844; sidebar sheet opens from the right in RTL with correct icon/badge sides.
- Translation gaps found during browser QA, added to terms-fa/terms-tr: 'Challenge: 20 m/s in 4 s', 'Challenge: 20 m in 4.0 s', 'Speed v = f·λ', 'Siren speed vₛ', color presets Yellow/Cyan/Magenta/White, 'Presets:', o3 image-type values ('at infinity', 'real · inverted', 'virtual · upright'); wired the raw o4 'Presets:' span and o3 Readout value through simT.
- Verified end-to-end with agent-browser: FA desktop 1440 (header mirrored, callout/table/sidebar all correct), FA mobile 390×844 (home, lesson, sim, practice answer flow, sidebar sheet), TR dark LTR regression, EN regression, practice Q answered in FA with KaTeX feedback, console clean after reload (only pre-existing Radix DialogContent aria warning), dev.log 200s, `bun run lint` 0 errors, `bunx tsc --noEmit` clean for src/.

Stage Summary:
- Persian UI is now truly RTL end-to-end: correct first-paint direction, mirrored header/footer, start-side accents, atomic Latin islands, working title truncation in the lesson index, and phone-safe layouts. No content or lesson files touched; scope limited to chrome/layout/i18n plumbing + glossary additions.

---
Task ID: 12
Agent: orchestrator (main)
Task: Fix "Persian still not RTL" — lesson content rendered as an LTR bidi paragraph despite html dir=rtl.

Work Log:
- Root cause identified by DOM inspection: Radix primitives (Tabs root `div.flex.flex-col.gap-2`, Dialog, Select, Slider, Collapsible, Toast, …) hardcode `dir="ltr"` on their root elements by default. The shadcn `<Tabs>` wraps the ENTIRE lesson body (learn/sim/practice/quiz), so every paragraph, table, list, objective grid and formula caption inside it inherited an LTR bidi paragraph — exactly the user's screenshot (left-aligned text, LTR table column order, left-side bullets, scrambled caption) while page chrome stayed RTL.
- Fix 1 (core): new `src/components/game/app-direction.tsx` wraps the whole app (children + Toaster, mounted in `src/app/layout.tsx`) in Radix `DirectionProvider` from `@radix-ui/react-direction` (added explicitly to package.json, ^1.1.1), with `dir` taken from `useI18n().dir` — fixes every Radix primitive at once, no per-component edits.
- Fix 2 (SSR direction): `setLocale`/`bootstrapLocale` now also persist the locale to cookie `pq.locale` (1y, samesite=lax); `layout.tsx` awaits `cookies()` and renders `<html lang dir>` from it, so Persian SSR output is `<html lang="fa" dir="rtl">` with zero dependence on client scripts. Inline pre-paint bootstrap script extended to fall back to the cookie (localStorage → cookie → navigator).
- Fix 3 (bidi islands): pure-Latin fragments like the table cell "≈ 1.4 m/s" were skipped by `isolateLatin` (no RTL chars) and got reordered to "m/s 1.4 ≈" in RTL paragraphs. `isolateLatin(text, force)` now accepts `force` (true on RTL pages via `useI18n().dir` inside `RichText`) and ISLAND_RE gained leading math symbols (≈ ~ ± × ÷ < > ≤ ≥) so the ≈ stays attached to its value.
- Browser-verified (agent-browser): FA desktop 1280 + user-like 900 (no sidebar) + mobile 390×844 — objectives first card right, paragraphs right-aligned, caption "تندی v بر حسب m/s. مسافت d بر حسب m. زمان t بر حسب s" correct, table mirrored with atomic "≈ 1.4 m/s"; Radix Tabs root now dir=rtl (was ltr); SSR curl shows `<html lang="fa" dir="rtl">` from cookie; practice + quiz interactive runs in FA (radio select, submit, KaTeX feedback, footer); sidebar sheet opens right; sim sliders/play/reset RTL; playground + progress pages RTL; EN and TR regressions clean (ltr, tab root ltr); no console/page errors; `bun run lint` 0 errors; `bunx tsc --noEmit` clean for src/.

Stage Summary:
- Files changed: package.json (+@radix-ui/react-direction), src/app/layout.tsx (cookie SSR dir + AppDirection mount), src/lib/game/i18n.tsx (cookie persistence), src/components/game/app-direction.tsx (new), src/components/game/tex.tsx (isolateLatin force param + symbol-leading islands).
- Persian lesson content is now genuinely RTL end-to-end, including inside all Radix-managed tabs/dialogs/selects/sliders; direction survives reloads, SSR and even disabled scripts.
