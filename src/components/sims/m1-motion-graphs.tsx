// ─── Sim: Motion Graphs · race a robot, watch the d–t graph draw itself ──────
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas,
  canvasPos, useSimBeep, useReducedMotion, drawGrid,
} from '@/components/sims/sim-kit'
import { Play, Pause, RotateCcw, Flag } from 'lucide-react'

const TRACK_LEN = 60 // m
const CHALLENGE_DIST = 30 // m
const CHALLENGE_TIME = 6 // s

export function MotionGraphsSim() {
  const [running, setRunning] = useState(false)
  const [speed, setSpeed] = useState(4)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [distance, setDistance] = useState(0)

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const readoutSkip = useRef(0)

  // mutable sim state (refs so the RAF loop reads fresh values without restarts)
  const st = useRef({
    t: 0, pos: 0, speed: 4, running: false,
    challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost',
    history: [] as { t: number; d: number }[],
  })

  // sync React state → sim loop after commit (never during render)
  useEffect(() => {
    const s = st.current
    s.speed = speed
    s.running = running
    s.challenge = challenge
  }, [speed, running, challenge])

  const reset = (toChallenge = false) => {
    const s = st.current
    s.t = 0
    s.pos = 0
    s.history = []
    setResult('')
    setDistance(0)
    setElapsed(0)
    if (toChallenge) {
      setChallenge('active')
      s.challenge = 'active'
    }
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current

    // ── physics ────────────────────────────────────────────────────────────
    if (s.running) {
      const step = reducedMotion ? dt : dt // user-triggered motion; still smooth
      s.t += step
      s.pos += s.speed * step
      if (s.pos > TRACK_LEN) s.pos = TRACK_LEN
      const last = s.history[s.history.length - 1]
      if (!last || s.t - last.t >= 0.05) s.history.push({ t: s.t, d: s.pos })
      if (s.history.length > 2400) s.history.shift()
    }
    // challenge evaluation
    if (s.challenge === 'active' && s.t >= CHALLENGE_TIME) {
      const avg = s.pos / s.t
      const ok = Math.abs(s.pos - CHALLENGE_DIST) <= 0.75
      s.challenge = ok ? 'won' : 'lost'
      if (ok) { beep(660, 140); beep(880, 180) }
      setChallenge(ok ? 'won' : 'lost')
      setResult(ok
        ? `Brilliant! You averaged ${avg.toFixed(1)} m/s — exactly what the target needed.`
        : `You covered ${s.pos.toFixed(1)} m — average speed ${avg.toFixed(1)} m/s. Target: ${(CHALLENGE_DIST / CHALLENGE_TIME).toFixed(1)} m/s. Tweak and retry!`)
      setRunning(false)
      s.running = false
    }

    // publish readouts ~10×/s
    readoutSkip.current += 1
    if (readoutSkip.current >= 6) {
      readoutSkip.current = 0
      setElapsed(s.t)
      setDistance(s.pos)
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    // top strip: the track
    const trackY = 52
    const mLeft = 24
    const mRight = w - 24
    const toX = (m: number) => mLeft + (mRight - mLeft) * (m / TRACK_LEN)

    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(mLeft - 10, trackY - 14, mRight - mLeft + 20, 40)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(mLeft - 10, trackY + 18)
    ctx.lineTo(mRight + 10, trackY + 18)
    ctx.stroke()
    // distance ticks every 10 m
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    for (let m = 0; m <= TRACK_LEN; m += 10) {
      ctx.fillRect(toX(m) - 1, trackY + 14, 2, 6)
      ctx.fillText(`${m}`, toX(m), trackY + 32)
    }

    // flag at challenge distance
    if (s.challenge !== 'idle') {
      const fx = toX(CHALLENGE_DIST)
      ctx.strokeStyle = CANVAS.amber
      ctx.beginPath(); ctx.moveTo(fx, trackY - 12); ctx.lineTo(fx, trackY + 14); ctx.stroke()
      ctx.fillStyle = CANVAS.amber
      ctx.beginPath(); ctx.moveTo(fx, trackY - 12); ctx.lineTo(fx + 14, trackY - 7); ctx.lineTo(fx, trackY - 2); ctx.fill()
    }

    // robot
    const rx = toX(s.pos)
    ctx.fillStyle = CANVAS.orange
    ctx.fillRect(rx - 9, trackY - 10, 18, 16)
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(rx - 5, trackY - 6, 4, 4)
    ctx.fillRect(rx + 1, trackY - 6, 4, 4)
    ctx.fillStyle = CANVAS.panelLight
    ctx.beginPath(); ctx.arc(rx - 5, trackY + 8, 3, 0, Math.PI * 2); ctx.arc(rx + 5, trackY + 8, 3, 0, Math.PI * 2); ctx.fill()

    // bottom: distance–time graph
    const gx0 = 44, gy0 = h - 34, gw = w - 64, gh = h - 132
    const gTop = gy0 - gh
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(gx0, gTop, gw, gh)
    ctx.save()
    ctx.beginPath(); ctx.rect(gx0, gTop, gw, gh); ctx.clip()

    const tMax = s.challenge === 'idle' ? 20 : CHALLENGE_TIME * 1.6
    const toGX = (t: number) => gx0 + (t / tMax) * gw
    const toGY = (d: number) => gy0 - (d / TRACK_LEN) * gh

    drawGrid(ctx, gx0 + gw, gy0 + 0, 32)
    // target line for the challenge (slope = 30/6 = 5 m/s)
    if (s.challenge !== 'idle') {
      ctx.strokeStyle = CANVAS.amber
      ctx.setLineDash([6, 5])
      ctx.beginPath(); ctx.moveTo(toGX(0), toGY(0)); ctx.lineTo(toGX(CHALLENGE_TIME), toGY(CHALLENGE_DIST)); ctx.stroke()
      ctx.setLineDash([])
    }
    // history line
    ctx.strokeStyle = CANVAS.orange
    ctx.lineWidth = 2.5
    ctx.beginPath()
    s.history.forEach((p, i) => {
      const x = toGX(p.t), y = toGY(p.d)
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    })
    ctx.stroke()

    // axes labels
    ctx.setLineDash([2, 4])
    ctx.strokeStyle = CANVAS.muted
    ctx.beginPath(); ctx.moveTo(gx0, toGY(CHALLENGE_DIST)); ctx.lineTo(gx0 + gw, toGY(CHALLENGE_DIST)); ctx.stroke()
    ctx.setLineDash([])

    ctx.restore()
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText('time (s)', gx0 + gw / 2, gy0 + 16)
    for (let t = 0; t <= tMax; t += 2) ctx.fillText(`${t}`, toGX(t), gy0 + 8)
    ctx.save()
    ctx.translate(14, gTop + gh / 2); ctx.rotate(-Math.PI / 2)
    ctx.fillText('distance (m)', 0, 0)
    ctx.restore()
    for (let d = 0; d <= TRACK_LEN; d += 15) ctx.fillText(`${d}`, gx0 - 6, toGY(d) + 3)

    // challenge banner
    if (s.challenge === 'won' || s.challenge === 'lost') {
      ctx.fillStyle = s.challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(s.challenge === 'won' ? '★ Challenge complete!' : 'So close — adjust the speed and retry!', w / 2, 24)
    }
  })

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // clicking the track teleports the start position (sandbox fun)
    const canvas = canvasRef.current
    if (!canvas || challenge === 'active') return
    const { x } = canvasPos(e, canvas)
    const mLeft = 24, mRight = canvas.clientWidth - 24
    const frac = Math.min(1, Math.max(0, (x - mLeft) / (mRight - mLeft)))
    const s = st.current
    s.pos = frac * TRACK_LEN
    s.history = []
    s.t = 0
  }

  return (
    <SimFrame
      title="Robot Race Lab"
      brief="Press play, drag the speed slider, and watch the distance–time graph draw itself. Click the track to reposition the robot."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          onClick={onCanvasClick}
          className="rounded-lg cursor-pointer"
          style={{ height: 400 }}
          aria-label="Robot race simulation: a robot on a 60 metre track above a live distance–time graph"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Speed" value={speed} min={0} max={10} step={0.5} unit="m/s"
          onChange={setSpeed}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={() => setRunning((r) => !r)}>
            {running ? <Pause className="h-4 w-4 me-1" aria-hidden /> : <Play className="h-4 w-4 me-1" aria-hidden />}
            {running ? 'Pause' : 'Play'}
          </SimButton>
          <SimButton variant="secondary" onClick={() => { reset(false); setRunning(false); setChallenge('idle') }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { reset(true); setRunning(true) }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden />
            Challenge: 30 m in 6 s
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Time" value={elapsed.toFixed(1)} unit="s" />
        <Readout label="Distance" value={distance.toFixed(1)} unit="m" />
        <Readout label="Speed" value={speed.toFixed(1)} unit="m/s" tone="text-orange-500" />
        {challenge !== 'idle' && (
          <Readout label="Target avg" value={(CHALLENGE_DIST / CHALLENGE_TIME).toFixed(1)} unit="m/s" tone="text-amber-500" />
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
