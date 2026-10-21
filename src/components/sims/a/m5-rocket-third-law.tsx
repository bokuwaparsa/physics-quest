// ─── Sim: Third Law Rocket · thrust vs weight, hover challenge, skater demo ──
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimToggle, Readout, useSimCanvas,
  useSimBeep, useReducedMotion, drawGrid,
} from '@/components/sims/sim-kit'
import { Rocket, RotateCcw, Flag, Users } from 'lucide-react'

const ROCKET_MASS = 200 // kg
const G = 9.8
const WEIGHT = ROCKET_MASS * G // 1960 N
const HOVER_TOL = 20 // N
const HOLD_GOAL = 3 // s
const SKATER_V = 1.6 // m/s each after the shove

type Particle = { x: number; y: number; vy: number; life: number }

type SimState = {
  mode: 'rocket' | 'skaters'
  alt: number
  v: number
  aDisp: number
  engine: boolean
  hold: number
  particles: Particle[]
  skSep: number
  skMoving: boolean
  challenge: 'idle' | 'active' | 'won'
}

function padY(h: number) { return h - 46 }

// ─── rocket scene ────────────────────────────────────────────────────────────
function drawRocketScene(ctx: CanvasRenderingContext2D, w: number, h: number, s: SimState, thrust: number) {
  const py = padY(h)
  const maxAlt = 80 // m visible
  const ry = Math.max(70, py - (s.alt / maxAlt) * (py - 74))
  const cx = w / 2

  // ground + launch pad
  ctx.fillStyle = CANVAS.panel
  ctx.fillRect(0, py + 12, w, h - py - 12)
  ctx.fillStyle = CANVAS.panelLight
  ctx.fillRect(cx - 46, py + 8, 92, 8)
  ctx.fillStyle = CANVAS.muted
  ctx.font = '10px ui-monospace, monospace'
  ctx.textAlign = 'left'
  ctx.fillText('launch pad', cx + 54, py + 14)

  // altitude ruler
  ctx.textAlign = 'right'
  ctx.strokeStyle = CANVAS.muted
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let m = 0; m <= maxAlt; m += 20) {
    const y = py - (m / maxAlt) * (py - 74)
    ctx.moveTo(36, y); ctx.lineTo(42, y)
  }
  ctx.stroke()
  ctx.fillStyle = CANVAS.muted
  for (let m = 0; m <= maxAlt; m += 20) {
    const y = py - (m / maxAlt) * (py - 74)
    ctx.fillText(`${m} m`, 32, y + 3)
  }

  // exhaust particles
  s.particles.forEach((p) => {
    ctx.globalAlpha = Math.max(0, p.life / 0.55)
    ctx.fillStyle = Math.random() > 0.5 ? CANVAS.amber : CANVAS.orange
    ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1
  })

  // rocket body
  const bodyH = 40
  ctx.fillStyle = CANVAS.violet
  ctx.fillRect(cx - 9, ry - bodyH, 18, bodyH)
  ctx.beginPath() // nose cone
  ctx.moveTo(cx - 9, ry - bodyH); ctx.lineTo(cx, ry - bodyH - 14); ctx.lineTo(cx + 9, ry - bodyH)
  ctx.fill()
  ctx.beginPath() // fins
  ctx.moveTo(cx - 9, ry); ctx.lineTo(cx - 17, ry + 6); ctx.lineTo(cx - 9, ry - 10)
  ctx.moveTo(cx + 9, ry); ctx.lineTo(cx + 17, ry + 6); ctx.lineTo(cx + 9, ry - 10)
  ctx.fill()
  ctx.fillStyle = CANVAS.bg
  ctx.beginPath(); ctx.arc(cx, ry - bodyH + 12, 3.5, 0, Math.PI * 2); ctx.fill()

  // engine flame
  if (s.engine && thrust > WEIGHT) {
    const fl = 10 + (thrust / 6000) * 22
    ctx.fillStyle = CANVAS.amber
    ctx.beginPath()
    ctx.moveTo(cx - 6, ry + 4); ctx.lineTo(cx, ry + 4 + fl); ctx.lineTo(cx + 6, ry + 4)
    ctx.fill()
  }

  // force arrows: thrust up, weight down
  const vArrow = (x: number, y0: number, len: number, dir: 1 | -1, color: string, label: string) => {
    if (Math.abs(len) < 2) return
    const y1 = y0 + dir * len
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = 3
    ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y1); ctx.lineTo(x - 5, y1 - dir * 7); ctx.lineTo(x + 5, y1 - dir * 7)
    ctx.fill()
    ctx.font = 'bold 11px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText(label, x, y1 - dir * 14)
  }
  if (s.engine) vArrow(cx + 34, ry - 12, (thrust / 6000) * 90, -1, CANVAS.amber, `thrust ${thrust.toFixed(0)} N`)
  vArrow(cx - 34, ry - 12, (WEIGHT / 6000) * 90, 1, CANVAS.rose, `W = ${WEIGHT.toFixed(0)} N`)

  // hints & banners
  ctx.textAlign = 'center'
  if (s.engine && thrust <= WEIGHT && s.alt <= 0) {
    ctx.fillStyle = CANVAS.rose
    ctx.font = '12px ui-sans-serif, system-ui'
    ctx.fillText(`Thrust ${thrust.toFixed(0)} N < weight ${WEIGHT.toFixed(0)} N — the pad holds the rocket down. More thrust!`, w / 2, py - 74)
  }
  if (s.alt >= 80) {
    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-sans-serif, system-ui'
    ctx.fillText('…and climbing!', cx, 60)
  }
  if (s.challenge === 'active') {
    ctx.fillStyle = CANVAS.amber
    ctx.font = 'bold 12px ui-sans-serif, system-ui'
    ctx.fillText(`Hover challenge: |Fnet| ≤ 20 N, altitude ≤ 2 m — hold ${(HOLD_GOAL - s.hold).toFixed(1)} s more`, w / 2, 24)
  } else if (s.challenge === 'won') {
    ctx.fillStyle = CANVAS.emerald
    ctx.font = 'bold 13px ui-sans-serif, system-ui'
    ctx.fillText('★ Hover achieved — thrust balanced weight!', w / 2, 24)
  }
}

