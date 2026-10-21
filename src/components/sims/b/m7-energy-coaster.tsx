// ─── Sim: Energy Coaster · two hills, live KE/PE bars, friction you can switch ─
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimToggle, Readout,
  useSimCanvas, useSimBeep,
} from '@/components/sims/sim-kit'
import { Play, RotateCcw, Flag } from 'lucide-react'

const G = 9.8
const HILL2 = 8 // m, fixed
const LEN = 60 // m of track
const START_X = 4 // m, top of hill 1
const PEAK2_X = 34 // m
const MU = 0.08 // friction coefficient (per unit mass)

// cosine-interpolated waypoints; rebuilt whenever hill 1 changes
function buildTrack(h1: number) {
  const wps: [number, number][] = [
    [0, Math.max(0.4, h1 * 0.82)], [START_X, h1], [13, h1 * 0.35], [20, 0.4],
    [27, 3.2], [PEAK2_X, HILL2], [42, 2.2], [50, 0.6], [LEN, 0.6],
  ]
  const yAt = (x: number) => {
    for (let i = 0; i < wps.length - 1; i++) {
      const [x0, y0] = wps[i]
      const [x1, y1] = wps[i + 1]
      if (x >= x0 && x <= x1) {
        const u = (x - x0) / (x1 - x0 || 1)
        return y0 + (y1 - y0) * (1 - Math.cos(Math.PI * u)) / 2
      }
    }
    return 0.6
  }
  // fine sample by x, then re-sample uniformly in arc length
  const NF = 1400
  const fx: number[] = [], fy: number[] = [], arc: number[] = []
  for (let i = 0; i <= NF; i++) {
    const x = (i / NF) * LEN
    fx.push(x); fy.push(yAt(x))
    arc.push(i === 0 ? 0 : arc[i - 1] + Math.hypot(x - fx[i - 1], fy[i] - fy[i - 1]))
  }
  const Ltot = arc[NF]
  const N = 480
  const sx: number[] = [], sy: number[] = []
  let j = 0
  for (let i = 0; i < N; i++) {
    const s = (i / (N - 1)) * Ltot
    while (j < NF - 1 && arc[j + 1] < s) j++
    const u = (s - arc[j]) / (arc[j + 1] - arc[j] || 1)
    sx.push(fx[j] + (fx[j + 1] - fx[j]) * u)
    sy.push(fy[j] + (fy[j + 1] - fy[j]) * u)
  }
  const ds = Ltot / (N - 1)
  const idxAtX = (x: number) => {
    let best = 0, bd = Infinity
    for (let i = 0; i < N; i++) { const d = Math.abs(sx[i] - x); if (d < bd) { bd = d; best = i } }
    return best
  }
  return { n: N, ds, sx, sy, s0: idxAtX(START_X) * ds, s2: idxAtX(PEAK2_X) * ds, Ltot }
}

