// ─── Sim: Pascal Lift · depth pressure + hydraulic car lift ──────────────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas, canvasPos,
  useSimBeep,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

const G = 9.8
const CAR_MASS = 1200            // kg
const NEED = CAR_MASS * G        // 11,760 N
const A_BIG = 0.5                // m²

const fmt = (n: number) => Math.round(n).toLocaleString('en-US')

export function PascalLiftSim() {
  const [depth, setDepth] = useState(2)
  const [a1, setA1] = useState(0.01)
  const [f1, setF1] = useState(100)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const dragging = useRef(false)
  const rise = useRef(0)
  const wasLifted = useRef(false)

  const pPiston = f1 / a1        // Pa
  const f2 = pPiston * A_BIG     // N
  const lifted = f2 >= NEED

  const startChallenge = () => {
    setF1(200)
    setChallenge('active')
    setResult('')
  }

  const reset = () => {
    setDepth(2); setA1(0.01); setF1(100)
    setChallenge('idle'); setResult('')
    rise.current = 0
    wasLifted.current = false
  }

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { x, y } = canvasPos(e, canvas)
    const sy = 76 + Math.min(depth, 4.86) * 56
    if (Math.abs(x - 114) < 30 && Math.abs(y - sy) < 28) {
      dragging.current = true
      try { canvas.setPointerCapture(e.pointerId) } catch { /* ignore */ }
    }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragging.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const { y } = canvasPos(e, canvas)
    setDepth(Math.min(5, Math.max(0, (y - 76) / 56)))
  }
  const onPointerUp = () => { dragging.current = false }

  const { canvasRef } = useSimCanvas((ctx, w, h, t, dt) => {
    // ── lift dynamics + challenge check ─────────────────────────────────────
    rise.current += ((lifted ? 1 : 0) - rise.current) * Math.min(1, dt * 3)
    if (lifted && !wasLifted.current) {
      wasLifted.current = true
      if (challenge === 'active') {
        beep(660, 120); beep(880, 160)
        setChallenge('won')
        setResult(`F₂ = F₁ × A₂/A₁ = 200 N × ${A_BIG}/${a1} ≈ ${fmt(f2)} N ≥ 11,760 N — the car rises while you lean on the small piston with just 200 N!`)
      }
    } else if (!lifted && wasLifted.current) {
      wasLifted.current = false
      if (challenge === 'active') {
        setChallenge('lost')
        setResult('The car came back down — F₂ fell below 11,760 N. Shrink the small piston for a bigger area ratio and try again!')
      }
    }

    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    // ── left panel: depth tank ──────────────────────────────────────────────
    const tx0 = 24, tx1 = 204
    ctx.fillStyle = CANVAS.teal
    ctx.globalAlpha = 0.25
    ctx.fillRect(tx0, 76, tx1 - tx0, 280)
    ctx.globalAlpha = 1
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.strokeRect(tx0, 76, tx1 - tx0, 280)
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'left'
    for (let d = 0; d <= 5; d++) {
      const y = 76 + d * 56
      ctx.fillRect(tx1 + 2, y - 1, 6, 2)
      ctx.fillText(`${d} m`, tx1 + 12, y + 3)
    }
    ctx.fillText('drag me!', 84, 64)

    // sensor
    const sy = 76 + Math.min(depth, 4.86) * 56
    const sx = 114
    const gaugeP = 9.8 * depth
    const len = 8 + 16 * (gaugeP / 49)
    const arrow = (x0: number, y0: number, x1: number, y1: number, color: string, lw = 3) => {
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
      const ang = Math.atan2(y1 - y0, x1 - x0)
      const ah = 8 + lw
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x1 - ah * Math.cos(ang - 0.42), y1 - ah * Math.sin(ang - 0.42))
      ctx.lineTo(x1 - ah * Math.cos(ang + 0.42), y1 - ah * Math.sin(ang + 0.42))
      ctx.closePath(); ctx.fill()
    }
    // pressure pushes equally from every direction (Pascal!)
    arrow(sx, sy - 10 - len, sx, sy - 10, CANVAS.amber)
    arrow(sx, sy + 10 + len, sx, sy + 10, CANVAS.amber)
    arrow(sx - 10 - len, sy, sx - 10, sy, CANVAS.amber)
    arrow(sx + 10 + len, sy, sx + 10, sy, CANVAS.amber)
    ctx.fillStyle = CANVAS.amber
    ctx.beginPath(); ctx.arc(sx, sy, 8, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = CANVAS.bg
    ctx.beginPath(); ctx.arc(sx, sy, 3.5, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 11px ui-monospace, monospace'; ctx.textAlign = 'left'
    ctx.fillText(`${(101.3 + gaugeP).toFixed(1)} kPa`, sx + 16, sy - 14)
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
    ctx.fillText(`ρgh = ${fmt(gaugeP * 1000)} Pa`, tx0 + 8, 372)

    // ── right panel: hydraulic lift ─────────────────────────────────────────
    const sX0 = 246, sX1 = 306
    const bX1 = w - 26, bX0 = bX1 - 116
    const oil = () => {
      ctx.fillStyle = CANVAS.amber
      ctx.globalAlpha = 0.32
    }
    // small piston
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(sX0, 250); ctx.lineTo(sX0, 356); ctx.lineTo(sX1, 356); ctx.lineTo(sX1, 250)
    ctx.stroke()
    ctx.fillStyle = CANVAS.white
    ctx.fillRect(sX0 + 2, 300, sX1 - sX0 - 4, 10)
    // pipe + big piston walls
    ctx.beginPath()
    ctx.moveTo(bX0, 236); ctx.lineTo(bX0, 356); ctx.lineTo(bX1, 356); ctx.lineTo(bX1, 236)
    ctx.stroke()
    // oil (below pistons + pipe)
    oil()
    ctx.fillRect(sX0 + 2, 310, sX1 - sX0 - 4, 356 - 310)
    ctx.fillRect(sX1, 342, bX0 - sX1, 14)
    const pyB = 300 - rise.current * 52
    ctx.fillRect(bX0 + 2, pyB + 10, bX1 - bX0 - 4, 356 - pyB - 10)
    ctx.globalAlpha = 1
    ctx.fillStyle = CANVAS.white
    ctx.fillRect(bX0 + 2, pyB, bX1 - bX0 - 4, 10)

    // force arrow on the small piston
    const fx = (sX0 + sX1) / 2
    const lenF = 12 + 44 * (f1 / 500)
    arrow(fx, 300 - 24 - lenF, fx, 300 - 26, CANVAS.rose, 5)
    ctx.fillStyle = CANVAS.rose; ctx.font = 'bold 12px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText(`${fmt(f1)} N`, fx, 300 - 34 - lenF)
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
    ctx.fillText('A₁ = ' + a1.toFixed(4) + ' m²', fx, 372)

    // car on the big piston
    const carY = pyB
    ctx.fillStyle = CANVAS.violet
    ctx.fillRect(bX0 + 7, carY - 34, 102, 26)
    ctx.fillRect(bX0 + 32, carY - 50, 48, 18)
    ctx.fillStyle = CANVAS.bg
    ctx.beginPath(); ctx.arc(bX0 + 27, carY - 8, 8, 0, Math.PI * 2); ctx.arc(bX0 + 89, carY - 8, 8, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.white; ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(bX0 + 27, carY - 8, 8, 0, Math.PI * 2); ctx.stroke()
    ctx.beginPath(); ctx.arc(bX0 + 89, carY - 8, 8, 0, Math.PI * 2); ctx.stroke()
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 10px ui-sans-serif, system-ui'
    ctx.fillText('1200 kg', bX0 + 58, carY - 40)

    // pressure label between pistons
    const midX = (sX1 + bX0) / 2
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 11px ui-monospace, monospace'
    ctx.fillText(`P = ${fmt(pPiston)} Pa`, midX, 330)
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
    ctx.fillText('same pressure everywhere', midX, 316)

    // lift status
    if (lifted) {
      ctx.fillStyle = CANVAS.emerald; ctx.font = 'bold 12px ui-monospace, monospace'
      ctx.fillText(`F₂ = ${fmt(f2)} N ≥ 11,760 N — lifting!`, midX, 380)
    } else {
      ctx.fillStyle = CANVAS.rose; ctx.font = 'bold 12px ui-monospace, monospace'
      ctx.fillText(`F₂ = ${fmt(f2)} N < 11,760 N — not enough`, midX, 380)
    }

    // challenge banner
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: lift the 1200 kg car with F₁ ≤ 200 N (needs F₂ ≥ 11,760 N) — shrink A₁!', w / 2, 18)
    } else if (challenge === 'won' || challenge === 'lost') {
      ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText(challenge === 'won' ? '★ Challenge complete!' : 'The car sank back — find a bigger area ratio!', w / 2, 18)
    }
  }, 400)

  return (
    <SimFrame
      title="Pascal’s Principle Lab"
      brief="Left: drag the sensor up and down — pressure grows with depth (P = 101.3 kPa + ρgh). Right: the small piston’s pressure reaches the big piston unchanged, multiplying force by A₂/A₁."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg cursor-grab touch-none"
          style={{ height: 400 }}
          aria-label="Depth tank with a draggable pressure sensor next to a hydraulic lift that raises a 1200 kg car"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Sensor depth" value={depth} min={0} max={5} step={0.1} unit="m"
          onChange={setDepth}
        />
        <SimSlider
          label="Small piston area A₁" value={a1} min={0.001} max={0.01} step={0.0005} unit="m²"
          format={(v) => v.toFixed(4)}
          onChange={(v) => {
            setA1(v)
            if (challenge === 'active' && (200 * A_BIG) / v < NEED) {
              setResult(`F₂ = 200 × 0.5/${v.toFixed(4)} ≈ ${fmt((200 * A_BIG) / v)} N — still under 11,760 N. You need a bigger area ratio!`)
            }
          }}
        />
        <SimSlider
          label="Force on small piston F₁" value={f1} min={50} max={500} step={5} unit="N"
          onChange={setF1} disabled={challenge === 'active'}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: lift the car with 200 N
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Depth pressure" value={(101.3 + 9.8 * depth).toFixed(1)} unit="kPa" tone="text-amber-500" />
        <Readout label="Piston pressure" value={fmt(pPiston / 1000)} unit="kPa" />
        <Readout label="Force F₂" value={fmt(f2)} unit="N" tone={lifted ? 'text-emerald-500' : 'text-rose-500'} />
        <Readout label="Area ratio A₂/A₁" value={(A_BIG / a1).toFixed(0)} unit="×" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
