// ─── Sim: SHM Lab · spring or pendulum, measure the period T ──────────────────
// spring: x = A·cos(ωt), ω = √(k/m), A = 0.4 m · pendulum: θ = θ₀·cos(√(g/L)·t)
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, Legend,
  useSimCanvas, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

const G = 9.8 // m/s²
const A = 0.4 // spring amplitude, m
const TARGET = 2 // challenge period, s
const BAND = 0.05 // challenge tolerance, s

type Mode = 'spring' | 'pendulum'

export function ShmLabSim() {
  const [mode, setMode] = useState<Mode>('spring')
  const [m, setM] = useState(2)
  const [k, setK] = useState(20)
  const [len, setLen] = useState(1)
  const [theta0, setTheta0] = useState(15)
  const [tMeasUi, setTMeasUi] = useState(0) // live copy of the measured period
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const TTheory = mode === 'spring'
    ? 2 * Math.PI * Math.sqrt(m / k)
    : 2 * Math.PI * Math.sqrt(len / G)

  const st = useRef({
    t: 0, // sim clock (s)
    crossCount: 0, lastOddT: -1, // zero-crossing stopwatch (odd crossings = full cycle apart)
    i1: 0, i2: 0, nInt: 0, // last two full-cycle intervals (s)
    tMeas: 0, // T measured = average of the last two intervals
    consec: 0, // consecutive in-band cycles
    challenge: 'idle' as 'idle' | 'active' | 'won',
  })

  const clearMeasure = () => {
    const s = st.current
    s.crossCount = 0; s.lastOddT = -1
    s.i1 = 0; s.i2 = 0; s.nInt = 0; s.tMeas = 0; s.consec = 0
    setTMeasUi(0)
  }

  const win = (tMeas: number) => {
    st.current.challenge = 'won'
    setChallenge('won')
    beep(660, 120); beep(880, 160)
    setResult(mode === 'spring'
      ? `★ T = ${tMeas.toFixed(2)} s — two cycles in a row inside 2.00 ± 0.05 s! You tuned the ratio m/k just right: T = 2π√(m/k). Mass and stiffness trade off, so many pairs work.`
      : `★ T = ${tMeas.toFixed(2)} s — two cycles in a row inside 2.00 ± 0.05 s! You found the "seconds pendulum": T = 2π√(L/g) needs L ≈ 0.99 m. The swing angle θ₀ never mattered.`)
  }

  const evalMeas = (tMeas: number) => {
    const s = st.current
    if (s.challenge !== 'active') return
    if (Math.abs(tMeas - TARGET) <= BAND) {
      s.consec++
      if (s.consec >= 2) win(tMeas)
    } else {
      s.consec = 0
    }
  }

  const startChallenge = () => {
    st.current.challenge = 'active'
    st.current.consec = 0
    setChallenge('active')
    setResult('Goal: get a measured period of 2.00 ± 0.05 s for two cycles in a row. Spring: tune m and k (T = 2π√(m/k)). Pendulum: tune L (T = 2π√(L/g)) — θ₀ changes nothing!')
  }

  const reset = () => {
    st.current.challenge = 'idle'
    setChallenge('idle')
    setResult('')
    clearMeasure()
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    s.challenge = challenge

    // ── clock + zero-crossing stopwatch ─────────────────────────────────────
    const omega = mode === 'spring' ? Math.sqrt(k / m) : Math.sqrt(G / len)
    const th0 = (theta0 * Math.PI) / 180
    const dispAt = (tt: number) => (mode === 'spring' ? A : th0) * Math.cos(omega * tt)

    if (!reducedMotion) {
      const tPrev = s.t
      s.t += dt
      const dPrev = dispAt(tPrev)
      const dNow = dispAt(s.t)
      if (dPrev * dNow < 0) {
        // interpolate the exact crossing time inside this frame
        const frac = dPrev / (dPrev - dNow)
        const tcross = tPrev + frac * (s.t - tPrev)
        s.crossCount++
        if (s.crossCount % 2 === 1) {
          // crossings 1→3, 3→5 … are one full cycle apart
          if (s.lastOddT >= 0) {
            const interval = tcross - s.lastOddT
            s.i2 = s.i1; s.i1 = interval
            s.nInt = Math.min(2, s.nInt + 1)
            if (s.nInt === 2) {
              s.tMeas = (s.i1 + s.i2) / 2 // average of the last 2 intervals
              setTMeasUi(s.tMeas)
              evalMeas(s.tMeas)
            }
          }
          s.lastOddT = tcross
        }
      }
    } else if (s.challenge === 'active') {
      // motion paused: judge against theory (the sim is analytic, T_meas = T_theory)
      if (Math.abs(TTheory - TARGET) <= BAND) {
        s.consec = 2
        win(TTheory)
      } else {
        s.consec = 0
      }
    }
    const disp = dispAt(s.t)

    // ── draw ────────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    if (mode === 'spring') {
      const scale = Math.min(180, Math.max(24, 1.45 * w - 490)) // px per metre
      const eqX = w * 0.42
      const wallX = 34
      const blockHalf = 24
      const bx = eqX + disp * scale // block centre

      // wall mount + equilibrium line
      ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(wallX - 14, 60); ctx.lineTo(wallX + 14, 60); ctx.stroke()
      ctx.setLineDash([5, 6])
      ctx.strokeStyle = CANVAS.grid; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(eqX, 60); ctx.lineTo(eqX, h - 40); ctx.stroke()
      ctx.setLineDash([])

      // spring coil (zigzag) from wall to block
      const midY = 104
      const x0 = wallX, x1 = bx - blockHalf
      const coils = 9, amp = 16
      ctx.strokeStyle = CANVAS.white; ctx.lineWidth = 2.5
      ctx.beginPath(); ctx.moveTo(x0, midY)
      for (let i = 1; i <= coils; i++) {
        const cxp = x0 + ((x1 - x0) * i) / coils
        ctx.lineTo(cxp, midY + (i === coils ? 0 : i % 2 === 1 ? -amp : amp))
      }
      ctx.lineTo(x1, midY); ctx.stroke()

      // block
      ctx.fillStyle = CANVAS.orange
      ctx.fillRect(bx - blockHalf, midY - blockHalf, blockHalf * 2, blockHalf * 2)
      ctx.strokeStyle = CANVAS.amber; ctx.lineWidth = 2
      ctx.strokeRect(bx - blockHalf, midY - blockHalf, blockHalf * 2, blockHalf * 2)
      ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 13px ui-sans-serif, system-ui'; ctx.textAlign = 'center'
      ctx.fillText(`${m.toFixed(1)} kg`, bx, midY + 5)
      ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-monospace, monospace'
      ctx.fillText(`x = ${disp >= 0 ? '+' : ''}${disp.toFixed(2)} m`, bx, midY + blockHalf + 20)

      // vertical energy bars (KE emerald, PE amber; total constant = ½kA²)
      const v = -A * omega * Math.sin(omega * s.t)
      const KE = 0.5 * m * v * v
      const PE = 0.5 * k * disp * disp
      const Etot = 0.5 * k * A * A
      const barW = 40, barH = 200, barBot = h - 96
      const peX = w - 62, keX = peX - 96
      const vbar = (x: number, frac: number, color: string, label: string, val: string) => {
        ctx.fillStyle = CANVAS.panelLight
        ctx.fillRect(x, barBot - barH, barW, barH)
        const fh = Math.max(0, Math.min(1, frac)) * barH
        ctx.fillStyle = color
        ctx.fillRect(x, barBot - fh, barW, fh)
        ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1.5
        ctx.strokeRect(x, barBot - barH, barW, barH)
        ctx.fillStyle = CANVAS.muted; ctx.font = 'bold 11px ui-monospace, monospace'; ctx.textAlign = 'center'
        ctx.fillText(label, x + barW / 2, barBot - barH - 8)
        ctx.fillStyle = CANVAS.fg; ctx.font = '10px ui-monospace, monospace'
        ctx.fillText(val, x + barW / 2, barBot + 16)
      }
      vbar(keX, KE / Etot, CANVAS.emerald, 'KE', `${KE.toFixed(2)} J`)
      vbar(peX, PE / Etot, CANVAS.amber, 'PE', `${PE.toFixed(2)} J`)
      ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 10px ui-monospace, monospace'; ctx.textAlign = 'center'
      ctx.fillText(`total = ½kA² = ${Etot.toFixed(2)} J (constant)`, (keX + peX + barW) / 2, barBot + 34)
    } else {
      // pendulum
      const px = w * 0.42, py = 52
      const Lpx = len * Math.min(118, (w * 0.5 - 30) / 2.5)
      const bx = px + Lpx * Math.sin(disp)
      const by = py + Lpx * Math.cos(disp)
      ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(px - 16, py); ctx.lineTo(px + 16, py); ctx.stroke()
      ctx.setLineDash([4, 6])
      ctx.strokeStyle = CANVAS.grid; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + Lpx + 16); ctx.stroke()
      // swing extremes
      ctx.strokeStyle = CANVAS.grid
      for (const sgn of [-1, 1]) {
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(px + Lpx * Math.sin(sgn * th0), py + Lpx * Math.cos(sgn * th0))
        ctx.stroke()
      }
      ctx.setLineDash([])
      ctx.strokeStyle = CANVAS.white; ctx.lineWidth = 2.5
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx, by); ctx.stroke()
      ctx.fillStyle = CANVAS.violet
      ctx.beginPath(); ctx.arc(bx, by, 13, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = CANVAS.fg; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(bx, by, 13, 0, Math.PI * 2); ctx.stroke()
      ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-monospace, monospace'; ctx.textAlign = 'left'
      ctx.fillText(`L = ${len.toFixed(2)} m · θ = ${((disp * 180) / Math.PI).toFixed(1)}°`, px + 22, py + Lpx * 0.5)
    }

    // stopwatch (challenge)
    ctx.textAlign = 'center'
    if (s.challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: tune the period to 2.00 ± 0.05 s for two cycles in a row!', w / 2, 22)
      const shown = reducedMotion ? TTheory : s.tMeas
      ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 20px ui-monospace, monospace'
      ctx.fillText(shown > 0 ? `T = ${shown.toFixed(2)} s` : 'T = measuring…', w / 2, 48)
      ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
      ctx.fillText(reducedMotion
        ? `motion paused · judged on theory (${s.consec} cycle${s.consec === 1 ? '' : 's'} in band)`
        : `stopwatch · in-band cycles: ${s.consec} / 2`, w / 2, 64)
    } else if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ T = 2.00 s — challenge complete!', w / 2, 22)
    }
    if (reducedMotion && s.challenge === 'idle') {
      ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-sans-serif, system-ui'; ctx.textAlign = 'center'
      ctx.fillText('(motion paused — readouts use theory)', w / 2, h - 12)
    }
  }, 400)

  return (
    <SimFrame
      title="SHM Lab"
      brief="Springs and pendulums in simple harmonic motion. Theory says T = 2π√(m/k) and T = 2π√(L/g) — the stopwatch measures the real period from zero crossings to check."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A mass oscillating on a spring beside vertical kinetic and potential energy bars, or a pendulum swinging between dashed extremes, with a period stopwatch during the challenge"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSelect
          label="Mode" value={mode}
          options={[
            { value: 'spring', label: 'Spring' },
            { value: 'pendulum', label: 'Pendulum' },
          ]}
          onChange={(v) => { setMode(v); clearMeasure() }}
        />
        {mode === 'spring' ? (
          <>
            <SimSlider label="Mass m" value={m} min={0.1} max={3} step={0.1} unit="kg" onChange={(v) => { setM(v); clearMeasure() }} />
            <SimSlider label="Spring constant k" value={k} min={5} max={100} step={1} unit="N/m" onChange={(v) => { setK(v); clearMeasure() }} />
          </>
        ) : (
          <>
            <SimSlider label="Length L" value={len} min={0.2} max={2.5} step={0.01} unit="m" onChange={(v) => { setLen(v); clearMeasure() }} />
            <SimSlider label="Swing angle θ₀" value={theta0} min={5} max={30} step={1} unit="°" onChange={setTheta0} />
          </>
        )}
        <div className="flex flex-wrap gap-2">
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => (challenge === 'active' ? reset() : startChallenge())}
            disabled={challenge === 'won'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: period exactly 2.00 s
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="T theory" value={TTheory.toFixed(3)} unit="s" tone="text-teal-500" />
        <Readout
          label="T measured" unit="s" tone="text-amber-500"
          value={reducedMotion ? TTheory.toFixed(3) : tMeasUi > 0 ? tMeasUi.toFixed(3) : '—'}
        />
        <Readout label="Frequency f = 1/T" value={(1 / TTheory).toFixed(3)} unit="Hz" tone="text-violet-500" />
        {mode === 'spring' && <Readout label="Total energy ½kA²" value={(0.5 * k * A * A).toFixed(2)} unit="J" tone="text-emerald-500" />}
      </div>
      <div className="flex flex-wrap gap-4">
        <Legend color={CANVAS.emerald} label="kinetic energy" />
        <Legend color={CANVAS.amber} label="potential energy" />
        <Legend color={CANVAS.violet} label="pendulum bob" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted/60 text-foreground'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
