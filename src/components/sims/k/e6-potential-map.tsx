// ─── Sim: Potential Map · equipotential bands around two charges + sliding test charge ─
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, Legend, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

const K = 8.99e9 // N·m²/C²
const X1 = 0.3 // m — fixed position of q1
const X2 = 0.7 // m — fixed position of q2
const RMIN = 0.02 // m — readouts clamp (you cannot sit exactly ON a charge)

type ChState = 'idle' | 'active' | 'won' | 'lost'

/** Potential along the horizontal axis (V) at position xm, with clamped distances. */
const vAt = (xm: number, q1: number, q2: number) => {
  const r1 = Math.max(Math.abs(xm - X1), RMIN)
  const r2 = Math.max(Math.abs(xm - X2), RMIN)
  return K * 1e-9 * (q1 / r1 + q2 / r2)
}

/** Field along the axis (N/C, +x positive) at xm. */
const eAt = (xm: number, q1: number, q2: number) => {
  const r1 = Math.max(Math.abs(xm - X1), RMIN)
  const r2 = Math.max(Math.abs(xm - X2), RMIN)
  return K * 1e-9 * ((q1 * (xm - X1)) / r1 ** 3 + (q2 * (xm - X2)) / r2 ** 3)
}

const fmtV = (v: number) => {
  const a = Math.abs(v)
  const s = v < 0 ? '−' : ''
  if (a >= 100) return s + Math.round(a).toLocaleString('en-US')
  if (a >= 10) return s + a.toFixed(1)
  return s + a.toFixed(2)
}

