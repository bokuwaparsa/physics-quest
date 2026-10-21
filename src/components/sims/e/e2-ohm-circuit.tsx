// ─── Sim: Ohm's Circuit · battery, resistor, lamp — electrons on the loop ────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, Legend, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

const TARGET_I = 0.5 // challenge current (A)
const TOL = 0.005

export function OhmCircuitSim() {
  const [voltage, setVoltage] = useState(12)
  const [resistance, setResistance] = useState(24)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')
  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const current = voltage / resistance
  const power = (voltage * voltage) / resistance
  const brightness = power < 1 ? 'off' : power < 10 ? 'dim' : power < 40 ? 'bright' : 'blinding'

  // refs touched only inside the loop / handlers (never during render)
  const offRef = useRef(0) // electron phase along the loop
  const doneRef = useRef(false)

  const startChallenge = () => {
    doneRef.current = false
    setChallenge('active')
    setResult('Goal: set the dials so the ammeter reads exactly 0.50 A (±0.005). Many pairs work — pick any V/R with V/R = 0.5.')
  }
  const reset = () => {
    doneRef.current = false
    setChallenge('idle')
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const V = voltage
    const R = resistance
    const I = V / R
    const P = (V * V) / R
    const bright = Math.min(1, P / 80)

    // challenge check: exactly 0.50 A
    if (challenge === 'active' && !doneRef.current && Math.abs(I - TARGET_I) <= TOL) {
      doneRef.current = true
      setChallenge('won')
      beep(660, 140)
      beep(880, 180)
      setResult(`Nailed it: I = V/R = ${V}/${R} = ${I.toFixed(2)} A. Ohm's law never misses — with 0.5 A flowing, every ohm of resistance costs exactly 0.5 V.`)
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const x0 = 46, y0 = 42, x1 = w - 46, y1 = h - 46
    const cx = (x0 + x1) / 2
    const cy = (y0 + y1) / 2
    const W = x1 - x0, H = y1 - y0
    const L = 2 * (W + H)
    // walk the loop clockwise from the top-left corner
    const pos = (d: number) => {
      let s2 = ((d % L) + L) % L
      if (s2 < W) return { x: x0 + s2, y: y0 }
      s2 -= W
      if (s2 < H) return { x: x1, y: y0 + s2 }
      s2 -= H
      if (s2 < W) return { x: x1 - s2, y: y1 }
      s2 -= W
      return { x: x0, y: y1 - s2 }
    }

    // wires (with gaps for the battery and the ammeter)
    ctx.strokeStyle = CANVAS.white
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.moveTo(x0, y0); ctx.lineTo(x1, y0) // top
    ctx.moveTo(x1, y0); ctx.lineTo(x1, y1) // right
    ctx.moveTo(x1, y1); ctx.lineTo(cx - 16, y1) // bottom left half
    ctx.moveTo(cx + 16, y1); ctx.lineTo(x0, y1) // bottom right half
    ctx.moveTo(x0, y1); ctx.lineTo(x0, cy - 18) // left up to battery
    ctx.moveTo(x0, cy + 18); ctx.lineTo(x0, y0) // left above battery
    ctx.stroke()
    // corner junction dots
    ctx.fillStyle = CANVAS.white
    for (const [jx, jy] of [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]) {
      ctx.beginPath(); ctx.arc(jx, jy, 3, 0, Math.PI * 2); ctx.fill()
    }

    // electron dots (speed ∝ current, paused under reduced motion)
    if (!reducedMotion) offRef.current += Math.min(300, I * 45) * dt
    const N = 24, gap = L / N
    ctx.fillStyle = CANVAS.teal
    for (let k = 0; k < N; k++) {
      const p = pos(L - (offRef.current + k * gap)) // electrons drift − → +
      ctx.globalAlpha = I > 0.01 ? 0.9 : 0.35
      ctx.beginPath(); ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1
    }

    // battery on the left wire (+ plate up)
    ctx.strokeStyle = CANVAS.white
    ctx.lineWidth = 3
    ctx.beginPath(); ctx.moveTo(x0 - 15, cy - 9); ctx.lineTo(x0 + 15, cy - 9); ctx.stroke()
    ctx.lineWidth = 5
    ctx.beginPath(); ctx.moveTo(x0 - 8, cy + 9); ctx.lineTo(x0 + 8, cy + 9); ctx.stroke()
    ctx.fillStyle = CANVAS.fg
    ctx.font = 'bold 13px ui-sans-serif, system-ui'
    ctx.textAlign = 'center'
    ctx.fillText('+', x0 - 26, cy - 5)
    ctx.fillText('−', x0 - 26, cy + 17)
    ctx.font = 'bold 12px ui-monospace, monospace'
    ctx.fillText(`${V} V`, x0 + 34, cy + 4)

    // lamp glow (power ∝ V²/R)
    if (bright > 0.012) {
      const rad = 30 + 34 * bright
      const gr = ctx.createRadialGradient(x1, cy, 4, x1, cy, rad)
      gr.addColorStop(0, `rgba(245,158,11,${(0.75 * bright).toFixed(3)})`)
      gr.addColorStop(1, 'rgba(245,158,11,0)')
      ctx.fillStyle = gr
      ctx.beginPath(); ctx.arc(x1, cy, rad, 0, Math.PI * 2); ctx.fill()
    }

    // resistor zigzag on the top wire
    ctx.strokeStyle = CANVAS.white
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.moveTo(cx - 44, y0)
    const zig = 6, seg = 88 / zig
    for (let i = 0; i < zig; i++) {
      ctx.lineTo(cx - 44 + seg * (i + 0.5), y0 + (i % 2 === 0 ? -9 : 9))
    }
    ctx.lineTo(cx + 44, y0)
    ctx.stroke()
    ctx.fillStyle = CANVAS.fg
    ctx.font = 'bold 12px ui-monospace, monospace'
    ctx.fillText(`${R} Ω`, cx, y0 - 20)

    // lamp bulb on the right wire
    ctx.beginPath()
    ctx.arc(x1, cy, 14, 0, Math.PI * 2)
    ctx.fillStyle = CANVAS.panel
    ctx.fill()
    ctx.strokeStyle = CANVAS.yellow
    ctx.lineWidth = 2.5
    ctx.stroke()
    ctx.strokeStyle = bright > 0.012 ? CANVAS.yellow : CANVAS.muted
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x1 - 6, cy - 6); ctx.lineTo(x1 + 6, cy + 6)
    ctx.moveTo(x1 + 6, cy - 6); ctx.lineTo(x1 - 6, cy + 6)
    ctx.stroke()
    ctx.fillStyle = CANVAS.fg
    ctx.font = 'bold 12px ui-monospace, monospace'
    ctx.fillText(`${P.toFixed(1)} W`, x1, cy + 46)
    ctx.font = '11px ui-sans-serif, system-ui'
    ctx.fillText(`lamp: ${brightness}`, x1, cy - 30)

    // voltmeter across the lamp (inside the loop)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(x1 - 34, cy - 13); ctx.lineTo(x1, cy - 26)
    ctx.moveTo(x1 - 34, cy + 13); ctx.lineTo(x1, cy + 26)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(x1 - 34, cy, 13, 0, Math.PI * 2)
    ctx.fillStyle = CANVAS.panelLight
    ctx.fill()
    ctx.strokeStyle = CANVAS.white
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = CANVAS.fg
    ctx.font = 'bold 12px ui-sans-serif, system-ui'
    ctx.fillText('V', x1 - 34, cy + 4)

    // ammeter on the bottom wire
    ctx.beginPath()
    ctx.arc(cx, y1, 15, 0, Math.PI * 2)
    ctx.fillStyle = CANVAS.panelLight
    ctx.fill()
    ctx.strokeStyle = CANVAS.white
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = CANVAS.fg
    ctx.font = 'bold 13px ui-sans-serif, system-ui'
    ctx.fillText('A', cx, y1 + 4.5)
    ctx.font = 'bold 12px ui-monospace, monospace'
    ctx.fillStyle = CANVAS.teal
    ctx.fillText(`${I.toFixed(2)} A`, cx, y1 + 32)

    if (challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('★ Challenge complete!', w / 2, 22)
    }
  }, 380)

  return (
    <SimFrame
      title="Ohm's Law Circuit"
      brief="A series loop: battery → resistor → lamp. Electrons drift at a speed set by the current I = V/R, and the lamp glows with power P = V²/R."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 380 }}
          aria-label="Series circuit with a battery, a resistor and a lamp: teal electron dots flow around the loop faster as the current grows, the ammeter reads I equals V over R, and the lamp glow follows the power"
          role="img"
        />
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <Legend color={CANVAS.teal} label="electrons (drift − → +)" />
        <Legend color={CANVAS.yellow} label="lamp glow ∝ power" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Voltage" value={voltage} min={1} max={24} step={1} unit="V" onChange={setVoltage} />
        <SimSlider label="Resistance" value={resistance} min={2} max={40} step={1} unit="Ω" onChange={setResistance} />
        <div className="flex gap-2">
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 mr-1" aria-hidden />
            Challenge: get 0.50 A
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 mr-1" aria-hidden /> Reset
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Voltage" value={String(voltage)} unit="V" tone="text-amber-500" />
        <Readout label="Resistance" value={String(resistance)} unit="Ω" tone="text-violet-500" />
        <Readout label="Current" value={current.toFixed(2)} unit="A" tone="text-teal-500" />
        <Readout label="Power" value={power.toFixed(1)} unit="W" tone="text-yellow-500" />
        <Readout label="Bulb" value={brightness} />
        {challenge !== 'idle' && (
          <Readout label="Target" value="0.50" unit="A" tone="text-amber-500" />
        )}
      </div>

      {result && (
        <p
          className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}
          role="status"
        >
          {result}
        </p>
      )}
    </SimFrame>
  )
}
