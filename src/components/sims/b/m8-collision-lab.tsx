// ─── Sim: Collision Lab · two pucks, an air track, and momentum that survives ─
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimToggle, Readout, Legend,
  useSimCanvas, useSimBeep,
} from '@/components/sims/sim-kit'
import { Play, RotateCcw, Flag } from 'lucide-react'

const X1_0 = 3 // m start position puck 1
const X2_0 = 9 // m start position puck 2
const TRACK = 12 // m visible track

const radius = (m: number) => 0.28 + 0.1 * Math.sqrt(m) // m

/** Module-scope helper: star-burst flash at a collision point. */
function drawFlash(ctx: CanvasRenderingContext2D, mx: number, my: number, alpha: number) {
  ctx.strokeStyle = CANVAS.yellow
  ctx.globalAlpha = alpha
  ctx.lineWidth = 3
  ctx.beginPath()
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2
    const rr = 14 + (i % 2) * 8
    ctx.moveTo(mx + Math.cos(ang) * rr * 0.55, my + Math.sin(ang) * rr * 0.55)
    ctx.lineTo(mx + Math.cos(ang) * rr, my + Math.sin(ang) * rr)
  }
  ctx.stroke()
  ctx.globalAlpha = 1
}

function drawPuck(
  ctx: CanvasRenderingContext2D,
  x: number, m: number, v: number, color: string, label: string,
  X: (m: number) => number, oy: number, k: number,
) {
  const r = radius(m) * k
  const cx = X(x)
  const cy = oy - r
  // puck body
  ctx.fillStyle = color
  ctx.strokeStyle = CANVAS.bg
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  ctx.fillStyle = CANVAS.bg
  ctx.beginPath(); ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2); ctx.fill()
  // mass label
  ctx.fillStyle = CANVAS.muted
  ctx.font = '11px ui-monospace, monospace'
  ctx.textAlign = 'center'
  ctx.fillText(label, cx, cy + r + 16)
  // velocity arrow
  const len = Math.max(10, Math.min(70, Math.abs(v) * 13))
  const dir = Math.sign(v) || 1
  const ax0 = cx + dir * (r + 4)
  const ax1 = cx + dir * (r + 4 + len)
  const ay = cy - 18
  ctx.strokeStyle = v >= 0 ? CANVAS.emerald : CANVAS.rose
  ctx.fillStyle = ctx.strokeStyle
  ctx.lineWidth = 2.5
  ctx.beginPath(); ctx.moveTo(ax0, ay); ctx.lineTo(ax1, ay); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(ax1 + dir * 6, ay)
  ctx.lineTo(ax1, ay - 4)
  ctx.lineTo(ax1, ay + 4)
  ctx.closePath(); ctx.fill()
  ctx.font = '11px ui-monospace, monospace'
  ctx.fillText(`${v >= 0 ? '+' : ''}${v.toFixed(1)} m/s`, cx, ay - 10)
}

