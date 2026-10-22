// ─── Sim: Acceleration Lab · dragster on a 100 m strip with live v–t graph ───
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas,
  useSimBeep, useReducedMotion, drawGrid,
} from '@/components/sims/sim-kit'
import { Play, Pause, RotateCcw, Flag } from 'lucide-react'

const TRACK_LEN = 100 // m
const TARGET_V = 20 // m/s
const TARGET_T = 4 // s

export function AccelerationLabSim() {
  const [running, setRunning] = useState(false)
  const [acc, setAcc] = useState(5)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [vel, setVel] = useState(0)
  const [dist, setDist] = useState(0)

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const readoutSkip = useRef(0)

  // mutable sim state (refs so the RAF loop reads fresh values without restarts)
  const st = useRef({
    t: 0, v: 0, d: 0, a: 5, running: false,
    challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost',
    hist: [] as { t: number; v: number }[],
  })
  useEffect(() => {
    st.current.a = acc
    st.current.running = running
    st.current.challenge = challenge
  })

  const reset = (toChallenge = false) => {
    const s = st.current
    s.t = 0
    s.v = 0
    s.d = 0
    s.hist = []
    setResult('')
    setElapsed(0)
    setVel(0)
    setDist(0)
    if (toChallenge) {
      setChallenge('active')
      s.challenge = 'active'
    }
  }

  const finishChallenge = (ok: boolean, measA: number) => {
    st.current.challenge = ok ? 'won' : 'lost'
    setChallenge(ok ? 'won' : 'lost')
    setRunning(false)
    st.current.running = false
    setResult(ok
      ? `Brilliant! You crossed ${TARGET_V} m/s at t = ${st.current.t.toFixed(1)} s — an average a of Δv/Δt ≈ ${measA.toFixed(2)} m/s², right on the 5 m/s² target.`
      : `You hit ${TARGET_V} m/s at t = ${st.current.t.toFixed(1)} s — that is an average a ≈ ${measA.toFixed(2)} m/s². You need a = 5 m/s² (20 m/s in 4 s). Tweak the throttle and retry!`)
    if (ok) { beep(660, 140); beep(880, 180) }
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current

    // ── physics ────────────────────────────────────────────────────────────
    if (s.running) {
      const step = reducedMotion ? dt : dt // user-triggered motion; still smooth
      s.t += step
      s.v += s.a * step
      s.d += s.v * step
      const last = s.hist[s.hist.length - 1]
      if (!last || s.t - last.t >= 0.05) s.hist.push({ t: s.t, v: s.v })
      if (s.hist.length > 2400) s.hist.shift()

      if (s.challenge === 'active') {
        if (s.v >= TARGET_V) {
          s.v = TARGET_V
          const measA = TARGET_V / s.t
          finishChallenge(Math.abs(measA - 5) <= 0.25, measA)
        } else if (s.t > 12) {
          finishChallenge(false, TARGET_V / s.t)
        }
      }

      if (s.d >= TRACK_LEN) {
        s.d = TRACK_LEN
        s.running = false
        setRunning(false)
      }
    }

    // publish readouts ~10×/s
    readoutSkip.current += 1
    if (readoutSkip.current >= 6) {
      readoutSkip.current = 0
      setElapsed(s.t)
      setVel(s.v)
      setDist(s.d)
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    // top strip: the drag strip
    const trackY = 58
    const mLeft = 26
    const mRight = w - 26
    const toX = (m: number) => mLeft + (mRight - mLeft) * (m / TRACK_LEN)

    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(mLeft - 12, trackY - 12, mRight - mLeft + 24, 36)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(mLeft - 12, trackY + 16)
    ctx.lineTo(mRight + 12, trackY + 16)
    ctx.stroke()
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    for (let m = 0; m <= TRACK_LEN; m += 10) {
      ctx.fillRect(toX(m) - 1, trackY + 12, 2, 5)
      ctx.fillText(`${m}`, toX(m), trackY + 29)
    }
    // finish flag
    const fx = toX(TRACK_LEN)
    ctx.strokeStyle = CANVAS.amber
    ctx.beginPath(); ctx.moveTo(fx, trackY - 12); ctx.lineTo(fx, trackY + 12); ctx.stroke()

    // dragster
    const cx = toX(s.d)
    ctx.fillStyle = CANVAS.rose
    ctx.fillRect(cx - 17, trackY - 6, 30, 9) // body
    ctx.fillRect(cx + 5, trackY - 11, 9, 6) // spoiler
    ctx.fillStyle = CANVAS.bg
    ctx.beginPath(); ctx.arc(cx - 10, trackY + 5, 4, 0, Math.PI * 2); ctx.arc(cx + 9, trackY + 5, 4, 0, Math.PI * 2); ctx.fill()
    if (s.running && s.a > 0.2) {
      // exhaust flame
      ctx.fillStyle = CANVAS.amber
      ctx.beginPath()
      ctx.moveTo(cx - 17, trackY - 3)
      ctx.lineTo(cx - 17 - 8 - Math.min(8, s.a), trackY - 1)
      ctx.lineTo(cx - 17, trackY + 1)
      ctx.fill()
    }

    // bottom: velocity–time graph
    const gx0 = 48, gy0 = h - 36, gw = w - 72, gh = h - 142
    const gTop = gy0 - gh
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(gx0, gTop, gw, gh)
    ctx.save()
    ctx.beginPath(); ctx.rect(gx0, gTop, gw, gh); ctx.clip()

    const tMax = s.challenge === 'idle' ? 12 : 8
    const vMax = 30
    const toGX = (t: number) => gx0 + (t / tMax) * gw
    const toGY = (v: number) => gy0 - (v / vMax) * gh

    drawGrid(ctx, gx0 + gw, gy0, 30)

    // challenge target point (4 s, 20 m/s)
    if (s.challenge !== 'idle') {
      ctx.strokeStyle = CANVAS.amber
      ctx.setLineDash([6, 5])
      ctx.beginPath(); ctx.moveTo(toGX(TARGET_T), gTop); ctx.lineTo(toGX(TARGET_T), gy0); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(gx0, toGY(TARGET_V)); ctx.lineTo(gx0 + gw, toGY(TARGET_V)); ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = CANVAS.amber
      ctx.beginPath(); ctx.arc(toGX(TARGET_T), toGY(TARGET_V), 5, 0, Math.PI * 2); ctx.fill()
    }

    // live v–t line
    ctx.strokeStyle = CANVAS.orange
    ctx.lineWidth = 2.5
    ctx.beginPath()
    s.hist.forEach((p, i) => {
      const x = toGX(p.t), y = toGY(p.v)
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    })
    ctx.stroke()
    ctx.restore()

    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText('time (s)', gx0 + gw / 2, gy0 + 18)
    for (let t = 0; t <= tMax; t += 2) ctx.fillText(`${t}`, toGX(t), gy0 + 8)
    ctx.save()
    ctx.translate(16, gTop + gh / 2); ctx.rotate(-Math.PI / 2)
    ctx.fillText('velocity (m/s)', 0, 0)
    ctx.restore()
    for (let v = 0; v <= vMax; v += 10) ctx.fillText(`${v}`, gx0 - 8, toGY(v) + 3)

    // challenge banner
    if (s.challenge === 'won' || s.challenge === 'lost') {
      ctx.fillStyle = s.challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(s.challenge === 'won' ? '★ Challenge complete!' : 'So close — adjust the acceleration and retry!', w / 2, 22)
    }
  })

  return (
    <SimFrame
      title="Acceleration Lab"
      brief="Set the throttle, press Go, and watch the velocity–time graph climb. The slope of the line is the acceleration."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Dragster acceleration simulation: a car on a 100 metre strip above a live velocity–time graph"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Throttle (acceleration)" value={acc} min={0} max={10} step={0.1} unit="m/s²"
          onChange={setAcc}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={() => setRunning((r) => !r)}>
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
            Challenge: 20 m/s in 4 s
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Time" value={elapsed.toFixed(1)} unit="s" />
        <Readout label="Velocity" value={vel.toFixed(1)} unit="m/s" tone="text-orange-500" />
        <Readout label="Acceleration" value={acc.toFixed(1)} unit="m/s²" />
        <Readout label="Distance" value={dist.toFixed(0)} unit="m" />
        {challenge !== 'idle' && (
          <Readout label="Target a" value={(TARGET_V / TARGET_T).toFixed(1)} unit="m/s²" tone="text-amber-500" />
        )}
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
