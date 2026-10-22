// ─── Sim: Rolling Race · hoop vs disc vs sphere down an incline ───────────────
// a = g·sinθ / (1 + I/mR²) — hoop c=1, disc c=0.5, solid sphere c=0.4
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, Legend,
  useSimCanvas, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Play, RotateCcw, Flag } from 'lucide-react'

const G = 9.8 // m/s²
const LEN = 6 // m of ramp
const C = [1, 0.5, 0.4] // I/mR² for hoop, disc, sphere
const NAMES = ['Hoop', 'Disc', 'Sphere']
const COLORS = [CANVAS.amber, CANVAS.orange, CANVAS.teal]
const RAD = 12 // px radius of each roller
const OFFS = [16, 42, 68] // lane offsets above the ramp surface (px)

type Pick = 'hoop' | 'disc' | 'sphere'
const PICK_IDX: Record<Pick, number> = { hoop: 0, disc: 1, sphere: 2 }

const RESULT_WON =
  'You picked the solid sphere — and it won! Smallest I/mR² (0.4) means the biggest share of mgh becomes forward speed: a = g·sinθ/(1+0.4) beats 1.5 and 2.'
const RESULT_DISC =
  'Your disc finished 2nd — so close! Its c = I/mR² = 0.5 gives a = g·sinθ/1.5; only the sphere (c = 0.4) accelerates harder.'
const RESULT_HOOP =
  'Your hoop finished last. Its c = I/mR² = 1 stores half the energy as spin: a = g·sinθ/2 — the laziest roller on the ramp!'

