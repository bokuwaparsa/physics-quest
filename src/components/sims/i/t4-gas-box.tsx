// ─── Sim: Gas Box · 100 elastic particles, pressure from wall momentum flux ───
// 2-D kinetic theory: P = N·m·⟨v²⟩/(2A), calibrated so P ≈ 100·(T/300)/V units
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimToggle, Readout, Legend,
  useSimCanvas, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

const N = 100 // particles
const M = 1 // particle mass (sim)
const SVF = 0.0953 // screen-friendly factor: v_rms = SVF·√T  (sim units/s)
const H_SIM = 2 // box height in sim units (fixed)
const W_SIM = 3 // box width at V = 1 (scales with V)
const CAL = 4.4036 // calibration: P_units = CAL × flux → P ≈ 100·(T/300)/V units
const TARGET = 150
const BAND = 8
const HOLD = 2 // seconds the pressure must stay in band
const WIN = 1.5 // flux measurement window (s)

export function GasBoxSim() {
  const [temp, setTemp] = useState(300)
  const [vol, setVol] = useState(1)
  const [colour, setColour] = useState(true)
  const [pDisp, setPDisp] = useState(100) // live copy of the smoothed pressure
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({
    x: new Float64Array(N), y: new Float64Array(N),
    vx: new Float64Array(N), vy: new Float64Array(N),
    impulse: 0, windowT: 0,
    pSmooth: 100, // analytic start: P = 100·(T/300)/V at 300 K, V = 1
    pShown: 100,
    inBand: 0,
    challenge: 'idle' as 'idle' | 'active' | 'won',
    seeded: false,
  })
  const prevT = useRef(300)
  const prevV = useRef(1)

  // seed once: uniform positions, speeds with mean-square exactly v_rms²
  if (!st.current.seeded) {
    const s = st.current
    s.seeded = true
    const factors = [0.55, 0.8, 1.0, 1.2, 1.45]
    let mean2 = 0
    for (let i = 0; i < N; i++) {
      s.x[i] = Math.random() * W_SIM
      s.y[i] = Math.random() * H_SIM
      const a = Math.random() * Math.PI * 2
      const f = factors[i % factors.length]
      s.vx[i] = f * Math.cos(a)
      s.vy[i] = f * Math.sin(a)
      mean2 += f * f
    }
    const norm = 1 / Math.sqrt(mean2 / N)
    for (let i = 0; i < N; i++) { s.vx[i] *= norm; s.vy[i] *= norm }
  }

  const applyTemp = (T: number) => {
    const s = st.current
    const f = Math.sqrt(T / prevT.current)
    for (let i = 0; i < N; i++) { s.vx[i] *= f; s.vy[i] *= f }
    prevT.current = T
  }

  const applyVol = (V: number) => {
    const s = st.current
    const f = V / prevV.current
    for (let i = 0; i < N; i++) s.x[i] *= f
    prevV.current = V
  }

  const startChallenge = () => {
    st.current.challenge = 'active'
    st.current.inBand = 0
    setChallenge('active')
    setResult('Goal: tune T and V until the smoothed pressure sits at 150 units (±8) for 2 s. Remember P ∝ T/V — try 450 K at V = 1, or 300 K with V ≈ 0.65–0.70.')
  }

  const reset = () => {
    st.current.challenge = 'idle'
    st.current.inBand = 0
    setChallenge('idle')
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    s.challenge = challenge
    const W = W_SIM * vol // box width, sim units
    const A = W * H_SIM // box area, sim units²
    const perim = 2 * (W + H_SIM)
    const v2mean = (SVF * SVF) * temp // ⟨v²⟩ by construction

    // ── physics + flux measurement ──────────────────────────────────────────
    if (!reducedMotion) {
      for (let i = 0; i < N; i++) {
        s.x[i] += s.vx[i] * dt
        s.y[i] += s.vy[i] * dt
        if (s.x[i] < 0) { s.x[i] = -s.x[i]; s.vx[i] = Math.abs(s.vx[i]); s.impulse += 2 * M * Math.abs(s.vx[i]) }
        else if (s.x[i] > W) { s.x[i] = 2 * W - s.x[i]; s.vx[i] = -Math.abs(s.vx[i]); s.impulse += 2 * M * Math.abs(s.vx[i]) }
        if (s.y[i] < 0) { s.y[i] = -s.y[i]; s.vy[i] = Math.abs(s.vy[i]); s.impulse += 2 * M * Math.abs(s.vy[i]) }
        else if (s.y[i] > H_SIM) { s.y[i] = 2 * H_SIM - s.y[i]; s.vy[i] = -Math.abs(s.vy[i]); s.impulse += 2 * M * Math.abs(s.vy[i]) }
      }
      s.windowT += dt
      if (s.windowT >= WIN) {
        const pRaw = (s.impulse / (s.windowT * perim)) * CAL
        s.pSmooth = s.pSmooth * 0.55 + pRaw * 0.45
        s.impulse = 0; s.windowT = 0
      }
    } else {
      // motion paused: show the exact kinetic-theory value instead
      s.pSmooth = (CAL * N * M * v2mean) / (2 * A)
    }
    // push the readout to React only when it moves (keeps re-renders rare)
    if (Math.abs(s.pSmooth - s.pShown) >= 0.5) {
      s.pShown = s.pSmooth
      setPDisp(s.pSmooth)
    }

    // ── challenge check ─────────────────────────────────────────────────────
    if (s.challenge === 'active') {
      if (Math.abs(s.pSmooth - TARGET) <= BAND) {
        s.inBand += dt
        if (s.inBand >= HOLD) {
          s.challenge = 'won'
          setChallenge('won')
          beep(660, 120); beep(880, 160)
          setResult(`★ P = ${Math.round(s.pSmooth)} units — on target and steady for 2 s! You lived the law P ∝ T/V: hotter or squeezed gas hammers the walls harder and more often.`)
        }
      } else {
        s.inBand = 0
      }
    }

    // ── draw ────────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const avail = w - 48
    const scale = avail / (W_SIM + 1.5) // px per sim unit
    const bw = W * scale
    const bh = H_SIM * scale
    const bx = 24 + (avail - bw) / 2
    const by = Math.max(70, (h - bh) / 2 + 8)

    // box
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(bx, by, bw, bh)
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2.5
    ctx.strokeRect(bx, by, bw, bh)

    // particles
    for (let i = 0; i < N; i++) {
      if (colour) {
        const sp = Math.hypot(s.vx[i], s.vy[i]) / Math.sqrt(v2mean)
        ctx.fillStyle = sp > 1.2 ? CANVAS.rose : sp < 0.8 ? CANVAS.teal : CANVAS.amber
      } else {
        ctx.fillStyle = CANVAS.amber
      }
      ctx.beginPath()
      ctx.arc(bx + s.x[i] * scale, by + s.y[i] * scale, 3.2, 0, Math.PI * 2)
      ctx.fill()
    }

    // labels
    ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-monospace, monospace'; ctx.textAlign = 'left'
    ctx.fillText(`N = ${N} elastic particles · P measured from wall momentum flux`, bx, by - 10)

    // challenge banner + hold bar
    ctx.textAlign = 'center'
    if (s.challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: reach P = 150 units (±8) by tuning T and V!', w / 2, 22)
      const bwid = Math.min(300, w - 120)
      const frac = Math.min(1, s.inBand / HOLD)
      ctx.fillStyle = CANVAS.panelLight
      ctx.fillRect(w / 2 - bwid / 2, 30, bwid, 8)
      ctx.fillStyle = CANVAS.teal
      ctx.fillRect(w / 2 - bwid / 2, 30, bwid * frac, 8)
      ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1
      ctx.strokeRect(w / 2 - bwid / 2, 30, bwid, 8)
      ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
      ctx.fillText(`in band ${s.inBand.toFixed(1)} / ${HOLD} s`, w / 2, 50)
    } else if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ P = 150 units — challenge complete!', w / 2, 22)
    }
  }, 400)

  return (
    <SimFrame
      title="Gas Box"
      brief="100 particles bounce elastically off the walls. Heat them (T↑) or squeeze the box (V↓) and watch the pressure climb — the readout is the real momentum the walls receive each second."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A box of 100 bouncing gas particles with adjustable temperature and volume; the pressure readout is measured from the momentum the particles deliver to the walls"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Temperature T" value={temp} min={50} max={900} step={10} unit="K" onChange={(v) => { applyTemp(v); setTemp(v) }} />
        <SimSlider label="Volume V" value={vol} min={0.5} max={1.5} step={0.05} unit="×" onChange={(v) => { applyVol(v); setVol(v) }} />
        <SimToggle label="Colour by speed" checked={colour} onChange={setColour} />
        <div className="flex flex-wrap gap-2">
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
            disabled={challenge === 'won'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: target P = 150
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Temperature" value={`${temp}`} unit="K" tone="text-rose-500" />
        <Readout label="Volume" value={vol.toFixed(2)} unit="×" tone="text-teal-500" />
        <Readout label="Pressure (smoothed)" value={Math.round(pDisp).toString()} unit="units" tone="text-amber-500" />
        <Readout label="Theory P = 100·T/(300·V)" value={(100 * temp / (300 * vol)).toFixed(0)} unit="units" tone="text-muted-foreground" />
      </div>
      <div className="flex flex-wrap gap-4">
        <Legend color={CANVAS.teal} label="slow particles" />
        <Legend color={CANVAS.amber} label="medium" />
        <Legend color={CANVAS.rose} label="fast particles" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted/60 text-foreground'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
