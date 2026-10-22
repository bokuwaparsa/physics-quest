// ─── Sim: Newton's Cart · F = ma time trials over a 20 m track ───────────────
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas,
  useSimBeep, useReducedMotion, drawGrid,
} from '@/components/sims/sim-kit'
import { Play, Pause, RotateCcw, Flag } from 'lucide-react'

const TRACK_LEN = 20 // m
const GOAL_T = 4 // s
const TOL = 0.15 // s

export function NewtonCartSim() {
  const [running, setRunning] = useState(false)
  const [mass, setMass] = useState(5)
  const [force, setForce] = useState(10)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [vel, setVel] = useState(0)
  const [finishT, setFinishT] = useState<number | null>(null)

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const readoutSkip = useRef(0)

  const st = useRef({
    t: 0, x: 0, v: 0, running: false, finished: false,
    challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost',
  })
  useEffect(() => {
    st.current.running = running
    st.current.challenge = challenge
  })

  const reset = (toChallenge = false) => {
    const s = st.current
    s.t = 0
    s.x = 0
    s.v = 0
    s.finished = false
    setResult('')
    setElapsed(0)
    setVel(0)
    setFinishT(null)
    if (toChallenge) {
      setChallenge('active')
      s.challenge = 'active'
    }
  }

  const a = force / mass
  const predicted = a > 0 ? Math.sqrt((2 * TRACK_LEN) / a) : Infinity

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current

    // ── physics ────────────────────────────────────────────────────────────
    if (s.running && !s.finished) {
      const step = reducedMotion ? dt : dt // user-triggered motion; still smooth
      s.t += step
      s.v += (force / mass) * step
      s.x += s.v * step

      if (s.x >= TRACK_LEN) {
        s.x = TRACK_LEN
        s.finished = true
        s.running = false
        setRunning(false)
        setFinishT(s.t)
        if (s.challenge === 'active') {
          const ok = Math.abs(s.t - GOAL_T) <= TOL
          s.challenge = ok ? 'won' : 'lost'
          setChallenge(ok ? 'won' : 'lost')
          setResult(ok
            ? `Spot on! The cart crossed 20 m in ${s.t.toFixed(2)} s. That needed a = 2d/t² = 2.5 m/s² — force over mass, exactly as you set it.`
            : `The cart crossed in ${s.t.toFixed(2)} s — you need 4.00 s. Target acceleration: a = 2d/t² = 2×20/16 = 2.5 m/s². Try e.g. 25 N on 10 kg!`)
          if (ok) { beep(660, 140); beep(880, 180) }
        }
      }
      if (s.challenge === 'active' && s.t > 12) {
        s.challenge = 'lost'
        setChallenge('lost')
        setRunning(false)
        s.running = false
        setResult(`Too slow — after 12 s the cart had only covered ${s.x.toFixed(1)} m. A bigger a = F/m gets you to the line in 4 s.`)
      }
    }

    // publish readouts ~10×/s
    readoutSkip.current += 1
    if (readoutSkip.current >= 6) {
      readoutSkip.current = 0
      setElapsed(s.t)
      setVel(s.v)
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    drawGrid(ctx, w, h, 40)

    // stopwatch
    ctx.fillStyle = CANVAS.fg
    ctx.font = 'bold 22px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText(`${s.t.toFixed(2)} s`, 20, 34)
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-sans-serif, system-ui'
    ctx.fillText('stopwatch', 20, 48)

    // track
    const trackY = Math.round(h * 0.66)
    const pad = 60
    const toX = (m: number) => pad + (m / TRACK_LEN) * (w - 2 * pad)
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(pad - 14, trackY, w - 2 * pad + 28, 8)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let m = 0; m <= TRACK_LEN; m += 2) { ctx.moveTo(toX(m), trackY + 8); ctx.lineTo(toX(m), trackY + 13) }
    ctx.stroke()
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    for (let m = 0; m <= TRACK_LEN; m += 5) ctx.fillText(`${m}`, toX(m), trackY + 25)

    // start + finish lines (checker)
    const checker = (x: number) => {
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = i % 2 === 0 ? CANVAS.white : CANVAS.panelLight
        ctx.fillRect(x - 3, trackY - 34 + i * 9, 6, 9)
      }
    }
    checker(toX(0))
    checker(toX(TRACK_LEN))
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-sans-serif, system-ui'
    ctx.fillText('start', toX(0), trackY - 40)
    ctx.fillText('finish · 20 m', toX(TRACK_LEN), trackY - 40)

    // cart
    const cx = toX(s.x)
    const cartW = 46, cartH = 24
    ctx.fillStyle = CANVAS.teal
    ctx.fillRect(cx - cartW / 2, trackY - cartH, cartW, cartH)
    ctx.fillStyle = CANVAS.bg
    ctx.font = 'bold 11px ui-monospace, monospace'
    ctx.fillText(`${mass} kg`, cx, trackY - 9)
    ctx.fillStyle = CANVAS.panelLight
    ctx.beginPath(); ctx.arc(cx - 13, trackY + 1, 5, 0, Math.PI * 2); ctx.arc(cx + 13, trackY + 1, 5, 0, Math.PI * 2); ctx.fill()

    // push force arrow behind the cart
    if (force > 0 && !s.finished) {
      const len = force * 1.6
      ctx.strokeStyle = CANVAS.orange
      ctx.fillStyle = CANVAS.orange
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(cx - cartW / 2 - len, trackY - cartH / 2); ctx.lineTo(cx - cartW / 2 - 2, trackY - cartH / 2); ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx - cartW / 2 - 2, trackY - cartH / 2)
      ctx.lineTo(cx - cartW / 2 - 10, trackY - cartH / 2 - 5)
      ctx.lineTo(cx - cartW / 2 - 10, trackY - cartH / 2 + 5)
      ctx.fill()
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText(`${force} N`, cx - cartW / 2 - len / 2, trackY - cartH / 2 - 8)
    }

    // acceleration arrow above the cart
    if (a > 0.05 && !s.finished) {
      const len = Math.min(90, a * 8)
      ctx.strokeStyle = CANVAS.violet
      ctx.fillStyle = CANVAS.violet
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(cx, trackY - cartH - 14); ctx.lineTo(cx + len, trackY - cartH - 14); ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx + len, trackY - cartH - 14)
      ctx.lineTo(cx + len - 8, trackY - cartH - 19)
      ctx.lineTo(cx + len - 8, trackY - cartH - 9)
      ctx.fill()
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText(`a = ${(force / mass).toFixed(1)} m/s²`, cx + len / 2, trackY - cartH - 20)
    }

    // challenge banner
    if (s.challenge === 'won' || s.challenge === 'lost') {
      ctx.fillStyle = s.challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(s.challenge === 'won' ? '★ Challenge complete!' : 'Adjust F and m for a 4.00 s run — then retry!', w / 2, 22)
    }
  })

  return (
    <SimFrame
      title="Newton's Second Law Lab"
      brief="Choose the cart's mass and the pushing force, then time the 20 m run. Watch a = F/m change the trip time."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 380 }}
          aria-label="Newton's second law simulation: a cart pushed along a 20 metre track with a stopwatch, force arrow and acceleration arrow"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Cart mass" value={mass} min={1} max={10} step={1} unit="kg"
          onChange={setMass}
        />
        <SimSlider
          label="Pushing force" value={force} min={0} max={50} step={1} unit="N"
          onChange={setForce}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={() => setRunning((r) => !r)} disabled={finishT !== null}>
            {running ? <Pause className="h-4 w-4 me-1" aria-hidden /> : <Play className="h-4 w-4 me-1" aria-hidden />}
            {running ? 'Pause' : 'Go'}
          </SimButton>
          <SimButton variant="secondary" onClick={() => { reset(false); setRunning(false); setChallenge('idle') }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { reset(true); setRunning(true) }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden />
            Challenge: 20 m in 4.0 s
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Stopwatch" value={elapsed.toFixed(2)} unit="s" />
        <Readout label="a = F/m" value={a.toFixed(2)} unit="m/s²" tone="text-violet-500" />
        <Readout label="Predicted t" value={Number.isFinite(predicted) ? predicted.toFixed(2) : '—'} unit="s" tone="text-amber-500" />
        <Readout label="Velocity" value={vel.toFixed(1)} unit="m/s" />
        <Readout label="Finish time" value={finishT !== null ? finishT.toFixed(2) : '—'} unit="s" tone="text-teal-500" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
