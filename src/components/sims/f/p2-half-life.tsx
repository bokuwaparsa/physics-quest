// ─── Sim: Half-Life · watch 100 atoms decay, one honest coin-flip at a time ───
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, Pause, Play, RotateCcw, StepForward } from 'lucide-react'

const HALF_LIFE = 5 // seconds per half-life (sim time)
const N0 = 100
const T_MAX = 20 // s shown on the graph (4 half-lives)

export function HalfLifeSim() {
  const [running, setRunning] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [guess, setGuess] = useState('')
  const [stats, setStats] = useState({ t: 0, left: N0, pred: N0 })

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const skip = useRef(0)

  const st = useRef({
    running: false,
    t: 0,
    atoms: Array.from({ length: N0 }, () => true) as boolean[],
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number }[],
    history: [{ t: 0, n: N0 }] as { t: number; n: number }[],
  })

  const reset = () => {
    const s = st.current
    s.t = 0
    s.atoms = Array.from({ length: N0 }, () => true)
    s.particles = []
    s.history = [{ t: 0, n: N0 }]
    setRunning(false)
    setStats({ t: 0, left: N0, pred: N0 })
  }

  /** Jump forward exactly one half-life: every surviving atom flips a coin. */
  const stepOnce = () => {
    const s = st.current
    s.atoms = s.atoms.map((alive) => (alive ? Math.random() >= 0.5 : false))
    s.t += HALF_LIFE
    const left = s.atoms.filter(Boolean).length
    s.history.push({ t: s.t, n: left })
    setRunning(false)
    setStats({ t: s.t, left, pred: N0 * Math.pow(0.5, s.t / HALF_LIFE) })
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current

    // ── layout ───────────────────────────────────────────────────────────────
    const gx1 = w - 24
    const graphW = Math.min(250, Math.max(170, w * 0.38))
    const gx0 = gx1 - graphW
    const gy0 = 56
    const gy1 = 336
    const pitch = Math.max(10, Math.min(24, Math.floor((gx0 - 88) / 10)))
    const cell = pitch - 4
    const atomPos = (i: number) => ({
      x: 28 + (i % 10) * pitch + cell / 2,
      y: 60 + Math.floor(i / 10) * pitch + cell / 2,
    })

    // ── physics: continuous decay, p per frame = 1 − 2^(−dt/5) ──────────────
    if (running && dt > 0) {
      s.t += dt
      const pDecay = 1 - Math.pow(2, -dt / HALF_LIFE)
      for (let i = 0; i < N0; i++) {
        if (s.atoms[i] && Math.random() < pDecay) {
          s.atoms[i] = false
          if (!reducedMotion) {
            const { x, y } = atomPos(i)
            const a = Math.random() * Math.PI * 2
            s.particles.push({ x, y, vx: Math.cos(a) * 90, vy: Math.sin(a) * 90, life: 0.8 })
            if (s.particles.length > 240) s.particles.shift()
          }
        }
      }
      const last = s.history[s.history.length - 1]
      if (!last || s.t - last.t >= 0.12) {
        s.history.push({ t: s.t, n: s.atoms.filter(Boolean).length })
        if (s.history.length > 800) s.history.shift()
      }
    }
    for (const pt of s.particles) {
      pt.x += pt.vx * dt
      pt.y += pt.vy * dt
      pt.life -= dt
    }
    s.particles = s.particles.filter((pt) => pt.life > 0)

    // publish readouts ~7×/s
    skip.current += 1
    if (skip.current >= 9) {
      skip.current = 0
      const left = s.atoms.filter(Boolean).length
      setStats({ t: s.t, left, pred: N0 * Math.pow(0.5, s.t / HALF_LIFE) })
    }

    // ── drawing ──────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-sans-serif, system-ui'
    ctx.textAlign = 'left'
    ctx.fillText('sample: 100 unstable atoms', 28, 42)
    ctx.textAlign = 'center'
    ctx.fillText('N = 100 · (½)ⁿ', gx0 + graphW / 2, 42)

    // atom grid
    for (let i = 0; i < N0; i++) {
      const { x, y } = atomPos(i)
      if (s.atoms[i]) {
        ctx.fillStyle = CANVAS.violet
        ctx.fillRect(x - cell / 2, y - cell / 2, cell, cell)
      } else {
        ctx.globalAlpha = 0.75
        ctx.fillStyle = CANVAS.teal
        ctx.fillRect(x - cell / 2, y - cell / 2, cell, cell)
        ctx.globalAlpha = 1
      }
    }

    // alpha particles
    for (const pt of s.particles) {
      ctx.globalAlpha = Math.max(0, pt.life / 0.8)
      ctx.fillStyle = CANVAS.amber
      ctx.beginPath(); ctx.arc(pt.x, pt.y, 2.6, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1
    }

    // ── N vs t graph ─────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(gx0, gy0, graphW, gy1 - gy0)
    ctx.strokeStyle = CANVAS.grid
    ctx.lineWidth = 1
    ctx.strokeRect(gx0, gy0, graphW, gy1 - gy0)
    const toGX = (tt: number) => gx0 + (tt / T_MAX) * graphW
    const toGY = (nn: number) => gy1 - (nn / N0) * (gy1 - gy0)

    // half-life guide lines at 50, 25, 12.5
    ctx.setLineDash([5, 4])
    ctx.font = '9px ui-monospace, monospace'
    const guides: [number, number, string][] = [
      [HALF_LIFE, 50, '50 · after 1'],
      [2 * HALF_LIFE, 25, '25 · after 2'],
      [3 * HALF_LIFE, 12.5, '12.5 · after 3'],
    ]
    for (const [gt, gn, label] of guides) {
      ctx.strokeStyle = CANVAS.muted
      ctx.beginPath(); ctx.moveTo(toGX(gt), gy0); ctx.lineTo(toGX(gt), gy1); ctx.stroke()
      ctx.fillStyle = CANVAS.muted
      ctx.textAlign = 'left'
      ctx.fillText(label, toGX(gt) + 4, toGY(gn) - 4)
      ctx.beginPath(); ctx.moveTo(gx0, toGY(gn)); ctx.lineTo(toGX(gt), toGY(gn)); ctx.stroke()
    }
    ctx.setLineDash([])

    // history curve
    ctx.strokeStyle = CANVAS.amber
    ctx.lineWidth = 2
    ctx.beginPath()
    s.history.forEach((pt, i) => {
      const x = toGX(pt.t), y = toGY(pt.n)
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    })
    ctx.stroke()
    const cur = s.history[s.history.length - 1]
    if (cur) {
      ctx.fillStyle = CANVAS.amber
      ctx.beginPath(); ctx.arc(toGX(cur.t), toGY(cur.n), 3.5, 0, Math.PI * 2); ctx.fill()
    }

    // axes labels
    ctx.fillStyle = CANVAS.muted
    ctx.font = '9px ui-monospace, monospace'
    ctx.textAlign = 'center'
    for (let tt = 0; tt <= T_MAX; tt += 5) ctx.fillText(`${tt}`, toGX(tt), gy1 + 12)
    ctx.fillText('time (s) · one half-life = 5 s', gx0 + graphW / 2, gy1 + 26)
    ctx.textAlign = 'right'
    for (const nn of [0, 25, 50, 75, 100]) ctx.fillText(`${nn}`, gx0 - 4, toGY(nn) + 3)
  })

  const checkGuess = () => {
    const v = parseFloat(guess)
    if (Number.isFinite(v) && Math.abs(v - 12.5) <= 1) {
      setChallenge('won')
      beep(660, 140); beep(880, 180)
      setResult('★ Spot on! N = 100 × (½)³ = 12.5 atoms (12 or 13 in a real count) — each half-life cuts the pile in half.')
    } else {
      setChallenge('lost')
      setResult('Not quite — after every half-life multiply by ½: 100 → 50 → 25 → 12.5. Use Step to check, then try again!')
    }
  }

  return (
    <SimFrame
      title="Half-Life Decay Chamber"
      brief="Start the clock: every 5 seconds (one half-life) about half of the surviving atoms decay. Step jumps a whole half-life at once."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg"
        style={{ height: 400 }}
        aria-label="Radioactive decay simulator: a grid of 100 violet atoms turning teal as they decay, with a graph of atoms remaining versus time"
        role="img"
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimButton onClick={() => setRunning((r) => !r)}>
          {running ? <Pause className="h-4 w-4 mr-1" aria-hidden /> : <Play className="h-4 w-4 mr-1" aria-hidden />}
          {running ? 'Pause' : 'Start'}
        </SimButton>
        <SimButton variant="secondary" onClick={stepOnce}>
          <StepForward className="h-4 w-4 mr-1" aria-hidden /> Step 1 half-life
        </SimButton>
        <SimButton variant="ghost" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-1" aria-hidden /> Reset
        </SimButton>
        <SimButton variant="outline" onClick={() => { if (challenge === 'idle' || challenge === 'won') setChallenge('active'); else checkGuess() }}>
          <Flag className="h-4 w-4 mr-1" aria-hidden /> Challenge: predict 3 half-lives
        </SimButton>
      </div>

      {challenge !== 'idle' && (
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs font-medium text-muted-foreground">
            After 3 half-lives, how many of the 100 atoms remain?
          </label>
          <input
            value={guess}
            onChange={(ev) => setGuess(ev.target.value)}
            inputMode="decimal"
            placeholder="your guess"
            aria-label="Predict atoms remaining after 3 half-lives"
            className="h-8 w-24 rounded-md border bg-background px-2 text-sm"
          />
          <SimButton variant="secondary" onClick={checkGuess}>Check</SimButton>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Readout label="Time" value={(stats.t / HALF_LIFE).toFixed(2)} unit="half-lives" />
        <Readout label="Atoms left" value={`${stats.left}`} tone="text-violet-400" />
        <Readout label="Predicted N" value={stats.pred.toFixed(1)} unit="atoms" tone="text-amber-500" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
