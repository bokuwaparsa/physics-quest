// ─── Sim: Buoyancy Tank · drop a block, watch it float, sink or hover ────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { ArrowDown, Flag, RotateCcw } from 'lucide-react'

type MatId = 'wood' | 'ice' | 'water' | 'alu' | 'lead' | 'custom'

const MATERIALS: { value: MatId; label: string; rho: number }[] = [
  { value: 'wood', label: 'Wood · 600 kg/m³', rho: 600 },
  { value: 'ice', label: 'Ice · 917 kg/m³', rho: 917 },
  { value: 'water', label: 'Water · 1000 kg/m³', rho: 1000 },
  { value: 'alu', label: 'Aluminium · 2700 kg/m³', rho: 2700 },
  { value: 'lead', label: 'Lead · 11 340 kg/m³', rho: 11340 },
  { value: 'custom', label: 'Custom (use slider)', rho: 500 },
]

const G = 9.8
const SIDE = 0.3            // block side, m
const VOL = SIDE * SIDE * SIDE // m³
const S_MIN = -0.45         // start: block held above the water
const S_MAX = 0.7           // resting on the tank floor

const fmt = (n: number) => Math.round(n).toLocaleString('en-US')

export function BuoyancyTankSim() {
  const [fluidRho, setFluidRho] = useState(1000)
  const [mat, setMat] = useState<MatId>('wood')
  const [customRho, setCustomRho] = useState(500)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [frac, setFrac] = useState(0)
  const [fbNow, setFbNow] = useState(0)

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const bodyRho = mat === 'custom' ? customRho : (MATERIALS.find((m) => m.value === mat)?.rho ?? 600)
  const weight = bodyRho * G * VOL

  const st = useRef({ s: S_MIN, vy: 0, mode: 'idle' as 'idle' | 'moving' | 'settled', settle: 0 })
  const skip = useRef(0)

  const resetBlock = () => {
    const s = st.current
    s.s = S_MIN; s.vy = 0; s.mode = 'idle'; s.settle = 0
  }

  const drop = () => {
    resetBlock()
    st.current.mode = 'moving'
    setResult('')
  }

  const evaluateSettled = (fSub: number) => {
    const ok = Math.abs(fSub - 0.5) <= 0.02 && bodyRho < fluidRho && Math.abs(fluidRho - 1000) <= 5
    if (ok) { beep(660, 120); beep(880, 160) }
    setChallenge(ok ? 'won' : 'lost')
    setResult(ok
      ? `ρ_block / ρ_fluid = ${bodyRho} / ${fluidRho} = ${(bodyRho / fluidRho).toFixed(2)} — exactly half the block sits underwater. Perfect balance of buoyant force and weight!`
      : `This block settles ${(fSub * 100).toFixed(0)}% submerged. For exactly 50% in water you need ρ_block = 0.5 × 1000 = 500 kg/m³ — try the custom slider!`)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t, dt) => {
    const s = st.current

    // ── physics ────────────────────────────────────────────────────────────
    if (s.mode === 'moving') {
      const m = bodyRho * VOL
      const fSub = Math.min(1, Math.max(0, (s.s + SIDE / 2) / SIDE))
      const fb = fluidRho * G * VOL * fSub
      const a = (fb - weight) / m - 12 * s.vy
      s.vy += a * dt
      s.s += s.vy * dt
      if (s.s > S_MAX) { s.s = S_MAX; s.vy = Math.abs(s.vy) > 0.3 ? -s.vy * 0.2 : 0 }
      if (s.s < S_MIN) { s.s = S_MIN; s.vy = 0 }
      const eq = Math.abs(fb - weight) < 0.1 * Math.max(weight, 1)
      if (Math.abs(s.vy) < 0.03 && (eq || s.s >= S_MAX - 0.001)) {
        s.settle += dt
        if (s.settle > 0.6) {
          s.mode = 'settled'
          if (challenge === 'active') evaluateSettled(Math.min(1, Math.max(0, (s.s + SIDE / 2) / SIDE)))
        }
      } else {
        s.settle = 0
      }
    }

    // publish readouts ~10×/s
    skip.current += 1
    if (skip.current >= 6) {
      skip.current = 0
      const fSub = Math.min(1, Math.max(0, (s.s + SIDE / 2) / SIDE))
      setFrac(fSub)
      setFbNow(fluidRho * G * VOL * fSub)
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const tx = 56, tw = w - 112
    const waterTop = 150, floorY = 350
    const scale = (floorY - waterTop) / 0.86 // px per metre

    // tank + water
    ctx.fillStyle = CANVAS.teal
    ctx.globalAlpha = 0.25
    ctx.fillRect(tx + 2, waterTop, tw - 4, floorY - waterTop)
    ctx.globalAlpha = 1
    ctx.strokeStyle = CANVAS.teal; ctx.lineWidth = 2
    ctx.beginPath()
    if (reducedMotion) {
      ctx.moveTo(tx, waterTop); ctx.lineTo(tx + tw, waterTop)
    } else {
      for (let x = 0; x <= tw; x += 8) {
        const y = waterTop + 1.5 * Math.sin(x * 0.06 + t * 2)
        if (x === 0) ctx.moveTo(tx + x, y); else ctx.lineTo(tx + x, y)
      }
    }
    ctx.stroke()
    ctx.fillStyle = CANVAS.panelLight
    ctx.fillRect(tx, floorY, tw, 6)
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.strokeRect(tx, 60, tw, floorY - 60 + 6)

    // block
    const bpx = SIDE * scale
    const cx = tx + tw / 2
    const floating = bodyRho < fluidRho
    const bob = s.mode === 'settled' && floating && !reducedMotion ? 2 * Math.sin(t * 1.3) : 0
    const centerY = waterTop + s.s * scale + bob
    const bTopPx = centerY - bpx / 2
    ctx.fillStyle = CANVAS.orange
    ctx.fillRect(cx - bpx / 2, bTopPx, bpx, bpx)
    if (bTopPx + bpx > waterTop) {
      const subTop = Math.max(waterTop, bTopPx)
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.fillRect(cx - bpx / 2, subTop, bpx, bTopPx + bpx - subTop)
    }
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1.5
    ctx.strokeRect(cx - bpx / 2, bTopPx, bpx, bpx)
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 12px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText(`${bodyRho}`, cx, centerY + 4)
    ctx.fillStyle = CANVAS.muted; ctx.font = '9px ui-monospace, monospace'
    ctx.fillText('kg/m³', cx, centerY + 16)

    // force arrows
    const arrow = (x0: number, y0: number, x1: number, y1: number, color: string, lw = 4) => {
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
      const ang = Math.atan2(y1 - y0, x1 - x0)
      const ah = 9 + lw
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x1 - ah * Math.cos(ang - 0.42), y1 - ah * Math.sin(ang - 0.42))
      ctx.lineTo(x1 - ah * Math.cos(ang + 0.42), y1 - ah * Math.sin(ang + 0.42))
      ctx.closePath(); ctx.fill()
    }
    const lenW = 16 + 40 * Math.min(1, weight / 3000)
    const lenB = 16 + 40 * Math.min(1, (fluidRho * G * VOL * Math.min(1, Math.max(0, (s.s + SIDE / 2) / SIDE))) / 3000)
    const ax = cx + bpx / 2 + 22
    const bx = cx - bpx / 2 - 22
    arrow(ax, centerY - lenW / 2, ax, centerY + lenW / 2, CANVAS.rose)
    ctx.fillStyle = CANVAS.rose; ctx.font = 'bold 11px ui-monospace, monospace'
    ctx.fillText(`W = ${fmt(weight)} N`, ax + 8, centerY + 4)
    arrow(bx, centerY + lenB / 2, bx, centerY - lenB / 2, CANVAS.emerald)
    ctx.fillStyle = CANVAS.emerald
    ctx.fillText(`F_b = ${fmt(fluidRho * G * VOL * Math.min(1, Math.max(0, (s.s + SIDE / 2) / SIDE)))} N`, bx - 8, centerY + 4)

    // hints & banner
    if (s.mode === 'idle') {
      ctx.fillStyle = CANVAS.muted; ctx.font = '12px ui-sans-serif, system-ui'
      ctx.fillText('Press Drop to release the block', cx, 100)
    }
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: exactly ½ submerged in water (ρ = 1000 kg/m³) — set a custom density and Drop!', w / 2, 20)
    } else if (challenge === 'won' || challenge === 'lost') {
      ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText(challenge === 'won' ? '★ Challenge complete!' : 'Not 50% — adjust the custom density and Drop again!', w / 2, 20)
    }
  }, 400)

  return (
    <SimFrame
      title="Buoyancy Tank"
      brief="Choose a fluid and a block material, then Drop. Floating blocks settle with submerged fraction = ρ_block / ρ_fluid. Try 900 (oil), 1000 (water), 1400 (honey)."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A tank of water where a block of chosen material is dropped, showing buoyant force and weight arrows"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Fluid density" value={fluidRho} min={500} max={1400} step={10} unit="kg/m³"
          onChange={setFluidRho} disabled={challenge === 'active'}
        />
        <SimSelect
          label="Block material" value={mat}
          options={MATERIALS.map((m) => ({ value: m.value, label: m.label }))}
          onChange={(v) => setMat(v)}
        />
        {mat === 'custom' && (
          <SimSlider
            label="Custom block density" value={customRho} min={100} max={1500} step={5} unit="kg/m³"
            onChange={setCustomRho}
          />
        )}
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" disabled={challenge === 'active'} onClick={() => setFluidRho(900)}>Oil 900</SimButton>
          <SimButton variant="secondary" disabled={challenge === 'active'} onClick={() => setFluidRho(1000)}>Water 1000</SimButton>
          <SimButton variant="secondary" disabled={challenge === 'active'} onClick={() => setFluidRho(1400)}>Honey 1400</SimButton>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={drop}>
            <ArrowDown className="h-4 w-4 me-1" aria-hidden /> Drop
          </SimButton>
          <SimButton variant="secondary" onClick={() => { resetBlock(); setChallenge('idle'); setResult('') }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { resetBlock(); setFluidRho(1000); setChallenge('active'); setResult('') }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: ½ submerged
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="ρ block" value={String(bodyRho)} unit="kg/m³" tone="text-orange-500" />
        <Readout label="ρ fluid" value={String(fluidRho)} unit="kg/m³" tone="text-teal-500" />
        <Readout label="Submerged" value={(frac * 100).toFixed(0)} unit="%" />
        <Readout label="Buoyant force" value={fmt(fbNow)} unit="N" tone="text-emerald-500" />
        <Readout label="Weight" value={fmt(weight)} unit="N" tone="text-rose-500" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
