// ─── Sim: Series RLC Resonance · X_L vs X_C, Z and the I(f) peak at f₀ ────────
// X_L = 2πfL · X_C = 1/(2πfC) · Z = √(R²+(X_L−X_C)²) · f₀ = 1/(2π√(LC)) · V = 10 V
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, Legend,
  useSimCanvas, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

const V = 10 // source rms voltage
const TARGET_FRAC = 0.01 // challenge: within 1% of f₀

const fmtF = (f: number) => (f >= 1000 ? `${(f / 1000).toFixed(2)} kHz` : `${f.toFixed(0)} Hz`)
const fmtI = (i: number) => (i >= 0.1 ? `${i.toFixed(2)} A` : `${(i * 1000).toFixed(1)} mA`)

export function RlcResonanceSim() {
  const [rOhm, setROhm] = useState(20)
  const [lMh, setLMh] = useState(2)
  const [cNf, setCNf] = useState(500)
  const [fLog, setFLog] = useState(3) // slider is log10(f): 2 → 100 Hz … 5 → 100 kHz
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const doneRef = useRef(false)
  const st = useRef({ dotOff: 0 })

  const f = Math.pow(10, fLog)
  const L = lMh / 1000
  const C = cNf / 1e9
  const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C))
  const xl = 2 * Math.PI * f * L
  const xc = 1 / (2 * Math.PI * f * C)
  const z = Math.hypot(rOhm, xl - xc)
  const current = V / z
  const iMax = V / rOhm
  const offFrac = Math.abs(f - f0) / f0
  const onTarget = offFrac <= TARGET_FRAC

  const startChallenge = () => {
    doneRef.current = false
    setChallenge('active')
    setResult('Goal: tune the source frequency f to within 1% of f₀ = 1/(2π√(LC)). Watch the teal f₀ line and slide f onto it — there X_L = X_C cancel and the current explodes to V/R.')
  }

  const reset = () => {
    doneRef.current = false
    setChallenge('idle')
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    // ── challenge check: |f − f₀|/f₀ ≤ 1% ───────────────────────────────────
    if (challenge === 'active' && !doneRef.current && onTarget) {
      doneRef.current = true
      setChallenge('won')
      beep(660, 120); beep(880, 160)
      setResult(`★ Resonance! f = ${fmtF(f)} is within ${(offFrac * 100).toFixed(2)}% of f₀ = ${fmtF(f0)}. There X_L = X_C cancel, Z = R = ${rOhm.toFixed(0)} Ω, and I = V/R = ${fmtI(iMax)} — the biggest current this circuit can carry. That is exactly how a radio locks onto one station.`)
    }

    // ── draw ────────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    // ── circuit strip (top) ─────────────────────────────────────────────────
    const x0 = 64, x1 = w - 64, y0 = 52, y1 = 140
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x0, y0); ctx.lineTo(x1, y0)
    ctx.moveTo(x0, y1); ctx.lineTo(x1, y1)
    ctx.moveTo(x0, y0); ctx.lineTo(x0, y1)
    ctx.moveTo(x1, y0); ctx.lineTo(x1, y1)
    ctx.stroke()

    // AC source (left side) with sine squiggle
    const sy = (y0 + y1) / 2
    ctx.fillStyle = CANVAS.panelLight
    ctx.beginPath(); ctx.arc(x0, sy, 15, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.rose; ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(x0, sy, 15, 0, Math.PI * 2); ctx.stroke()
    ctx.beginPath()
    for (let i = 0; i <= 16; i++) {
      const px = x0 - 8 + (16 * i) / 16
      const py = sy - 5 * Math.sin((i / 16) * Math.PI * 2)
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
    }
    ctx.stroke()
    ctx.fillStyle = CANVAS.rose
    ctx.font = 'bold 10px ui-monospace, monospace'; ctx.textAlign = 'right'
    ctx.fillText(`AC ${V} V`, x0 - 20, sy + 3)

    // resistor (zigzag)
    const xr = x0 + (x1 - x0) * 0.22
    ctx.strokeStyle = CANVAS.amber; ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.moveTo(xr - 28, y0)
    for (let i = 0; i < 6; i++) {
      ctx.lineTo(xr - 28 + 56 * ((i + 0.5) / 6), y0 + (i % 2 === 0 ? -8 : 8))
    }
    ctx.lineTo(xr + 28, y0); ctx.stroke()
    ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 10px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText(`R = ${rOhm.toFixed(0)} Ω`, xr, y0 + 24)

    // inductor (bumps)
    const xlq = x0 + (x1 - x0) * 0.5
    ctx.strokeStyle = CANVAS.violet; ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.moveTo(xlq - 28, y0)
    for (let i = 0; i < 4; i++) {
      ctx.arc(xlq - 21 + 14 * i, y0, 7, Math.PI, 0, false)
    }
    ctx.stroke()
    ctx.fillStyle = CANVAS.violet
    ctx.fillText(`L = ${lMh.toFixed(1)} mH`, xlq, y0 + 24)

    // capacitor (plates)
    const xcq = x0 + (x1 - x0) * 0.78
    ctx.strokeStyle = CANVAS.teal; ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(xcq - 5, y0 - 13); ctx.lineTo(xcq - 5, y0 + 13)
    ctx.moveTo(xcq + 5, y0 - 13); ctx.lineTo(xcq + 5, y0 + 13)
    ctx.stroke()
    ctx.fillStyle = CANVAS.teal
    ctx.fillText(`C = ${cNf.toFixed(0)} nF`, xcq, y0 + 24)

    // moving current dots around the loop (speed ∝ I)
    if (!reducedMotion) st.current.dotOff += dt * (20 + 70 * current)
    const perim = 2 * (x1 - x0) + 2 * (y1 - y0)
    const spacing = perim / 14
    ctx.fillStyle = CANVAS.emerald
    for (let i = 0; i < 14; i++) {
      let d = (i * spacing + st.current.dotOff) % perim
      let px: number, py: number
      if (d < x1 - x0) { px = x0 + d; py = y0 } else if (d < x1 - x0 + (y1 - y0)) { d -= x1 - x0; px = x1; py = y0 + d } else if (d < 2 * (x1 - x0) + (y1 - y0)) { d -= x1 - x0 + (y1 - y0); px = x1 - d; py = y1 } else { d -= 2 * (x1 - x0) + (y1 - y0); px = x0; py = y1 - d }
      ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill()
    }

    // ── resonance curve (bottom) ────────────────────────────────────────────
    const px0 = 64, px1 = w - 28, py0 = 178, py1 = h - 36
    const plotW = px1 - px0, plotH = py1 - py0
    const fToPx = (fq: number) => px0 + ((Math.log10(fq) - 2) / 3) * plotW

    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1
    // horizontal grid at 0/25/50/75/100 % of I max
    for (let i = 0; i <= 4; i++) {
      const py = py1 - (plotH * i) / 4
      ctx.beginPath(); ctx.moveTo(px0, py); ctx.lineTo(px1, py); ctx.stroke()
      ctx.fillStyle = CANVAS.muted; ctx.font = '9px ui-monospace, monospace'; ctx.textAlign = 'right'
      ctx.fillText(`${((iMax * 1000 * i) / 4).toFixed(0)}`, px0 - 6, py + 3)
    }
    ctx.textAlign = 'center'
    for (const tick of [2, 3, 4, 5]) {
      const px = px0 + ((tick - 2) / 3) * plotW
      ctx.fillStyle = CANVAS.muted; ctx.font = '9px ui-monospace, monospace'
      ctx.fillText(tick === 2 ? '100 Hz' : tick === 5 ? '100 kHz' : `${Math.pow(10, tick) / 1000} kHz`, px, py1 + 14)
    }
    ctx.fillStyle = CANVAS.muted; ctx.font = '9px ui-monospace, monospace'
    ctx.fillText('I (mA) · log frequency →', px0 + 4, py0 - 6)

    // the curve I(f) = V/Z(f), normalised to V/R
    ctx.strokeStyle = CANVAS.teal; ctx.lineWidth = 2.5
    ctx.beginPath()
    for (let i = 0; i <= 260; i++) {
      const fq = Math.pow(10, 2 + (3 * i) / 260)
      const ii = V / Math.hypot(rOhm, 2 * Math.PI * fq * L - 1 / (2 * Math.PI * fq * C))
      const px = fToPx(fq)
      const py = py1 - (ii / iMax) * plotH
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
    }
    ctx.stroke()

    // f₀ marker (teal dashed) — or an edge arrow if f₀ is beyond 100 kHz
    if (f0 <= 100000) {
      ctx.setLineDash([6, 5])
      ctx.strokeStyle = onTarget ? CANVAS.emerald : CANVAS.teal
      ctx.lineWidth = onTarget ? 2.5 : 1.5
      ctx.beginPath(); ctx.moveTo(fToPx(f0), py0); ctx.lineTo(fToPx(f0), py1); ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = onTarget ? CANVAS.emerald : CANVAS.teal
      ctx.font = 'bold 10px ui-monospace, monospace'
      ctx.fillText(`f₀ = ${fmtF(f0)}`, fToPx(f0), py1 - 8)
    } else {
      ctx.fillStyle = CANVAS.teal; ctx.font = 'bold 10px ui-monospace, monospace'
      ctx.fillText(`f₀ = ${fmtF(f0)} → beyond the dial (increase L or C)`, px1 - 8, py0 + 12)
    }

    // current frequency marker (amber)
    const fPx = fToPx(f)
    ctx.strokeStyle = CANVAS.amber; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(fPx, py0); ctx.lineTo(fPx, py1); ctx.stroke()
    ctx.fillStyle = CANVAS.amber
    ctx.beginPath(); ctx.arc(fPx, py1 - (current / iMax) * plotH, 4.5, 0, Math.PI * 2); ctx.fill()
    ctx.font = 'bold 10px ui-monospace, monospace'
    ctx.fillText(`f = ${fmtF(f)} · I = ${fmtI(current)}`, fPx, py1 + 26)

    // banners
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText(`Challenge: get f within 1% of f₀ — currently off by ${(offFrac * 100).toFixed(2)} %`, w / 2, 18)
    } else if (challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Challenge complete — locked onto resonance!', w / 2, 18)
    }
  }, 420)

  return (
    <SimFrame
      title="Series RLC Resonance"
      brief="A 10 V AC source drives R, L and C in series. X_L grows with frequency, X_C shrinks — where they cancel, Z collapses to R and the current peaks at f₀ = 1/(2π√(LC))."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 420 }}
          aria-label="A series RLC circuit with an AC source, resistor, inductor and capacitor, above a resonance curve of current versus log frequency with a teal marker at f0 and an amber marker at the chosen source frequency"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Resistance R" value={rOhm} min={5} max={100} step={1} unit="Ω" onChange={setROhm} />
        <SimSlider
          label="Inductance L" value={lMh} min={0.1} max={10} step={0.1} unit="mH"
          format={(val) => val.toFixed(1)} onChange={setLMh}
        />
        <SimSlider label="Capacitance C" value={cNf} min={10} max={1000} step={10} unit="nF" onChange={setCNf} />
        <SimSlider
          label="Source frequency f" value={fLog} min={2} max={5} step={0.002} unit=""
          format={(val) => fmtF(Math.pow(10, val))} onChange={setFLog}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
            disabled={challenge === 'won'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: hit f₀ within 1%
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="f₀ = 1/(2π√LC)" value={fmtF(f0)} tone="text-teal-500" />
        <Readout label="X_L = 2πfL" value={xl >= 1000 ? xl.toFixed(0) : xl.toFixed(1)} unit="Ω" tone="text-violet-500" />
        <Readout label="X_C = 1/(2πfC)" value={xc >= 1000 ? xc.toFixed(0) : xc.toFixed(1)} unit="Ω" tone="text-cyan-500" />
        <Readout label="Impedance Z" value={z >= 1000 ? z.toFixed(0) : z.toFixed(1)} unit="Ω" tone="text-amber-500" />
        <Readout label="I = V/Z" value={fmtI(current)} tone="text-emerald-500" />
      </div>
      <div className="flex flex-wrap gap-4">
        <Legend color={CANVAS.teal} label="I(f) resonance curve" />
        <Legend color={CANVAS.amber} label="your source frequency" />
        <Legend color={CANVAS.emerald} label="current in the circuit" />
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
