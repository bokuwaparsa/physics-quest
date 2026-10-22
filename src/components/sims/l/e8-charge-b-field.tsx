// ─── Sim: Charge in a B Field · F = qv×B bends motion into a perfect circle ───
// Exact rotation of the velocity vector: |v| is preserved, orbit radius r = mv/(qB)
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, SimToggle, Readout, Legend,
  useSimCanvas, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

type ParticleId = 'proton' | 'electron' | 'alpha'

const PARTICLES: { value: ParticleId; label: string; q: number; m: number; color: string }[] = [
  { value: 'proton', label: 'Proton (+e)', q: 1.6e-19, m: 1.67e-27, color: CANVAS.red },
  { value: 'electron', label: 'Electron (−e)', q: -1.6e-19, m: 9.11e-31, color: CANVAS.violet },
  { value: 'alpha', label: 'Alpha (+2e)', q: 3.2e-19, m: 6.64e-27, color: CANVAS.orange },
]

const RING = 0.10 // detector radius, m
const BAND = 0.002 // challenge tolerance, m (±2%)

const fmtR = (r: number) => (r >= 0.01 ? `${r.toFixed(3)} m` : r.toExponential(2))
const fmtFc = (fc: number) => {
  const mhz = fc / 1e6
  return mhz >= 1000 ? `${(mhz / 1000).toFixed(2)} GHz` : `${mhz.toFixed(2)} MHz`
}

