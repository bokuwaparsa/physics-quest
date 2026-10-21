// ─── Sim: Pressure Lab · press with force F over area A, watch P = F/A ───────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

type SurfaceId = 'nail' | 'heel' | 'boot' | 'snowshoe'

const SURFACES: { value: SurfaceId; label: string; name: string; cm2: number }[] = [
  { value: 'nail', label: 'Nail tip · 0.5 cm²', name: 'Nail tip', cm2: 0.5 },
  { value: 'heel', label: 'Stiletto heel · 1 cm²', name: 'Stiletto heel', cm2: 1 },
  { value: 'boot', label: 'Boot sole · 150 cm²', name: 'Boot sole', cm2: 150 },
  { value: 'snowshoe', label: 'Snowshoe · 900 cm²', name: 'Snowshoe', cm2: 900 },
]

const LIMIT = 1_000_000 // Pa

const fmt = (n: number) => Math.round(n).toLocaleString('en-US')

/** Dent depth (px) from pressure — log scale 10³ … 10⁷ Pa. */
const sinkDepth = (p: number) =>
  Math.max(2, Math.min(64, ((Math.log10(Math.max(p, 100)) - 3) / 4) * 64))

export function PressureLabSim() {
  const [force, setForce] = useState(200)
  const [surface, setSurface] = useState<SurfaceId>('boot')
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const surf = SURFACES.find((s) => s.value === surface) ?? SURFACES[2]
  const areaM2 = surf.cm2 / 10000
  const pressure = force / areaM2

  const sink = useRef(sinkDepth(pressure))

  const evaluate = (id: SurfaceId) => {
    const sv = SURFACES.find((x) => x.value === id) ?? SURFACES[2]
    const p = 500 / (sv.cm2 / 10000)
    const ok = p < LIMIT
    if (ok) { beep(660, 120); beep(880, 160) }
    setChallenge(ok ? 'won' : 'lost')
    setResult(ok
      ? `${sv.name}: P = 500 N ÷ ${sv.cm2} cm² = ${fmt(p)} Pa — far below the 1,000,000 Pa limit. Spreading the force over a wide area keeps pressure low!`
      : `${sv.name}: P = ${fmt(p)} Pa — over the limit! A tiny contact area concentrates the whole 500 N. Pick a wider surface.`)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const target = sinkDepth(pressure)
    sink.current = reducedMotion ? target : sink.current + (target - sink.current) * Math.min(1, dt * 8)
    const d = sink.current

    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    // ── pressure gauge (log scale 10³ … 10⁷ Pa) ────────────────────────────
    const gx = 78, gy = 84, gr = 46
    ctx.fillStyle = CANVAS.panelLight
    ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI * 2); ctx.stroke()
    const a0 = Math.PI * 0.75, sweep = Math.PI * 1.5
    // danger arc above 1 MPa
    ctx.strokeStyle = CANVAS.rose; ctx.lineWidth = 5
    ctx.beginPath(); ctx.arc(gx, gy, gr - 9, a0 + sweep * 0.75, a0 + sweep); ctx.stroke()
    const tickL = ['1k', '10k', '100k', '1M', '10M']
    ctx.font = '9px ui-monospace, monospace'; ctx.textAlign = 'center'
    for (let i = 0; i <= 4; i++) {
      const a = a0 + sweep * (i / 4)
      const c = Math.cos(a), s = Math.sin(a)
      ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(gx + c * (gr - 4), gy + s * (gr - 4))
      ctx.lineTo(gx + c * (gr - 12), gy + s * (gr - 12))
      ctx.stroke()
      ctx.fillStyle = CANVAS.muted
      ctx.fillText(tickL[i], gx + c * (gr + 14), gy + s * (gr + 14) + 3)
    }
    const frac = Math.min(1, Math.max(0, (Math.log10(Math.max(pressure, 100)) - 3) / 4))
    const na = a0 + sweep * frac
    ctx.strokeStyle = CANVAS.amber; ctx.lineWidth = 3
    ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(na) * (gr - 16), gy + Math.sin(na) * (gr - 16)); ctx.stroke()
    ctx.fillStyle = CANVAS.amber
    ctx.beginPath(); ctx.arc(gx, gy, 4, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
    ctx.fillText('P (Pa) · log scale', gx, gy + gr + 24)
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 12px ui-monospace, monospace'
    ctx.fillText(`${fmt(pressure)} Pa`, gx, gy + gr + 40)

    // ── press scene ─────────────────────────────────────────────────────────
    const gyd = h - 104 // ground level
    const px = Math.round(w * 0.58)
    const sideCm = Math.sqrt(surf.cm2)
    const cw = Math.min(w * 0.52, 12 + 168 * ((sideCm - 0.71) / (30 - 0.71)))
    const half = cw / 2
    const danger = pressure > LIMIT

    // ground with a dent under the contact
    ctx.fillStyle = CANVAS.panel
    ctx.beginPath()
    ctx.moveTo(20, gyd)
    ctx.lineTo(px - half, gyd)
    ctx.lineTo(px - half * 0.55, gyd + d)
    ctx.lineTo(px + half * 0.55, gyd + d)
    ctx.lineTo(px + half, gyd)
    ctx.lineTo(w - 20, gyd)
    ctx.lineTo(w - 20, h - 12)
    ctx.lineTo(20, h - 12)
    ctx.closePath(); ctx.fill()
    ctx.strokeStyle = danger ? CANVAS.rose : CANVAS.muted
    ctx.lineWidth = danger ? 2.5 : 2
    ctx.beginPath()
    ctx.moveTo(20, gyd)
    ctx.lineTo(px - half, gyd)
    ctx.lineTo(px - half * 0.55, gyd + d)
    ctx.lineTo(px + half * 0.55, gyd + d)
    ctx.lineTo(px + half, gyd)
    ctx.lineTo(w - 20, gyd)
    ctx.stroke()

    // plate + rod + block
    const plateW = Math.max(10, cw)
    ctx.fillStyle = CANVAS.white
    ctx.fillRect(px - plateW / 2, gyd + d - 8, plateW, 8)
    ctx.fillRect(px - 6, gyd + d - 40, 12, 32)
    const bwh = 62
    const bTop = gyd + d - 40 - bwh
    ctx.fillStyle = CANVAS.orange
    ctx.fillRect(px - 56, bTop, 112, bwh)
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(px - 10, bTop + 22, 6, 6)
    ctx.fillRect(px + 4, bTop + 22, 6, 6)
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 14px ui-sans-serif, system-ui'; ctx.textAlign = 'center'
    ctx.fillText(`${fmt(force)} N`, px, bTop + 52)

    // force arrow above the block
    ctx.strokeStyle = CANVAS.amber; ctx.lineWidth = 4
    ctx.beginPath(); ctx.moveTo(px, bTop - 50); ctx.lineTo(px, bTop - 8); ctx.stroke()
    ctx.fillStyle = CANVAS.amber
    ctx.beginPath(); ctx.moveTo(px, bTop - 2); ctx.lineTo(px - 7, bTop - 12); ctx.lineTo(px + 7, bTop - 12); ctx.closePath(); ctx.fill()
    ctx.font = 'bold 12px ui-monospace, monospace'
    ctx.fillText('F', px + 16, bTop - 40)

    // area + danger labels
    ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-monospace, monospace'
    ctx.fillText(`${surf.name} · ${surf.cm2} cm²`, px, gyd + d + 24)
    if (danger) {
      ctx.fillStyle = CANVAS.rose; ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('P over 1 MPa!', px, gyd + d + 42)
    }

    // challenge banner
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: with F = 500 N, keep P below 1,000,000 Pa — pick the right surface!', w / 2, 18)
    } else if (challenge === 'won' || challenge === 'lost') {
      ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText(challenge === 'won' ? '★ Challenge complete!' : 'Too much pressure — try a wider surface!', w / 2, 18)
    }
  }, 400)

  return (
    <SimFrame
      title="Pressure Lab"
      brief="Press with a force over a chosen contact area and watch the pascal gauge: P = F / A. Narrow contact = huge pressure."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A block pressing on a surface with adjustable force and contact area, next to a logarithmic pressure gauge"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Force" value={force} min={50} max={500} step={5} unit="N"
          onChange={setForce} disabled={challenge === 'active'}
        />
        <SimSelect
          label="Contact surface" value={surface}
          options={SURFACES.map((s) => ({ value: s.value, label: s.label }))}
          onChange={(v) => {
            setSurface(v)
            if (challenge === 'active' || challenge === 'lost') evaluate(v)
          }}
        />
        <div className="flex gap-2">
          <SimButton variant="secondary" onClick={() => { setChallenge('idle'); setResult(''); setForce(200) }}>
            <RotateCcw className="h-4 w-4 mr-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { setForce(500); setChallenge('active'); setResult(''); evaluate(surface) }}
          >
            <Flag className="h-4 w-4 mr-1" aria-hidden /> Challenge: stay under 1 MPa
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Force" value={fmt(force)} unit="N" />
        <Readout label="Area" value={areaM2 < 0.001 ? areaM2.toFixed(5) : areaM2.toFixed(3)} unit="m²" />
        <Readout label="Pressure" value={fmt(pressure)} unit="Pa" tone={pressure > LIMIT ? 'text-rose-500' : 'text-emerald-500'} />
        <Readout label="Pressure" value={fmt(pressure / 1000)} unit="kPa" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
