// ─── Sim: Flux Lab · tilt a flat surface in a point charge's field, watch Φ = EA·cosθ ─
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, Legend, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

const K = 8.99e9 // N·m²/C²
const EPS0 = 8.854e-12 // C²/(N·m²)
const R = 0.3 // m — fixed charge-to-surface distance

type ChState = 'idle' | 'active' | 'won' | 'lost'

const fmtFlux = (f: number) => {
  const a = Math.abs(f)
  const s = f < 0 ? '−' : ''
  if (a >= 100) return s + Math.round(a).toLocaleString('en-US')
  if (a >= 10) return s + a.toFixed(1)
  if (a >= 1) return s + a.toFixed(2)
  return s + a.toFixed(3)
}

export function FluxLabSim() {
  const [q, setQ] = useState(3) // nC
  const [area, setArea] = useState(0.25) // m²
  const [theta, setTheta] = useState(0) // deg
  const [challenge, setChallenge] = useState<ChState>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const rot = useRef(0) // eased surface rotation (radians)

  const E = (K * Math.abs(q) * 1e-9) / (R * R) // N/C at the surface
  const flux = Math.sign(q) * E * area * Math.cos((theta * Math.PI) / 180)
  const fluxClosed = (q * 1e-9) / EPS0 // Gauss: q/ε₀ — same for ANY closed surface

  const evaluate = (nQ: number, nA: number, nTh: number) => {
    const e = (K * Math.abs(nQ) * 1e-9) / (R * R)
    const fMax = e * nA
    if (fMax <= 0) {
      setChallenge('lost')
      setResult('Φ is zero — but for a sneaky reason: the charge itself is 0. Nudge q off zero, then tilt the surface edge-on to the field!')
      return
    }
    const f = Math.sign(nQ) * fMax * Math.cos((nTh * Math.PI) / 180)
    const ok = Math.abs(f) < 0.01 * fMax
    if (ok) { beep(660, 120); beep(880, 160) }
    setChallenge(ok ? 'won' : 'lost')
    setResult(ok
      ? 'Φ = E·A·cos θ and cos 90° = 0 — edge-on to the field, no field lines pierce the surface! (Any closed surface around q would still carry Φ = q/ε₀.)'
      : `Φ = ${fmtFlux(f)} N·m²/C (|cos θ| = ${Math.abs(Math.cos((nTh * Math.PI) / 180)).toFixed(2)}). Tilt closer to 90° so the field skims along the surface.`)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    // ease the drawn tilt toward the slider value
    const target = (theta * Math.PI) / 180
    rot.current = reducedMotion ? target : rot.current + (target - rot.current) * Math.min(1, dt * 10)
    const rotv = rot.current

    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    if (w < 60 || h < 60) return

    const cx = Math.round(w * 0.3)
    const cy = Math.round(h * 0.52)
    const sx = Math.round(w * 0.72)
    const sy = cy

    // ── dashed line charge → surface (r = 0.3 m) ───────────────────────────
    ctx.strokeStyle = CANVAS.muted
    ctx.setLineDash([5, 5])
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(sx, sy); ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText('r = 0.3 m', (cx + sx) / 2, cy + 16)

    // ── field arrows around the charge ──────────────────────────────────────
    const qSign = Math.sign(q)
    if (qSign !== 0) {
      const col = qSign > 0 ? CANVAS.amber : CANVAS.teal
      ctx.strokeStyle = col
      ctx.fillStyle = col
      ctx.lineWidth = 2
      for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI) / 6
        const dx = Math.cos(a), dy = Math.sin(a)
        const x1 = cx + dx * 24, y1 = cy + dy * 24
        const x2 = cx + dx * 56, y2 = cy + dy * 56
        const ux = qSign > 0 ? dx : -dx
        const uy = qSign > 0 ? dy : -dy
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
        const hx = x2 + ux * 7, hy = y2 + uy * 7
        const px = -uy, py = ux
        ctx.beginPath()
        ctx.moveTo(hx, hy)
        ctx.lineTo(x2 + px * 3.5, y2 + py * 3.5)
        ctx.lineTo(x2 - px * 3.5, y2 - py * 3.5)
        ctx.closePath(); ctx.fill()
      }
    }

    // ── the charge ──────────────────────────────────────────────────────────
    ctx.fillStyle = qSign >= 0 ? CANVAS.amber : CANVAS.teal
    ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.panel; ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.stroke()
    ctx.fillStyle = CANVAS.bg
    ctx.font = 'bold 15px ui-monospace, monospace'
    ctx.fillText(qSign > 0 ? '+' : qSign < 0 ? '−' : '0', cx, cy + 5)
    ctx.fillStyle = CANVAS.fg
    ctx.font = 'bold 11px ui-monospace, monospace'
    ctx.fillText(`${q > 0 ? '+' : ''}${q.toFixed(1)} nC`, cx, cy - 24)

    // ── closed-surface ghost loop (Gauss) ───────────────────────────────────
    ctx.strokeStyle = CANVAS.violet
    ctx.setLineDash([4, 4])
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.ellipse(cx, cy, 84, 62, 0, 0, Math.PI * 2); ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.violet
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText(`closed surface: Φ = q/ε₀ = ${fmtFlux(fluxClosed)} N·m²/C`, 14, h - 14)

    // ── the flat surface: a card rotating about its vertical axis ───────────
    const sideM = Math.sqrt(area) // 0.1 … 1 m
    const fullW = 30 + 90 * ((sideM - 0.1) / 0.9) // px at θ = 0
    const cosv = Math.cos(rotv)
    const cardW = Math.max(3, fullW * Math.abs(cosv))
    ctx.strokeStyle = CANVAS.grid
    ctx.setLineDash([3, 3])
    ctx.strokeRect(sx - fullW / 2, sy - fullW / 2, fullW, fullW)
    ctx.setLineDash([])
    ctx.fillStyle = 'rgba(214,211,209,0.16)'
    ctx.strokeStyle = cosv === 0 ? CANVAS.rose : CANVAS.white
    ctx.lineWidth = 2
    ctx.fillRect(sx - cardW / 2, sy - fullW / 2, cardW, fullW)
    ctx.strokeRect(sx - cardW / 2, sy - fullW / 2, cardW, fullW)
    // E arrow at the surface (direction flips with the sign of q)
    ctx.strokeStyle = qSign >= 0 ? CANVAS.amber : CANVAS.teal
    ctx.fillStyle = qSign >= 0 ? CANVAS.amber : CANVAS.teal
    ctx.lineWidth = 3
    const ea = qSign >= 0 ? 0 : Math.PI
    const exx = Math.cos(ea), exy = Math.sin(ea)
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + exx * 44, sy + exy * 44); ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(sx + exx * 52, sy + exy * 52)
    ctx.lineTo(sx + exx * 41 - exy * 5, sy + exy * 41 + exx * 5)
    ctx.lineTo(sx + exx * 41 + exy * 5, sy + exy * 41 - exx * 5)
    ctx.closePath(); ctx.fill()
    ctx.font = 'bold 12px ui-monospace, monospace'
    ctx.fillText('E', sx + exx * 62, sy + 4)
    // θ arc between the field direction and the surface normal
    ctx.strokeStyle = CANVAS.orange
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(sx, sy, 26, 0, rotv)
    ctx.stroke()
    ctx.fillStyle = CANVAS.orange
    ctx.font = 'bold 11px ui-monospace, monospace'
    ctx.fillText(`θ = ${theta.toFixed(1)}°`, sx, sy + fullW / 2 + 18)
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.fillText(`A = ${area.toFixed(2)} m²`, sx, sy + fullW / 2 + 32)

    // ── challenge banner ────────────────────────────────────────────────────
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: tilt the surface until |Φ| < 1% of its maximum — find the zero-flux angle!', w / 2, 18)
    } else if (challenge === 'won' || challenge === 'lost') {
      ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText(challenge === 'won' ? '★ Challenge complete!' : 'Not zero yet — keep tilting toward 90°!', w / 2, 18)
    }
  }, 400)

  return (
    <SimFrame
      title="Flux Lab"
      brief="A point charge breathes field lines through a tilting flat surface: Φ = E·A·cos θ. Any CLOSED surface around the charge carries Φ = q/ε₀ — no matter its shape or size."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A point charge with radial field arrows, a dashed closed-surface loop showing constant flux q over epsilon-zero, and a flat rectangular surface whose projected width shrinks with the tilt angle"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <Legend color={CANVAS.amber} label="q > 0 · arrows out" />
        <Legend color={CANVAS.teal} label="q < 0 · arrows in" />
        <Legend color={CANVAS.white} label="flat surface (tilts with θ)" />
        <Legend color={CANVAS.violet} label="closed surface · Φ = q/ε₀" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Charge q" value={q} min={-6} max={6} step={0.5} unit="nC"
          onChange={(v) => { setQ(v); if (challenge === 'active' || challenge === 'lost') evaluate(v, area, theta) }}
          format={(v) => (v > 0 ? '+' : '') + v.toFixed(1)}
          disabled={challenge === 'active'}
        />
        <SimSlider
          label="Surface area A" value={area} min={0.01} max={1} step={0.01} unit="m²"
          onChange={(v) => { setArea(v); if (challenge === 'active' || challenge === 'lost') evaluate(q, v, theta) }}
          format={(v) => v.toFixed(2)}
          disabled={challenge === 'active'}
        />
        <SimSlider
          label="Tilt angle θ" value={theta} min={0} max={180} step={0.5} unit="°"
          onChange={(v) => { setTheta(v); if (challenge === 'active' || challenge === 'lost') evaluate(q, area, v) }}
          format={(v) => v.toFixed(1)}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={() => { setChallenge('idle'); setResult(''); setQ(3); setArea(0.25); setTheta(0) }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { setChallenge('active'); setResult(''); evaluate(q, area, theta) }}
            disabled={challenge === 'active'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: zero the flux
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="E at surface" value={Math.round(E).toLocaleString('en-US')} unit="N/C" />
        <Readout label="Surface flux Φ" value={fmtFlux(flux)} unit="N·m²/C" tone="text-orange-400" />
        <Readout label="Closed-surface Φ" value={fmtFlux(fluxClosed)} unit="N·m²/C" tone="text-violet-400" />
        <Readout label="Angle θ" value={theta.toFixed(1)} unit="°" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
