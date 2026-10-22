// ─── Sim: Rotation Lab · torque τ on a spinning disc, α = (τ − friction)/I ────
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { useI18n } from '@/lib/game/i18n'
import { Flag, Pause, Play, RotateCcw } from 'lucide-react'

type DiscId = 'disc' | 'ring' | 'points'

const M = 4 // kg
const RAD = 0.5 // m
const FR = 0.5 // N·m friction torque magnitude
const TAU_MAX = 20
const TARGET_W = 10 // rad/s
const T_MEASURE = 2 // s

const DISCS: { value: DiscId; label: string; I: number }[] = [
  { value: 'disc', label: 'Solid disc · ½MR²', I: 0.5 * M * RAD * RAD }, // 0.5 kg·m²
  { value: 'ring', label: 'Ring · MR²', I: M * RAD * RAD }, // 1.0 kg·m²
  { value: 'points', label: 'Point masses · MR²', I: M * RAD * RAD }, // 1.0 kg·m²
]

export function RotationLabSim() {
  const [tau, setTau] = useState(4)
  const [discId, setDiscId] = useState<DiscId>('disc')
  const [running, setRunning] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [ro, setRo] = useState({ t: 0, w: 0, th: 0, a: 0 })

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const { simT } = useI18n()
  const readoutSkip = useRef(0)

  const disc = DISCS.find((d) => d.value === discId) ?? DISCS[0]

  // mutable sim state read by the RAF loop; kept in sync from a layout effect
  const st = useRef({
    t: 0, w: 0, th: 0, tau: 4, I: DISCS[0].I, running: false,
    challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost',
  })
  useEffect(() => {
    st.current.tau = tau
    st.current.I = disc.I
    st.current.running = running
    st.current.challenge = challenge
  })

  const fill = (s: string, vars: Record<string, string | number>) => {
    let out = s
    for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(String(v))
    return out
  }

  const alphaOf = (tauV: number, w: number, I: number) => {
    if (Math.abs(w) < 0.05 && Math.abs(tauV) <= FR) return 0 // static friction holds it still
    const fric = FR * Math.sign(w !== 0 ? w : tauV)
    return (tauV - fric) / I
  }

  const finishChallenge = (ok: boolean, w: number, I: number) => {
    const a = alphaOf(tau, w, I)
    if (reducedMotion) { setRunning(false); st.current.running = false } // freeze motion for reduced-motion users
    setChallenge(ok ? 'won' : 'lost')
    setResult(ok
      ? fill(simT('Nailed it! ω = {w} rad/s at t = 2.0 s — your choice of τ and I produced α = {a} rad/s².'),
          { w: w.toFixed(1), a: a.toFixed(1) })
      : fill(simT('At t = 2.0 s the disc spun at {w} rad/s (target 10). You needed α = 5 rad/s². Retune τ or I and retry.'),
          { w: w.toFixed(1) }))
    if (ok) { beep(660, 120); beep(880, 160) }
  }

  const reset = (toChallenge = false) => {
    const s = st.current
    s.t = 0; s.w = 0; s.th = 0
    setRo({ t: 0, w: 0, th: 0, a: 0 })
    setResult('')
    if (toChallenge) {
      setChallenge('active')
      s.challenge = 'active'
      setRunning(true)
      s.running = true
    }
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current

    // ── physics ────────────────────────────────────────────────────────────
    let aNow = 0
    if (s.running) {
      aNow = alphaOf(s.tau, s.w, s.I)
      const prevT = s.t
      s.t += dt
      s.w += aNow * dt
      if (Math.abs(s.w) < 1e-6 && Math.abs(s.tau) <= FR) s.w = 0
      s.th += s.w * dt
      if (s.challenge === 'active' && prevT < T_MEASURE && s.t >= T_MEASURE) {
        finishChallenge(Math.abs(s.w - TARGET_W) <= 0.3, s.w, s.I)
      }
    } else {
      aNow = alphaOf(s.tau, s.w, s.I)
    }

    // publish readouts ~10×/s
    readoutSkip.current += 1
    if (readoutSkip.current >= 6) {
      readoutSkip.current = 0
      setRo({ t: s.t, w: s.w, th: s.th, a: s.running ? aNow : 0 })
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const cx = w / 2
    const cy = h / 2 + 6
    const Rpx = 88

    // ω gauge arc (amber, direction shows spin sense)
    if (Math.abs(s.w) > 0.05) {
      const sweep = (Math.min(Math.abs(s.w), TAU_MAX) / TAU_MAX) * (Math.PI * 5 / 3)
      const start = -Math.PI / 2
      const end = s.w > 0 ? start - sweep : start + sweep
      ctx.strokeStyle = CANVAS.amber
      ctx.lineWidth = 3.5
      ctx.beginPath()
      ctx.arc(cx, cy, Rpx + 14, start, end, s.w > 0)
      ctx.stroke()
      const ha = end
      const dir = s.w > 0 ? 1 : -1
      ctx.fillStyle = CANVAS.amber
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(ha) * (Rpx + 14), cy + Math.sin(ha) * (Rpx + 14))
      ctx.lineTo(cx + Math.cos(ha - dir * 0.3) * (Rpx + 20), cy + Math.sin(ha - dir * 0.3) * (Rpx + 20))
      ctx.lineTo(cx + Math.cos(ha - dir * 0.14) * (Rpx + 5), cy + Math.sin(ha - dir * 0.14) * (Rpx + 5))
      ctx.closePath(); ctx.fill()
      ctx.font = 'bold 12px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText('ω', cx + 18, cy - Rpx - 22)
    }

    // torque arrow (orange, around the top)
    if (Math.abs(s.tau) > 0.05) {
      const sweep = (Math.abs(s.tau) / TAU_MAX) * (Math.PI * 2 / 3)
      const start = -Math.PI / 2
      const end = s.tau > 0 ? start - sweep : start + sweep
      ctx.strokeStyle = CANVAS.orange
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.arc(cx, cy, Rpx + 30, start, end, s.tau > 0)
      ctx.stroke()
      const ha = end
      const dir = s.tau > 0 ? 1 : -1
      ctx.fillStyle = CANVAS.orange
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(ha) * (Rpx + 30), cy + Math.sin(ha) * (Rpx + 30))
      ctx.lineTo(cx + Math.cos(ha - dir * 0.28) * (Rpx + 37), cy + Math.sin(ha - dir * 0.28) * (Rpx + 37))
      ctx.lineTo(cx + Math.cos(ha - dir * 0.13) * (Rpx + 21), cy + Math.sin(ha - dir * 0.13) * (Rpx + 21))
      ctx.closePath(); ctx.fill()
      ctx.font = 'bold 12px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText('τ', cx - 20, cy - Rpx - 38)
    }

    // ── the disc ────────────────────────────────────────────────────────────
    if (discId === 'disc') {
      ctx.fillStyle = CANVAS.panelLight
      ctx.beginPath(); ctx.arc(cx, cy, Rpx, 0, Math.PI * 2); ctx.fill()
    } else {
      ctx.fillStyle = CANVAS.panel
      ctx.beginPath(); ctx.arc(cx, cy, Rpx, 0, Math.PI * 2); ctx.fill()
    }
    // spokes (rotate with θ)
    ctx.strokeStyle = discId === 'disc' ? CANVAS.panel : CANVAS.muted
    ctx.lineWidth = 2
    for (let k = 0; k < 6; k++) {
      const a = s.th + (k * Math.PI) / 3
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(a) * (Rpx - 6), cy - Math.sin(a) * (Rpx - 6))
      ctx.stroke()
    }
    // rim
    ctx.strokeStyle = CANVAS.white
    ctx.lineWidth = discId === 'ring' ? 10 : 3
    ctx.beginPath(); ctx.arc(cx, cy, Rpx - (discId === 'ring' ? 5 : 0), 0, Math.PI * 2); ctx.stroke()
    ctx.lineWidth = 1
    // point masses at the rim (two 2 kg masses)
    if (discId === 'points') {
      for (const off of [0, Math.PI]) {
        const a = s.th + off
        ctx.fillStyle = CANVAS.emerald
        ctx.beginPath()
        ctx.arc(cx + Math.cos(a) * (Rpx - 8), cy - Math.sin(a) * (Rpx - 8), 9, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    // marker dot at angle θ
    ctx.fillStyle = CANVAS.amber
    ctx.beginPath()
    ctx.arc(cx + Math.cos(s.th) * (Rpx - 18), cy - Math.sin(s.th) * (Rpx - 18), 6, 0, Math.PI * 2)
    ctx.fill()
    // hub
    ctx.fillStyle = CANVAS.fg
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill()

    // labels
    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText(`I = ${s.I.toFixed(2)} kg·m² · M = 4 kg · R = 0.5 m`, cx, h - 16)

    // ── challenge banner ────────────────────────────────────────────────────
    if (s.challenge === 'active') {
      ctx.fillStyle = CANVAS.amber
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: tune τ and I to hit ω = 10 rad/s at t = 2 s — measuring…', cx, 20)
    } else if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Challenge complete!', cx, 20)
    } else if (s.challenge === 'lost') {
      ctx.fillStyle = CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('Off target at t = 2 s — retune τ or I and retry!', cx, 20)
    }
  }, 400)

  const thShown = ((ro.th % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)

  return (
    <SimFrame
      title="Rotation Lab"
      brief="Apply a torque to the disc: α = (τ − friction)/I with friction 0.5 N·m. Bigger I means slower spin-up."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A rotating disc with an applied torque arrow, angular velocity gauge, marker dot and spokes"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Applied torque τ" value={tau} min={-TAU_MAX} max={TAU_MAX} step={0.5} unit="N·m" onChange={setTau} />
        <SimSelect
          label="Disc type" value={discId}
          options={DISCS.map((d) => ({ value: d.value, label: d.label }))}
          onChange={setDiscId}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={() => setRunning((r) => !r)} disabled={challenge === 'active'}>
            {running ? <Pause className="h-4 w-4 me-1" aria-hidden /> : <Play className="h-4 w-4 me-1" aria-hidden />}
            {running ? 'Stop' : 'Start'}
          </SimButton>
          <SimButton variant="secondary" onClick={() => { reset(false); setRunning(false); setChallenge('idle') }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => reset(true)}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: 10 rad/s at t = 2 s
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Time" value={ro.t.toFixed(1)} unit="s" />
        <Readout label="Angle θ" value={thShown.toFixed(2)} unit="rad" />
        <Readout label="Angular velocity ω" value={ro.w.toFixed(2)} unit="rad/s" tone="text-amber-500" />
        <Readout label="Angular acceleration α" value={(ro.a).toFixed(2)} unit="rad/s²" tone="text-orange-500" />
        <Readout label="Moment of inertia I" value={disc.I.toFixed(2)} unit="kg·m²" />
        {challenge !== 'idle' && <Readout label="Target ω" value="10" unit="rad/s" tone="text-emerald-500" />}
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
