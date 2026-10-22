// ─── Sim: Beats & Intensity Lab · two forks, beat envelope + inverse-square ───
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimToggle, Readout, Legend,
  useSimCanvas, useSimBeep, useReducedMotion, drawGrid,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

const WIN_TOP = 0.1 // s of real time shown in the sum window
const WIN_BOTTOM = 1.0 // s of real time shown in the envelope window
const TARGET_BEAT = 4 // Hz — challenge goal

export function BeatsLabSim() {
  const [f1, setF1] = useState(440)
  const [f2, setF2] = useState(444)
  const [power, setPower] = useState(0.5)
  const [dist, setDist] = useState(2)
  const [playing, setPlaying] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({ challenge: 'idle' as 'idle' | 'active' | 'won' })
  const timers = useRef<number[]>([])
  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((id) => clearTimeout(id))
  }, [])

  const fBeat = Math.abs(f2 - f1) // f_beat = |f₁ − f₂|
  const intensity = power / (4 * Math.PI * dist * dist) // I = P/(4πr²)
  const db = 10 * Math.log10(intensity / 1e-12) // level vs 10⁻¹² W/m²

  const startChallenge = () => {
    setF1(440)
    setChallenge('active')
    setResult('Goal: fork 1 is locked at 440 Hz. Tune fork 2 until the beat frequency reads 4 Hz (±0.5) — 436 or 444 will do it.')
  }

  const reset = () => {
    setChallenge('idle')
    setResult('')
  }

  // "play tone": beeps f1 twice for ~2 s — only audible if sound is enabled
  const toggleTone = (on: boolean) => {
    timers.current.forEach((id) => clearTimeout(id))
    timers.current = []
    if (on) {
      beep(f1, 700, 'sine', 0.03)
      timers.current.push(window.setTimeout(() => beep(f1, 700, 'sine', 0.03), 800))
      timers.current.push(window.setTimeout(() => setPlaying(false), 1900))
    }
    setPlaying(on)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t) => {
    const s = st.current
    s.challenge = challenge

    // ── physics / challenge check ───────────────────────────────────────────
    if (s.challenge === 'active' && Math.abs(Math.abs(f2 - 440) - TARGET_BEAT) <= 0.5) {
      s.challenge = 'won'
      setChallenge('won')
      setResult(`f₂ = ${f2} Hz against f₁ = 440 Hz → f_beat = |f₂ − f₁| = ${Math.abs(f2 - 440)} Hz — four loud–soft pulses per second. Tuned like a pro!`)
      beep(660, 120); beep(880, 160)
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    drawGrid(ctx, w, h, 40)

    const plotX = 16
    const plotW = w - 32

    // challenge banner
    if (s.challenge === 'active') {
      ctx.fillStyle = CANVAS.amber
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('Challenge: tune f₂ for 4 beats/s (f₁ = 440 Hz)', w / 2, 20)
    } else if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('★ 4 beats/s — challenge complete!', w / 2, 20)
    }

    // ── top graph: the sum of the two fork waves (scrolling) ───────────────
    const topY = 34
    const topH = 132
    const cyT = topY + topH / 2
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(plotX, topY, plotW, topH)
    ctx.save()
    ctx.translate(plotX, topY)
    drawGrid(ctx, plotW, topH, 24)
    ctx.strokeStyle = CANVAS.muted
    ctx.setLineDash([4, 5])
    ctx.beginPath(); ctx.moveTo(0, topH / 2); ctx.lineTo(plotW, topH / 2); ctx.stroke()
    ctx.setLineDash([])
    if (!reducedMotion) {
      ctx.strokeStyle = CANVAS.teal
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let px = 0; px <= plotW; px++) {
        const tau = t + (px / plotW) * WIN_TOP
        const y = topH / 2 - 30 * (Math.sin(2 * Math.PI * f1 * tau) + Math.sin(2 * Math.PI * f2 * tau))
        if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y)
      }
      ctx.stroke()
    } else {
      ctx.fillStyle = CANVAS.muted
      ctx.font = '11px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('sum of the two waves (motion paused)', plotW / 2, topH / 2 + 4)
    }
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText('sum: sin(2πf₁·t) + sin(2πf₂·t) · 0.1 s window', 10, 14)
    ctx.restore()

    // ── bottom graph: loudness envelope |2cos(2π(f₂−f₁)t/2)| ───────────────
    const botY = 182
    const botH = 132
    const cyB = botY + botH / 2
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(plotX, botY, plotW, botH)
    ctx.save()
    ctx.translate(plotX, botY)
    drawGrid(ctx, plotW, botH, 24)
    ctx.strokeStyle = CANVAS.muted
    ctx.setLineDash([4, 5])
    ctx.beginPath(); ctx.moveTo(0, botH / 2); ctx.lineTo(plotW, botH / 2); ctx.stroke()
    ctx.setLineDash([])
    if (!reducedMotion) {
      // soft band between +envelope and −envelope
      ctx.fillStyle = CANVAS.amber
      ctx.globalAlpha = 0.14
      ctx.beginPath()
      for (let px = 0; px <= plotW; px++) {
        const tau = t + (px / plotW) * WIN_BOTTOM
        const y = botH / 2 - 30 * Math.abs(2 * Math.cos(Math.PI * fBeat * tau))
        if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y)
      }
      for (let px = plotW; px >= 0; px--) {
        const tau = t + (px / plotW) * WIN_BOTTOM
        const y = botH / 2 + 30 * Math.abs(2 * Math.cos(Math.PI * fBeat * tau))
        ctx.lineTo(px, y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.globalAlpha = 1
      // envelope curve
      ctx.strokeStyle = CANVAS.amber
      ctx.lineWidth = 2.5
      ctx.beginPath()
      for (let px = 0; px <= plotW; px++) {
        const tau = t + (px / plotW) * WIN_BOTTOM
        const y = botH / 2 - 30 * Math.abs(2 * Math.cos(Math.PI * fBeat * tau))
        if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y)
      }
      ctx.stroke()
    } else {
      ctx.fillStyle = CANVAS.muted
      ctx.font = '11px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(`loudness envelope — f_beat = ${fBeat} Hz (motion paused)`, plotW / 2, botH / 2 + 4)
    }
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText('envelope |2cos(2π(f₂−f₁)t/2)| · 1 s window', 10, 14)
    ctx.restore()

    // ── intensity strip: point source, glow radius ∝ 1/r ───────────────────
    const stripY = 330
    const stripH = h - stripY - 10
    const cyS = stripY + stripH / 2
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(plotX, stripY, plotW, stripH)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1.5
    ctx.strokeRect(plotX, stripY, plotW, stripH)

    const lampX = 64
    const glowR = Math.max(7, Math.min(26, 70 / dist)) // visual ∝ 1/r
    const glow = (rad: number, alpha: number) => {
      ctx.fillStyle = CANVAS.yellow
      ctx.globalAlpha = alpha
      ctx.beginPath(); ctx.arc(lampX, cyS, rad, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1
    }
    glow(glowR, 0.15)
    glow(glowR * 0.65, 0.3)
    glow(Math.max(3, glowR * 0.3), 0.9)
    ctx.fillStyle = CANVAS.white
    ctx.beginPath(); ctx.arc(lampX, cyS, 2.5, 0, Math.PI * 2); ctx.fill()

    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText(`point source · P = ${power.toFixed(2)} W · r = ${dist.toFixed(1)} m`, 110, stripY + 22)
    ctx.fillText(`I = P/(4πr²) = ${intensity < 0.001 ? intensity.toExponential(1) : intensity.toFixed(4)} W/m²`, 110, stripY + 42)
    ctx.fillText(`glow radius ∝ 1/r · level ≈ ${db.toFixed(0)} dB`, 110, stripY + 62)
  }, 420)

  return (
    <SimFrame
      title="Beats & Intensity Lab"
      brief="Two tuning forks with close frequencies wobble the loudness at f_beat = |f₁ − f₂|. Below: a point source spreads power over a growing sphere (I = P/(4πr²))."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg"
        style={{ height: 420 }}
        aria-label="Beats lab: a scrolling graph of two close sine waves added together, the loudness envelope pulsing at the beat frequency, and a glowing point source whose halo shrinks with distance"
        role="img"
      />

      <div className="flex flex-wrap items-center gap-4">
        <Legend color={CANVAS.teal} label="sum of the two waves" />
        <Legend color={CANVAS.amber} label="loudness envelope (beats)" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Fork 1 f₁" value={f1} min={380} max={480} step={1} unit="Hz" onChange={setF1} />
        <SimSlider label="Fork 2 f₂" value={f2} min={380} max={480} step={1} unit="Hz" onChange={setF2} />
        <SimToggle label="Play tone" checked={playing} onChange={toggleTone} />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Source power P" value={power} min={0.1} max={2} step={0.05} unit="W" onChange={setPower} />
        <SimSlider label="Distance r" value={dist} min={1} max={8} step={0.5} unit="m" onChange={setDist} />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-wrap gap-2">
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
            disabled={challenge === 'won'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: 4 beats/s
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Beat frequency |f₁ − f₂|" value={fBeat.toFixed(0)} unit="Hz" tone="text-teal-500" />
        <Readout label="Intensity I = P/(4πr²)" value={intensity < 0.001 ? intensity.toExponential(1) : intensity.toFixed(4)} unit="W/m²" tone="text-amber-500" />
        <Readout label="Sound level 10·log₁₀(I/10⁻¹²)" value={db.toFixed(0)} unit="dB" tone="text-rose-500" />
        {challenge !== 'idle' && (
          <Readout label="Challenge target" value="4" unit="Hz" tone="text-amber-500" />
        )}
      </div>

      {result && (
        <p
          className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted/60 text-foreground'}`}
          role="status"
        >
          {result}
        </p>
      )}
    </SimFrame>
  )
}
