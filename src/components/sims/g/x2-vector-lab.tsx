// ─── Sim: Vector Lab · build A and B, see components and the resultant R ──────
'use client'

import { useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas, useSimBeep, drawGrid,
} from '@/components/sims/sim-kit'
import { useI18n } from '@/lib/game/i18n'
import { Flag, RotateCcw, CheckCircle2 } from 'lucide-react'

const d2r = (d: number) => (d * Math.PI) / 180

function parts(mag: number, ang: number) {
  return { x: mag * Math.cos(d2r(ang)), y: mag * Math.sin(d2r(ang)) }
}

/** Angular distance of `deg` from 0° (wraps through 360). */
const diffFromZero = (deg: number) => Math.min(deg, 360 - deg)

interface Res { x: number; y: number; r: number; dir: number }
function resultant(aMag: number, aAng: number, bMag: number, bAng: number): Res {
  const A = parts(aMag, aAng)
  const B = parts(bMag, bAng)
  const x = A.x + B.x
  const y = A.y + B.y
  return { x, y, r: Math.hypot(x, y), dir: ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360 }
}

const WIN = { mag: 10, tol: 0.3, angTol: 3 }
const isWin = (res: Res) => Math.abs(res.r - WIN.mag) <= WIN.tol && diffFromZero(res.dir) <= WIN.angTol

