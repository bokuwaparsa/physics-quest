// ─── Sim: Matter Wave Slit · λ = h/mv, one particle at a time ────────────────
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, SimToggle, Readout, Legend,
  useSimCanvas, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw, Zap } from 'lucide-react'

type ParticleId = 'electron' | 'neutron' | 'c60'
type ChState = 'idle' | 'active' | 'won' | 'lost'

const HBAR_OVER_2 = 5.27e-35 // J·s (for the banner note)
const H = 6.626e-34 // J·s
const PARTS: { value: ParticleId; label: string; name: string; m: number; vMin: number; vMax: number; vDef: number; vStep: number }[] = [
  { value: 'electron', label: 'Electron', name: 'electron', m: 9.109e-31, vMin: 1e5, vMax: 3e6, vDef: 1e6, vStep: 1e4 },
  { value: 'neutron', label: 'Neutron', name: 'neutron', m: 1.675e-27, vMin: 200, vMax: 4000, vDef: 1000, vStep: 10 },
  { value: 'c60', label: 'Fullerene C₆₀', name: 'C₆₀ molecule', m: 1.1956e-24, vMin: 50, vMax: 500, vDef: 100, vStep: 5 },
]

const D_M = 10e-6 // slit separation (m)
const L_M = 1.0 // slit→detector distance (m)

/** Deterministic PRNG so the pattern builds the same way every run. */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const N_BINS = 80
const GOAL = 80 // challenge: accumulated dots

