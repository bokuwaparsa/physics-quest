// ─── Sim: Refraction Tank · Snell's law, bent rays & total internal refl. ─────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, SimToggle, Readout,
  useSimCanvas, useSimBeep, drawGrid,
} from '@/components/sims/sim-kit'
import { Flag, RefreshCcw } from 'lucide-react'

type Med2 = 'water' | 'glass' | 'diamond'
const N2: Record<Med2, number> = { water: 1.33, glass: 1.5, diamond: 2.42 }
const TINT: Record<Med2, string> = {
  water: 'rgba(20,184,166,0.16)',
  glass: 'rgba(214,211,209,0.10)',
  diamond: 'rgba(139,92,246,0.16)',
}
const C_LIGHT = 3e8 // m/s
const SURFACE_Y = 150
const L = 240 // ray length in px

export function RefractionTankSim() {
  const [deg1, setDeg1] = useState(35)
  const [med, setMed] = useState<Med2>('water')
  const [reverse, setReverse] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()

  const st = useRef({
    deg1: 35, med: 'water' as Med2, reverse: false,
    challenge: 'idle' as 'idle' | 'active' | 'won',
  })

  const n2 = N2[med]
  const thetaC = (Math.asin(Math.min(1, 1 / n2)) * 180) / Math.PI // dense → air
  const r1 = (deg1 * Math.PI) / 180
  const tir = reverse && Math.sin(r1) > 1 / n2
  const sinOut = Math.min(1, reverse ? Math.sin(r1) * n2 : Math.sin(r1) / n2)
  const theta2 = (Math.asin(sinOut) * 180) / Math.PI
  const vInMed = C_LIGHT / n2

  const startChallenge = () => {
    setMed('water')
    setReverse(true)
    setChallenge('active')
    setResult('Light going from water back into air: raise the inside angle θ₁ until the refracted ray just vanishes (total internal reflection). The critical angle for water is hiding near 48.8°.')
  }

  const reset = () => {
    setDeg1(35)
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h) => {
    const s = st.current
    s.deg1 = deg1
    s.med = med
    s.reverse = reverse
    s.challenge = challenge
    const nn = N2[s.med]
    const th1 = (s.deg1 * Math.PI) / 180
    const sin1 = Math.sin(th1)
    const cos1 = Math.cos(th1)
    const tc = (Math.asin(Math.min(1, 1 / nn)) * 180) / Math.PI
    const isTir = s.reverse && sin1 > 1 / nn

    // challenge: reverse + water, θ₁ within ±1° of the true critical angle
    if (s.challenge === 'active' && s.reverse && s.med === 'water' && Math.abs(s.deg1 - tc) <= 1) {
      s.challenge = 'won'
      setChallenge('won')
      setResult(`θc = asin(n₁/n₂) = asin(1/1.33) ≈ ${tc.toFixed(1)}° — beyond this angle the light cannot leave the water at all. Fiber optics run on this trick!`)
      beep(660, 140); beep(990, 180)
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    drawGrid(ctx, w, h, 40)

    const P = { x: w / 2, y: SURFACE_Y }

    // medium 2 tank
    ctx.fillStyle = TINT[s.med]
    ctx.fillRect(12, SURFACE_Y, w - 24, h - SURFACE_Y - 12)
    ctx.strokeStyle = CANVAS.white
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(12, SURFACE_Y); ctx.lineTo(w - 12, SURFACE_Y); ctx.stroke()
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1.5
    ctx.strokeRect(12, SURFACE_Y, w - 24, h - SURFACE_Y - 12)
    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText('air · n₁ = 1.0', 22, 30)
    ctx.fillText(`${s.med} · n₂ = ${nn}`, 22, h - 26)

    // dashed normal through P
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1.5
    ctx.setLineDash([5, 5])
    ctx.beginPath(); ctx.moveTo(P.x, P.y - 120); ctx.lineTo(P.x, P.y + 120); ctx.stroke()
    ctx.setLineDash([])

    // incident ray (laser) — from the air (forward) or from inside (reverse)
    const S = s.reverse
      ? { x: P.x - L * sin1, y: P.y + L * cos1 }
      : { x: P.x - L * sin1, y: P.y - L * cos1 }
    const beam = (x0: number, y0: number, x1: number, y1: number, color: string, width: number, alpha = 1) => {
      ctx.strokeStyle = color
      ctx.globalAlpha = alpha
      ctx.lineWidth = width
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
      ctx.globalAlpha = 1
    }
    beam(S.x, S.y, P.x, P.y, CANVAS.amber, 8, 0.22)
    beam(S.x, S.y, P.x, P.y, CANVAS.amber, 2.5)

    // dashed "no refraction" reference: straight continuation of the incident ray
    const cont = { x: sin1, y: s.reverse ? -cos1 : cos1 }
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1.5
    ctx.setLineDash([6, 6])
    ctx.beginPath(); ctx.moveTo(P.x, P.y); ctx.lineTo(P.x + cont.x * L, P.y + cont.y * L); ctx.stroke()
    ctx.setLineDash([])

    // refraction (Snell) or total internal reflection
    if (!isTir) {
      const sin2 = s.reverse ? Math.min(1, sin1 * nn) : sin1 / nn
      const th2 = Math.asin(sin2)
      const dir = s.reverse ? { x: Math.sin(th2), y: -Math.cos(th2) } : { x: Math.sin(th2), y: Math.cos(th2) }
      beam(P.x, P.y, P.x + dir.x * L, P.y + dir.y * L, CANVAS.teal, 2.5)
      // faint partial reflection
      const refl = s.reverse ? { x: sin1, y: cos1 } : { x: sin1, y: -cos1 }
      beam(P.x, P.y, P.x + refl.x * 120, P.y + refl.y * 120, CANVAS.white, 1.5, 0.22)
    } else {
      // all of the light bounces back inside the dense medium
      beam(P.x, P.y, P.x + sin1 * L, P.y + cos1 * L, CANVAS.rose, 2.5)
      ctx.fillStyle = CANVAS.rose
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.textAlign = 'left'
      ctx.fillText('TOTAL INTERNAL REFLECTION', P.x + 24, P.y + 60)
    }

    // angle arcs: incident side (amber) and refraction side (teal)
    const aIn = Math.atan2(S.y - P.y, S.x - P.x) // from P back toward the laser
    const aN1 = s.reverse ? Math.PI / 2 : -Math.PI / 2 // normal on incident side
    const aUp = -Math.PI / 2
    const aDown = Math.PI / 2
    const arc = (a1: number, a2: number, r: number, color: string): number | undefined => {
      const delta = (((a2 - a1 + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) - Math.PI
      if (Math.abs(delta) < 0.02) return undefined
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(P.x, P.y, r, a1, a1 + delta, delta < 0)
      ctx.stroke()
      return a1 + delta / 2
    }
    ctx.font = '11px ui-monospace, monospace'
    ctx.textAlign = 'center'
    const mid1 = arc(aIn, aN1, 46, CANVAS.amber)
    if (mid1 !== undefined) {
      ctx.fillStyle = CANVAS.amber
      ctx.fillText(`${s.deg1.toFixed(1)}°`, P.x + Math.cos(mid1) * 68, P.y + Math.sin(mid1) * 68 + 4)
    }
    if (!isTir) {
      const sin2 = s.reverse ? Math.min(1, sin1 * nn) : sin1 / nn
      const th2 = Math.asin(sin2)
      const aRefr = s.reverse
        ? Math.atan2(-Math.cos(th2), Math.sin(th2))
        : Math.atan2(Math.cos(th2), Math.sin(th2))
      const aN2 = s.reverse ? aUp : aDown
      const mid2 = arc(aN2, aRefr, 46, CANVAS.teal)
      if (mid2 !== undefined) {
        ctx.fillStyle = CANVAS.teal
        ctx.fillText(`${((th2 * 180) / Math.PI).toFixed(1)}°`, P.x + Math.cos(mid2) * 68, P.y + Math.sin(mid2) * 68 + 4)
      }
    }

    if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(`★ Critical angle found: ${tc.toFixed(1)}°`, w / 2, h - 8)
    }
  }, 400)

  return (
    <SimFrame
      title="Refraction Tank"
      brief="A laser bends where air meets a denser medium. Compare the real ray with the dashed no-bend ray, then flip to reverse mode and hunt for total internal reflection."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg"
        style={{ height: 400 }}
        aria-label="Refraction tank: a laser beam bends as it crosses the boundary between air and a denser medium; the angles from the normal and the dashed unbent reference ray are shown, with total internal reflection in reverse mode"
        role="img"
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Angle θ₁ from normal" value={deg1} min={0} max={85} step={0.5} unit="°" onChange={setDeg1} />
        <SimSelect<Med2>
          label="Medium 2 (below)"
          value={med}
          options={[
            { value: 'water', label: 'Water · n = 1.33' },
            { value: 'glass', label: 'Glass · n = 1.5' },
            { value: 'diamond', label: 'Diamond · n = 2.42' },
          ]}
          onChange={setMed}
        />
        <SimToggle label="Reverse mode (dense → air)" checked={reverse} onChange={setReverse} className="pb-1.5" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-wrap gap-2">
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
            disabled={challenge === 'won'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: find θc (water→air)
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RefreshCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="θ₁ (incident)" value={deg1.toFixed(1)} unit="°" tone="text-amber-500" />
        <Readout label="θ₂ (refracted)" value={tir ? 'TIR' : theta2.toFixed(1)} unit={tir ? '' : '°'} tone="text-teal-500" />
        <Readout label="Speed in medium" value={(vInMed / 1e8).toFixed(2)} unit="×10⁸ m/s" tone="text-violet-500" />
        {reverse && <Readout label="Critical angle θc" value={thetaC.toFixed(1)} unit="°" tone="text-rose-500" />}
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