export function EnergyCoasterSim() {
  const [h1, setH1] = useState(10)
  const [friction, setFriction] = useState(false)
  const [running, setRunning] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [ro, setRo] = useState({ v: 0, h: 10, e: 98 })

  const beep = useSimBeep()
  const skip = useRef(0)
  const trackRef = useRef<{ h1: number; tr: ReturnType<typeof buildTrack> } | null>(null)

  const st = useRef({
    running: false, friction: false, h1: 10,
    s: 0, v: 0, stopped: true, prevS: 0,
    challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost',
  })

  const releaseCar = () => {
    const s = st.current
    const tr = trackRef.current?.tr
    s.s = tr ? tr.s0 : 0
    s.prevS = s.s
    s.v = 0
    s.stopped = false
    s.running = true
    setRunning(true)
    setResult('')
  }

  const reset = () => {
    const s = st.current
    const tr = trackRef.current?.tr
    s.s = tr ? tr.s0 : 0
    s.prevS = s.s
    s.v = 0
    s.stopped = true
    s.running = false
    s.challenge = 'idle'
    setRunning(false)
    setChallenge('idle')
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    // sync slider values into the sim loop (effect scope — not render)
    s.friction = friction
    s.h1 = h1
    if (!trackRef.current || trackRef.current.h1 !== s.h1) {
      trackRef.current = { h1: s.h1, tr: buildTrack(s.h1) }
      if (s.stopped) { s.s = trackRef.current.tr.s0; s.prevS = s.s; s.v = 0 }
    }
    const tr = trackRef.current.tr

    // ── physics (per unit mass, energy honest) ─────────────────────────────
    if (s.running && !s.stopped) {
      const sub = 4
      const sdt = dt / sub
      for (let i = 0; i < sub; i++) {
        const idx = Math.min(tr.n - 2, Math.max(1, Math.floor(s.s / tr.ds)))
        const sin = (tr.sy[idx + 1] - tr.sy[idx - 1]) / (2 * tr.ds)
        let a = -G * sin
        let held = false
        if (s.friction) {
          if (Math.abs(s.v) > 0.1) a -= MU * G * Math.sign(s.v)
          else if (Math.abs(G * sin) > MU * G) a -= MU * G * Math.sign(G * sin)
          else { a = 0; held = true; s.v = 0 }
        }
        const pv = s.v
        s.prevS = s.s
        s.v += a * sdt
        s.s += s.v * sdt

        // crossed hill 2 moving forward?
        if (s.prevS < tr.s2 && s.s >= tr.s2) {
          if (s.challenge === 'active') {
            const ok = !s.friction && Math.abs(s.h1 - HILL2) <= 0.2
            s.challenge = ok ? 'won' : 'lost'
            setChallenge(ok ? 'won' : 'lost')
            if (ok) { beep(660, 140); beep(880, 180) }
            setResult(ok
              ? `Made it over with ${s.v.toFixed(1)} m/s to spare! With no friction, hill 1 at ${s.h1.toFixed(1)} m exactly pays for the 8 m climb — that is energy conservation.`
              : s.friction
                ? 'Friction stole energy as heat! Switch friction OFF, set hill 1 to 8.0–8.2 m and try again.'
                : `Crested, but hill 1 is ${s.h1.toFixed(1)} m — the challenge wants 8.0–8.2 m. So close!`)
          }
        } else if (pv > 0.02 && s.v <= 0 && s.prevS < tr.s2 && s.challenge === 'active') {
          // forward motion died on the climb — never reached the peak
          s.challenge = 'lost'
          setChallenge('lost')
          setResult(Math.abs(s.h1 - HILL2) <= 0.2 && !s.friction
            ? 'A hair short! With no friction the car can only climb back to its starting height — set hill 1 to 8.0–8.2 m and it will just tip over the top.'
            : s.friction
              ? 'Friction turned useful energy into heat before the top. Switch friction OFF and set hill 1 to 8.0–8.2 m!'
              : `The car ran out of steam at height ${s.h1.toFixed(1)} m — it needed more than 8.0 m. Raise hill 1 a touch!`)
        }

        // bounds: start latch, track ends, or static friction holds the car
        if ((s.v < 0 && s.s <= tr.s0) || s.s <= 0) {
          s.s = Math.max(0, tr.s0); s.v = 0; s.stopped = true; s.running = false
          setRunning(false)
          if (s.challenge === 'active') {
            s.challenge = 'lost'; setChallenge('lost')
            setResult(`Rolled all the way back! With no friction the car can only return to its start height (${s.h1.toFixed(1)} m) — it needs more than 8.0 m. Try 8.0–8.2 m.`)
          } else {
            setResult(`Rolled back home — hill 1 at ${s.h1.toFixed(1)} m can't beat the 8 m hill${s.friction ? ' (plus friction losses)' : ''}.`)
          }
        } else if (s.s >= tr.Ltot) {
          s.s = tr.Ltot; s.v = 0; s.stopped = true; s.running = false
          setRunning(false)
        } else if (held) {
          s.stopped = true; s.running = false
          setRunning(false)
          if (s.challenge === 'active' && s.s < tr.s2) {
            s.challenge = 'lost'; setChallenge('lost')
            setResult(`Friction brought the car to rest at ${(tr.sy[idx] ?? 0).toFixed(1)} m — its energy became heat. Switch friction OFF and set hill 1 to 8.0–8.2 m!`)
          }
        }
        if (s.stopped) break
      }
    }

    // readouts
    const idx = Math.min(tr.n - 2, Math.max(1, Math.floor(s.s / tr.ds)))
    const f = (s.s - idx * tr.ds) / tr.ds
    const y = tr.sy[idx] + (tr.sy[idx + 1] - tr.sy[idx]) * f
    const ke = (s.v * s.v) / 2
    const pe = G * y
    skip.current += 1
    if (skip.current >= 6) {
      skip.current = 0
      setRo({ v: Math.abs(s.v), h: y, e: ke + pe })
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    const k = Math.min((w - 28) / LEN, (h - 74) / 14)
    const ox = 14
    const oy = h - 40
    const X = (m: number) => ox + m * k
    const Y = (m: number) => oy - m * k

    // ground
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.stroke()

    // track fill + line
    ctx.beginPath()
    for (let i = 0; i < tr.n; i++) {
      if (i === 0) ctx.moveTo(X(tr.sx[i]), Y(tr.sy[i])); else ctx.lineTo(X(tr.sx[i]), Y(tr.sy[i]))
    }
    ctx.lineTo(X(LEN), oy); ctx.lineTo(X(0), oy); ctx.closePath()
    ctx.fillStyle = CANVAS.panel
    ctx.fill()
    ctx.beginPath()
    for (let i = 0; i < tr.n; i++) {
      if (i === 0) ctx.moveTo(X(tr.sx[i]), Y(tr.sy[i])); else ctx.lineTo(X(tr.sx[i]), Y(tr.sy[i]))
    }
    ctx.strokeStyle = CANVAS.white
    ctx.lineWidth = 3
    ctx.stroke()

    // labels
    ctx.font = '11px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillStyle = CANVAS.orange
    ctx.fillText(`hill 1 · ${s.h1.toFixed(1)} m`, X(START_X), Y(s.h1) - 10)
    ctx.fillStyle = CANVAS.amber
    ctx.fillText('hill 2 · 8 m (fixed)', X(PEAK2_X), Y(HILL2) - 10)

    // car
    const cx = X(tr.sx[idx] + (tr.sx[idx + 1] - tr.sx[idx]) * f)
    const cy = Y(y)
    const ang = Math.atan2(Y(tr.sy[idx + 1]) - Y(tr.sy[idx]), X(tr.sx[idx + 1]) - X(tr.sx[idx]))
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(ang)
    ctx.fillStyle = CANVAS.orange
    ctx.strokeStyle = CANVAS.bg
    ctx.lineWidth = 1.5
    const bw = Math.max(14, 1.5 * k), bh = Math.max(8, 0.8 * k)
    ctx.beginPath()
    ctx.roundRect(-bw / 2, -bh - 2, bw, bh, 3)
    ctx.fill(); ctx.stroke()
    ctx.fillStyle = CANVAS.panelLight
    ctx.beginPath(); ctx.arc(-bw / 4, -1, 2.4, 0, Math.PI * 2); ctx.arc(bw / 4, -1, 2.4, 0, Math.PI * 2); ctx.fill()
    ctx.restore()

    // energy bars (J per kg)
    const E0 = G * s.h1
    const Emax = G * 12
    const bx0 = 58, bw2 = 24, gap = 14
    const bBot = 158, bTop = 34
    const bars: [string, number, string][] = [
      ['KE', ke, CANVAS.emerald],
      ['PE', pe, CANVAS.amber],
      ['heat', Math.max(0, E0 - ke - pe), CANVAS.rose],
    ]
    ctx.font = '10px ui-monospace, monospace'
    bars.forEach(([label, val, color], i) => {
      const bx = bx0 + i * (bw2 + gap)
      const bh2 = Math.max(0, Math.min(1, val / Emax)) * (bBot - bTop)
      ctx.fillStyle = CANVAS.panel
      ctx.fillRect(bx, bTop, bw2, bBot - bTop)
      ctx.fillStyle = color
      ctx.fillRect(bx, bBot - bh2, bw2, bh2)
      ctx.fillStyle = CANVAS.muted
      ctx.fillText(label, bx + bw2 / 2, bBot + 12)
      ctx.fillText(`${Math.round(val)}`, bx + bw2 / 2, bBot - bh2 - 4)
    })
    // total energy line
    const ey = bBot - (E0 / Emax) * (bBot - bTop)
    ctx.strokeStyle = CANVAS.fg
    ctx.setLineDash([4, 4])
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(bx0 - 6, ey); ctx.lineTo(bx0 + 3 * bw2 + 2 * gap + 6, ey); ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.fg
    ctx.textAlign = 'left'
    ctx.fillText('total (J/kg)', bx0 + 3 * bw2 + 2 * gap + 10, ey + 3)

    // banner
    if (s.challenge !== 'idle') {
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      if (s.challenge === 'active') {
        ctx.fillStyle = CANVAS.amber
        ctx.fillText('Challenge — friction OFF, set hill 1 so the car JUST crests the 8 m hill!', w / 2, 18)
      } else {
        ctx.fillStyle = s.challenge === 'won' ? CANVAS.emerald : CANVAS.rose
        ctx.fillText(s.challenge === 'won' ? '★ Barely made it — challenge complete!' : 'Not this time — think: PE at the start must cover the 8 m climb.', w / 2, 18)
      }
    }
  }, 400)

  return (
    <SimFrame
      title="Energy Coaster"
      brief="Release the car from the top of hill 1 and watch the KE/PE bars trade places. The dashed line is the total energy per kg — it never moves unless friction leaks heat."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Roller coaster with two hills; a car with live kinetic, potential and heat energy bars"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Hill 1 height" value={h1} min={2} max={12} step={0.1} unit="m" onChange={setH1} disabled={running} />
        <SimToggle label="Friction (loss ∝ distance)" checked={friction} onChange={setFriction} className="pb-1" />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={releaseCar} disabled={running}>
            <Play className="h-4 w-4 me-1" aria-hidden /> Release car
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => {
              setFriction(false)
              st.current.friction = false
              setChallenge('active'); st.current.challenge = 'active'
              setResult('')
              releaseCar()
            }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: just make it over
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Speed" value={ro.v.toFixed(1)} unit="m/s" tone="text-emerald-500" />
        <Readout label="Height" value={ro.h.toFixed(1)} unit="m" tone="text-amber-500" />
        <Readout label="KE + PE" value={ro.e.toFixed(0)} unit="J/kg" />
        <Readout label="Start PE" value={(G * h1).toFixed(0)} unit="J/kg" tone="text-orange-500" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
