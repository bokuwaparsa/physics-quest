// ─── Sim: Magnets & Electromagnets · field lines, compass, paperclip crane ────
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas,
  canvasPos, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, Magnet, RefreshCw } from 'lucide-react'

const CLIP_N = 5
const CLIP_WEIGHTS = [12, 22, 32, 42, 52] // strength units needed per clip

type Mode = 'bar' | 'coil'

/** Field of a bar magnet approximated by two opposite "poles" at local x = ∓60. */
function fieldAt(x: number, y: number): { x: number; y: number } {
  const M = 9e5
  const dxN = x + 60, dxS = x - 60
  const rN = Math.pow(dxN * dxN + y * y, 1.5) || 1
  const rS = Math.pow(dxS * dxS + y * y, 1.5) || 1
  return { x: M * (dxN / rN - dxS / rS), y: M * (y / rN - y / rS) }
}

function computeFieldLines(): [number, number][][] {
  const seeds = [90, 125, 155, 180, 205, 235, 270].map((d) => (d * Math.PI) / 180)
  const lines: [number, number][][] = []
  for (const a of seeds) {
    let x = -60 + 16 * Math.cos(a)
    let y = 16 * Math.sin(a)
    const pts: [number, number][] = [[x, y]]
    for (let s = 0; s < 340; s++) {
      const b = fieldAt(x, y)
      const m = Math.hypot(b.x, b.y) || 1
      x += (b.x / m) * 4.5
      y += (b.y / m) * 4.5
      pts.push([x, y])
      if (Math.hypot(x - 60, y) < 15) break
      if (Math.abs(x) > 440 || Math.abs(y) > 240) break
    }
    if (pts.length > 8) lines.push(pts)
  }
  return lines
}

function drawClip(ctx: CanvasRenderingContext2D, x: number, y: number, attached: boolean) {
  ctx.strokeStyle = attached ? CANVAS.amber : CANVAS.white
  ctx.lineWidth = 2.4
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(x - 6, y + 9)
  ctx.lineTo(x - 6, y - 3)
  ctx.arc(x, y - 3, 6, Math.PI, 0)
  ctx.lineTo(x + 6, y + 9)
  ctx.stroke()
}

