// ─── Sim: Orbit Sandbox · launch a satellite, chase circular & escape ─────────
// GM = 62.5 units³/s², planet R = 1 (drawn 26 px). v_circ = √(GM/r), v_esc = √(2GM/r)
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, Legend, drawGrid,
  useSimCanvas, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Rocket, RotateCcw, Flag } from 'lucide-react'

const GM = 62.5 // sim units³/s²
const PX = 26 // px per sim unit (planet R = 1 → 26 px)
const WIN_BAND = 12 // seconds of stability the challenge demands
const BAND_LO = 1.85
const BAND_HI = 2.15

type PresetId = 'fall' | 'suborbital' | 'circular' | 'escape'
const PRESETS: { value: PresetId; label: string; r: number; v: number }[] = [
  { value: 'fall', label: 'Fall (v = 2)', r: 1.5, v: 2 },
  { value: 'suborbital', label: 'Sub-orbital (v = 4)', r: 1.5, v: 4 },
  { value: 'circular', label: 'Circular at 2R (v = 5.6)', r: 2, v: 5.6 },
  { value: 'escape', label: 'Escape (v = 9)', r: 2, v: 9 },
]

// Deterministic starfield (same sky every frame — no flicker, SSR-safe)
const STARS = (() => {
  let seed = 7
  const rnd = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  return Array.from({ length: 70 }, () => ({
    x: rnd(), y: rnd(), r: 0.6 + rnd() * 1.2, a: 0.15 + rnd() * 0.5,
  }))
})()

type Phase = 'ready' | 'flying' | 'crashed' | 'escaped'
type ChallengeState = 'idle' | 'active' | 'won' | 'lost'