// ─── two-skaters scene ───────────────────────────────────────────────────────
function drawSkaterScene(ctx: CanvasRenderingContext2D, w: number, h: number, s: SimState) {
  const iceY = h - 90
  // ice rink
  ctx.fillStyle = CANVAS.panel
  ctx.fillRect(0, iceY, w, h - iceY)
  ctx.strokeStyle = CANVAS.teal
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(0, iceY); ctx.lineTo(w, iceY); ctx.stroke()
  ctx.fillStyle = CANVAS.muted
  ctx.font = '10px ui-sans-serif, system-ui'
  ctx.textAlign = 'left'
  ctx.fillText('frictionless ice', 12, iceY + 16)

  const skater = (x: number, dir: 1 | -1, color: string, label: string) => {
    ctx.fillStyle = color
    ctx.fillRect(x - 8, iceY - 34, 16, 26) // body
    ctx.beginPath(); ctx.arc(x, iceY - 42, 7, 0, Math.PI * 2); ctx.fill() // head
    ctx.fillRect(x - 10, iceY - 8, 20, 3) // skate
    ctx.fillStyle = CANVAS.bg
    ctx.font = 'bold 10px ui-sans-serif, system-ui'
    ctx.textAlign = 'center'
    ctx.fillText(label, x, iceY - 52)
    // push-off force arrow
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = 3
    const y = iceY - 22
    const x1 = x + dir * 46
    ctx.beginPath(); ctx.moveTo(x + dir * 12, y); ctx.lineTo(x1, y); ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x1, y); ctx.lineTo(x1 - dir * 8, y - 5); ctx.lineTo(x1 - dir * 8, y + 5)
    ctx.fill()
  }

  const dx = s.skSep * 14
  const cxL = w / 2 - 40 - dx
  const cxR = w / 2 + 40 + dx
  if (cxL > 90) skater(cxL, -1, CANVAS.teal, '50 kg')
  if (cxR < w - 90) skater(cxR, 1, CANVAS.violet, '50 kg')

  ctx.textAlign = 'center'
  ctx.fillStyle = CANVAS.fg
  ctx.font = '12px ui-sans-serif, system-ui'
  ctx.fillText('Each skater pushes the other with an equal force in the opposite direction…', w / 2, 30)
  ctx.fillStyle = CANVAS.amber
  ctx.font = 'bold 12px ui-sans-serif, system-ui'
  ctx.fillText('…so they glide apart with equal speeds — the forces act on different skaters, so nothing cancels.', w / 2, 50)
}

