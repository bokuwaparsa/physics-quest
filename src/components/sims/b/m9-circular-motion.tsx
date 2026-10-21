// ─── Sim: Circular Motion · ball on a string, tangent v, centripetal a ────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, Legend,
  useSimCanvas, useSimBeep,
} from '@/components/sims/sim-kit'
import { Play, Pause, RotateCcw, Flag } from 'lucide-react'

const MASS = 0.5 // kg
const LIMIT = 60 // N — string tension limit

export function CircularMotionSim() {
  const [r, setR] = useState(1)
  const [v, setV] = useState(4)
  const [running, setRunning] = useState(false)
  const [snapped, setSnapped] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [ro, setRo] = useState({ T: 0, a: 0, F: 0 })

  const beep = useSimBeep()
  const skip = useRef(0)

  const st = useRef({
    running: false, snapped: false, theta: 0,
    sx: 0, sy: 0, svx: 0, svy: 0, // snap flight
    r: 1, v: 4,
    challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost',
  })

  const reset = () => {
    const s = st.current
    s.snapped = false
    s.theta = 0
    s.running = false
    s.challenge = 'idle'
    setRunning(false)
    setSnapped(false)
    setChallenge('idle')
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    // sync slider values into the sim loop (effect scope — not render)
    s.running = running
    s.r = r
    s.v = v
    const a = (s.v * s.v) / s.r
    const F = MASS * a
    const T = (2 * Math.PI * s.r) / s.v

    // challenge: keep a = 24 m/s² at radius 1.5 m (→ v = 6 m/s)
    if (s.challenge === 'active' && !s.snapped) {
      if (Math.abs(s.r - 1.5) <= 0.051 && Math.abs(s.v - 6) <= 0.101) {
        s.challenge = 'won'
        setChallenge('won')
        beep(660, 140); beep(880, 180)
        setResult('Nailed it! a = v²/r = 6²/1.5 = 24 m/s², and the string only needs F = 0.5 × 24 = 12 N — comfortably under 60 N.')
      }
    }

    // physics: spin, or fly off tangentially after a snap
    if (s.snapped) {
      s.sx += s.svx * dt
      s.sy += s.svy * dt
    } else {
      if (s.running) s.theta += (s.v / s.r) * dt
      if (s.running && F > LIMIT) {
        // SNAP! the string cannot supply the needed centripetal force
        s.snapped = true
        setSnapped(true)
        s.running = false
        setRunning(false)
        const px = Math.cos(s.theta)
        const py = Math.sin(s.theta)
        s.sx = s.r * px
        s.sy = s.r * py
        s.svx = -s.v * py // tangent direction (θ increasing)
        s.svy = s.v * px
        beep(90, 280, 'sawtooth', 0.06)
        setResult(`SNAP! The string needed F = mv²/r = ${F.toFixed(0)} N but breaks at ${LIMIT} N. With no inward force the ball flies off along the tangent — Newton's first law in action!`)
      }
    }

    skip.current += 1
    if (skip.current >= 6) {
      skip.current = 0
      setRo({ T, a, F })
    }

    // ── drawing (top view) ─────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    const cx = w / 2
    const cy = h / 2 + 4
    const k = Math.min(w, h) / 7.4 // px per metre

    // path circle
    ctx.strokeStyle = CANVAS.muted
    ctx.setLineDash([5, 6])
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(cx, cy, s.r * k, 0, Math.PI * 2); ctx.stroke()
    ctx.setLineDash([])

    // centre pin
    ctx.fillStyle = CANVAS.panelLight
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText('centre pin', cx, cy + 22)
    ctx.fillText(`${s.r.toFixed(2)} m`, cx + (s.r * k) / 2, cy - 8)

    const arrow = (x0: number, y0: number, dx: number, dy: number, color: string, label: string) => {
      const L = Math.hypot(dx, dy)
      if (L < 4) return
      const x1 = x0 + dx, y1 = y0 + dy
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
      const ux = dx / L, uy = dy / L
      ctx.beginPath()
      ctx.moveTo(x1 + ux * 8, y1 + uy * 8)
      ctx.lineTo(x1 - uy * 4, y1 + ux * 4)
      ctx.lineTo(x1 + uy * 4, y1 - ux * 4)
      ctx.closePath(); ctx.fill()
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText(label, x1 + ux * 16, y1 + uy * 16 + 4)
    }

    if (s.snapped) {
      // ball flies off along the tangent
      const bx = cx + s.sx * k
      const by = cy + s.sy * k
      ctx.fillStyle = CANVAS.violet
      ctx.strokeStyle = CANVAS.bg
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(bx, by, Math.max(7, 0.13 * k), 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.font = 'bold 14px ui-sans-serif, system-ui'
      ctx.fillStyle = CANVAS.rose
      ctx.fillText('STRING SNAPPED — straight line, forever', w / 2, 26)
      ctx.font = '11px ui-monospace, monospace'
      ctx.fillStyle = CANVAS.muted
      ctx.fillText('the ball keeps its velocity: no force, no curve', w / 2, 44)
    } else {
      const bx = cx + s.r * k * Math.cos(s.theta)
      const by = cy + s.r * k * Math.sin(s.theta)
      // string
      ctx.strokeStyle = CANVAS.violet
      ctx.lineWidth = 2.5
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke()
      // centripetal acceleration arrow (toward centre)
      const aLen = Math.min(0.55 * s.r * k, a * 3.4)
      arrow(bx, by, -Math.cos(s.theta) * aLen, -Math.sin(s.theta) * aLen, CANVAS.amber, 'a')
      // velocity arrow (tangent)
      const vLen = Math.min(0.5 * s.r * k + 30, v * 11)
      arrow(bx, by, -Math.sin(s.theta) * vLen, Math.cos(s.theta) * vLen, CANVAS.teal, 'v')
      // ball
      ctx.fillStyle = CANVAS.violet
      ctx.strokeStyle = CANVAS.bg
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(bx, by, Math.max(7, 0.13 * k), 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    }

    // banner
    if (s.challenge === 'active') {
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillStyle = CANVAS.amber
      ctx.textAlign = 'center'
      ctx.fillText('Challenge — get a = 24 m/s² at radius 1.5 m (hint: v² = a·r)', w / 2, 66)
    }
  }, 400)

  return (
    <SimFrame
      title="Ball on a String (top view)"
      brief="Spin the ball and watch the arrows: teal v points along the tangent, amber a points at the centre. Push too hard (F = mv²/r > 60 N) and the string snaps."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Top view of a ball spinning on a string with tangent velocity arrow and centripetal acceleration arrow"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Radius" value={r} min={0.5} max={2} step={0.05} unit="m" onChange={setR} />
        <SimSlider label="Speed" value={v} min={1} max={10} step={0.1} unit="m/s" onChange={setV} />
        <div className="flex flex-wrap gap-2">
          <SimButton
            onClick={() => { if (!snapped) { setRunning(!running); st.current.running = !running } }}
            disabled={snapped}
          >
            {running ? <Pause className="h-4 w-4 me-1" aria-hidden /> : <Play className="h-4 w-4 me-1" aria-hidden />}
            {running ? 'Pause' : 'Spin'}
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> {snapped ? 'Reattach' : 'Reset'}
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { setChallenge('active'); st.current.challenge = 'active'; setResult('') }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: a = 24 m/s²
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Period T" value={ro.T.toFixed(2)} unit="s" />
        <Readout label="a = v²/r" value={ro.a.toFixed(1)} unit="m/s²" tone="text-amber-500" />
        <Readout label="Tension F" value={ro.F.toFixed(1)} unit="N" tone={ro.F > 45 ? 'text-rose-500' : 'text-emerald-500'} />
        <Readout label="String limit" value="60" unit="N" />
      </div>
      <div className="flex flex-wrap gap-4">
        <Legend color={CANVAS.violet} label="ball & string" />
        <Legend color={CANVAS.teal} label="velocity v (tangent)" />
        <Legend color={CANVAS.amber} label="acceleration a (toward centre)" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${snapped ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