export function OrbitSandboxSim() {
  const [alt, setAlt] = useState(1.5)
  const [spd, setSpd] = useState(2)
  const [preset, setPreset] = useState<PresetId>('fall')
  const [phase, setPhase] = useState<Phase>('ready')
  const [challenge, setChallenge] = useState<ChallengeState>('idle')
  const [result, setResult] = useState('')
  /** live radius/speed mirrored into state for the readout row (throttled, ref-free render) */
  const [live, setLive] = useState({ r: 1.5, v: 2 })

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({
    x: 1.5, y: 0, vx: 0, vy: 0, // satellite, sim units (planet at origin)
    trail: [] as number[],
    E: 0, rBar: 0, // launch energy, running mean radius (for live classification)
    inBand: 0, readAcc: 0, // challenge timer, readout throttle
    challenge: 'idle' as ChallengeState,
  })

  const rNow = phase === 'ready' ? alt : live.r
  const vNow = phase === 'ready' ? spd : live.v
  const vCirc = Math.sqrt(GM / Math.max(rNow, 0.01))
  const vEsc = Math.sqrt((2 * GM) / Math.max(rNow, 0.01))

  /** Live classification: crash / escape / bound, circular when r hugs its mean (±2%). */
  const classify = (r: number, rBar: number, E: number): string => {
    if (r > 10) return 'Escaped'
    if (r < 1.02) return 'Crashed'
    if (E >= 0) return 'Escape (unbound)'
    if (Math.abs(r - rBar) < 0.02 * rBar) return 'Circular (bound)'
    return 'Ellipse (bound)'
  }

  /** Put the satellite back on the launch pad (only when not in flight). */
  const syncReady = (r: number = alt) => {
    if (phase === 'flying') return
    const s = st.current
    s.x = r; s.y = 0; s.vx = 0; s.vy = 0
    s.trail = []
    s.inBand = 0
    if (phase !== 'ready') setPhase('ready')
  }

  const resetToReady = () => {
    const s = st.current
    s.x = alt; s.y = 0; s.vx = 0; s.vy = 0
    s.trail = []
    s.inBand = 0
    setPhase('ready')
  }

  const launch = () => {
    const s = st.current
    const r0 = alt
    s.x = r0; s.y = 0; s.vx = 0; s.vy = -spd // horizontal launch, tangential
    s.trail = [s.x, s.y]
    s.E = 0.5 * spd * spd - GM / r0
    s.rBar = r0
    s.inBand = 0
    s.readAcc = 0
    setLive({ r: r0, v: spd })
    setPhase('flying')
    setResult('')
  }

  const fullReset = () => {
    st.current.challenge = 'idle'
    setChallenge('idle')
    setResult('')
    resetToReady()
  }

  const startChallenge = () => {
    st.current.challenge = 'active'
    setChallenge('active')
    setResult('Goal: hold the orbit inside r = 1.85–2.15 R for 12 s of flight. At r = 2R the circular speed is v = √(GM/r) = √(62.5/2) ≈ 5.6 units/s — the \'Circular at 2R (v = 5.6)\' preset sets both sliders, then press Launch.')
    resetToReady()
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    s.challenge = challenge
    const cx = w / 2
    const cy = h / 2

    // ── physics: velocity-Verlet, sub-stepped ───────────────────────────────
    if (phase === 'flying') {
      const n = Math.max(1, Math.ceil(dt / 0.005))
      const hh = dt / n
      for (let i = 0; i < n; i++) {
        const r2 = s.x * s.x + s.y * s.y
        const r = Math.sqrt(r2)
        const g1 = -GM / (r2 * r)
        const ax1 = g1 * s.x, ay1 = g1 * s.y
        s.x += s.vx * hh + 0.5 * ax1 * hh * hh
        s.y += s.vy * hh + 0.5 * ay1 * hh * hh
        const r2n = s.x * s.x + s.y * s.y
        const rn = Math.sqrt(r2n)
        const g2 = -GM / (r2n * rn)
        s.vx += 0.5 * (ax1 + g2 * s.x) * hh
        s.vy += 0.5 * (ay1 + g2 * s.y) * hh
        if (rn < 1.02) {
          setPhase('crashed')
          if (s.challenge === 'active') {
            s.challenge = 'lost'
            setChallenge('lost')
            setResult(`Crashed into the planet! At r = ${alt.toFixed(1)} R the circular speed is √(GM/r) ≈ ${Math.sqrt(GM / alt).toFixed(2)} units/s — slower launches fall in. Try the 'Circular at 2R (v = 5.6)' preset, then Launch.`)
          }
          break
        }
        if (rn > 10) {
          setPhase('escaped')
          if (s.challenge === 'active') {
            s.challenge = 'lost'
            setChallenge('lost')
            setResult(`Escaped into space! Your ${spd.toFixed(1)} units/s met or beat the escape speed √(2GM/r) ≈ ${Math.sqrt((2 * GM) / alt).toFixed(2)} — the planet can never reel it back. For a circular orbit you need LESS than that: v = √(GM/r).`)
          }
          break
        }
      }
      s.trail.push(s.x, s.y)
      if (s.trail.length > 1000) s.trail.splice(0, s.trail.length - 1000)
      s.rBar += (Math.hypot(s.x, s.y) - s.rBar) * Math.min(1, dt * 2.5)

      // throttle the live readout (~8 Hz keeps React out of the physics hot path)
      s.readAcc += dt
      if (s.readAcc >= 0.12) {
        s.readAcc = 0
        setLive({ r: Math.hypot(s.x, s.y), v: Math.hypot(s.vx, s.vy) })
      }

      // challenge: 12 s continuously inside the band
      if (s.challenge === 'active' && phase === 'flying') {
        const r = Math.hypot(s.x, s.y)
        if (r >= BAND_LO && r <= BAND_HI) {
          s.inBand += dt
          if (s.inBand >= WIN_BAND) {
            s.challenge = 'won'
            setChallenge('won')
            beep(660, 120); beep(880, 160)
            setResult(`★ Stable orbit! r stayed inside 1.85–2.15 R for 12 s. Gravity bent your ${spd.toFixed(1)} units/s sideways exactly as fast as you fell — v = √(GM/r) = √(62.5/2) ≈ 5.6 units/s is the circular recipe at 2R.`)
          }
        } else {
          s.inBand = 0
        }
      }
    }

    // ── draw ────────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    // starfield + faint grid
    ctx.fillStyle = CANVAS.white
    for (const star of STARS) {
      ctx.globalAlpha = star.a
      ctx.beginPath(); ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2); ctx.fill()
    }
    ctx.globalAlpha = 1
    drawGrid(ctx, w, h)

    // launch / target guide rings
    ctx.setLineDash([5, 6])
    ctx.strokeStyle = CANVAS.grid
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(cx, cy, alt * PX, 0, Math.PI * 2); ctx.stroke()
    if (s.challenge === 'active' || s.challenge === 'won') {
      ctx.strokeStyle = CANVAS.teal
      ctx.globalAlpha = 0.55
      ctx.beginPath(); ctx.arc(cx, cy, 2 * PX, 0, Math.PI * 2); ctx.stroke()
      ctx.globalAlpha = 0.16
      ctx.lineWidth = 0.3 * PX
      ctx.beginPath(); ctx.arc(cx, cy, 2 * PX, 0, Math.PI * 2); ctx.stroke()
      ctx.globalAlpha = 1
    }
    ctx.setLineDash([])

    // planet (R = 1 → 26 px)
    ctx.fillStyle = CANVAS.orange
    ctx.beginPath(); ctx.arc(cx, cy, PX, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = 'rgba(28,25,23,0.35)'
    ctx.beginPath(); ctx.arc(cx + PX * 0.28, cy + PX * 0.28, PX * 0.72, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.amber; ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(cx, cy, PX, 0, Math.PI * 2); ctx.stroke()
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 10px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText('R = 1', cx, cy - PX - 8)

    // trail (fading, unless reduced motion → uniform)
    const nPts = s.trail.length / 2
    if (nPts >= 2) {
      if (reducedMotion) {
        ctx.strokeStyle = CANVAS.yellow; ctx.globalAlpha = 0.4; ctx.lineWidth = 1.5
        ctx.beginPath()
        for (let i = 0; i < nPts; i++) {
          const px = cx + s.trail[i * 2] * PX, py = cy + s.trail[i * 2 + 1] * PX
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
        }
        ctx.stroke(); ctx.globalAlpha = 1
      } else {
        ctx.lineWidth = 1.5
        for (let i = 1; i < nPts; i++) {
          ctx.strokeStyle = CANVAS.yellow
          ctx.globalAlpha = 0.05 + 0.5 * (i / nPts)
          ctx.beginPath()
          ctx.moveTo(cx + s.trail[(i - 1) * 2] * PX, cy + s.trail[(i - 1) * 2 + 1] * PX)
          ctx.lineTo(cx + s.trail[i * 2] * PX, cy + s.trail[i * 2 + 1] * PX)
          ctx.stroke()
        }
        ctx.globalAlpha = 1
      }
    }

    // satellite + velocity arrow
    const sx = cx + s.x * PX, sy = cy + s.y * PX
    ctx.fillStyle = CANVAS.yellow
    ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.fg; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.stroke()
    const vmag = Math.hypot(s.vx, s.vy)
    if (vmag > 0.01) {
      const L = Math.min(84, vmag * 7)
      const ux = s.vx / vmag, uy = s.vy / vmag
      ctx.strokeStyle = CANVAS.amber; ctx.lineWidth = 2.5
      ctx.beginPath(); ctx.moveTo(sx + ux * 7, sy + uy * 7); ctx.lineTo(sx + ux * L, sy + uy * L); ctx.stroke()
      ctx.fillStyle = CANVAS.amber
      ctx.beginPath()
      ctx.moveTo(sx + ux * (L + 6), sy + uy * (L + 6))
      ctx.lineTo(sx + ux * L - uy * 4, sy + uy * L + ux * 4)
      ctx.lineTo(sx + ux * L + uy * 4, sy + uy * L - ux * 4)
      ctx.closePath(); ctx.fill()
      ctx.font = 'bold 11px ui-monospace, monospace'; ctx.textAlign = 'left'
      ctx.fillText(`v = ${vmag.toFixed(2)}`, sx + ux * (L + 12) + 2, sy + uy * (L + 12))
    }

    // status line (predicted before launch, live classification while flying)
    ctx.font = 'bold 12px ui-monospace, monospace'; ctx.textAlign = 'left'
    if (phase === 'ready') {
      const p = (alt * alt * spd * spd) / GM
      const ecc = Math.abs(1 - p / alt)
      const E = 0.5 * spd * spd - GM / alt
      const rp = E < 0 ? (-GM / (2 * E)) * (1 - ecc) : 0
      let pred: string
      if (spd < 0.05) pred = 'Falls straight in'
      else if (E >= 0) pred = 'Escape'
      else if (rp < 1.02) pred = 'Crash course'
      else if (ecc < 0.02) pred = 'Circular'
      else pred = 'Ellipse'
      ctx.fillStyle = CANVAS.muted
      ctx.fillText(`Predicted: ${pred}`, 14, h - 14)
    } else {
      const r = Math.hypot(s.x, s.y)
      const cls = classify(r, s.rBar, s.E)
      ctx.fillStyle = cls.startsWith('Circular') ? CANVAS.emerald : cls.startsWith('Escape') || cls.startsWith('Escaped') || cls.startsWith('Crash') ? CANVAS.rose : CANVAS.teal
      ctx.fillText(`Trajectory: ${cls}`, 14, h - 14)
    }

    // challenge banner + 12 s stability bar
    ctx.textAlign = 'center'
    if (s.challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: stable circular orbit at r = 2R — hold for 12 s!', w / 2, 30)
      const bw = Math.min(300, w - 120)
      const frac = Math.min(1, s.inBand / WIN_BAND)
      ctx.fillStyle = CANVAS.panelLight
      ctx.fillRect(w / 2 - bw / 2, 38, bw, 8)
      ctx.fillStyle = CANVAS.teal
      ctx.fillRect(w / 2 - bw / 2, 38, bw * frac, 8)
      ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1
      ctx.strokeRect(w / 2 - bw / 2, 38, bw, 8)
      ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
      ctx.fillText(`stable ${s.inBand.toFixed(1)} / ${WIN_BAND} s`, w / 2, 58)
    } else if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Circular orbit achieved — challenge complete!', w / 2, 30)
    } else if (s.challenge === 'lost') {
      ctx.fillStyle = CANVAS.rose; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText(phase === 'crashed' ? 'Crashed — aim for v ≈ 5.6 at 2R and try again!' : 'Escaped — that speed never comes back. Try again!', w / 2, 30)
    }
  }, 420)

  return (
    <SimFrame
      title="Orbit Sandbox"
      brief="Launch a satellite horizontally from altitude r with speed v. Gravity pulls a = GM/r² toward the planet: too slow crashes, v = √(GM/r) circles, v ≥ √(2GM/r) escapes."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 420 }}
          aria-label="A planet at the centre of a starry sandbox with a launchable satellite: sliders set launch altitude and horizontal speed, a trail shows the trajectory, and the readouts track radius, speed and the circular and escape speeds"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSelect
          label="Preset orbits" value={preset}
          options={PRESETS.map((p) => ({ value: p.value, label: p.label }))}
          onChange={(v) => {
            const p = PRESETS.find((q) => q.value === v) ?? PRESETS[0]
            setPreset(v)
            setAlt(p.r)
            setSpd(p.v)
            st.current.challenge = 'idle'
            setChallenge('idle')
            setResult('')
            setLive({ r: p.r, v: p.v })
            st.current.x = p.r; st.current.y = 0; st.current.vx = 0; st.current.vy = 0
            st.current.trail = []
            setPhase('ready')
          }}
        />
        <SimSlider label="Altitude r" value={alt} min={1.2} max={6} step={0.1} unit="R" onChange={(v) => { setAlt(v); syncReady(v) }} disabled={phase === 'flying'} />
        <SimSlider label="Launch speed v" value={spd} min={0} max={12} step={0.1} unit="units/s" onChange={(v) => { setSpd(v); syncReady() }} disabled={phase === 'flying'} />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={launch} disabled={phase === 'flying'}>
            <Rocket className="h-4 w-4 me-1" aria-hidden /> Launch
          </SimButton>
          <SimButton variant="secondary" onClick={fullReset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: stable orbit at 2R
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Radius r" value={rNow.toFixed(2)} unit="R" tone="text-orange-500" />
        <Readout label="Speed v" value={vNow.toFixed(2)} unit="units/s" tone="text-amber-500" />
        <Readout label="Circular speed √(GM/r)" value={vCirc.toFixed(2)} unit="units/s" tone="text-teal-500" />
        <Readout label="Escape speed √(2GM/r)" value={vEsc.toFixed(2)} unit="units/s" tone="text-rose-500" />
      </div>
      <div className="flex flex-wrap gap-4">
        <Legend color={CANVAS.orange} label="planet (R = 1)" />
        <Legend color={CANVAS.yellow} label="satellite + trail" />
        <Legend color={CANVAS.amber} label="velocity arrow" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : challenge === 'lost' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-muted/60 text-foreground'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