export function RocketThirdLawSim() {
  const [mode, setMode] = useState<'rocket' | 'skaters'>('rocket')
  const [thrust, setThrust] = useState(1960)
  const [engine, setEngine] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')
  const [alt, setAlt] = useState(0)
  const [netF, setNetF] = useState(0)
  const [acc, setAcc] = useState(0)
  const [hold, setHold] = useState(0)
  const [sep, setSep] = useState(0)

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const readoutSkip = useRef(0)

  const st = useRef<SimState>({
    mode: 'rocket',
    alt: 0, v: 0, aDisp: 0, engine: false, hold: 0,
    particles: [],
    skSep: 0, skMoving: false,
    challenge: 'idle',
  })
  useEffect(() => {
    st.current.mode = mode
    st.current.engine = engine
    st.current.challenge = challenge
  })

  const reset = () => {
    const s = st.current
    s.alt = 0
    s.v = 0
    s.hold = 0
    s.particles = []
    s.skSep = 0
    s.skMoving = false
    setResult('')
    setAlt(0)
    setHold(0)
    setSep(0)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current

    // ── physics ────────────────────────────────────────────────────────────
    if (s.mode === 'rocket') {
      const up = s.engine ? thrust : 0
      const net = up - WEIGHT
      if (s.alt <= 0 && net <= 0) {
        s.v = 0
        s.alt = 0 // pad holds the rocket down
        s.aDisp = 0
      } else {
        s.aDisp = net / ROCKET_MASS
        s.v += s.aDisp * dt
        s.alt += s.v * dt
        if (s.alt <= 0) { s.alt = 0; s.v = 0; s.aDisp = 0 } // landed back on the pad
        if (s.alt > 400) { s.alt = 400; s.v = 0; s.aDisp = 0 }
      }
      // exhaust particles
      if (s.engine && thrust > WEIGHT && !reducedMotion) {
        for (let i = 0; i < 2; i++) {
          s.particles.push({ x: w / 2 + (Math.random() - 0.5) * 10, y: padY(h) + 14, vy: 90 + Math.random() * 90, life: 0.55 })
        }
      }
      s.particles.forEach((p) => { p.y += p.vy * dt; p.life -= dt })
      s.particles = s.particles.filter((p) => p.life > 0)

      // hover challenge
      if (s.challenge === 'active') {
        if (Math.abs(net) <= HOVER_TOL && s.alt <= 2) {
          s.hold += dt
          if (s.hold >= HOLD_GOAL) {
            s.challenge = 'won'
            setChallenge('won')
            setEngine(false)
            s.engine = false
            setResult(`Perfect hover! You set thrust = weight = ${WEIGHT.toFixed(0)} N, so the net force is ≈ 0 N and the rocket just hangs there — no net force, no change in motion.`)
            beep(660, 140); beep(880, 180)
          }
        } else {
          s.hold = 0
        }
      }
    } else {
      // two skaters gliding apart on frictionless ice
      if (s.skMoving) {
        s.skSep += 2 * SKATER_V * dt
        if (s.skSep * 14 > w / 2 - 80) s.skMoving = false
      }
    }

    // publish readouts ~10×/s
    readoutSkip.current += 1
    if (readoutSkip.current >= 6) {
      readoutSkip.current = 0
      setAlt(s.alt)
      setNetF(s.mode === 'rocket' ? (s.engine ? thrust - WEIGHT : 0) : 0)
      setAcc(s.mode === 'rocket' ? s.aDisp : 0)
      setHold(s.hold)
      setSep(s.skSep)
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    drawGrid(ctx, w, h, 40)

    if (s.mode === 'rocket') {
      drawRocketScene(ctx, w, h, s, thrust)
    } else {
      drawSkaterScene(ctx, w, h, s)
    }
  })

  return (
    <SimFrame
      title="Third-Law Rocket Pad"
      brief="Beat the rocket's weight to lift off, hover to win the challenge — then flip to the ice rink to see two skaters push apart."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Rocket third-law simulation: a rocket on a launch pad with thrust and weight arrows, plus a two-skater push-off scene"
          role="img"
        />
      </div>

      {mode === 'rocket' ? (
        <div className="flex flex-wrap items-end gap-3">
          <SimSlider
            label="Engine thrust" value={thrust} min={0} max={6000} step={10} unit="N"
            onChange={setThrust}
          />
          <div className="flex gap-2">
            <SimButton onClick={() => setEngine((e) => !e)} variant={engine ? 'destructive' : 'default'}>
              <Rocket className="h-4 w-4 mr-1" aria-hidden />
              {engine ? 'Cut engine' : 'Launch'}
            </SimButton>
            <SimButton variant="secondary" onClick={() => { reset(); setEngine(false); setChallenge('idle') }}>
              <RotateCcw className="h-4 w-4 mr-1" aria-hidden /> Reset
            </SimButton>
            <SimButton
              variant={challenge === 'active' ? 'destructive' : 'outline'}
              onClick={() => { reset(); setEngine(true); setChallenge('active') }}
            >
              <Flag className="h-4 w-4 mr-1" aria-hidden />
              Challenge: hover 3 s
            </SimButton>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-end gap-3">
          <SimButton onClick={() => { st.current.skMoving = true }}>
            <Users className="h-4 w-4 mr-1" aria-hidden /> Push off!
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 mr-1" aria-hidden /> Reset
          </SimButton>
        </div>
      )}

      <SimToggle
        label="Two-skaters scene" checked={mode === 'skaters'}
        onChange={(v) => { setMode(v ? 'skaters' : 'rocket'); setEngine(false) }}
      />

      {mode === 'rocket' ? (
        <div className="flex flex-wrap gap-2">
          <Readout label="Thrust" value={thrust.toFixed(0)} unit="N" tone="text-amber-500" />
          <Readout label="Weight" value={WEIGHT.toFixed(0)} unit="N" tone="text-rose-500" />
          <Readout label="Net force" value={netF.toFixed(0)} unit="N" />
          <Readout label="a" value={acc.toFixed(2)} unit="m/s²" tone="text-violet-500" />
          <Readout label="Altitude" value={alt.toFixed(1)} unit="m" tone="text-teal-500" />
          {challenge === 'active' && (
            <Readout label="Hold (goal 3 s)" value={hold.toFixed(1)} unit="s" tone="text-amber-500" />
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Readout label="Speed (each)" value={SKATER_V.toFixed(1)} unit="m/s" tone="text-teal-500" />
          <Readout label="Separation" value={sep.toFixed(1)} unit="m" tone="text-violet-500" />
        </div>
      )}

      {result && (
        <p className="text-sm font-medium rounded-lg px-3 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