export function MatterWaveSlitSim() {
  const [particle, setParticle] = useState<ParticleId>('electron')
  const [speed, setSpeed] = useState(1e6) // m/s
  const [whichPath, setWhichPath] = useState(false)
  const [autoFire, setAutoFire] = useState(true)
  const [challenge, setChallenge] = useState<ChState>('idle')
  const [result, setResult] = useState('')
  const [note, setNote] = useState('')
  const [landed, setLanded] = useState(0) // mirror of total.current for the readout

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const bins = useRef<number[]>(new Array(N_BINS).fill(0))
  const dots = useRef<{ y: number; xo: number }[]>([])
  const flights = useRef<{ x: number; y: number; ty: number }[]>([])
  const total = useRef(0)
  const fireAcc = useRef(0)
  const uiAcc = useRef(0)
  const lastDetH = useRef(292)
  const rng = useRef(mulberry32(20250420))
  const cdf = useRef<Float64Array>(new Float64Array(0))
  const cdfKey = useRef('')
  const chRef = useRef(challenge)
  useEffect(() => { chRef.current = challenge }, [challenge])

  const part = PARTS.find((p) => p.value === particle) ?? PARTS[0]
  const lamM = H / (part.m * speed) // m
  const lamPm = lamM * 1e12 // pm
  const dyUm = (lamM * L_M / D_M) * 1e6 // fringe spacing, μm
  // schematic on-screen fringe spacing (px), monotonic in λ; true Δy lives in the readout
  const fringePx = 6 + 38 * (Math.log10(Math.max(lamPm, 0.4)) / Math.log10(8000))

  const fmtSpeed = (v: number) => (v >= 1e6 ? `${(v / 1e6).toFixed(2)}×10⁶` : v >= 1000 ? `${(v / 1000).toFixed(2)}×10³` : v.toFixed(0))

  const clearPattern = () => {
    bins.current = new Array(N_BINS).fill(0)
    dots.current = []
    flights.current = []
    total.current = 0
  }

  const sampleLanding = (detH: number): number => {
    const half = detH / 2 - 6
    if (whichPath) {
      // observed: particle went through ONE slit → two plain clumps
      const side = rng.current() < 0.5 ? -1 : 1
      const g = Math.sqrt(-2 * Math.log(Math.max(1e-9, rng.current()))) * Math.cos(2 * Math.PI * rng.current())
      return side * 0.5 * half + g * 0.07 * half
    }
    // unobserved: interference probability I(v) = cos²(πFv)·envelope
    const key = `${fringePx.toFixed(2)}|${detH}`
    if (cdfKey.current !== key) {
      const N = 160
      const c = new Float64Array(N)
      let s = 0
      for (let i = 0; i < N; i++) {
        const v = -1 + (2 * i) / (N - 1)
        const env = Math.max(0, Math.cos((Math.PI * v) / 2.35)) ** 2
        s += Math.cos(Math.PI * (detH / fringePx) * v) ** 2 * env
        c[i] = s
      }
      for (let i = 0; i < N; i++) c[i] /= s
      cdf.current = c
      cdfKey.current = key
    }
    const u = rng.current()
    const c = cdf.current
    let i = 0
    while (i < c.length - 1 && c[i] < u) i++
    const v = -1 + (2 * i) / (c.length - 1)
    return v * half + (rng.current() - 0.5) * 3
  }

  const fireOne = (detH: number) => {
    const ty = sampleLanding(detH)
    if (reducedMotion) {
      // no flight animation — land immediately (still user-triggered or auto)
      const bi = Math.max(0, Math.min(N_BINS - 1, Math.floor(((ty + detH / 2) / detH) * N_BINS)))
      bins.current[bi]++
      dots.current.push({ y: ty, xo: 2 + rng.current() * 8 })
      if (dots.current.length > 2600) dots.current.shift()
      total.current++
      checkWin()
    } else {
      flights.current.push({ x: 96, y: 0, ty })
    }
  }

  const winNow = () => {
    chRef.current = 'won'
    beep(660, 120); beep(880, 160)
    setChallenge('won')
    setResult(`${GOAL} dots and counting — the fringes are unmistakable. Each particle landed at ONE spot, yet the crowd of landings obeys the wave's probability map. That is wave–particle duality in one picture.`)
  }

  const checkWin = () => {
    if (chRef.current === 'active' && total.current >= GOAL) winNow()
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    if (w < 60 || h < 60) return

    const detTop = 44
    const detBot = h - 64
    const detH = detBot - detTop
    lastDetH.current = detH
    const detY0 = detTop + detH / 2
    const screenX = w - 58
    const wallX = Math.round(w * 0.4)

    // ── firing ──────────────────────────────────────────────────────────────
    uiAcc.current += dt
    if (uiAcc.current > 0.25) {
      uiAcc.current = 0
      setLanded(total.current)
    }
    if (autoFire && !reducedMotion) {
      fireAcc.current += dt * 16
      while (fireAcc.current >= 1) { fireAcc.current -= 1; fireOne(detH) }
    }
    // flights → landings
    if (!reducedMotion) {
      const still: typeof flights.current = []
      for (const f of flights.current) {
        f.x += (screenX - 96) * dt / 0.85
        if (f.x >= screenX - 4) {
          const bi = Math.max(0, Math.min(N_BINS - 1, Math.floor(((f.ty + detH / 2) / detH) * N_BINS)))
          bins.current[bi]++
          dots.current.push({ y: f.ty, xo: 2 + rng.current() * 8 })
          if (dots.current.length > 2600) dots.current.shift()
          total.current++
          checkWin()
        } else {
          still.push(f)
        }
      }
      flights.current = still
    }

    // ── source gun ──────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(18, detY0 - 26, 56, 52)
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.strokeRect(18, detY0 - 26, 56, 52)
    ctx.fillStyle = CANVAS.amber
    ctx.beginPath(); ctx.arc(46, detY0, 6, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText(`1 ${part.name} at a time`, 46, detY0 - 34)

    // ── double slit barrier ─────────────────────────────────────────────────
    const slitHalf = 26
    ctx.fillStyle = CANVAS.panelLight
    ctx.fillRect(wallX - 4, detTop, 8, detY0 - 58 - detTop)
    ctx.fillRect(wallX - 4, detY0 - slitHalf, 8, 2 * slitHalf)
    ctx.fillRect(wallX - 4, detY0 + 58, 8, detBot - (detY0 + 58))
    ctx.fillStyle = CANVAS.muted
    ctx.fillText('double slit', wallX, detBot + 16)
    ctx.fillText(`d = 10 μm`, wallX, detBot + 30)
    if (whichPath) {
      // which-path detector eye
      ctx.fillStyle = CANVAS.rose
      ctx.font = 'bold 14px ui-sans-serif, system-ui'
      ctx.fillText('◉', wallX, detY0 - 70)
      ctx.font = '10px ui-monospace, monospace'
      ctx.fillText('which-path ON', wallX, detY0 - 84)
    }

    // ── in-flight particles ─────────────────────────────────────────────────
    if (!reducedMotion) {
      ctx.fillStyle = CANVAS.amber
      for (const f of flights.current) {
        ctx.beginPath(); ctx.arc(f.x, detY0 + f.ty * 0.55, 2.5, 0, Math.PI * 2); ctx.fill()
      }
    }

    // ── detector + histogram ────────────────────────────────────────────────
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(screenX, detTop - 6); ctx.lineTo(screenX, detBot + 6); ctx.stroke()
    const maxBin = Math.max(1, ...bins.current)
    const binH = detH / N_BINS
    for (let i = 0; i < N_BINS; i++) {
      const b = bins.current[i]
      if (!b) continue
      const len = (b / maxBin) * 96
      ctx.fillStyle = CANVAS.emerald
      ctx.globalAlpha = 0.85
      ctx.fillRect(screenX - len, detTop + i * binH, len, Math.max(1.5, binH - 1))
      ctx.globalAlpha = 1
    }
    // landed dots
    ctx.fillStyle = CANVAS.amber
    ctx.globalAlpha = 0.55
    for (const d of dots.current) {
      ctx.fillRect(screenX - d.xo - 1.5, detY0 + d.y - 1, 3, 2.4)
    }
    ctx.globalAlpha = 1
    // expected intensity curve (the wave's prediction)
    ctx.strokeStyle = whichPath ? CANVAS.rose : CANVAS.white
    ctx.globalAlpha = 0.3
    ctx.lineWidth = 1.5
    ctx.beginPath()
    for (let i = 0; i <= 120; i++) {
      const v = -1 + (2 * i) / 120
      const yy = detY0 + v * (detH / 2 - 6)
      let inten: number
      if (whichPath) {
        inten = Math.exp(-((v - 0.5) ** 2) / (2 * 0.07 ** 2)) + Math.exp(-((v + 0.5) ** 2) / (2 * 0.07 ** 2))
        inten /= 2
      } else {
        const env = Math.max(0, Math.cos((Math.PI * v) / 2.35)) ** 2
        inten = Math.cos(Math.PI * (detH / fringePx) * v) ** 2 * env
      }
      const xx = screenX - 8 - inten * 96
      if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy)
    }
    ctx.stroke()
    ctx.globalAlpha = 1
    ctx.fillStyle = CANVAS.muted; ctx.textAlign = 'center'
    ctx.fillText('detector screen', screenX - 10, detTop - 16)

    // ── footer notes ────────────────────────────────────────────────────────
    ctx.textAlign = 'left'
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
    ctx.fillText(`λ = h/(mv) = ${lamPm < 10 ? lamPm.toFixed(2) : lamPm.toFixed(0)} pm · on-screen spacing exaggerated; true Δy = λL/d in the readout`, 16, h - 28)
    ctx.fillText(`ℏ/2 = ${HBAR_OVER_2.toExponential(2)} J·s — the trade nature never breaks`, 16, h - 14)

    // ── challenge banner ────────────────────────────────────────────────────
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText(`Challenge: let ${GOAL} particles land — watch the pattern emerge! (${total.current}/${GOAL})`, w / 2, 22)
    } else if (challenge === 'won' || challenge === 'lost') {
      ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText(challenge === 'won' ? '★ Challenge complete!' : 'Something went sideways — reset and refire!', w / 2, 22)
    }
  }, 400)

  const toggleWhichPath = (v: boolean) => {
    setWhichPath(v)
    setNote(v
      ? 'Which-path detector ON: knowing which slit each particle used destroys the superposition — new dots pile into two plain clumps. Observation collapses the interference.'
      : 'Which-path detector OFF: each particle explores both slits again, so fringes resume building.')
  }

  const switchParticle = (p: ParticleId) => {
    setParticle(p)
    const def = PARTS.find((x) => x.value === p) ?? PARTS[0]
    setSpeed(def.vDef)
    clearPattern()
  }

  return (
    <SimFrame
      title="Matter-Wave Double Slit"
      brief="Fire particles one at a time at a double slit. Each lands as a single dot — yet the dots accumulate into interference fringes with spacing Δy = λL/d. Flip the which-path detector and the fringes die."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A particle gun fires single particles at a double slit; dots accumulate on a detector screen into an interference histogram, and a which-path detector toggle collapses the pattern into two clumps"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <Legend color={CANVAS.amber} label="particle dot" />
        <Legend color={CANVAS.emerald} label="accumulated hits" />
        <Legend color={CANVAS.white} label="wave prediction" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSelect
          label="Particle" value={particle}
          options={PARTS.map((p) => ({ value: p.value, label: p.label }))}
          onChange={switchParticle}
        />
        <SimSlider
          label="Speed" value={speed} min={part.vMin} max={part.vMax} step={part.vStep} unit="m/s"
          onChange={(v) => { setSpeed(v); clearPattern() }}
          format={fmtSpeed}
        />
        <SimToggle label="Which-path detector" checked={whichPath} onChange={toggleWhichPath} />
        <SimToggle label="Auto fire" checked={autoFire} onChange={setAutoFire} />
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={() => { clearPattern(); rng.current = mulberry32(20250420); setChallenge('idle'); setResult(''); setNote('') }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton variant="outline" onClick={() => { for (let i = 0; i < 5; i++) fireOne(lastDetH.current); setNote('') }}>
            <Zap className="h-4 w-4 me-1" aria-hidden /> Fire 5
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { chRef.current = 'active'; setChallenge('active'); setResult(''); checkWin() }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: collect 80 dots
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="de Broglie λ" value={lamPm < 10 ? lamPm.toFixed(2) : lamPm.toFixed(0)} unit="pm" tone="text-violet-400" />
        <Readout label="Fringe Δy" value={dyUm >= 1 ? dyUm.toFixed(2) : dyUm.toFixed(3)} unit="μm" tone="text-emerald-500" />
        <Readout label="Landed" value={String(landed)} unit="dots" tone="text-amber-500" />
        <Readout label="Speed" value={fmtSpeed(speed)} unit="m/s" />
      </div>

      {note && (
        <p className="text-sm font-medium rounded-lg px-3 py-2 bg-violet-500/10 text-violet-600 dark:text-violet-400" role="status">
          {note}
        </p>
      )}
      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
      {reducedMotion && autoFire && (
        <p className="text-xs text-muted-foreground rounded-lg px-3 py-2 bg-muted/40" role="status">
          Auto-fire is paused under reduced motion — press Fire 5 to launch particles yourself.
        </p>
      )}
    </SimFrame>
  )
}
