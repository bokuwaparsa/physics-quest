// ─── Sim: Simple Machines · lever see-saw + inclined plane, force vs distance ─
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout,
  useSimCanvas, useSimBeep,
} from '@/components/sims/sim-kit'
import { Play, RotateCcw, Flag } from 'lucide-react'

const G = 9.8
const LOAD = 20 // kg (lever load, fixed)
const RAMP_M = 100 // kg crate
const RAMP_LEN = 8 // m hypotenuse

export function SimpleMachinesSim() {
  const [mode, setMode] = useState<'lever' | 'ramp'>('lever')
  const [fulcrum, setFulcrum] = useState(0.5)
  const [effort, setEffort] = useState(8)
  const [theta, setTheta] = useState(25)
  const [pushing, setPushing] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()

  const st = useRef({
    mode: 'lever' as 'lever' | 'ramp',
    fulcrum: 0.5, effort: 8, theta: 25,
    tilt: 0, p: 0, pushing: false,
    challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost',
  })

  const dL = fulcrum * 6
  const dE = (1 - fulcrum) * 6
  const tau = LOAD * dL - effort * dE // kg·m (×g for N·m)
  const MA = dE / dL
  const needed = (LOAD * dL) / dE
  const rad = (theta * Math.PI) / 180
  const F = RAMP_M * G * Math.sin(rad)
  const h = RAMP_LEN * Math.sin(rad)
  const W = F * RAMP_LEN

  const switchMode = (m: 'lever' | 'ramp') => {
    setMode(m)
    st.current.mode = m
    st.current.tilt = 0
    st.current.p = 0
    st.current.pushing = false
    setPushing(false)
    st.current.challenge = 'idle'
    setChallenge('idle')
    setResult('')
  }

  const startChallenge = () => {
    setChallenge('active')
    st.current.challenge = 'active'
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    // sync control values into the sim loop (effect scope — not render)
    s.mode = mode
    s.fulcrum = fulcrum
    s.effort = effort
    s.theta = theta
    const dLv = s.fulcrum * 6
    const dEv = (1 - s.fulcrum) * 6
    const tauV = LOAD * dLv - s.effort * dEv
    const radV = (s.theta * Math.PI) / 180
    const Fv = RAMP_M * G * Math.sin(radV)
    const hv = RAMP_LEN * Math.sin(radV)

    // animate
    if (s.mode === 'lever') {
      const target = Math.max(-0.16, Math.min(0.16, -tauV * 0.012))
      s.tilt += (target - s.tilt) * Math.min(1, dt * 5)
    }
    if (s.pushing) {
      s.p += dt * 0.25 // 2 m/s along an 8 m ramp
      if (s.p >= 1) { s.p = 1; s.pushing = false; setPushing(false) }
    }

    // challenge checks
    if (s.challenge === 'active') {
      const ok = s.mode === 'lever'
        ? s.effort <= 5.5 && Math.abs(tauV) <= 0.45
        : Fv < 300
      if (ok) {
        s.challenge = 'won'
        setChallenge('won')
        beep(660, 140); beep(880, 180)
        setResult(s.mode === 'lever'
          ? `Balanced with only ${s.effort.toFixed(1)} kg! MA = d_effort/d_load = ${dEv.toFixed(2)}/${dLv.toFixed(2)} = ${(dEv / dLv).toFixed(1)}, so effort = 20 ÷ ${(dEv / dLv).toFixed(1)} ≈ ${(LOAD * dLv / dEv).toFixed(1)} kg. You traded distance for force.`
          : `Done! Effort = mg·sin θ = ${Fv.toFixed(0)} N < 300 N. The ramp trades force for distance: you push ${(RAMP_LEN).toFixed(0)} m to rise only ${hv.toFixed(1)} m — work in = work out.`)
      }
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    ctx.font = '11px ui-monospace, monospace'

    if (s.mode === 'lever') {
      const k = (w - 110) / 6.4
      const ox = (w - 6 * k) / 2
      const oy = h * 0.5
      const px = ox + dLv * k

      // ground
      ctx.strokeStyle = CANVAS.muted
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(20, oy + 46); ctx.lineTo(w - 20, oy + 46); ctx.stroke()

      // plank (rotated about the fulcrum)
      ctx.save()
      ctx.translate(px, oy)
      ctx.rotate(s.tilt)
      ctx.fillStyle = CANVAS.panelLight
      ctx.strokeStyle = CANVAS.white
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.rect(-dLv * k, -5, (dLv + dEv) * k, 10)
      ctx.fill(); ctx.stroke()
      const drawWeight = (x: number, mass: number, color: string, label: string) => {
        const bw = Math.min(52, 18 + mass * 1.4)
        const bh = Math.min(40, 14 + mass * 1.1)
        ctx.fillStyle = color
        ctx.strokeStyle = CANVAS.bg
        ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.rect(x - bw / 2, -5 - bh, bw, bh); ctx.fill(); ctx.stroke()
        // weight arrow (down) with length ∝ mass
        const al = 10 + mass * 1.8
        const ay0 = -5 - bh - 8
        ctx.strokeStyle = CANVAS.rose
        ctx.fillStyle = CANVAS.rose
        ctx.lineWidth = 2.5
        ctx.beginPath(); ctx.moveTo(x, ay0 - al); ctx.lineTo(x, ay0); ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, ay0 + 7); ctx.lineTo(x - 4.5, ay0); ctx.lineTo(x + 4.5, ay0)
        ctx.closePath(); ctx.fill()
        ctx.fillStyle = CANVAS.muted
        ctx.textAlign = 'center'
        ctx.fillText(label, x, ay0 - al - 8)
      }
      drawWeight(-dLv * k, LOAD, CANVAS.orange, `${LOAD} kg`)
      drawWeight(dEv * k, s.effort, CANVAS.teal, `${s.effort.toFixed(1)} kg`)
      ctx.restore()

      // fulcrum
      ctx.fillStyle = CANVAS.muted
      ctx.beginPath()
      ctx.moveTo(px, oy + 6)
      ctx.lineTo(px - 18, oy + 46)
      ctx.lineTo(px + 18, oy + 46)
      ctx.closePath(); ctx.fill()

      // dimension line
      const dy = oy + 62
      ctx.strokeStyle = CANVAS.muted
      ctx.lineWidth = 1
      ctx.setLineDash([3, 3])
      ctx.beginPath(); ctx.moveTo(ox, dy); ctx.lineTo(ox + 6 * k, dy); ctx.stroke()
      ctx.setLineDash([])
      ;[ox, px, ox + 6 * k].forEach((x) => { ctx.beginPath(); ctx.moveTo(x, dy - 4); ctx.lineTo(x, dy + 4); ctx.stroke() })
      ctx.fillStyle = CANVAS.orange
      ctx.textAlign = 'center'
      ctx.fillText(`load arm ${dLv.toFixed(2)} m`, (ox + px) / 2, dy + 14)
      ctx.fillStyle = CANVAS.teal
      ctx.fillText(`effort arm ${dEv.toFixed(2)} m`, (px + ox + 6 * k) / 2, dy + 26)

      // status
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      if (Math.abs(tauV) <= 0.45) {
        ctx.fillStyle = CANVAS.emerald
        ctx.fillText('⚖ Balanced! τ_load = τ_effort', w / 2, 26)
      } else {
        ctx.fillStyle = tauV > 0 ? CANVAS.orange : CANVAS.teal
        ctx.fillText(tauV > 0 ? 'Load side wins — it tips down left' : 'Effort side wins — it tips down right', w / 2, 26)
      }
      if (s.challenge === 'active') {
        ctx.font = 'bold 12px ui-sans-serif, system-ui'
        ctx.fillStyle = CANVAS.amber
        ctx.fillText('Challenge — balance the 20 kg load using only 5 kg of effort (move the fulcrum!)', w / 2, 46)
      }
    } else {
      // ── ramp mode ──
      const k = Math.min((w - 130) / (RAMP_LEN * Math.cos(Math.PI / 18) + 1), (h - 100) / (RAMP_LEN * Math.sin(Math.PI / 3) + 1.4))
      const bx = 46
      const gy = h - 48
      const tx = bx + RAMP_LEN * Math.cos(radV) * k
      const ty = gy - RAMP_LEN * Math.sin(radV) * k

      ctx.strokeStyle = CANVAS.muted
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(20, gy); ctx.lineTo(w - 20, gy); ctx.stroke()

      // ramp body
      ctx.fillStyle = CANVAS.panel
      ctx.beginPath(); ctx.moveTo(bx, gy); ctx.lineTo(tx, gy); ctx.lineTo(tx, ty); ctx.closePath(); ctx.fill()
      ctx.strokeStyle = CANVAS.white
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(bx, gy); ctx.lineTo(tx, ty); ctx.stroke()
      ctx.strokeStyle = CANVAS.muted
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(tx, gy); ctx.lineTo(tx, ty); ctx.stroke()

      // angle arc
      ctx.strokeStyle = CANVAS.amber
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(bx, gy, 34, 0, -radV, true); ctx.stroke()
      ctx.fillStyle = CANVAS.amber
      ctx.textAlign = 'left'
      ctx.fillText(`${s.theta.toFixed(1)}°`, bx + 44, gy - 10)

      // height dimension
      ctx.strokeStyle = CANVAS.amber
      ctx.setLineDash([4, 4])
      ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(tx, gy); ctx.lineTo(tx, ty); ctx.stroke()
      ctx.setLineDash([])
      ctx.fillText(`h = ${hv.toFixed(2)} m`, tx + 10, (gy + ty) / 2)
      ctx.fillStyle = CANVAS.muted
      ctx.textAlign = 'center'
      ctx.fillText(`L = ${RAMP_LEN} m along the slope`, (bx + tx) / 2, gy + 18)

      // crate
      const cxr = bx + s.p * RAMP_LEN * Math.cos(radV) * k
      const cyr = gy - s.p * RAMP_LEN * Math.sin(radV) * k
      const size = Math.max(18, 0.85 * k)
      ctx.save()
      ctx.translate(cxr, cyr)
      ctx.rotate(-radV)
      ctx.fillStyle = CANVAS.orange
      ctx.strokeStyle = CANVAS.bg
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.rect(-size / 2, -size, size, size); ctx.fill(); ctx.stroke()
      // effort arrow along the slope
      const al = Math.min(80, Fv / 9)
      ctx.strokeStyle = CANVAS.emerald
      ctx.fillStyle = CANVAS.emerald
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(0, -size / 2); ctx.lineTo(al, -size / 2); ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(al + 8, -size / 2); ctx.lineTo(al, -size / 2 - 4.5); ctx.lineTo(al, -size / 2 + 4.5)
      ctx.closePath(); ctx.fill()
      ctx.restore()
      ctx.font = '11px ui-monospace, monospace'
      ctx.fillStyle = CANVAS.muted
      ctx.textAlign = 'center'
      ctx.fillText('100 kg', cxr, cyr - size * Math.cos(radV) - 8)
      ctx.fillStyle = CANVAS.emerald
      ctx.fillText('F effort', cxr + al * Math.cos(radV) + 10, cyr - size / 2 - al * Math.sin(radV) + 4)

      // status
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillStyle = CANVAS.fg
      ctx.textAlign = 'center'
      ctx.fillText('Work in = F · L = mgh = work out (ideal, no friction)', w / 2, 26)
      if (s.challenge === 'active') {
        ctx.font = 'bold 12px ui-sans-serif, system-ui'
        ctx.fillStyle = CANVAS.amber
        ctx.fillText('Challenge — get the effort force below 300 N (lower the angle!)', w / 2, 46)
      }
    }
  }, 400)

  return (
    <SimFrame
      title="Simple Machines Workshop"
      brief="Machines never reduce WORK — they trade force for distance. Lever: effort × effort arm = load × load arm. Ramp: ideal effort F = mg·sin θ."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label={mode === 'lever'
            ? 'A plank on a movable fulcrum with a 20 kilogram load on the left and an adjustable effort weight on the right'
            : 'An inclined plane with a 100 kilogram crate and its ideal effort force arrow'}
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex gap-2">
          <SimButton variant={mode === 'lever' ? 'default' : 'outline'} onClick={() => switchMode('lever')}>Lever</SimButton>
          <SimButton variant={mode === 'ramp' ? 'default' : 'outline'} onClick={() => switchMode('ramp')}>Ramp</SimButton>
        </div>
        {mode === 'lever' ? (
          <>
            <SimSlider label="Fulcrum position (from load)" value={fulcrum} min={0.2} max={0.8} step={0.01} onChange={setFulcrum} format={(v) => `${Math.round(v * 100)}%`} />
            <SimSlider label="Effort mass" value={effort} min={1} max={25} step={0.5} unit="kg" onChange={setEffort} />
          </>
        ) : (
          <>
            <SimSlider label="Ramp angle" value={theta} min={10} max={60} step={0.5} unit="°" onChange={setTheta} />
            <SimButton
              onClick={() => { st.current.p = 0; st.current.pushing = true; setPushing(true) }}
              disabled={pushing}
            >
              <Play className="h-4 w-4 mr-1" aria-hidden /> Push crate (2 m/s)
            </SimButton>
          </>
        )}
        <div className="flex gap-2">
          <SimButton
            variant="secondary"
            onClick={() => { st.current.tilt = 0; st.current.p = 0; st.current.pushing = false; setPushing(false); setResult('') }}
          >
            <RotateCcw className="h-4 w-4 mr-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 mr-1" aria-hidden /> Challenge
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {mode === 'lever' ? (
          <>
            <Readout label="Mechanical advantage" value={MA.toFixed(2)} unit="×" tone="text-emerald-500" />
            <Readout label="Effort needed" value={needed.toFixed(1)} unit="kg" tone="text-amber-500" />
            <Readout label="Net torque" value={(tau * G).toFixed(0)} unit="N·m" tone={Math.abs(tau) <= 0.45 ? 'text-emerald-500' : 'text-rose-500'} />
          </>
        ) : (
          <>
            <Readout label="Effort force" value={F.toFixed(0)} unit="N" tone="text-emerald-500" />
            <Readout label="Height gained" value={h.toFixed(2)} unit="m" tone="text-amber-500" />
            <Readout label="Work in = out" value={W.toFixed(0)} unit="J" />
          </>
        )}
      </div>

      {challenge === 'active' && !result && (
        <p className="text-sm font-medium rounded-lg px-3 py-2 bg-amber-500/10 text-amber-600 dark:text-amber-400" role="status">
          {mode === 'lever'
            ? 'Balance the 20 kg load with only 5 kg of effort — slide the fulcrum toward the load. Watch the MA readout!'
            : 'Make the effort force smaller than 300 N. Hint: sin θ = F/(mg) — how low must θ go?'}
        </p>
      )}

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
