// ─── Sim: Induction Coil · sweep a magnet through a coil, EMF = −N·dΦ/dt ──────
// B(x) = B0·(1+(x/w)²)^(−3/2) axial bar-magnet profile · Φ = B·A · EMF = −N·A·(dB/dx)·v
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimToggle, Readout, Legend,
  useSimCanvas, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, MoveHorizontal, RotateCcw } from 'lucide-react'

const B0 = 0.2 // peak axial field of the magnet at the coil centre, T
const W = 0.08 // field falloff width, m
const TARGET = 3 // challenge peak EMF, V
const X_MAX = 0.9 // auto-oscillation amplitude, m

const bAt = (x: number) => B0 * Math.pow(1 + (x / W) * (x / W), -1.5)
const dbdx = (x: number) => (-3 * B0 * (x / W) * Math.pow(1 + (x / W) * (x / W), -2.5)) / W
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

export function InductionCoilSim() {
  const [turns, setTurns] = useState(200)
  const [area, setArea] = useState(0.01)
  const [speed, setSpeed] = useState(0.4) // magnet speed, m/s
  const [pos, setPos] = useState(-95) // slider mirror, cm
  const [auto, setAuto] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')
  const [note, setNote] = useState('')
  const [live, setLive] = useState({ emf: 0, phi: 0, v: 0, peak: 0 })

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({
    x: -0.95, // magnet centre position, m
    mode: 'idle' as 'idle' | 'sweep' | 'osc',
    phase: -Math.PI / 2,
    prevX: -0.95,
    needle: 0, // smoothed galvanometer deflection, −1…1
    emf: 0,
    peak: 0,
    trace: [] as number[],
    frame: 0,
    chal: 'idle' as 'idle' | 'active' | 'won',
  })
  const doneRef = useRef(false)

  const resetAll = () => {
    const s = st.current
    s.x = -0.95; s.prevX = -0.95; s.mode = 'idle'; s.phase = -Math.PI / 2
    s.needle = 0; s.emf = 0; s.peak = 0; s.trace = []
    doneRef.current = false
    setAuto(false)
    setPos(-95)
    setChallenge('idle')
    setResult('')
    setNote('')
    setLive({ emf: 0, phi: 0, v: 0, peak: 0 })
  }

  const startChallenge = () => {
    doneRef.current = false
    setChallenge('active')
    setResult('Goal: generate a peak EMF of at least 3 V. EMF = N·A·(dB/dx)·v — more turns, a bigger coil area, or a faster magnet all work. Press “Sweep through coil”, or drag the position slider by hand.')
  }

  const onSweep = () => {
    const s = st.current
    setAuto(false)
    s.x = -0.95
    s.prevX = -0.95
    s.mode = 'sweep'
  }

  const onAuto = (on: boolean) => {
    if (on && reducedMotion) {
      setNote('Auto-oscillation is paused while reduced motion is on — use “Sweep through coil” or drag the position slider yourself.')
      return
    }
    setNote('')
    setAuto(on)
    const s = st.current
    if (on) {
      s.mode = 'osc'
      s.phase = Math.asin(clamp(s.x / X_MAX, -0.999, 0.999))
    } else {
      s.mode = 'idle'
    }
  }

  const onPos = (cm: number) => {
    const s = st.current
    setPos(cm)
    s.x = cm / 100
    s.prevX = s.x
    s.mode = 'idle'
    setAuto(false)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    s.chal = challenge

    // ── motion: sweep / oscillate / manual drag ─────────────────────────────
    let vMag = 0
    if (s.mode === 'sweep') {
      vMag = speed
      s.x += vMag * dt
      if (s.x >= 1) { s.x = 1; s.mode = 'idle'; setPos(100) }
    } else if (s.mode === 'osc' && !reducedMotion) {
      const omega = speed / X_MAX
      s.phase += omega * dt
      s.x = X_MAX * Math.sin(s.phase)
      vMag = speed * Math.cos(s.phase)
    } else if (dt > 1e-5) {
      vMag = clamp((s.x - s.prevX) / dt, -2.5, 2.5)
    }
    s.prevX = s.x

    // ── physics: EMF = −N·A·(dB/dx)·v ───────────────────────────────────────
    s.emf = -turns * area * dbdx(s.x) * vMag
    s.peak = Math.max(s.peak, Math.abs(s.emf))
    s.trace.push(s.emf)
    if (s.trace.length > 280) s.trace.shift()
    s.needle += (clamp(s.emf / 6, -1, 1) - s.needle) * Math.min(1, dt * 12)

    // challenge: |EMF| ≥ 3 V at any instant
    if (s.chal === 'active' && !doneRef.current && Math.abs(s.emf) >= TARGET) {
      doneRef.current = true
      setChallenge('won')
      beep(660, 120); beep(880, 160)
      setResult(`★ ${Math.abs(s.emf).toFixed(1)} V peak — past the 3 V goal! EMF = N·A·(dB/dx)·v with N = ${turns} turns, A = ${area} m² and a magnet moving at up to ${Math.abs(vMag).toFixed(2)} m/s: you made the flux change fast enough.`)
    }

    // publish readouts ~8×/s
    s.frame++
    if (s.frame % 8 === 0) {
      setLive({ emf: s.emf, phi: bAt(s.x) * area * 1000, v: vMag, peak: s.peak })
      if (s.mode !== 'idle') setPos(Math.round(s.x * 100))
    }

    // ── draw ────────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const axisY = h * 0.4
    const cx = w * 0.52
    const pxPerM = (w - 150) / 2.4
    const gx = 86, gy = 76, gr = 42 // galvanometer

    // wires coil ↔ galvanometer
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1.6
    ctx.beginPath()
    ctx.moveTo(cx, axisY - 64); ctx.lineTo(cx, 30); ctx.lineTo(gx, 30); ctx.lineTo(gx, gy - gr)
    ctx.moveTo(cx, axisY + 64); ctx.lineTo(cx, axisY + 96); ctx.lineTo(36, axisY + 96); ctx.lineTo(36, gy); ctx.lineTo(gx - gr, gy)
    ctx.stroke()

    // galvanometer
    ctx.fillStyle = CANVAS.panelLight
    ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI * 2); ctx.stroke()
    ctx.font = '9px ui-monospace, monospace'; ctx.textAlign = 'center'; ctx.fillStyle = CANVAS.muted
    for (const tick of [-60, -30, 0, 30, 60]) {
      const a = (tick * Math.PI) / 180
      ctx.beginPath()
      ctx.moveTo(gx + Math.sin(a) * (gr - 4), gy - Math.cos(a) * (gr - 4))
      ctx.lineTo(gx + Math.sin(a) * (gr - 10), gy - Math.cos(a) * (gr - 10))
      ctx.stroke()
    }
    ctx.fillText('−', gx - gr + 14, gy + 4)
    ctx.fillText('0', gx, gy - gr + 16)
    ctx.fillText('+', gx + gr - 14, gy + 4)
    const na = s.needle * (Math.PI / 3)
    ctx.strokeStyle = s.needle >= 0 ? CANVAS.emerald : CANVAS.rose
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(gx, gy)
    ctx.lineTo(gx + Math.sin(na) * (gr - 12), gy - Math.cos(na) * (gr - 12))
    ctx.stroke()
    ctx.fillStyle = CANVAS.muted; ctx.font = '9px ui-sans-serif, system-ui'
    ctx.fillText('galvanometer (EMF)', gx, gy + gr + 14)

    // coil (side view: nested ellipses)
    for (const rx of [16, 12.5, 9]) {
      ctx.strokeStyle = CANVAS.amber
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.ellipse(cx, axisY, rx, 64, 0, 0, Math.PI * 2); ctx.stroke()
    }
    ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-monospace, monospace'
    ctx.fillText(`coil · N = ${turns} turns · A = ${area.toFixed(3)} m²`, cx, axisY + 110)

    // bar magnet (N pole leads, moving right)
    const mx = cx + s.x * pxPerM
    ctx.fillStyle = CANVAS.violet // S half
    ctx.fillRect(mx - 32, axisY - 13, 32, 26)
    ctx.fillStyle = CANVAS.red // N half
    ctx.fillRect(mx, axisY - 13, 32, 26)
    ctx.strokeStyle = CANVAS.fg; ctx.lineWidth = 1.5
    ctx.strokeRect(mx - 32, axisY - 13, 64, 26)
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 12px ui-sans-serif, system-ui'; ctx.textAlign = 'center'
    ctx.fillText('S', mx - 16, axisY + 5)
    ctx.fillText('N', mx + 16, axisY + 5)
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
    ctx.fillText(`magnet · x = ${s.x >= 0 ? '+' : ''}${s.x.toFixed(2)} m · v = ${vMag >= 0 ? '+' : ''}${vMag.toFixed(2)} m/s`, mx, axisY - 22)

    // ── bottom strip: B through coil vs position + EMF trace ────────────────
    const gyT = h - 112, gyB = h - 34

    // B(x) panel (left)
    const bx0 = 24, bx1 = w * 0.46
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(bx0, gyB); ctx.lineTo(bx1, gyB); ctx.stroke()
    ctx.strokeStyle = CANVAS.teal; ctx.lineWidth = 2
    ctx.beginPath()
    for (let i = 0; i <= 120; i++) {
      const xx = -1.05 + (2.1 * i) / 120
      const px = bx0 + ((xx + 1.05) / 2.1) * (bx1 - bx0)
      const py = gyB - (bAt(xx) / 0.22) * (gyB - gyT)
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
    }
    ctx.stroke()
    const dotPx = bx0 + ((s.x + 1.05) / 2.1) * (bx1 - bx0)
    ctx.fillStyle = CANVAS.teal
    ctx.beginPath(); ctx.arc(dotPx, gyB - (bAt(s.x) / 0.22) * (gyB - gyT), 4, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = CANVAS.muted; ctx.font = '9px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText('B through coil vs magnet position (peak 0.2 T)', (bx0 + bx1) / 2, gyT - 6)

    // EMF trace panel (right)
    const tx0 = w * 0.52, tx1 = w - 24
    const mid = (gyT + gyB) / 2
    const scale = (gyB - gyT) / 2 / Math.max(3.2, s.peak * 1.15)
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(tx0, mid); ctx.lineTo(tx1, mid); ctx.stroke()
    if (s.chal === 'active') {
      ctx.setLineDash([4, 4]); ctx.strokeStyle = CANVAS.amber
      ctx.beginPath()
      ctx.moveTo(tx0, mid - TARGET * scale); ctx.lineTo(tx1, mid - TARGET * scale)
      ctx.moveTo(tx0, mid + TARGET * scale); ctx.lineTo(tx1, mid + TARGET * scale)
      ctx.stroke()
      ctx.setLineDash([])
    }
    if (s.trace.length > 1) {
      ctx.strokeStyle = CANVAS.emerald; ctx.lineWidth = 1.8
      ctx.beginPath()
      s.trace.forEach((e, i) => {
        const px = tx0 + (i / 279) * (tx1 - tx0)
        const py = mid - e * scale
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
      })
      ctx.stroke()
      ctx.fillStyle = CANVAS.emerald
      ctx.beginPath()
      ctx.arc(tx0 + ((s.trace.length - 1) / 279) * (tx1 - tx0), mid - s.trace[s.trace.length - 1] * scale, 3, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = CANVAS.muted; ctx.font = '9px ui-monospace, monospace'
    ctx.fillText('EMF vs time (V) · time →', (tx0 + tx1) / 2, gyT - 6)

    // banners
    ctx.textAlign = 'center'
    if (s.chal === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: generate a peak EMF of 3 V or more!', w / 2, 16)
    } else if (s.chal === 'won') {
      ctx.fillStyle = CANVAS.emerald; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Challenge complete — needle knocked past 3 V!', w / 2, 16)
    }
    if (reducedMotion && s.mode !== 'idle') {
      ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-sans-serif, system-ui'
      ctx.fillText('(auto-oscillation paused · reduced motion)', w / 2, 32)
    }
  }, 400)

  return (
    <SimFrame
      title="Induction Coil"
      brief="Faraday’s law live: EMF = −N·dΦ/dt. Only a changing flux makes the galvanometer move — sweep the magnet, drag it by hand, or let it oscillate."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A red and blue bar magnet moving toward a copper coil connected to a galvanometer whose needle swings with the induced EMF, above a graph of field through the coil versus position and a live EMF trace"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Turns N" value={turns} min={20} max={400} step={10} unit="turns" onChange={setTurns} />
        <SimSlider
          label="Coil area A" value={area} min={0.002} max={0.02} step={0.001} unit="m²"
          format={(val) => val.toFixed(3)} onChange={setArea}
        />
        <SimSlider
          label="Magnet speed" value={speed} min={0.1} max={1} step={0.05} unit="m/s"
          format={(val) => val.toFixed(2)} onChange={setSpeed}
        />
        <SimSlider label="Magnet position" value={pos} min={-100} max={100} step={1} unit="cm" onChange={onPos} />
        <SimToggle label="Auto-oscillate" checked={auto} onChange={onAuto} />
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={onSweep}>
            <MoveHorizontal className="h-4 w-4 me-1" aria-hidden /> Sweep through coil
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
            disabled={challenge === 'won'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: 3 V peak
          </SimButton>
          <SimButton variant="ghost" onClick={resetAll}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Flux Φ = B·A" value={live.phi.toFixed(2)} unit="mWb" tone="text-teal-500" />
        <Readout
          label="EMF = −N·dΦ/dt" value={`${live.emf >= 0 ? '+' : ''}${live.emf.toFixed(2)}`} unit="V"
          tone={Math.abs(live.emf) >= TARGET ? 'text-emerald-500' : undefined}
        />
        <Readout label="Magnet speed" value={live.v.toFixed(2)} unit="m/s" />
        <Readout
          label="Peak |EMF|" value={live.peak.toFixed(2)} unit="V"
          tone={live.peak >= TARGET ? 'text-emerald-500' : 'text-amber-500'}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <Legend color={CANVAS.teal} label="B through coil vs position" />
        <Legend color={CANVAS.emerald} label="EMF vs time" />
        <Legend color={CANVAS.amber} label="3 V challenge line" />
      </div>

      {note && <p className="text-xs text-muted-foreground" role="status">{note}</p>}
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