export function ChargeBFieldSim() {
  const [particle, setParticle] = useState<ParticleId>('proton')
  const [vM, setVM] = useState(2) // speed in 1e6 m/s
  const [bT, setBT] = useState(0.5) // field magnitude, tesla
  const [bOut, setBOut] = useState(true) // out of screen vs into screen
  const [angle, setAngle] = useState(0) // launch direction, degrees CCW from +x (math convention)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const pt = PARTICLES.find((p) => p.value === particle) ?? PARTICLES[0]
  const v = vM * 1e6
  const F = Math.abs(pt.q) * v * bT
  const r = (pt.m * v) / (Math.abs(pt.q) * bT)
  const fc = (Math.abs(pt.q) * bT) / (2 * Math.PI * pt.m)
  const onRing = Math.abs(r - RING) <= BAND

  const st = useRef({
    x: 0, y: 0, // position, m (math coords, launch pad at origin)
    vx: 0, vy: 0, // velocity, m/s
    trail: [] as { x: number; y: number }[],
  })
  const doneRef = useRef(false)

  // relaunch whenever any motion parameter changes (also seeds the first frame)
  useEffect(() => {
    const a = (angle * Math.PI) / 180
    st.current.x = 0
    st.current.y = 0
    st.current.vx = v * Math.cos(a)
    st.current.vy = v * Math.sin(a)
    st.current.trail = []
  }, [particle, vM, bT, bOut, angle, v])

  const startChallenge = () => {
    doneRef.current = false
    setParticle('proton')
    setChallenge('active')
    setResult('Goal: tune v and B so the proton’s orbit radius r = mv/(qB) matches the amber detector ring at 0.10 m ± 2% — the violet orbit circle must sit on the ring. Hint: v/B ≈ 9.58×10⁶, e.g. v = 2.0×10⁶ m/s with B ≈ 0.21 T.')
  }

  const reset = () => {
    doneRef.current = false
    setChallenge('idle')
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    const Bz = bOut ? bT : -bT
    const pxPerM = 100 / r // orbit circle is always 100 px — the ring shows the mismatch
    const padX = w * 0.5
    const padY = h * 0.5

    // ── physics: exact velocity rotation → perfect circle, speed preserved ──
    if (!reducedMotion) {
      const alpha = -(pt.q * Bz / pt.m) * dt // rotation angle this frame (sign = charge & field)
      const c = Math.cos(alpha), sn = Math.sin(alpha)
      const nvx = s.vx * c - s.vy * sn
      const nvy = s.vx * sn + s.vy * c
      s.x += ((s.vx + nvx) / 2) * dt // trapezoid step keeps the circle tight
      s.y += ((s.vy + nvy) / 2) * dt
      s.vx = nvx
      s.vy = nvy
      s.trail.push({ x: s.x, y: s.y })
      if (s.trail.length > 600) s.trail.shift()
    }

    // ── challenge: the radius is set by the sliders, r = mv/(qB) ────────────
    if (challenge === 'active' && !doneRef.current && onRing) {
      doneRef.current = true
      setChallenge('won')
      beep(660, 120); beep(880, 160)
      setResult(`★ Landed! r = mv/(qB) = ${fmtR(r)} — inside 0.10 m ± 2%. You tuned the v/B ratio to 9.58×10⁶ so the Lorentz force bends the proton exactly onto the detector ring. The magnetic force steered, but never sped it up.`)
    }

    // ── draw ────────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    // field symbols: ⊙ out of screen / ⊗ into screen
    ctx.globalAlpha = 0.3
    ctx.strokeStyle = bOut ? CANVAS.teal : CANVAS.violet
    ctx.fillStyle = bOut ? CANVAS.teal : CANVAS.violet
    ctx.lineWidth = 1.4
    for (let gx = 32; gx < w; gx += 64) {
      for (let gy = 32; gy < h; gy += 64) {
        ctx.beginPath(); ctx.arc(gx, gy, 5, 0, Math.PI * 2); ctx.stroke()
        if (bOut) {
          ctx.beginPath(); ctx.arc(gx, gy, 1.4, 0, Math.PI * 2); ctx.fill()
        } else {
          ctx.beginPath()
          ctx.moveTo(gx - 2.8, gy - 2.8); ctx.lineTo(gx + 2.8, gy + 2.8)
          ctx.moveTo(gx + 2.8, gy - 2.8); ctx.lineTo(gx - 2.8, gy + 2.8)
          ctx.stroke()
        }
      }
    }
    ctx.globalAlpha = 1
    ctx.fillStyle = bOut ? CANVAS.teal : CANVAS.violet
    ctx.font = 'bold 11px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText(bOut ? 'B out of screen ⊙ (toward you)' : 'B into screen ⊗ (away from you)', 14, 20)

    // orbit centre: C = launch + r·n̂, n̂ = unit vector of the centripetal force qv×B
    const vmag = Math.hypot(s.vx, s.vy) || 1
    const nX = (s.vy * Bz) / (vmag * bT)
    const nY = (-s.vx * Bz) / (vmag * bT)
    const cX = s.x + r * nX
    const cY = s.y + r * nY
    const cPx = padX + cX * pxPerM
    const cPy = padY - cY * pxPerM

    // detector ring (radius 0.10 m at current scale), centred on the orbit centre
    const ringPx = Math.min(190, RING * pxPerM)
    ctx.setLineDash([7, 5])
    ctx.strokeStyle = onRing ? CANVAS.emerald : CANVAS.amber
    ctx.lineWidth = onRing ? 3 : 2
    ctx.beginPath(); ctx.arc(cPx, cPy, ringPx, 0, Math.PI * 2); ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = onRing ? CANVAS.emerald : CANVAS.amber
    ctx.font = 'bold 10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText(onRing ? 'detector r = 0.10 m ✓' : 'detector r = 0.10 m', cPx, Math.max(12, cPy - ringPx - 6))

    // predicted orbit (radius r = mv/(qB), always 100 px)
    ctx.setLineDash([4, 6])
    ctx.strokeStyle = CANVAS.violet
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(cPx, cPy, 100, 0, Math.PI * 2); ctx.stroke()
    ctx.setLineDash([])

    // trail
    if (s.trail.length > 1) {
      ctx.strokeStyle = CANVAS.orange
      ctx.globalAlpha = 0.7
      ctx.lineWidth = 2
      ctx.beginPath()
      s.trail.forEach((p, i) => {
        const px = padX + p.x * pxPerM
        const py = padY - p.y * pxPerM
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
      })
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    // launch pad
    ctx.setLineDash([3, 3])
    ctx.strokeStyle = CANVAS.emerald
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(padX, padY, 9, 0, Math.PI * 2); ctx.stroke()
    ctx.setLineDash([])

    // the charge + velocity and force arrows
    const pPx = padX + s.x * pxPerM
    const pPy = padY - s.y * pxPerM
    if (vmag > 0) {
      const ux = s.vx / vmag, uy = s.vy / vmag
      const vLen = 18 + 16 * (vM / 4)
      ctx.strokeStyle = CANVAS.fg; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(pPx, pPy); ctx.lineTo(pPx + ux * vLen, pPy - uy * vLen); ctx.stroke()
    }
    const fLen = 16 + 34 * Math.min(1, F / 2e-12)
    ctx.strokeStyle = CANVAS.rose; ctx.lineWidth = 3
    ctx.beginPath(); ctx.moveTo(pPx, pPy); ctx.lineTo(pPx + nX * fLen, pPy - nY * fLen); ctx.stroke()
    ctx.fillStyle = pt.color
    ctx.beginPath(); ctx.arc(pPx, pPy, 7, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.fg; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(pPx, pPy, 7, 0, Math.PI * 2); ctx.stroke()

    // scale bar (one orbit radius)
    ctx.strokeStyle = CANVAS.orange; ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(20, h - 16); ctx.lineTo(20 + 100, h - 16); ctx.stroke()
    ctx.fillStyle = CANVAS.orange
    ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'left'
    ctx.fillText(`orbit radius r = ${fmtR(r)}`, 20, h - 24)

    // banners
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: match the orbit to the detector ring — r = 0.10 m ± 2% (tune v and B)', w / 2, h - 4)
    } else if (challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Challenge complete — proton on the detector!', w / 2, h - 4)
    }
    if (reducedMotion) {
      ctx.fillStyle = CANVAS.muted
      ctx.font = '10px ui-sans-serif, system-ui'
      ctx.fillText('(motion paused — the violet circle shows the predicted orbit)', w / 2, 36)
    }
  }, 400)

  return (
    <SimFrame
      title="Charge in a B Field"
      brief="A charge fired across a magnetic field feels F = qv×B, always sideways — so it runs in circles. Tune v, B and the charge to land it on the 0.10 m detector ring."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A charged particle circling in a uniform magnetic field shown as circled dots or crosses, with its predicted orbit circle, an amber detector ring of radius 0.10 metres and a rose force arrow"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSelect
          label="Charge" value={particle}
          options={PARTICLES.map((p) => ({ value: p.value, label: p.label }))}
          onChange={setParticle}
        />
        <SimSlider
          label="Speed v" value={vM} min={0.5} max={4} step={0.05} unit="×10⁶ m/s"
          format={(val) => val.toFixed(2)} onChange={setVM}
        />
        <SimSlider label="Field B" value={bT} min={0.05} max={1.5} step={0.01} unit="T" onChange={setBT} />
        <SimSlider label="Launch angle" value={angle} min={0} max={360} step={5} unit="°" onChange={setAngle} />
        <SimToggle label="B out of screen" checked={bOut} onChange={setBOut} />
        <div className="flex flex-wrap gap-2">
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
            disabled={challenge === 'won'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: land at r = 0.10 m
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Force F = qvB" value={F.toExponential(2)} unit="N" tone="text-rose-500" />
        <Readout label="Radius r = mv/qB" value={fmtR(r)} tone="text-orange-500" />
        <Readout label="f cyclotron" value={fmtFc(fc)} tone="text-teal-500" />
        <Readout
          label="r vs detector" value={`${((r / RING) * 100).toFixed(1)} %`}
          tone={onRing ? 'text-emerald-500' : undefined}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <Legend color={CANVAS.orange} label="particle trail" />
        <Legend color={CANVAS.violet} label="predicted orbit (r = mv/qB)" />
        <Legend color={CANVAS.amber} label="detector ring (0.10 m)" />
        <Legend color={CANVAS.rose} label="magnetic force" />
      </div>

      {result && (
        <p
          className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted/60 text-foreground'}`}
          role="status"
        >
          {result}
        </p>
      )}
    </SimFrame>
  )
}