export function RollingRaceSim() {
  const [angle, setAngle] = useState(15)
  const [pick, setPick] = useState<Pick>('hoop')
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [order, setOrder] = useState<string>('')
  const [running, setRunning] = useState(false)
  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({
    t: 0, running: false, done: false,
    x: [0, 0, 0], phi: [0, 0, 0], fin: [] as number[],
    challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost',
  })

  const accels = C.map((c) => (G * Math.sin((angle * Math.PI) / 180)) / (1 + c))

  const reset = () => {
    const s = st.current
    s.t = 0; s.running = false; s.done = false
    s.x = [0, 0, 0]; s.phi = [0, 0, 0]; s.fin = []
    s.challenge = 'idle'
    setRunning(false)
    setChallenge('idle'); setResult(''); setOrder('')
  }

  const finishRace = () => {
    const s = st.current
    setOrder(s.fin.map((i) => NAMES[i]).join(' → '))
    if (s.challenge !== 'active') return
    const my = PICK_IDX[pick]
    const place = s.fin.indexOf(my) + 1
    if (place === 1) {
      s.challenge = 'won'
      setChallenge('won')
      beep(660, 120); beep(880, 160)
      setResult(RESULT_WON)
    } else {
      s.challenge = 'lost'
      setChallenge('lost')
      setResult(pick === 'hoop' ? RESULT_HOOP : RESULT_DISC)
    }
  }

  const race = () => {
    const s = st.current
    s.t = 0; s.running = true; s.done = false
    s.x = [0, 0, 0]; s.phi = [0, 0, 0]; s.fin = []
    setRunning(true)
    setResult('')
    if (reducedMotion) {
      // no animation: settle the race instantly from t_i = √(2L/a)
      const times = accels.map((a) => Math.sqrt((2 * LEN) / a))
      s.fin = times.map((_, i) => i).sort((p, q) => times[p] - times[q])
      s.x = [LEN, LEN, LEN]
      s.running = false; s.done = true
      setRunning(false)
      finishRace()
    }
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    s.challenge = challenge
    const th = (angle * Math.PI) / 180
    const u = { x: Math.cos(th), y: -Math.sin(th) } // up the ramp
    const n = { x: -Math.sin(th), y: -Math.cos(th) } // away from the surface
    const span = w - 90 // px along the ramp
    const k = span / LEN // px per metre

    if (s.running) {
      s.t += dt
      let all = true
      for (let i = 0; i < 3; i++) {
        if (s.fin.includes(i)) continue
        s.x[i] = 0.5 * accels[i] * s.t * s.t
        if (s.x[i] >= LEN) { s.x[i] = LEN; s.fin.push(i) }
        if (!s.fin.includes(i)) all = false
      }
      for (let i = 0; i < 3; i++) s.phi[i] = (s.x[i] * k) / RAD
      if (all) { s.running = false; s.done = true; setRunning(false); finishRace() }
    }

    // ── draw ────────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const p0 = { x: 36, y: h - 64 }
    const p1 = { x: p0.x + u.x * span, y: p0.y + u.y * span }

    // ramp body
    ctx.fillStyle = CANVAS.panel
    ctx.beginPath()
    ctx.moveTo(p0.x, p0.y)
    ctx.lineTo(p1.x, p1.y)
    ctx.lineTo(p1.x, h - 16)
    ctx.lineTo(p0.x, h - 16)
    ctx.closePath(); ctx.fill()
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke()

    // lane guides
    for (const off of OFFS) {
      ctx.strokeStyle = CANVAS.grid; ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(p0.x + n.x * off, p0.y + n.y * off)
      ctx.lineTo(p1.x + n.x * off, p1.y + n.y * off)
      ctx.stroke()
    }

    // finish line at s = LEN
    const fx = p0.x + u.x * LEN * k, fy = p0.y + u.y * LEN * k
    ctx.strokeStyle = CANVAS.emerald; ctx.lineWidth = 3
    ctx.setLineDash([7, 5])
    ctx.beginPath()
    ctx.moveTo(fx, fy)
    ctx.lineTo(fx + n.x * 84, fy + n.y * 84)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.emerald
    ctx.beginPath()
    ctx.moveTo(fx + n.x * 84, fy + n.y * 84)
    ctx.lineTo(fx + n.x * 84 - u.x * 14, fy + n.y * 84 - u.y * 14)
    ctx.lineTo(fx + n.x * 84 + n.x * 12, fy + n.y * 84 + n.y * 12)
    ctx.closePath(); ctx.fill()
    ctx.font = 'bold 10px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText('FINISH', fx + n.x * 96, fy + n.y * 96)

    // the three rollers
    for (let i = 0; i < 3; i++) {
      const cx = p0.x + u.x * s.x[i] * k + n.x * OFFS[i]
      const cy = p0.y + u.y * s.x[i] * k + n.y * OFFS[i]
      ctx.fillStyle = CANVAS.bg
      ctx.strokeStyle = COLORS[i]; ctx.lineWidth = 3
      ctx.beginPath(); ctx.arc(cx, cy, RAD, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // spokes show the spin (φ = x/R, no slipping)
      for (let a2 = 0; a2 < 2; a2++) {
        ctx.beginPath()
        ctx.moveTo(cx - Math.cos(s.phi[i] + a2 * Math.PI / 2) * RAD, cy - Math.sin(s.phi[i] + a2 * Math.PI / 2) * RAD)
        ctx.lineTo(cx + Math.cos(s.phi[i] + a2 * Math.PI / 2) * RAD, cy + Math.sin(s.phi[i] + a2 * Math.PI / 2) * RAD)
        ctx.stroke()
      }
      const place = s.fin.indexOf(i)
      ctx.fillStyle = COLORS[i]
      ctx.font = 'bold 11px ui-sans-serif, system-ui'
      ctx.fillText(NAMES[i], cx + n.x * 24, cy + n.y * 24)
      if (place >= 0) {
        ctx.font = 'bold 12px ui-monospace, monospace'
        ctx.fillText(`${place + 1}${place === 0 ? 'st' : place === 1 ? 'nd' : 'rd'}`, cx - n.x * 26, cy - n.y * 26)
      }
    }

    // angle label at the base
    ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-monospace, monospace'
    ctx.fillText(`θ = ${angle}°`, p0.x + 34, p0.y + 18)

    // banner
    ctx.textAlign = 'center'
    if (s.challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: pick the winner in the select, then press Race!', w / 2, 20)
    } else if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Winner predicted correctly!', w / 2, 20)
    } else if (s.challenge === 'lost') {
      ctx.fillStyle = CANVAS.rose; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('Wrong pick — watch which object crosses first!', w / 2, 20)
    }
  }, 400)

  return (
    <SimFrame
      title="Rolling Race"
      brief="Hoop, disc and solid sphere — same mass, same radius — race down an incline: a = g·sinθ/(1 + I/mR²). Energy spent on spinning is energy not spent on speed."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Three rollers — hoop, disc and solid sphere — racing down an inclined ramp toward a finish line, their spokes showing rotation"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Incline angle" value={angle} min={5} max={25} step={1} unit="°" onChange={setAngle} disabled={running} />
        <SimSelect
          label="Your pick"
          value={pick}
          options={[
            { value: 'hoop', label: 'Hoop (I = mR²)' },
            { value: 'disc', label: 'Disc (I = ½mR²)' },
            { value: 'sphere', label: 'Solid sphere (I = 2/5 mR²)' },
          ]}
          onChange={setPick}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={race} disabled={running}>
            <Play className="h-4 w-4 me-1" aria-hidden /> Race!
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { setChallenge('active'); setResult(''); setOrder('') }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: pick the winner
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Hoop a" value={accels[0].toFixed(2)} unit="m/s²" tone="text-amber-500" />
        <Readout label="Disc a" value={accels[1].toFixed(2)} unit="m/s²" tone="text-orange-500" />
        <Readout label="Sphere a" value={accels[2].toFixed(2)} unit="m/s²" tone="text-teal-500" />
        <Readout label="Finish order" value={order || '—'} />
      </div>
      <div className="flex flex-wrap gap-4">
        <Legend color={CANVAS.amber} label="hoop" />
        <Legend color={CANVAS.orange} label="disc" />
        <Legend color={CANVAS.teal} label="solid sphere" />
        <Legend color={CANVAS.emerald} label="finish line" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
