// ─── Sim: Sound Lab · speaker cone, pressure rings & live oscilloscope ────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, useSimCanvas,
  useSimBeep, useReducedMotion, drawGrid,
} from '@/components/sims/sim-kit'
import { Volume2, Flag } from 'lucide-react'

type Medium = 'air' | 'water' | 'steel'
const SPEED: Record<Medium, number> = { air: 343, water: 1480, steel: 5960 }
const CHALLENGE_LAMBDA = 0.5 // m, in air → f = 686 Hz

export function SoundLabSim() {
  const [freq, setFreq] = useState(440)
  const [amp, setAmp] = useState(0.6)
  const [medium, setMedium] = useState<Medium>('air')
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({
    freq: 440, amp: 0.6, medium: 'air' as Medium,
    challenge: 'idle' as 'idle' | 'active' | 'won',
  })

  const v = SPEED[medium]
  const lambda = v / freq
  const t1km = 1000 / v

  const startChallenge = () => {
    setChallenge('active')
    setResult('Goal: in air, tune the frequency until the wavelength readout λ = v/f shows 0.500 m (medium must be air!).')
  }

  const playTone = () => {
    beep(freq, 350, 'sine', 0.008 + amp * 0.05)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t) => {
    const s = st.current
    s.freq = freq
    s.amp = amp
    s.medium = medium
    s.challenge = challenge
    const vv = SPEED[s.medium]

    // challenge check: λ = v/f within window equivalent to f = 686 Hz ± 5
    if (s.challenge === 'active' && s.medium === 'air' && Math.abs(vv / s.freq - CHALLENGE_LAMBDA) <= 0.00365) {
      s.challenge = 'won'
      setChallenge('won')
      setResult(`λ = v/f = 343 ÷ ${s.freq} Hz = ${(vv / s.freq).toFixed(3)} m — spot on (343 ÷ 0.5 = 686 Hz). Your ears would call it a near-G5 note!`)
      beep(740, 140); beep(988, 180)
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    drawGrid(ctx, w, h, 40)

    const cy = h / 2 + 4
    const scopeX = Math.round(w * 0.56)
    const scopeW = w - scopeX - 16

    // speaker zone backdrop
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(12, 40, scopeX - 28, h - 80)

    // speaker body + cone (bulge grows with amplitude, buzz speed with frequency)
    const coneBase = 106
    const fv = 2 + 8 * ((s.freq - 100) / 900) // visual vibration, Hz-ish
    const bulge = reducedMotion ? s.amp * 4 : s.amp * 6 * Math.sin(2 * Math.PI * fv * t)
    ctx.fillStyle = CANVAS.panelLight
    ctx.fillRect(28, cy - 58, 52, 116)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1.5
    ctx.strokeRect(28, cy - 58, 52, 116)
    ctx.fillStyle = CANVAS.orange
    ctx.beginPath()
    ctx.moveTo(coneBase, cy - 42)
    ctx.lineTo(coneBase + 26 + bulge, cy - 20)
    ctx.lineTo(coneBase + 26 + bulge, cy + 20)
    ctx.lineTo(coneBase, cy + 42)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-sans-serif, system-ui'
    ctx.textAlign = 'center'
    ctx.fillText('speaker', 54, cy + 76)

    // pressure rings: spacing tracks λ (visual only, not to scale)
    const spacing = Math.min(80, Math.max(12, (vv / s.freq) * 26))
    const cx0 = coneBase + 34
    const Rmax = scopeX - cx0 - 18
    ctx.save()
    ctx.beginPath(); ctx.rect(0, 0, scopeX - 8, h); ctx.clip()
    for (let k = 0; k < 7; k++) {
      const r = reducedMotion
        ? (k + 1) * spacing
        : ((t * 95 + k * spacing) % (spacing * 6))
      if (r > Rmax) continue
      ctx.strokeStyle = CANVAS.violet
      ctx.globalAlpha = 0.75 * (1 - r / Rmax)
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(cx0, cy, r, -0.95, 0.95)
      ctx.stroke()
    }
    ctx.globalAlpha = 1
    ctx.restore()
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-sans-serif, system-ui'
    ctx.textAlign = 'left'
    ctx.fillText('ring spacing follows λ (not to scale)', 22, h - 48)

    // oscilloscope
    const sy = 54
    const sh = h - sy - 46
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(scopeX, sy, scopeW, sh)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1.5
    ctx.strokeRect(scopeX, sy, scopeW, sh)
    ctx.save()
    ctx.translate(scopeX, sy) // draw scope contents relative
    drawGrid(ctx, scopeW, sh, 24)
    ctx.strokeStyle = CANVAS.muted
    ctx.setLineDash([4, 5])
    ctx.beginPath(); ctx.moveTo(8, sh / 2); ctx.lineTo(scopeW - 8, sh / 2); ctx.stroke()
    ctx.setLineDash([])
    const cycles = 2 + 6 * ((s.freq - 100) / 900)
    const ph = reducedMotion ? 0 : t * 2.2
    ctx.strokeStyle = CANVAS.emerald
    ctx.lineWidth = 2.5
    ctx.beginPath()
    for (let i = 0; i <= 220; i++) {
      const u = i / 220
      const x = 8 + u * (scopeW - 16)
      const y = sh / 2 - s.amp * (sh / 2 - 14) * Math.sin(2 * Math.PI * cycles * u + ph)
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText('oscilloscope — pressure vs time', 10, 14)
    ctx.fillText('time →', scopeW - 52, sh - 8)
    ctx.restore()

    // headers
    ctx.fillStyle = CANVAS.fg
    ctx.font = 'bold 12px ui-sans-serif, system-ui'
    ctx.textAlign = 'left'
    ctx.fillText(`medium: ${s.medium} · v = ${vv} m/s`, 22, 30)

    if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('★ λ = 0.5 m in air — challenge complete!', w / 2, h - 10)
    }
  }, 400)

  return (
    <SimFrame
      title="Sound Lab"
      brief="A vibrating speaker makes a longitudinal sound wave. Watch pitch follow frequency and loudness follow amplitude on the oscilloscope. The tone button only sounds if you enabled sound in settings."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg"
        style={{ height: 400 }}
        aria-label="Sound lab: a speaker emitting pressure rings next to a live oscilloscope trace whose height follows amplitude and whose spacing follows frequency"
        role="img"
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Frequency" value={freq} min={100} max={1000} step={2} unit="Hz" onChange={setFreq} />
        <SimSlider label="Amplitude" value={amp} min={0} max={1} step={0.01} onChange={setAmp} />
        <SimSelect<Medium>
          label="Medium"
          value={medium}
          options={[
            { value: 'air', label: 'Air · 343 m/s' },
            { value: 'water', label: 'Water · 1480 m/s' },
            { value: 'steel', label: 'Steel · 5960 m/s' },
          ]}
          onChange={setMedium}
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={playTone}>
            <Volume2 className="h-4 w-4 me-1" aria-hidden /> Play tone
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
            disabled={challenge === 'won'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: λ = 0.5 m
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Speed v" value={v.toFixed(0)} unit="m/s" />
        <Readout label="Wavelength λ" value={lambda.toFixed(3)} unit="m" tone="text-violet-500" />
        <Readout label="Crosses 1 km in" value={t1km.toFixed(2)} unit="s" tone="text-amber-500" />
        {challenge !== 'idle' && (
          <Readout label="Challenge λ" value="0.500" unit="m" tone="text-amber-500" />
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
