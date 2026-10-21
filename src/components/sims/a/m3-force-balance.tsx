// ─── Sim: Force Balance · tug a crate with two ropes, find zero net force ────
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas,
  useSimBeep, useReducedMotion, drawGrid,
} from '@/components/sims/sim-kit'
import { Play, Pause, RotateCcw, Scale } from 'lucide-react'

const MASS = 10 // kg
const TRACK = 12 // m of frictionless floor
const HOLD_GOAL = 3 // s

export function ForceBalanceSim() {
  const [running, setRunning] = useState(false)
  const [fLeft, setFLeft] = useState(10)
  const [fRight, setFRight] = useState(10)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')
  const [hold, setHold] = useState(0)
  const [fnet, setFnet] = useState(0)
  const [acc, setAcc] = useState(0)
  const [vel, setVel] = useState(0)

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const readoutSkip = useRef(0)

  const st = useRef({
    x: TRACK / 2, v: 0, hold: 0, running: false,
    challenge: 'idle' as 'idle' | 'active' | 'won',
  })
  useEffect(() => {
    st.current.running = running
    st.current.challenge = challenge
  })

  const reset = (toChallenge = false) => {
    const s = st.current
    s.x = TRACK / 2
    s.v = 0
    s.hold = 0
    setResult('')
    setHold(0)
    setVel(0)
    if (toChallenge) {
      setChallenge('active')
      s.challenge = 'active'
      setRunning(true)
      s.running = true
    }
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    const net = (fRight - fLeft)
    const a = net / MASS

    // ── physics ────────────────────────────────────────────────────────────
    if (s.running) {
      const step = reducedMotion ? dt : dt // motion follows user's force settings
      s.v += a * step
      s.x += s.v * step
      if (s.x < 0) { s.x = 0; s.v = 0 } // end bumpers
      if (s.x > TRACK) { s.x = TRACK; s.v = 0 }
    }
    // challenge: hold |Fnet| ≈ 0 with the crate at rest for 3 s
    if (s.challenge === 'active') {
      if (Math.abs(net) < 0.5 && Math.abs(s.v) < 0.05) {
        s.hold += dt
        if (s.hold >= HOLD_GOAL) {
          s.challenge = 'won'
          setChallenge('won')
          setResult(`Perfect balance! Both ropes pull equally hard, so Fnet = 0 N and the crate stays at rest — Newton's first law in action.`)
          beep(660, 140); beep(880, 180)
        }
      } else {
        s.hold = 0
      }
    }

    // publish readouts ~10×/s
    readoutSkip.current += 1
    if (readoutSkip.current >= 6) {
      readoutSkip.current = 0
      setFnet(net)
      setAcc(a)
      setVel(s.v)
      setHold(s.hold)
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const floorY = Math.round(h * 0.64)
    const mapX = (m: number) => 70 + (m / TRACK) * (w - 140)
    const cx = mapX(s.x)
    const crateW = 64, crateH = 52
    const crateTop = floorY - crateH

    // floor
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(0, floorY, w, 6)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let m = 0; m <= TRACK; m++) { ctx.moveTo(mapX(m), floorY + 6); ctx.lineTo(mapX(m), floorY + 11) }
    ctx.stroke()
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    for (let m = 0; m <= TRACK; m += 2) ctx.fillText(`${m} m`, mapX(m), floorY + 23)

    // ropes to side anchors
    ctx.strokeStyle = CANVAS.panelLight
    ctx.lineWidth = 2
    ctx.setLineDash([4, 4])
    ctx.beginPath(); ctx.moveTo(24, floorY - crateH / 2); ctx.lineTo(cx - crateW / 2, floorY - crateH / 2); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(cx + crateW / 2, floorY - crateH / 2); ctx.lineTo(w - 24, floorY - crateH / 2); ctx.stroke()
    ctx.setLineDash([])

    drawGrid(ctx, w, floorY, 40)

    // crate
    ctx.fillStyle = CANVAS.orange
    ctx.fillRect(cx - crateW / 2, crateTop, crateW, crateH)
    ctx.fillStyle = CANVAS.bg
    ctx.font = 'bold 12px ui-sans-serif, system-ui'
    ctx.fillText('10 kg', cx, crateTop + crateH / 2 + 4)

    // helper: labelled force arrow
    const arrow = (x0: number, y: number, len: number, dir: 1 | -1, color: string, label: string) => {
      if (Math.abs(len) < 2) return
      const x1 = x0 + dir * len
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke()
      const hx = 7 * dir
      ctx.beginPath()
      ctx.moveTo(x1, y); ctx.lineTo(x1 - hx, y - 5); ctx.lineTo(x1 - hx, y + 5)
      ctx.fill()
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText(label, (x0 + x1) / 2, y - 8)
    }

    const scale = 3.2 // px per newton
    const midY = crateTop + crateH / 2
    arrow(cx - crateW / 2, midY, fLeft * scale, -1, CANVAS.rose, `${fLeft} N`)
    arrow(cx + crateW / 2, midY, fRight * scale, 1, CANVAS.emerald, `${fRight} N`)

    // net force arrow above the crate
    if (Math.abs(net) < 0.5) {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('balanced! Fnet = 0', cx, crateTop - 18)
    } else {
      arrow(cx, crateTop - 26, Math.abs(net) * scale, net > 0 ? 1 : -1, CANVAS.amber, `Fnet ${Math.abs(net).toFixed(0)} N`)
    }

    // challenge banner
    if (s.challenge === 'active') {
      ctx.fillStyle = CANVAS.amber
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(`Zero net force: keep |Fnet| < 0.5 N at rest — hold ${(HOLD_GOAL - s.hold).toFixed(1)} s more`, w / 2, 22)
    } else if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('★ Balanced! Newton\u2019s first law confirmed.', w / 2, 22)
    }
  })

  return (
    <SimFrame
      title="Force Balance Lab"
      brief="Two ropes tug a 10 kg crate on a frictionless floor. Equal and opposite forces balance; the leftover net force accelerates the crate."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 380 }}
          aria-label="Force balance simulation: a crate pulled left and right by two ropes, with force arrows and a net force arrow"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Left rope (pull ←)" value={fLeft} min={0} max={30} step={1} unit="N"
          onChange={setFLeft}
        />
        <SimSlider
          label="Right rope (pull →)" value={fRight} min={0} max={30} step={1} unit="N"
          onChange={setFRight}
        />
        <div className="flex gap-2">
          <SimButton onClick={() => setRunning((r) => !r)}>
            {running ? <Pause className="h-4 w-4 mr-1" aria-hidden /> : <Play className="h-4 w-4 mr-1" aria-hidden />}
            {running ? 'Pause' : 'Release'}
          </SimButton>
          <SimButton variant="secondary" onClick={() => { reset(false); setRunning(false); setChallenge('idle') }}>
            <RotateCcw className="h-4 w-4 mr-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => reset(true)}
          >
            <Scale className="h-4 w-4 mr-1" aria-hidden />
            Challenge: zero net force
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="F left" value={fLeft.toFixed(0)} unit="N" tone="text-rose-500" />
        <Readout label="F right" value={fRight.toFixed(0)} unit="N" tone="text-emerald-500" />
        <Readout label="Fnet" value={fnet.toFixed(1)} unit="N" tone="text-amber-500" />
        <Readout label="a" value={acc.toFixed(2)} unit="m/s²" />
        <Readout label="Velocity" value={vel.toFixed(2)} unit="m/s" />
        {challenge === 'active' && (
          <Readout label="Hold (goal 3 s)" value={hold.toFixed(1)} unit="s" tone="text-amber-500" />
        )}
      </div>

      {result && (
        <p className="text-sm font-medium rounded-lg px-3 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