export function CollisionLabSim() {
  const [m1, setM1] = useState(2)
  const [v1, setV1] = useState(3)
  const [m2, setM2] = useState(1)
  const [v2, setV2] = useState(-1)
  const [elastic, setElastic] = useState(false)
  const [running, setRunning] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [predict, setPredict] = useState('')
  const [mom, setMom] = useState<{ pb: number | null; pa: number | null; kb: number | null; ka: number | null }>({
    pb: null, pa: null, kb: null, ka: null,
  })

  const beep = useSimBeep()

  const st = useRef({
    running: false, collided: false, collideT: 0, idleT: 0,
    x1: X1_0, x2: X2_0, v1a: 3, v2a: -1,
    m1: 2, v1: 3, m2: 1, v2: -1, elastic: false,
    pb: 0, kb: 0,
    challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost',
  })
  useEffect(() => {
    st.current.m1 = m1
    st.current.v1 = v1
    st.current.m2 = m2
    st.current.v2 = v2
    st.current.elastic = elastic
    st.current.challenge = challenge
  })

  const returnPucks = () => {
    const s = st.current
    s.x1 = X1_0
    s.x2 = X2_0
    s.v1a = s.v1
    s.v2a = s.v2
    s.collided = false
    s.idleT = 0
  }

  const run = () => {
    const s = st.current
    returnPucks()
    s.v1a = s.v1
    s.v2a = s.v2
    s.running = true
    setRunning(true)
    s.pb = s.m1 * s.v1 + s.m2 * s.v2
    s.kb = 0.5 * s.m1 * s.v1 * s.v1 + 0.5 * s.m2 * s.v2 * s.v2
    setMom({
      pb: s.pb, kb: s.kb,
      pa: null, ka: null,
    })
  }

  const reset = () => {
    const s = st.current
    s.running = false
    setRunning(false)
    returnPucks()
    s.challenge = 'idle'
    setChallenge('idle')
    setResult('')
    setMom({ pb: null, pa: null, kb: null, ka: null })
  }

  const startChallenge = () => {
    reset()
    Object.assign(st.current, { m1: 2, v1: 3, m2: 1, v2: -1, elastic: false })
    setM1(2); setV1(3); setM2(1); setV2(-1); setElastic(false)
    setChallenge('active')
    st.current.challenge = 'active'
    setResult('')
    setPredict('')
  }

  const checkPrediction = () => {
    const guess = parseFloat(predict)
    if (Number.isNaN(guess)) return
    const target = 5 / 3
    const ok = Math.abs(guess - target) <= 0.05
    setChallenge(ok ? 'won' : 'lost')
    if (ok) { beep(660, 140); beep(880, 180) }
    setResult(ok
      ? `Correct! Momentum before = 2×3 + 1×(−1) = 5 kg·m/s. Stuck together, 3 kg carry it: 5 ÷ 3 ≈ 1.67 m/s. Press Run to watch it happen!`
      : `Not quite — you said ${predict}. Hint: momentum before = 2×3 + 1×(−1) = 5 kg·m/s, shared by all 3 kg after sticking. Try again!`)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current

    // ── physics ────────────────────────────────────────────────────────────
    if (s.running) {
      s.x1 += s.v1a * dt
      s.x2 += s.v2a * dt
      const r1 = radius(s.m1), r2 = radius(s.m2)
      if (!s.collided && s.v1a > s.v2a && s.x2 - s.x1 <= r1 + r2) {
        const mid = (s.x1 + s.x2) / 2
        s.x1 = mid - (r1 + r2) / 2
        s.x2 = mid + (r1 + r2) / 2
        let nv1: number, nv2: number
        if (s.elastic) {
          nv1 = ((s.m1 - s.m2) * s.v1a + 2 * s.m2 * s.v2a) / (s.m1 + s.m2)
          nv2 = ((s.m2 - s.m1) * s.v2a + 2 * s.m1 * s.v1a) / (s.m1 + s.m2)
        } else {
          nv1 = nv2 = (s.m1 * s.v1a + s.m2 * s.v2a) / (s.m1 + s.m2)
        }
        s.v1a = nv1
        s.v2a = nv2
        s.collided = true
        s.collideT = 0
        setMom({
          pb: s.pb, kb: s.kb,
          pa: s.m1 * nv1 + s.m2 * nv2,
          ka: 0.5 * s.m1 * nv1 * nv1 + 0.5 * s.m2 * nv2 * nv2,
        })
        beep(320, 70, 'triangle', 0.05)
      }
      s.collideT += dt
      // end conditions: both pucks off-track, or nothing is moving
      const out = (x: number) => x < -1.4 || x > TRACK + 1.4
      if (Math.abs(s.v1a) + Math.abs(s.v2a) < 0.05) s.idleT += dt
      else s.idleT = 0
      const still = s.idleT > 1.2
      if ((out(s.x1) && out(s.x2)) || still) {
        s.running = false
        setRunning(false)
        returnPucks()
      }
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    const k = (w - 48) / TRACK
    const oy = h * 0.56
    const X = (m: number) => 24 + m * k

    // air track with holes
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(16, oy, w - 32, 12)
    ctx.fillStyle = CANVAS.panelLight
    for (let x = 0; x <= TRACK; x += 0.5) {
      ctx.beginPath(); ctx.arc(X(x), oy + 6, 1.6, 0, Math.PI * 2); ctx.fill()
    }
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(0, oy + 12); ctx.lineTo(w, oy + 12); ctx.stroke()
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    for (let x = 0; x <= TRACK; x += 2) ctx.fillText(`${x} m`, X(x), oy + 30)

    // pucks (display velocities: actual while running, slider values otherwise)
    const dv1 = s.running ? s.v1a : s.v1
    const dv2 = s.running ? s.v2a : s.v2
    drawPuck(ctx, s.x1, s.m1, dv1, CANVAS.orange, `${s.m1.toFixed(1)} kg`, X, oy, k)
    drawPuck(ctx, s.x2, s.m2, dv2, CANVAS.teal, `${s.m2.toFixed(1)} kg`, X, oy, k)

    // collision flash
    if (s.collided && s.collideT < 0.35) {
      const alpha = 1 - s.collideT / 0.35
      const mx = X((s.x1 + s.x2) / 2)
      const my = oy - (radius(s.m1) + radius(s.m2)) * k / 2
      drawFlash(ctx, mx, my, alpha)
    }

    // collision-type tag
    ctx.font = '11px ui-monospace, monospace'
    ctx.fillStyle = s.elastic ? CANVAS.emerald : CANVAS.rose
    ctx.textAlign = 'right'
    ctx.fillText(s.elastic ? 'ELASTIC — p and KE conserved' : 'INELASTIC — p conserved, KE drops', w - 20, 24)

    // challenge banner
    if (s.challenge !== 'idle') {
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillStyle = s.challenge === 'active' ? CANVAS.amber : s.challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.textAlign = 'left'
      ctx.fillText(
        s.challenge === 'active'
          ? 'Predict the stuck-together speed, then Run to check!'
          : s.challenge === 'won' ? '★ Prediction confirmed!' : 'Prediction off — momentum math will get you there.',
        20, 46,
      )
    }
  }, 380)

  return (
    <SimFrame
      title="Air-Track Collision Lab"
      brief="Set masses and velocities (−5 to +5 m/s), press Run. Sticky: v′ = (m₁v₁+m₂v₂)/(m₁+m₂) · Elastic swap: v₁′ = ((m₁−m₂)v₁+2m₂v₂)/(m₁+m₂)"
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 380 }}
          aria-label="Air track with two pucks of adjustable mass and velocity colliding, with velocity arrows"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Mass 1" value={m1} min={0.5} max={5} step={0.5} unit="kg" onChange={setM1} disabled={running} />
        <SimSlider label="Velocity 1" value={v1} min={-5} max={5} step={0.5} unit="m/s" onChange={setV1} disabled={running} />
        <SimSlider label="Mass 2" value={m2} min={0.5} max={5} step={0.5} unit="kg" onChange={setM2} disabled={running} />
        <SimSlider label="Velocity 2" value={v2} min={-5} max={5} step={0.5} unit="m/s" onChange={setV2} disabled={running} />
        <SimToggle label="Elastic (bounce)" checked={elastic} onChange={setElastic} className="pb-1" />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={run} disabled={running}>
            <Play className="h-4 w-4 me-1" aria-hidden /> Run
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Prediction challenge
          </SimButton>
        </div>
      </div>

      {challenge === 'active' && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/5 px-3 py-2">
          <p className="text-sm font-medium">
            2 kg puck at +3 m/s hits a 1 kg puck at −1 m/s, and they stick. Final speed?
          </p>
          <input
            type="number"
            step="0.05"
            aria-label="Your predicted final speed in metres per second"
            value={predict}
            onChange={(e) => setPredict(e.target.value)}
            className="h-8 w-24 rounded-md border bg-background px-2 text-sm font-mono"
          />
          <span className="text-xs text-muted-foreground">m/s</span>
          <SimButton onClick={checkPrediction}>Check</SimButton>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Readout label="p before" value={mom.pb === null ? '—' : mom.pb.toFixed(2)} unit="kg·m/s" />
        <Readout label="p after" value={mom.pa === null ? '—' : mom.pa.toFixed(2)} unit="kg·m/s" tone="text-emerald-500" />
        <Readout label="KE before" value={mom.kb === null ? '—' : mom.kb.toFixed(2)} unit="J" />
        <Readout label="KE after" value={mom.ka === null ? '—' : mom.ka.toFixed(2)} unit="J" tone={elastic ? 'text-emerald-500' : 'text-rose-500'} />
      </div>
      <div className="flex flex-wrap gap-4">
        <Legend color={CANVAS.orange} label="Puck 1" />
        <Legend color={CANVAS.teal} label="Puck 2" />
        <Legend color={CANVAS.emerald} label="velocity +x" />
        <Legend color={CANVAS.rose} label="velocity −x" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
