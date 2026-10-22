// ─── Sim: Beam Balance · reactions on two supports from ΣF = 0 and Στ = 0 ─────
// Uniform 20 kg beam (W = 196 N), supports 0.5 m from the ends, hanging load.
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, Legend,
  useSimCanvas, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { RotateCcw, Flag } from 'lucide-react'

const G = 9.8
const BEAM_MASS = 20 // kg
const W = BEAM_MASS * G // 196 N at the centre of gravity
const INSET = 0.5 // supports sit 0.5 m from each end
const CAPACITY = 800 // N per support

const MSG_WIN =
  'Both supports now carry between 150 and 200 N — the 346 N total (196 N beam + 150 N load) shared almost evenly. The centre position, 173 N each, is the classic sweet spot!'
const MSG_TIP =
  'The beam tipped! One support\'s reaction hit zero, so the beam rotated about the other support and slid off. Keep the load between the supports (and balanced).'
const MSG_OVERLOAD =
  'A support was asked for more than its 800 N capacity — the beam collapsed! Watch the reaction readouts and keep both below the limit.'

export function BeamBalanceSim() {
  const [len, setLen] = useState(4)
  const [load, setLoad] = useState(100)
  const [pos, setPos] = useState(2)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [ro, setRo] = useState({ A: 0, B: 0 })
  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({
    tipping: false, dir: 0, angle: 0, settled: false, pivotX: 0,
    challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost',
    done: false,
  })
  const skip = useRef(0)

  // reactions from Στ = 0 about A, then ΣF = 0
  const a = INSET
  const b = len - INSET
  const RB = (W * (len / 2 - a) + load * (pos - a)) / (b - a)
  const RA = W + load - RB

  const reset = () => {
    const s = st.current
    s.tipping = false; s.dir = 0; s.angle = 0; s.settled = false; s.done = false
    s.challenge = 'idle'
    setChallenge('idle'); setResult('')
    setLen(4); setLoad(100); setPos(2)
  }

  const startChallenge = () => {
    const s = st.current
    s.tipping = false; s.dir = 0; s.angle = 0; s.settled = false; s.done = false
    s.challenge = 'active'
    setChallenge('active'); setResult('')
    setLoad(150)
    setPos(0.8 * len) // start clearly outside the winning window
  }

  const tip = (pivot: 'A' | 'B', dir: 1 | -1, msg: string) => {
    const s = st.current
    if (s.tipping) return
    s.tipping = true
    s.pivotX = pivot === 'A' ? a : b
    s.dir = dir
    beep(90, 300, 'sawtooth', 0.06)
    if (s.challenge === 'active') { s.challenge = 'lost'; setChallenge('lost') }
    setResult(msg)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    s.challenge = challenge

    if (!s.tipping) {
      if (RA > CAPACITY || RB > CAPACITY) {
        // the busier support crushes: its end drops while the beam swings on the other one
        if (RA > RB) tip('B', -1, MSG_OVERLOAD)
        else tip('A', 1, MSG_OVERLOAD)
      }
      else if (RA < 0) tip('B', 1, MSG_TIP) // left end lifts off, beam swings about B
      else if (RB < 0) tip('A', -1, MSG_TIP) // right end lifts off, beam swings about A
      else if (s.challenge === 'active' && !s.done &&
               RA >= 150 && RA <= 200 && RB >= 150 && RB <= 200) {
        s.done = true
        s.challenge = 'won'
        setChallenge('won')
        beep(660, 120); beep(880, 160)
        setResult(MSG_WIN)
      }
    } else {
      // collapse animation: rotate about the surviving support until settled
      const target = 0.5 * s.dir
      if (!reducedMotion) {
        s.angle = Math.abs(s.angle - target) < dt * 1.1 ? target : s.angle + Math.sign(target - s.angle) * dt * 1.1
      } else {
        s.angle = target
      }
      s.settled = s.angle === target
    }

    // ── draw ────────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const k = (w - 140) / len // px per metre
    const x0 = 70 // beam left end (x = 0 m)
    const by = h / 2 - 34 // beam centreline
    const sag = reducedMotion ? 0 : Math.min(10, 3 + load * 0.035) // elastic droop (visual)
    const sx = (m: number) => x0 + m * k

    // ground
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(16, h - 40, w - 32, 24)
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(16, h - 40); ctx.lineTo(w - 16, h - 40); ctx.stroke()

    // supports (drawn unrotated — they stay planted)
    for (const m of [a, b]) {
      ctx.fillStyle = CANVAS.panelLight
      ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(sx(m), by + 6)
      ctx.lineTo(sx(m) - 16, h - 40)
      ctx.lineTo(sx(m) + 16, h - 40)
      ctx.closePath(); ctx.fill(); ctx.stroke()
    }

    // beam (rotates when tipping) + load + CG
    ctx.save()
    if (s.tipping) {
      ctx.translate(sx(s.pivotX), by)
      ctx.rotate(s.angle)
      ctx.translate(-sx(s.pivotX), -by)
    }
    ctx.strokeStyle = CANVAS.white; ctx.lineWidth = 9; ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(x0, by)
    ctx.quadraticCurveTo(x0 + (len * k) / 2, by + sag, x0 + len * k, by)
    ctx.stroke()
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(x0, by)
    ctx.quadraticCurveTo(x0 + (len * k) / 2, by + sag, x0 + len * k, by)
    ctx.stroke()
    // centre of gravity
    const cgx = sx(len / 2), cgy = by + sag / 2
    ctx.fillStyle = CANVAS.violet
    ctx.beginPath(); ctx.arc(cgx, cgy, 6, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText(`CG · ${W} N`, cgx, cgy - 12)
    // hanging load
    if (load > 0) {
      const lx = sx(pos), ly = by + sag * (pos / len)
      ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(lx, ly + 4); ctx.lineTo(lx, ly + 26); ctx.stroke()
      ctx.fillStyle = CANVAS.amber
      ctx.fillRect(lx - 12, ly + 26, 24, 20)
      ctx.fillStyle = CANVAS.bg
      ctx.font = 'bold 9px ui-sans-serif, system-ui'
      ctx.fillText(`${load}`, lx, ly + 40)
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText(`${load} N`, lx, ly + 62)
    }
    ctx.restore()

    // reaction arrows (proportional to R, cap at 70 px)
    if (!s.tipping) {
      for (const [m, R, label] of [[a, RA, 'R_A'], [b, RB, 'R_B']] as const) {
        const L = Math.max(8, Math.min(70, R / 4))
        const ax = sx(m) + 24
        ctx.strokeStyle = R < 30 ? CANVAS.rose : CANVAS.emerald
        ctx.fillStyle = ctx.strokeStyle
        ctx.lineWidth = 3
        ctx.beginPath(); ctx.moveTo(ax, h - 44); ctx.lineTo(ax, h - 44 - L); ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(ax, h - 48 - L)
        ctx.lineTo(ax - 5, h - 38 - L)
        ctx.lineTo(ax + 5, h - 38 - L)
        ctx.closePath(); ctx.fill()
        ctx.font = 'bold 10px ui-monospace, monospace'
        ctx.fillText(`${label} = ${Math.round(R)} N`, ax, h - 54 - L)
      }
      if (Math.min(RA, RB) < 30) {
        ctx.fillStyle = CANVAS.rose; ctx.font = 'bold 11px ui-monospace, monospace'
        ctx.fillText('a support is almost unloaded — tip risk!', w / 2, h - 52)
      }
    }

    // readout strip on canvas
    ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText(`beam: ${len.toFixed(1)} m · ${BEAM_MASS} kg`, 20, 24)
    ctx.fillText(`capacity ${CAPACITY} N/support`, 20, 40)
    ctx.textAlign = 'center'

    // banner
    if (s.challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: place the 150 N load so BOTH supports carry 150–200 N', w / 2, 24)
    } else if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Perfectly shared load!', w / 2, 24)
    } else if (s.challenge === 'lost') {
      ctx.fillStyle = CANVAS.rose; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('Beam down — press the challenge button and try again!', w / 2, 24)
    }

    skip.current += 1
    if (skip.current >= 8) { skip.current = 0; setRo({ A: RA, B: RB }) }
  }, 400)

  return (
    <SimFrame
      title="Beam Balance"
      brief="A uniform 20 kg beam on two supports. Hang a load anywhere — the reactions follow from Στ = 0 taken about each support. Overload a support (or lift one off) and the beam tips."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A uniform beam on two triangular supports with a hanging load, reaction-force arrows, and a centre-of-gravity marker; the beam tips if a support unloads"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Beam length" value={len} min={2} max={6} step={0.1} unit="m" onChange={setLen} />
        <SimSlider label="Load" value={load} min={0} max={200} step={5} unit="N" onChange={setLoad} disabled={challenge === 'active'} />
        <SimSlider label="Load position" value={pos} min={0} max={len} step={0.05} unit="m" onChange={setPos} />
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: balance 150 N
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Support A" value={ro.A.toFixed(0)} unit="N" tone={ro.A < 30 ? 'text-rose-500' : 'text-emerald-500'} />
        <Readout label="Support B" value={ro.B.toFixed(0)} unit="N" tone={ro.B < 30 ? 'text-rose-500' : 'text-emerald-500'} />
        <Readout label="Beam weight" value="196" unit="N" />
        <Readout label="Support capacity" value="800" unit="N" />
      </div>
      <div className="flex flex-wrap gap-4">
        <Legend color={CANVAS.violet} label="center of gravity" />
        <Legend color={CANVAS.amber} label="load" />
        <Legend color={CANVAS.emerald} label="support reaction" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