export function PotentialMapSim() {
  const [q1, setQ1] = useState(3) // nC
  const [q2, setQ2] = useState(-2) // nC
  const [x, setX] = useState(0.5) // m, test-charge position
  const [qt, setQt] = useState(2) // μC, test charge
  const [markA, setMarkA] = useState<number | null>(null)
  const [markB, setMarkB] = useState<number | null>(null)
  const [challenge, setChallenge] = useState<ChState>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const bands = useRef<{ key: string; cv: HTMLCanvasElement } | null>(null)

  const v = vAt(x, q1, q2)
  const e = eAt(x, q1, q2)
  const work = markA !== null && markB !== null ? qt * (vAt(markB, q1, q2) - vAt(markA, q1, q2)) : null

  const evaluate = (nx: number, nq1: number, nq2: number) => {
    const vv = vAt(nx, nq1, nq2)
    const ok = Math.abs(vv) < 0.5
    if (ok) { beep(660, 120); beep(880, 160) }
    setChallenge(ok ? 'won' : 'lost')
    setResult(ok
      ? `V(x) = kq₁/r₁ + kq₂/r₂ = ${fmtV(vv)} V at x = ${nx.toFixed(2)} m — the +4 nC hill exactly cancels the −1 nC valley! Equipotential zero: the bands swap colour right here.`
      : `V = ${fmtV(vv)} V at x = ${nx.toFixed(2)} m. Keep hunting between the charges — the zero sits closer to the smaller charge.`)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t) => {
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    if (w < 60 || h < 60) return

    // ── equipotential band map (cached offscreen, rebuilt when charges change) ─
    const key = `${q1}|${q2}|${Math.round(w)}x${Math.round(h)}`
    if (!bands.current || bands.current.key !== key) {
      const cv = document.createElement('canvas')
      cv.width = Math.max(1, Math.round(w))
      cv.height = Math.max(1, Math.round(h))
      const c2 = cv.getContext('2d')
      if (c2) {
        const ppm = w // pixels per metre (1 m wide scene)
        const ymid = h / 2
        for (let gy = 0; gy < cv.height; gy += 3) {
          for (let gx = 0; gx < cv.width; gx += 3) {
            const xm = gx / ppm
            const ym = (gy - ymid) / ppm
            const r1 = Math.max(Math.hypot(xm - X1, ym), 0.015)
            const r2 = Math.max(Math.hypot(xm - X2, ym), 0.015)
            const vv = K * 1e-9 * (q1 / r1 + q2 / r2)
            const a = Math.abs(vv)
            const alpha = a >= 150 ? 0.5 : a >= 50 ? 0.38 : a >= 15 ? 0.26 : a >= 5 ? 0.16 : a >= 1.5 ? 0.09 : 0
            if (alpha === 0) continue
            c2.fillStyle = vv > 0 ? `rgba(245,158,11,${alpha})` : `rgba(139,92,246,${alpha})`
            c2.fillRect(gx, gy, 3, 3)
          }
        }
      }
      bands.current = { key, cv }
    }
    ctx.drawImage(bands.current.cv, 0, 0, w, h)

    const ppm = w
    const ymid = h / 2
    const px = (m: number) => m * ppm

    // ── axis ────────────────────────────────────────────────────────────────
    ctx.strokeStyle = CANVAS.muted
    ctx.setLineDash([5, 5])
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(0, ymid); ctx.lineTo(w, ymid); ctx.stroke()
    ctx.setLineDash([])

    // ── the two source charges ──────────────────────────────────────────────
    const drawCharge = (xm: number, qv: number, label: string) => {
      const cxp = px(xm)
      const pos = qv > 0
      ctx.fillStyle = pos ? CANVAS.amber : CANVAS.violet
      ctx.beginPath(); ctx.arc(cxp, ymid, 13, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = CANVAS.fg; ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(cxp, ymid, 13, 0, Math.PI * 2); ctx.stroke()
      ctx.fillStyle = CANVAS.bg
      ctx.font = 'bold 14px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText(qv === 0 ? '0' : pos ? '+' : '−', cxp, ymid + 5)
      ctx.fillStyle = CANVAS.fg
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText(`${qv > 0 ? '+' : ''}${qv.toFixed(1)} nC`, cxp, ymid - 22)
      ctx.fillStyle = CANVAS.muted
      ctx.font = '10px ui-monospace, monospace'
      ctx.fillText(label, cxp, ymid + 32)
    }
    drawCharge(X1, q1, 'q₁')
    drawCharge(X2, q2, 'q₂')

    // ── A/B marks ───────────────────────────────────────────────────────────
    const drawMark = (xm: number | null, tag: string) => {
      if (xm === null) return
      const mxp = px(xm)
      ctx.strokeStyle = CANVAS.yellow
      ctx.setLineDash([3, 3])
      ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(mxp, ymid - 46); ctx.lineTo(mxp, ymid + 46); ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = CANVAS.yellow
      ctx.font = 'bold 12px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText(tag, mxp, ymid + 62)
    }
    drawMark(markA, 'A')
    drawMark(markB, 'B')

    // ── test charge + E arrow ───────────────────────────────────────────────
    const txp = px(x)
    if (Math.abs(e) > 0.5) {
      const dir = Math.sign(e)
      const len = Math.max(10, Math.min(64, Math.abs(e) / 25))
      ctx.strokeStyle = CANVAS.emerald
      ctx.fillStyle = CANVAS.emerald
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(txp, ymid); ctx.lineTo(txp + dir * len, ymid); ctx.stroke()
      const tip = txp + dir * (len + 8)
      ctx.beginPath()
      ctx.moveTo(tip, ymid)
      ctx.lineTo(tip - dir * 9, ymid - 5)
      ctx.lineTo(tip - dir * 9, ymid + 5)
      ctx.closePath(); ctx.fill()
      ctx.font = 'bold 12px ui-monospace, monospace'
      ctx.fillText('E', txp + dir * (len + 18), ymid + 4)
    }
    // pulsing halo (static ring under reduced motion)
    const pr = reducedMotion ? 11 : 11 + 3 * Math.sin(t * 3)
    ctx.strokeStyle = CANVAS.emerald
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(txp, ymid, 9 + pr * 0.4, 0, Math.PI * 2); ctx.stroke()
    ctx.fillStyle = CANVAS.emerald
    ctx.beginPath(); ctx.arc(txp, ymid, 7, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.fg; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(txp, ymid, 7, 0, Math.PI * 2); ctx.stroke()
    ctx.fillStyle = CANVAS.bg
    ctx.font = 'bold 9px ui-monospace, monospace'
    ctx.fillText('qₜ', txp, ymid + 3)

    // ── challenge banner ────────────────────────────────────────────────────
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('Challenge: with q₁ = +4 nC, q₂ = −1 nC — slide the test charge until V = 0 (|V| < 0.5 V)!', w / 2, 18)
    } else if (challenge === 'won' || challenge === 'lost') {
      ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(challenge === 'won' ? '★ Challenge complete!' : 'Not zero yet — watch the bands swap colour!', w / 2, 18)
    }
  }, 400)

  return (
    <SimFrame
      title="Potential Map"
      brief="Two charges paint an energy landscape: amber bands are positive potential, violet bands negative. Slide the test charge and add V = kq₁/r₁ + kq₂/r₂ as plain numbers."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Equipotential map of two charges with amber bands for positive and violet bands for negative potential, a movable test charge on the axis, and an arrow showing the electric field direction"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <Legend color={CANVAS.amber} label="V > 0 (near + charges)" />
        <Legend color={CANVAS.violet} label="V < 0 (near − charges)" />
        <Legend color={CANVAS.emerald} label="test charge qₜ · E arrow" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Charge q₁" value={q1} min={-5} max={5} step={0.5} unit="nC"
          onChange={setQ1}
          format={(v) => (v > 0 ? '+' : '') + v.toFixed(1)}
          disabled={challenge === 'active'}
        />
        <SimSlider
          label="Charge q₂" value={q2} min={-5} max={5} step={0.5} unit="nC"
          onChange={setQ2}
          format={(v) => (v > 0 ? '+' : '') + v.toFixed(1)}
          disabled={challenge === 'active'}
        />
        <SimSlider
          label="Test charge at x" value={x} min={0.05} max={0.95} step={0.005} unit="m"
          onChange={(v) => { setX(v); if (challenge === 'active' || challenge === 'lost') evaluate(v, q1, q2) }}
          format={(v) => v.toFixed(2)}
        />
        <SimSlider
          label="Test charge qₜ" value={qt} min={1} max={5} step={0.5} unit="μC"
          onChange={setQt}
          format={(v) => v.toFixed(1)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <SimButton variant="secondary" onClick={() => setMarkA(x)}>Mark A</SimButton>
        <SimButton variant="secondary" onClick={() => setMarkB(x)}>Mark B</SimButton>
        <SimButton
          variant={challenge === 'active' ? 'destructive' : 'outline'}
          onClick={() => { setQ1(4); setQ2(-1); setChallenge('active'); setResult('') }}
          disabled={challenge === 'active'}
        >
          <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: find V = 0
        </SimButton>
        <SimButton variant="ghost" onClick={() => { setQ1(3); setQ2(-2); setX(0.5); setMarkA(null); setMarkB(null); setChallenge('idle'); setResult('') }}>
          <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
        </SimButton>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Position x" value={x.toFixed(2)} unit="m" />
        <Readout label="V at x" value={fmtV(v)} unit="V" tone="text-amber-500" />
        <Readout label="E at x" value={`${e >= 0 ? '→' : '←'} ${fmtV(Math.abs(e))}`} unit="N/C" tone="text-emerald-500" />
        <Readout label="Work A→B" value={work === null ? '—' : fmtV(work)} unit="μJ" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
