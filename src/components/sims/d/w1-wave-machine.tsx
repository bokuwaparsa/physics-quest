// ─── Sim: Wave Machine · transverse string wave + sandbox pulse ───────────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas,
  useSimBeep, useReducedMotion, drawGrid,
} from '@/components/sims/sim-kit'
import { Send, RotateCcw, Flag } from 'lucide-react'

const SPAN = 8 // metres shown across the canvas
const TARGET_V = 8 // challenge: wave speed in m/s

export function WaveMachineSim() {
  const [amp, setAmp] = useState(0.2)
  const [wl, setWl] = useState(1.5)
  const [freq, setFreq] = useState(0.6)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  // mutable sim state read by the RAF loop (synced from state each frame)
  const st = useRef({
    amp: 0.2, wl: 1.5, freq: 0.6, phase: 0,
    pulse: null as null | { x: number },
    challenge: 'idle' as 'idle' | 'active' | 'won',
  })

  const v = freq * wl // wave speed v = f·λ
  const period = 1 / freq // T = 1/f

  const startChallenge = () => {
    setChallenge('active')
    setResult('Goal: tune f and λ so the speed readout v = f·λ hits 8 m/s (±0.1).')
  }

  const reset = () => {
    st.current.pulse = null
    st.current.phase = 0
    setChallenge('idle')
    setResult('')
  }

  const sendPulse = () => {
    st.current.pulse = { x: -0.8 }
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    s.amp = amp
    s.wl = wl
    s.freq = freq
    s.challenge = challenge

    // ── physics ────────────────────────────────────────────────────────────
    if (!reducedMotion && !s.pulse) s.phase += s.freq * dt // wave phase f·t
    if (s.pulse) {
      const vs = Math.max(s.freq * s.wl, 1.5) // honest speed, gently floored
      s.pulse.x += vs * dt
      if (s.pulse.x - 1.5 > SPAN) s.pulse = null
    }
    if (s.challenge === 'active' && Math.abs(s.freq * s.wl - TARGET_V) <= 0.1) {
      s.challenge = 'won'
      setChallenge('won')
      setResult(`v = f·λ = ${s.freq.toFixed(2)} × ${s.wl.toFixed(2)} = ${(s.freq * s.wl).toFixed(2)} m/s — your wave marches at exactly 8 m/s!`)
      beep(660, 140); beep(990, 180)
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    drawGrid(ctx, w, h, 40)

    const mLeft = 20
    const pxPerM = (w - 2 * mLeft) / SPAN
    const toX = (m: number) => mLeft + m * pxPerM
    const cy = h / 2 + 8
    const scaleY = 120
    const sigma = 0.4

    const yAt = (m: number) => {
      if (s.pulse) {
        const d = m - s.pulse.x
        return cy - scaleY * s.amp * Math.exp(-(d * d) / (2 * sigma * sigma))
      }
      return cy - scaleY * s.amp * Math.sin(2 * Math.PI * (m / s.wl - s.phase))
    }

    // rest axis
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1
    ctx.setLineDash([4, 6])
    ctx.beginPath(); ctx.moveTo(mLeft, cy); ctx.lineTo(w - mLeft, cy); ctx.stroke()
    ctx.setLineDash([])

    // the string
    ctx.strokeStyle = CANVAS.teal
    ctx.lineWidth = 3
    ctx.beginPath()
    for (let px = 0; px <= w - 2 * mLeft; px += 2) {
      const m = px / pxPerM
      const y = yAt(m)
      if (px === 0) ctx.moveTo(toX(m), y); else ctx.lineTo(toX(m), y)
    }
    ctx.stroke()

    // corks: they bob but never travel sideways
    for (const cm of [1.3, 4.0, 6.7]) {
      const x = toX(cm), y = yAt(cm)
      ctx.fillStyle = CANVAS.emerald
      ctx.strokeStyle = CANVAS.bg
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(x, y - 5, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.strokeStyle = CANVAS.muted
      ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x, y - 12); ctx.stroke()
    }
    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-sans-serif, system-ui'
    ctx.textAlign = 'left'
    ctx.fillText('corks bob in place — the energy travels, they don’t', 24, h - 12)

    // crest / trough labels + wavelength arrow (continuous wave only)
    if (!s.pulse) {
      const crests: number[] = []
      const troughs: number[] = []
      for (let k = -10; k <= 14; k++) {
        const c = s.wl * (s.phase + 0.25 + k)
        const t = s.wl * (s.phase + 0.75 + k)
        if (c > 0.15 && c < SPAN - 0.15) crests.push(c)
        if (t > 0.15 && t < SPAN - 0.15) troughs.push(t)
      }
      const nearest = (arr: number[]) =>
        arr.reduce((best, m) => (Math.abs(m - 4) < Math.abs(best - 4) ? m : best), arr[0])
      if (crests.length) {
        const c = nearest(crests)
        const x = toX(c), y = cy - scaleY * s.amp
        ctx.fillStyle = CANVAS.amber
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill()
        ctx.font = '11px ui-sans-serif, system-ui'
        ctx.textAlign = 'left'
        ctx.fillText('crest', x + 8, y - 8)
      }
      if (troughs.length) {
        const t = nearest(troughs)
        const x = toX(t), y = cy + scaleY * s.amp
        ctx.fillStyle = CANVAS.violet
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill()
        ctx.font = '11px ui-sans-serif, system-ui'
        ctx.textAlign = 'left'
        ctx.fillText('trough', x + 8, y + 14)
      }
      if (crests.length >= 2) {
        let iBest = 0
        for (let i = 0; i < crests.length - 1; i++) {
          if (Math.abs((crests[i] + crests[i + 1]) / 2 - 4) < Math.abs((crests[iBest] + crests[iBest + 1]) / 2 - 4)) iBest = i
        }
        const x1 = toX(crests[iBest]), x2 = toX(crests[iBest + 1])
        const yA = Math.max(26, cy - scaleY * s.amp - 28)
        const arrow = (x: number, dir: number) => {
          ctx.beginPath(); ctx.moveTo(x, yA); ctx.lineTo(x + 7 * dir, yA - 4); ctx.lineTo(x + 7 * dir, yA + 4); ctx.fill()
        }
        ctx.strokeStyle = CANVAS.amber
        ctx.fillStyle = CANVAS.amber
        ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.moveTo(x1 + 6, yA); ctx.lineTo(x2 - 6, yA); ctx.stroke()
        arrow(x1 + 2, 1); arrow(x2 - 2, -1)
        ctx.font = '11px ui-monospace, monospace'
        ctx.textAlign = 'center'
        ctx.fillText(`λ = ${s.wl.toFixed(2)} m`, (x1 + x2) / 2, yA < 42 ? yA + 16 : yA - 8)
      }
    } else {
      ctx.fillStyle = CANVAS.muted
      ctx.font = '11px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('single pulse — it keeps its shape while it travels', w / 2, 24)
    }

    // challenge banner
    if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('★ Challenge complete — v = 8 m/s!', w / 2, 44)
    }
  }, 400)

  return (
    <SimFrame
      title="Wave Machine"
      brief="A string wave drawn live: y = A·sin(2π(x/λ − f·t)). Tune it, label it, or fire a single pulse down the line."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg"
        style={{ height: 400 }}
        aria-label="Wave machine: a vibrating string with labelled crests, troughs and a wavelength arrow, with three corks bobbing in place"
        role="img"
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Amplitude A" value={amp} min={0.05} max={0.5} step={0.01} unit="m" onChange={setAmp} />
        <SimSlider label="Wavelength λ" value={wl} min={0.5} max={4} step={0.05} unit="m" onChange={setWl} />
        <SimSlider label="Frequency f" value={freq} min={0.2} max={2} step={0.05} unit="Hz" onChange={setFreq} />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={sendPulse}>
            <Send className="h-4 w-4 me-1" aria-hidden /> Send pulse
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
            disabled={challenge === 'won'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: v = 8 m/s
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Period T = 1/f" value={period.toFixed(2)} unit="s" />
        <Readout label="Speed v = f·λ" value={v.toFixed(2)} unit="m/s" tone="text-teal-500" />
        {challenge !== 'idle' && (
          <Readout label="Challenge target" value="8.00" unit="m/s" tone="text-amber-500" />
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
