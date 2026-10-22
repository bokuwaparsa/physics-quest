// ─── Sim: Standing Waves Lab · harmonics on a string fixed at both ends ──────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, useSimCanvas,
  useSimBeep, useReducedMotion, drawGrid,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

type Mat = 'nylon' | 'steel' | 'thick'
const MU: Record<Mat, number> = { nylon: 0.001, steel: 0.004, thick: 0.01 }
const A = 0.03 // m — amplitude of each travelling wave (standing wave: 2A)
const TARGET_F3 = 300 // Hz — challenge goal for the steel string's 3rd harmonic

export function StandingWavesSim() {
  const [len, setLen] = useState(1)
  const [tension, setTension] = useState(80)
  const [mat, setMat] = useState<Mat>('steel')
  const [n, setN] = useState(1)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  // mutable sim state read by the RAF loop
  const st = useRef({ phase: 0, challenge: 'idle' as 'idle' | 'active' | 'won' })

  const v = Math.sqrt(tension / MU[mat]) // v = √(F/μ)
  const fn = (n / (2 * len)) * v // fₙ = n·v/(2L)
  const lambda = (2 * len) / n // λₙ = 2L/n

  const startChallenge = () => {
    setLen(1)
    setMat('steel')
    setN(3)
    setChallenge('active')
    setResult('Goal: I set L = 1 m, steel string, n = 3 for you. Tune the tension F until the 3rd harmonic f₃ reads 300 Hz (±2 Hz).')
  }

  const reset = () => {
    setChallenge('idle')
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    s.challenge = challenge

    // ── physics ────────────────────────────────────────────────────────────
    const vNow = Math.sqrt(tension / MU[mat])
    const f3Now = (3 / (2 * len)) * vNow
    if (s.challenge === 'active' && Math.abs(f3Now - TARGET_F3) <= 2) {
      s.challenge = 'won'
      setChallenge('won')
      setResult(`f₃ = 3·v/(2L) = ${f3Now.toFixed(1)} Hz at F = ${tension} N (v = √(F/μ) = ${vNow.toFixed(1)} m/s) — the 3rd harmonic of the steel string is spot on 300 Hz!`)
      beep(660, 120); beep(880, 160)
    }
    if (!reducedMotion) s.phase += 2 * Math.PI * (0.3 + 0.12 * n) * dt // slow motion

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    drawGrid(ctx, w, h, 40)

    const mx = 52
    const span = w - 2 * mx
    const pxPerM = span / len
    const cy = h / 2 + 6
    const pxPerY = 1150 // visual scale: 2A = 0.06 m → ≈ 69 px
    const toX = (m: number) => mx + m * pxPerM
    const shape = (m: number) => Math.sin((n * Math.PI * m) / len)

    // header
    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText('y = 2A·sin(nπx/L)·cos(2πfₙ·t) · slow motion', 16, 24)
    ctx.textAlign = 'right'
    ctx.fillText(`n = ${n} loop${n > 1 ? 's' : ''}`, w - 16, 24)

    // fixed walls at both ends
    ctx.fillStyle = CANVAS.panelLight
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1.5
    for (const wx of [mx - 14, mx + span]) {
      ctx.fillRect(wx, cy - 60, 14, 120)
      ctx.strokeRect(wx, cy - 60, 14, 120)
    }
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-sans-serif, system-ui'
    ctx.textAlign = 'center'
    ctx.fillText('fixed end', mx - 7, cy + 78)
    ctx.fillText('fixed end', mx + span + 7, cy + 78)

    // amplitude envelope ±2A·sin(nπx/L), dashed violet
    ctx.strokeStyle = CANVAS.violet
    ctx.lineWidth = 1.5
    ctx.setLineDash([5, 5])
    for (const sign of [1, -1]) {
      ctx.beginPath()
      for (let px = 0; px <= span; px += 2) {
        const m = px / pxPerM
        const y = cy + sign * 2 * A * Math.abs(shape(m)) * pxPerY
        if (px === 0) ctx.moveTo(toX(m), y); else ctx.lineTo(toX(m), y)
      }
      ctx.stroke()
    }
    ctx.setLineDash([])

    // the vibrating string
    ctx.strokeStyle = CANVAS.teal
    ctx.lineWidth = 3
    ctx.beginPath()
    for (let px = 0; px <= span; px += 2) {
      const m = px / pxPerM
      const y = cy - 2 * A * shape(m) * Math.cos(s.phase) * pxPerY
      if (px === 0) ctx.moveTo(toX(m), y); else ctx.lineTo(toX(m), y)
    }
    ctx.stroke()

    // nodes (still) and antinodes (biggest swing)
    for (let k = 0; k <= n; k++) {
      ctx.fillStyle = CANVAS.rose
      ctx.beginPath(); ctx.arc(toX((k * len) / n), cy, 5, 0, Math.PI * 2); ctx.fill()
    }
    for (let k = 0; k < n; k++) {
      ctx.fillStyle = CANVAS.amber
      ctx.beginPath(); ctx.arc(toX(((k + 0.5) * len) / n), cy - 2 * A * pxPerY, 5, 0, Math.PI * 2); ctx.fill()
    }
    if (n >= 2) {
      ctx.font = '11px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillStyle = CANVAS.rose
      ctx.fillText('node', toX(len / n), cy + 20)
      ctx.fillStyle = CANVAS.amber
      ctx.fillText('antinode', toX(len / (2 * n)), cy - 2 * A * pxPerY - 12)
    }

    // legend strip
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-sans-serif, system-ui'
    ctx.textAlign = 'left'
    ctx.fillText('● node (still)   ● antinode (biggest swing)   ‑ ‑ envelope ±2A·sin(nπx/L)', mx, h - 12)

    // challenge banners
    if (s.challenge === 'active') {
      ctx.fillStyle = CANVAS.amber
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('Challenge: tune F until f₃ = 300 Hz (±2 Hz)', w / 2, 44)
    } else if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('★ f₃ = 300 Hz — challenge complete!', w / 2, 44)
    }
  }, 400)

  return (
    <SimFrame
      title="Standing Waves Lab"
      brief="A string fixed at both ends vibrates in whole loops. Nodes stand still, antinodes swing hardest. Motion is slow motion — every readout is real."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg"
        style={{ height: 400 }}
        aria-label="Standing wave lab: a string fixed at both ends vibrating in n loops, with a dashed amplitude envelope, rose node dots on the axis and amber antinode dots at the envelope tips"
        role="img"
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="String length L" value={len} min={0.5} max={2} step={0.05} unit="m" onChange={setLen} />
        <SimSlider label="Tension F" value={tension} min={20} max={200} step={1} unit="N" onChange={setTension} />
        <SimSelect<Mat>
          label="String material"
          value={mat}
          options={[
            { value: 'nylon', label: 'Nylon · 0.001 kg/m' },
            { value: 'steel', label: 'Steel · 0.004 kg/m' },
            { value: 'thick', label: 'Thick · 0.01 kg/m' },
          ]}
          onChange={setMat}
        />
        <SimSelect<string>
          label="Harmonic n"
          value={String(n)}
          options={[
            { value: '1', label: 'n = 1 (fundamental)' },
            { value: '2', label: 'n = 2' },
            { value: '3', label: 'n = 3' },
            { value: '4', label: 'n = 4' },
            { value: '5', label: 'n = 5' },
            { value: '6', label: 'n = 6' },
          ]}
          onChange={(val) => setN(Number(val))}
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-wrap gap-2">
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
            disabled={challenge === 'won'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: f₃ = 300 Hz
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Wave speed v = √(F/μ)" value={v.toFixed(1)} unit="m/s" />
        <Readout label="Harmonic frequency fₙ" value={fn.toFixed(1)} unit="Hz" tone="text-teal-500" />
        <Readout label="Wavelength λₙ = 2L/n" value={lambda.toFixed(3)} unit="m" tone="text-violet-500" />
        {challenge !== 'idle' && (
          <Readout label="Challenge target" value="300" unit="Hz" tone="text-amber-500" />
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