export function VectorLabSim() {
  const [aMag, setAMag] = useState(5)
  const [aAng, setAAng] = useState(0)
  const [bMag, setBMag] = useState(5)
  const [bAng, setBAng] = useState(90)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const { simT } = useI18n()

  const A = parts(aMag, aAng)
  const B = parts(bMag, bAng)
  const R = resultant(aMag, aAng, bMag, bAng)

  const fill = (s: string, vars: Record<string, string | number>) => {
    let out = s
    for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(String(v))
    return out
  }

  const winMsg = (res: Res) =>
    fill(simT('Challenge solved! |R| = {r} at {dir}° — a 10-unit arrow pointing right.'),
      { r: res.r.toFixed(2), dir: res.dir.toFixed(1) })
  const loseMsg = (res: Res) =>
    fill(simT('Not yet: |R| = {r} at {dir}°. You need |R| = 10 pointing right (0°).'),
      { r: res.r.toFixed(2), dir: res.dir.toFixed(1) })

  const winNow = (res: Res) => {
    setChallenge('won')
    setResult(winMsg(res))
    beep(660, 120); beep(880, 160)
  }

  // auto-win the moment the sliders satisfy the goal
  const autoCheck = (am: number, aa: number, bm: number, ba: number) => {
    if (challenge !== 'active') return
    const res = resultant(am, aa, bm, ba)
    if (isWin(res)) winNow(res)
  }
  const onAMag = (v: number) => { setAMag(v); autoCheck(v, aAng, bMag, bAng) }
  const onAAng = (v: number) => { setAAng(v); autoCheck(aMag, v, bMag, bAng) }
  const onBMag = (v: number) => { setBMag(v); autoCheck(aMag, aAng, v, bAng) }
  const onBAng = (v: number) => { setBAng(v); autoCheck(aMag, aAng, bMag, v) }

  const checkAnswer = () => {
    if (challenge !== 'active') return
    if (isWin(R)) winNow(R)
    else { setChallenge('lost'); setResult(loseMsg(R)) }
  }

  const startChallenge = () => { setChallenge('active'); setResult('') }
  const stopChallenge = () => { setChallenge('idle'); setResult('') }

  const reset = () => {
    setAMag(5); setAAng(0); setBMag(5); setBAng(90)
    setChallenge('idle'); setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h) => {
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    drawGrid(ctx, w, h, 40)

    const ox = w / 2
    const oy = h / 2 + 8
    const extentX = Math.max(Math.abs(A.x), Math.abs(B.x), Math.abs(R.x), 2) + 1
    const extentY = Math.max(Math.abs(A.y), Math.abs(B.y), Math.abs(R.y), 2) + 1
    const ppu = Math.min(18, (w / 2 - 55) / extentX, (h / 2 - 48) / extentY)
    const px = (x: number) => ox + x * ppu
    const py = (y: number) => oy - y * ppu

    // ── axes ────────────────────────────────────────────────────────────────
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(16, oy); ctx.lineTo(w - 16, oy); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(ox, 24); ctx.lineTo(ox, h - 24); ctx.stroke()
    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText('x', w - 26, oy - 8)
    ctx.fillText('y', ox + 8, 34)

    const arrow = (x1: number, y1: number, x2: number, y2: number, color: string, width: number) => {
      const a = Math.atan2(y2 - y1, x2 - x1)
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.lineWidth = width
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
      const hs = 7 + width * 1.6
      ctx.beginPath()
      ctx.moveTo(x2, y2)
      ctx.lineTo(x2 - hs * Math.cos(a - 0.42), y2 - hs * Math.sin(a - 0.42))
      ctx.lineTo(x2 - hs * Math.cos(a + 0.42), y2 - hs * Math.sin(a + 0.42))
      ctx.closePath(); ctx.fill()
      ctx.lineWidth = 1
    }

    // ── resultant components (dashed) ───────────────────────────────────────
    ctx.strokeStyle = CANVAS.emerald
    ctx.setLineDash([5, 5])
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(px(0), py(0)); ctx.lineTo(px(R.x), py(0)); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(px(R.x), py(0)); ctx.lineTo(px(R.x), py(R.y)); ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.emerald
    ctx.font = '11px ui-monospace, monospace'
    ctx.textAlign = 'center'
    if (Math.abs(R.x) > 1.2) ctx.fillText(`Rx = ${R.x.toFixed(1)}`, px(R.x / 2), py(0) + (R.y >= 0 ? 16 : -10))
    if (Math.abs(R.y) > 1.2) ctx.fillText(`Ry = ${R.y.toFixed(1)}`, px(R.x) + (R.x >= 0 ? 40 : -40), py(R.y / 2) + 4)

    // ── angle arcs (interior angle against the +x direction) ────────────────
    if (aMag > 0.4) {
      ctx.strokeStyle = CANVAS.orange
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(px(0), py(0), 26, -d2r(aAng), 0, aAng % 360 > 180)
      ctx.stroke()
    }
    if (bMag > 0.4) {
      // dashed horizontal reference at A's tip + arc for B's angle
      ctx.strokeStyle = CANVAS.muted
      ctx.setLineDash([3, 4])
      ctx.beginPath(); ctx.moveTo(px(A.x) - 30, py(A.y)); ctx.lineTo(px(A.x) + 34, py(A.y)); ctx.stroke()
      ctx.setLineDash([])
      ctx.strokeStyle = CANVAS.violet
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(px(A.x), py(A.y), 22, -d2r(bAng), 0, bAng % 360 > 180)
      ctx.stroke()
    }

    // ── vectors: A from origin, B head-to-tail, R = A + B ───────────────────
    if (aMag > 0.05) arrow(px(0), py(0), px(A.x), py(A.y), CANVAS.orange, 3.5)
    if (bMag > 0.05) arrow(px(A.x), py(A.y), px(R.x), py(R.y), CANVAS.violet, 3.5)
    if (R.r > 0.05) arrow(px(0), py(0), px(R.x), py(R.y), CANVAS.emerald, 4.5)

    ctx.font = 'bold 13px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillStyle = CANVAS.orange
    ctx.fillText('A', px(A.x / 2) - 14, py(A.y / 2) + (A.x >= 0 ? -8 : 16))
    ctx.fillStyle = CANVAS.violet
    ctx.fillText('B', px(A.x + B.x / 2) + 14, py(A.y + B.y / 2) + (B.x >= 0 ? -8 : 16))
    ctx.fillStyle = CANVAS.emerald
    ctx.fillText('R', px(R.x / 2) + (R.y >= 0 ? 16 : -16), py(R.y / 2) + (R.y >= 0 ? -8 : 16))

    // ── challenge banner ────────────────────────────────────────────────────
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: make |R| = 10 pointing right (0°)!', w / 2, 18)
    } else if (challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Challenge complete!', w / 2, 18)
    } else if (challenge === 'lost') {
      ctx.fillStyle = CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('Not the right resultant — tweak the sliders and check again!', w / 2, 18)
    }
  }, 400)

  return (
    <SimFrame
      title="Vector Lab"
      brief="Build vectors A and B with the sliders and watch their components and the head-to-tail sum R."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Two vectors A and B drawn head-to-tail on x-y axes with their emerald resultant R and dashed components"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Magnitude A" value={aMag} min={0} max={10} step={0.5} onChange={onAMag} />
        <SimSlider label="Angle A" value={aAng} min={0} max={360} step={5} unit="°" onChange={onAAng} />
        <SimSlider label="Magnitude B" value={bMag} min={0} max={10} step={0.5} onChange={onBMag} />
        <SimSlider label="Angle B" value={bAng} min={0} max={360} step={5} unit="°" onChange={onBAng} />
      </div>

      <div className="flex flex-wrap gap-2">
        <SimButton variant="secondary" onClick={reset}>
          <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
        </SimButton>
        {challenge === 'active' && (
          <SimButton variant="secondary" onClick={checkAnswer}>
            <CheckCircle2 className="h-4 w-4 me-1" aria-hidden /> Check
          </SimButton>
        )}
        <SimButton
          variant={challenge === 'active' ? 'destructive' : 'outline'}
          onClick={challenge === 'active' ? stopChallenge : startChallenge}
        >
          <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: make |R| = 10
        </SimButton>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Ax" value={A.x.toFixed(1)} tone="text-orange-500" />
        <Readout label="Ay" value={A.y.toFixed(1)} tone="text-orange-500" />
        <Readout label="Bx" value={B.x.toFixed(1)} tone="text-violet-500" />
        <Readout label="By" value={B.y.toFixed(1)} tone="text-violet-500" />
        <Readout label="Rx" value={R.x.toFixed(1)} tone="text-emerald-500" />
        <Readout label="Ry" value={R.y.toFixed(1)} tone="text-emerald-500" />
        <Readout label="|R|" value={R.r.toFixed(2)} tone="text-emerald-500" />
        <Readout label="Direction of R" value={R.r > 0.05 ? R.dir.toFixed(1) : '—'} unit="°" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