export function ElectromagnetSim() {
  const [mode, setMode] = useState<Mode>('bar')
  const [current, setCurrent] = useState(2)
  const [turns, setTurns] = useState(10)
  const [flipped, setFlipped] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [live, setLive] = useState({ strength: 0, lifted: 0 })

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({
    mode: 'bar' as Mode, current: 2, turns: 10, flipped: false,
    challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost',
    clips: Array.from({ length: CLIP_N }, (_, k) => ({
      x: 0, y: 0, home: 0, threshold: CLIP_WEIGHTS[k], attached: false,
    })),
    compass: { x: 0, y: 0 },
    dragging: false,
    lines: null as [number, number][][] | null,
  })
  // sync React state into the mutable sim state (never during render)
  useEffect(() => {
    st.current.mode = mode
    st.current.current = current
    st.current.turns = turns
    st.current.flipped = flipped
    st.current.challenge = challenge
  })

  const draggingRef = useRef(false)
  const skip = useRef(0)

  const { canvasRef } = useSimCanvas((ctx, w, h, t) => {
    const s = st.current
    const cx = w / 2
    const cy = modeInit(s, w)

    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    if (s.mode === 'bar') drawBarMode(ctx, w, s, cx, cy)
    else drawCoilMode(ctx, w, s, cx, cy, t, reducedMotion)

    // publish readouts ~8×/s
    skip.current += 1
    if (skip.current >= 8) {
      skip.current = 0
      if (s.mode === 'coil') {
        const strength = Math.round(s.current * s.turns)
        const lifted = s.clips.filter((c) => c.attached).length
        setLive({ strength, lifted })
        if (s.challenge === 'active' && lifted === CLIP_N) {
          s.challenge = 'won'
          setChallenge('won')
          beep(660, 140); beep(990, 200)
          setResult(`★ All ${CLIP_N} paperclips lifted! Field strength = I × N = ${s.current} × ${s.turns} = ${strength} units — strong enough to beat every clip's weight. This is exactly how scrapyard crane magnets work.`)
        }
      }
    }
  })

  // ── pointer dragging of the compass (bar mode) ─────────────────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || st.current.mode !== 'bar') return
    const { x, y } = canvasPos(e, canvas)
    if (Math.hypot(x - st.current.compass.x, y - st.current.compass.y) < 26) {
      draggingRef.current = true
      canvas.setPointerCapture(e.pointerId)
    }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !draggingRef.current) return
    const { x, y } = canvasPos(e, canvas)
    st.current.compass.x = Math.min(Math.max(x, 26), canvas.clientWidth - 26)
    st.current.compass.y = Math.min(Math.max(y, 26), 374)
  }
  const onPointerUp = () => { draggingRef.current = false }

  const startChallenge = () => {
    if (mode !== 'coil') {
      setResult('The challenge lives in the Electromagnet tab — switch modes first.')
      setChallenge('lost')
      return
    }
    const strength = Math.round(current * turns)
    const lifted = st.current.clips.filter((c) => c.attached).length
    if (lifted === CLIP_N) {
      setChallenge('won')
      beep(660, 140); beep(990, 200)
      setResult(`★ All ${CLIP_N} paperclips lifted! Strength = I × N = ${current} × ${turns} = ${strength} units.`)
    } else {
      setChallenge('active')
      setResult(`Only ${lifted} of ${CLIP_N} clips lifted — strength is ${strength} units, but the heaviest clip needs ${CLIP_WEIGHTS[CLIP_N - 1]}. Raise the current (I) and/or the turns (N)!`)
    }
  }

  const isCoil = mode === 'coil'

  return (
    <SimFrame
      title="Magnet & Electromagnet Bench"
      brief="Drag the compass around the bar magnet to trace the field — then switch to the electromagnet and crank up the current to lift paperclips."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg touch-none"
        style={{ height: 400 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Magnetism simulator: a bar magnet with draggable compass and field lines, or an electromagnet with current and turns sliders lifting paperclips"
        role="img"
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimButton variant={mode === 'bar' ? 'default' : 'outline'} onClick={() => { setMode('bar'); setResult('') }}>
          <Magnet className="h-4 w-4 me-1" aria-hidden /> Bar magnet
        </SimButton>
        <SimButton variant={mode === 'coil' ? 'default' : 'outline'} onClick={() => { setMode('coil'); setResult('') }}>
          Electromagnet
        </SimButton>
        <SimButton variant="secondary" disabled={!isCoil} onClick={() => setFlipped((f) => !f)}>
          <RefreshCw className="h-4 w-4 me-1" aria-hidden /> Flip polarity
        </SimButton>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Current" value={current} min={0} max={5} step={0.5} unit="A" disabled={!isCoil} onChange={setCurrent} />
        <SimSlider label="Turns" value={turns} min={5} max={20} step={1} unit="turns" disabled={!isCoil} onChange={setTurns} />
        <SimButton variant="outline" onClick={startChallenge}>
          <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: lift all 5 clips
        </SimButton>
      </div>

      <div className="flex flex-wrap gap-2">
        {isCoil ? (
          <>
            <Readout label="Current" value={current.toFixed(1)} unit="A" />
            <Readout label="Turns" value={`${turns}`} />
            <Readout label="Field strength" value={`${live.strength}`} unit="units" tone="text-violet-400" />
            <Readout label="Clips lifted" value={`${live.lifted}/${CLIP_N}`} tone="text-amber-500" />
          </>
        ) : (
          <Readout label="Field" value="permanent · drag the compass" />
        )}
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}

// ── helpers ───────────────────────────────────────────────────────────────────
const CORE_W = 220
const CORE_H = 26

/** One-time per-canvas initialisation of clip/compass positions. */
function modeInit(s: {
  clips: { x: number; y: number; home: number; threshold: number; attached: boolean }[]
  compass: { x: number; y: number }
}, w: number): number {
  const cx = w / 2
  s.clips.forEach((c, k) => {
    if (c.x === 0) {
      c.home = cx - 120 + k * 60
      c.x = c.home
      c.y = 342
    }
  })
  if (s.compass.x === 0) {
    s.compass.x = cx + 150
    s.compass.y = 290
  }
  return 150
}

function drawBarMode(
  ctx: CanvasRenderingContext2D, w: number,
  s: { lines: [number, number][][] | null; compass: { x: number; y: number } },
  cx: number, cy: number,
) {
  if (!s.lines) s.lines = computeFieldLines()

  ctx.save()
  ctx.translate(cx, cy)

  // field lines with direction arrows
  ctx.strokeStyle = 'rgba(20,184,166,0.55)'
  ctx.lineWidth = 1.4
  for (const pts of s.lines) {
    ctx.beginPath()
    pts.forEach(([x, y], i) => { if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y) })
    ctx.stroke()
    const ai = Math.floor(pts.length * 0.45)
    if (ai > 1 && ai < pts.length - 1) {
      const [x0, y0] = pts[ai - 1]
      const [x1, y1] = pts[ai + 1]
      const a = Math.atan2(y1 - y0, x1 - x0)
      const [ax, ay] = pts[ai]
      ctx.fillStyle = 'rgba(20,184,166,0.8)'
      ctx.beginPath()
      ctx.moveTo(ax + Math.cos(a) * 6, ay + Math.sin(a) * 6)
      ctx.lineTo(ax + Math.cos(a + 2.5) * 6, ay + Math.sin(a + 2.5) * 6)
      ctx.lineTo(ax + Math.cos(a - 2.5) * 6, ay + Math.sin(a - 2.5) * 6)
      ctx.closePath(); ctx.fill()
    }
  }

  // the bar magnet: N (red, left) · S (violet, right)
  ctx.fillStyle = CANVAS.red
  ctx.fillRect(-75, -18, 75, 36)
  ctx.fillStyle = CANVAS.violet
  ctx.fillRect(0, -18, 75, 36)
  ctx.strokeStyle = CANVAS.fg
  ctx.lineWidth = 1.5
  ctx.strokeRect(-75, -18, 150, 36)
  ctx.fillStyle = CANVAS.fg
  ctx.font = 'bold 15px ui-sans-serif, system-ui'
  ctx.textAlign = 'center'
  ctx.fillText('N', -38, 5)
  ctx.fillText('S', 38, 5)
  ctx.restore()

  ctx.fillStyle = CANVAS.muted
  ctx.font = '11px ui-sans-serif, system-ui'
  ctx.textAlign = 'center'
  ctx.fillText('field lines run N → S · far away the compass points north (up) — Earth is a magnet too', cx, 24)

  // draggable compass
  const cp = s.compass
  const b = fieldAt(cp.x - cx, cp.y - cy)
  const by = b.y - 0.35 // gentle Earth-field nudge (points up = north)
  const a = Math.atan2(by, b.x)
  ctx.fillStyle = CANVAS.panel
  ctx.strokeStyle = CANVAS.white
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(cp.x, cp.y, 20, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  const tx = Math.cos(a), ty = Math.sin(a)
  ctx.fillStyle = CANVAS.red
  ctx.beginPath()
  ctx.moveTo(cp.x + tx * 14, cp.y + ty * 14)
  ctx.lineTo(cp.x - ty * 4.5, cp.y + tx * 4.5)
  ctx.lineTo(cp.x + ty * 4.5, cp.y - tx * 4.5)
  ctx.closePath(); ctx.fill()
  ctx.fillStyle = CANVAS.white
  ctx.beginPath()
  ctx.moveTo(cp.x - tx * 14, cp.y - ty * 14)
  ctx.lineTo(cp.x - ty * 4.5, cp.y + tx * 4.5)
  ctx.lineTo(cp.x + ty * 4.5, cp.y - tx * 4.5)
  ctx.closePath(); ctx.fill()
  ctx.fillStyle = CANVAS.muted
  ctx.font = '10px ui-monospace, monospace'
  ctx.fillText('drag me', cp.x, cp.y + 34)
}

function drawCoilMode(
  ctx: CanvasRenderingContext2D, w: number,
  s: { current: number; turns: number; flipped: boolean; clips: { x: number; y: number; home: number; threshold: number; attached: boolean }[] },
  cx: number, cy: number, t: number, reducedMotion: boolean,
) {
  const strength = s.current * s.turns
  const coreTop = cy - CORE_H / 2

  // field glow ∝ I × N
  if (strength > 0) {
    ctx.globalAlpha = Math.min(0.4, 0.08 + strength / 260)
    ctx.fillStyle = CANVAS.violet
    ctx.beginPath(); ctx.arc(cx, cy, 46 + strength * 0.85, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1
  }

  // iron core
  ctx.fillStyle = CANVAS.panelLight
  ctx.strokeStyle = CANVAS.muted
  ctx.lineWidth = 1.5
  ctx.fillRect(cx - CORE_W / 2, coreTop, CORE_W, CORE_H)
  ctx.strokeRect(cx - CORE_W / 2, coreTop, CORE_W, CORE_H)

  // coil turns
  ctx.strokeStyle = CANVAS.amber
  ctx.lineWidth = 2.4
  const step = CORE_W / s.turns
  for (let i = 0; i < s.turns; i++) {
    ctx.beginPath()
    ctx.ellipse(cx - CORE_W / 2 + step * (i + 0.5), cy, 9, CORE_H / 2 + 8, 0, 0, Math.PI * 2)
    ctx.stroke()
  }

  // pole labels
  ctx.font = 'bold 15px ui-sans-serif, system-ui'
  ctx.textAlign = 'center'
  ctx.fillStyle = s.flipped ? CANVAS.violet : CANVAS.red
  ctx.fillText('N', cx - CORE_W / 2 - 18, cy + 5)
  ctx.fillStyle = s.flipped ? CANVAS.red : CANVAS.violet
  ctx.fillText('S', cx + CORE_W / 2 + 18, cy + 5)

  // circuit leads + battery
  const wireY = 336
  ctx.strokeStyle = CANVAS.white
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(cx - CORE_W / 2, cy + CORE_H / 2 + 8); ctx.lineTo(cx - CORE_W / 2, wireY)
  ctx.moveTo(cx + CORE_W / 2, cy + CORE_H / 2 + 8); ctx.lineTo(cx + CORE_W / 2, wireY)
  ctx.moveTo(cx - CORE_W / 2, wireY); ctx.lineTo(cx - 14, wireY)
  ctx.moveTo(cx + 14, wireY); ctx.lineTo(cx + CORE_W / 2, wireY)
  ctx.stroke()
  ctx.strokeStyle = CANVAS.fg
  ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(cx - 7, wireY - 11); ctx.lineTo(cx - 7, wireY + 11); ctx.stroke()
  ctx.lineWidth = 6
  ctx.beginPath(); ctx.moveTo(cx + 7, wireY - 6); ctx.lineTo(cx + 7, wireY + 6); ctx.stroke()
  ctx.fillStyle = CANVAS.muted
  ctx.font = '10px ui-monospace, monospace'
  ctx.fillText(`${s.current.toFixed(1)} A`, cx, wireY + 24)

  // electron dots around the circuit (direction flips with polarity)
  if (s.current > 0) {
    const dir = s.flipped ? -1 : 1
    const speed = (12 + 10 * s.current) * dir
    const off = reducedMotion ? 0 : (((t * speed) % 34) + 34) % 34
    const pts: [number, number][] = [
      [cx - CORE_W / 2, cy + CORE_H / 2 + 8], [cx - CORE_W / 2, wireY],
      [cx + CORE_W / 2, wireY], [cx + CORE_W / 2, cy + CORE_H / 2 + 8],
    ]
    ctx.fillStyle = CANVAS.teal
    let acc = off
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i]
      const [x2, y2] = pts[i + 1]
      const len = Math.hypot(x2 - x1, y2 - y1)
      const nx = (x2 - x1) / len, ny = (y2 - y1) / len
      let d = acc
      while (d < len) {
        ctx.beginPath()
        ctx.arc(x1 + nx * d, y1 + ny * d, 3.2, 0, Math.PI * 2)
        ctx.fill()
        d += 34
      }
      acc = d - len
    }
  }

  // table + paperclips
  const tableY = 356
  ctx.strokeStyle = CANVAS.muted
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(40, tableY); ctx.lineTo(w - 40, tableY); ctx.stroke()
  s.clips.forEach((c, k) => {
    c.attached = strength >= c.threshold
    const targetX = c.attached ? cx - 44 + 22 * k : c.home
    const targetY = c.attached ? cy + CORE_H / 2 + 14 : 342
    const f = reducedMotion ? 1 : 0.16
    c.x += (targetX - c.x) * f
    c.y += (targetY - c.y) * f
    drawClip(ctx, c.x, c.y, c.attached)
  })

  ctx.fillStyle = CANVAS.muted
  ctx.font = '11px ui-sans-serif, system-ui'
  ctx.fillText('strength = I × N — lift every clip by raising both', cx, 30)
}
