// ─── Sim: Projectile Range · cannon, parabolas and a 45 m target ──────────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout,
  useSimCanvas, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Rocket, RotateCcw, Flag } from 'lucide-react'

const CANNON_X = 2 // m — muzzle pivot
const TARGET_RANGE = 45 // m from the cannon
const TOL = 1.5 // m challenge tolerance
const WORLD_H = 55 // m of visible sky
const COLORS = ['#f97316', '#14b8a6', '#8b5cf6', '#eab308', '#f43f5e', '#10b981', '#d6d3d1']

interface Shot { pts: { x: number; y: number }[]; color: string }

export function ProjectileRangeSim() {
  const [angle, setAngle] = useState(45)
  const [speed, setSpeed] = useState(20)
  const [grav, setGrav] = useState<'earth' | 'moon'>('earth')
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [ro, setRo] = useState({ range: 0, maxH: 0, time: 0, pred: 0 })

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const skip = useRef(0)

  const st = useRef({
    flying: false, t: 0, x: 0, y: 0, vx: 0, vy: 0, g: 9.8,
    maxH: 0, trail: [] as { x: number; y: number }[],
    shots: [] as Shot[], colorIdx: -1,
    challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost',
  })

  const [flyingS, setFlyingS] = useState(false)

  const g = grav === 'earth' ? 9.8 : 1.6

  const finishFlight = (range: number, maxH: number, time: number) => {
    const s = st.current
    s.flying = false
    setFlyingS(false)
    setRo((p) => ({ ...p, range, maxH, time }))
    if (s.challenge === 'active') {
      const off = Math.abs(range - TARGET_RANGE)
      const ok = off <= TOL
      s.challenge = ok ? 'won' : 'lost'
      setChallenge(ok ? 'won' : 'lost')
      if (ok) { beep(660, 140); beep(880, 180) }
      setResult(ok
        ? `Bullseye! Range ${range.toFixed(1)} m — inside ±${TOL} m of the 45 m target. $R = v^2 \\sin 2\\theta / g$ did the job!`
        : `Landed ${range.toFixed(1)} m — ${off.toFixed(1)} m off. Remember: 45° maximises range, and $R = v^2 \\sin 2\\theta / g$. Tweak and fire again!`)
    }
  }

  const fire = () => {
    const s = st.current
    const th = (angle * Math.PI) / 180
    s.flying = true
    setFlyingS(true)
    s.t = 0
    s.x = CANNON_X
    s.y = 0
    s.vx = speed * Math.cos(th)
    s.vy = speed * Math.sin(th)
    s.g = g
    s.maxH = 0
    s.trail = [{ x: s.x, y: s.y }]
    s.colorIdx = (s.colorIdx + 1) % COLORS.length
    beep(170, 90, 'square', 0.05)
  }

  const reset = () => {
    const s = st.current
    s.flying = false
    s.trail = []
    s.shots = []
    s.challenge = 'idle'
    setFlyingS(false)
    setResult('')
    setChallenge('idle')
    setRo((p) => ({ ...p, range: 0, maxH: 0, time: 0 }))
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    const th = (angle * Math.PI) / 180
    const pred = (speed * speed * Math.sin(2 * th)) / g

    // ── physics ────────────────────────────────────────────────────────────
    if (s.flying) {
      const step = dt * (reducedMotion ? 8 : 1)
      const sub = 3
      const sdt = step / sub
      for (let i = 0; i < sub && s.flying; i++) {
        const py = s.y
        s.vy -= s.g * sdt
        s.x += s.vx * sdt
        s.y += s.vy * sdt
        s.t += sdt
        if (s.y > s.maxH) s.maxH = s.y
        const last = s.trail[s.trail.length - 1]
        if (!last || Math.hypot(s.x - last.x, s.y - last.y) > 0.35) {
          s.trail.push({ x: s.x, y: s.y })
          if (s.trail.length > 900) s.trail.shift()
        }
        if (s.y <= 0 && s.vy < 0) {
          const frac = py / (py - s.y || 1e-9)
          const landX = s.x - s.vx * sdt * (1 - frac)
          const landT = s.t - sdt * (1 - frac)
          s.trail.push({ x: landX, y: 0 })
          s.shots.push({ pts: s.trail, color: COLORS[s.colorIdx] })
          if (s.shots.length > 9) s.shots.shift()
          finishFlight(landX - CANNON_X, s.maxH, landT)
        } else if (s.t > 90) {
          // safety: extremely long Moon shots finish analytically
          const tau = (s.vy + Math.sqrt(s.vy * s.vy + 2 * s.g * Math.max(0, s.y))) / s.g
          finishFlight(s.x - CANNON_X + s.vx * tau, s.maxH, s.t + tau)
        }
      }
    }

    // publish readouts ~10×/s
    skip.current += 1
    if (skip.current >= 6) {
      skip.current = 0
      setRo((p) => ({
        ...p,
        range: s.flying ? s.x - CANNON_X : p.range,
        maxH: s.flying ? Math.max(p.maxH, s.maxH) : p.maxH,
        time: s.flying ? s.t : p.time,
        pred,
      }))
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    const pad = 46
    const k = (h - pad - 46) / WORLD_H // px per metre (uniform)
    const ox = 30
    const oy = h - pad
    const X = (m: number) => ox + m * k
    const Y = (m: number) => oy - m * k
    const viewW = (w - ox - 12) / k

    // ground
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(0, oy, w, pad)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.stroke()
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    for (let m = 0; m <= viewW; m += 10) {
      ctx.fillText(`${m}`, X(m), oy + 22)
      ctx.fillRect(X(m) - 1, oy, 2, 5)
    }
    ctx.fillText('metres', w - 34, oy + 34)

    // landing zone (45 m ± 1.5 m)
    const z0 = X(CANNON_X + TARGET_RANGE - TOL)
    const z1 = X(CANNON_X + TARGET_RANGE + TOL)
    ctx.fillStyle = 'rgba(245, 158, 11, 0.16)'
    ctx.fillRect(z0, oy - 7, z1 - z0, 7)
    ctx.strokeStyle = CANVAS.amber
    ctx.setLineDash([4, 4])
    ctx.beginPath(); ctx.moveTo(X(CANNON_X + TARGET_RANGE), oy); ctx.lineTo(X(CANNON_X + TARGET_RANGE), oy - 26); ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.amber
    ctx.fillText('45 m', X(CANNON_X + TARGET_RANGE), oy - 32)

    // target board on a pole
    const tx = X(CANNON_X + TARGET_RANGE)
    ctx.strokeStyle = CANVAS.white
    ctx.lineWidth = 3
    ctx.beginPath(); ctx.moveTo(tx, oy); ctx.lineTo(tx, Y(4.4)); ctx.stroke()
    const rings: [number, string][] = [[1.7, CANVAS.amber], [1.15, CANVAS.white], [0.55, CANVAS.red]]
    rings.forEach(([r, c]) => {
      ctx.fillStyle = c
      ctx.beginPath(); ctx.arc(tx, Y(4.4), r * k, 0, Math.PI * 2); ctx.fill()
    })
    ctx.fillStyle = CANVAS.bg
    ctx.beginPath(); ctx.arc(tx, Y(4.4), 0.16 * k, 0, Math.PI * 2); ctx.fill()

    // predicted trajectory (faint, before firing)
    if (!s.flying) {
      const T = (2 * speed * Math.sin(th)) / g
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)'
      ctx.lineWidth = 1.5
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      for (let i = 0; i <= 80; i++) {
        const tt = (i / 80) * T
        const px = CANNON_X + speed * Math.cos(th) * tt
        const py = speed * Math.sin(th) * tt - 0.5 * g * tt * tt
        if (py < -0.2) break
        if (i === 0) ctx.moveTo(X(px), Y(py)); else ctx.lineTo(X(px), Y(py))
      }
      ctx.stroke()
      ctx.setLineDash([])
    }

    // old shot trails
    s.shots.forEach((sh) => {
      ctx.strokeStyle = sh.color
      ctx.globalAlpha = 0.75
      ctx.lineWidth = 2
      ctx.beginPath()
      sh.pts.forEach((p, i) => {
        if (i === 0) ctx.moveTo(X(p.x), Y(p.y)); else ctx.lineTo(X(p.x), Y(p.y))
      })
      ctx.stroke()
      ctx.globalAlpha = 1
    })

    // current trail
    if (s.trail.length > 1) {
      ctx.strokeStyle = s.colorIdx >= 0 ? COLORS[s.colorIdx] : CANVAS.orange
      ctx.lineWidth = 2.2
      ctx.beginPath()
      s.trail.forEach((p, i) => {
        if (i === 0) ctx.moveTo(X(p.x), Y(p.y)); else ctx.lineTo(X(p.x), Y(p.y))
      })
      ctx.stroke()
    }

    // projectile
    if (s.flying) {
      ctx.fillStyle = CANVAS.orange
      ctx.strokeStyle = CANVAS.bg
      ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(X(s.x), Y(s.y), 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    }

    // cannon
    ctx.save()
    ctx.translate(X(CANNON_X), Y(0))
    ctx.rotate(-th)
    ctx.fillStyle = CANVAS.white
    ctx.fillRect(0, -5, 3.1 * k, 10)
    ctx.restore()
    ctx.fillStyle = CANVAS.panelLight
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(X(CANNON_X), Y(0), 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke()

    // challenge banner
    if (s.challenge !== 'idle') {
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      if (s.challenge === 'active') {
        ctx.fillStyle = CANVAS.amber
        ctx.fillText('Challenge — land within ±1.5 m of the 45 m target!', w / 2, 22)
      } else {
        ctx.fillStyle = s.challenge === 'won' ? CANVAS.emerald : CANVAS.rose
        ctx.fillText(s.challenge === 'won' ? '★ Direct hit — challenge complete!' : 'Missed! Adjust angle or speed and fire again.', w / 2, 22)
      }
    }
  }, 400)

  return (
    <SimFrame
      title="Projectile Range Lab"
      brief="Aim the cannon, pick a world, and fire. The faint dashed arc predicts the shot (R = v²·sin 2θ/g). Every shot leaves its trail — stack them up and compare!"
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Cannon firing projectiles over a field with a bullseye target at 45 metres; past shot trails remain visible"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Angle" value={angle} min={5} max={85} step={1} unit="°" onChange={setAngle} />
        <SimSlider label="Launch speed" value={speed} min={5} max={40} step={0.5} unit="m/s" onChange={setSpeed} />
        <SimSelect
          label="Gravity"
          value={grav}
          options={[
            { value: 'earth', label: 'Earth · g = 9.8 m/s²' },
            { value: 'moon', label: 'Moon · g = 1.6 m/s²' },
          ]}
          onChange={setGrav}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={fire} disabled={flyingS}>
            <Rocket className="h-4 w-4 me-1" aria-hidden /> Fire
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { setChallenge('active'); st.current.challenge = 'active'; setResult('') }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: hit 45 m
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Range" value={ro.range.toFixed(1)} unit="m" />
        <Readout label="Max height" value={ro.maxH.toFixed(1)} unit="m" />
        <Readout label="Flight time" value={ro.time.toFixed(2)} unit="s" />
        <Readout label="Predicted range" value={ro.pred.toFixed(1)} unit="m" tone="text-amber-500" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
