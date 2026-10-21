// ─── Sim: Charge Field · place charges, read the arrows, surf the test charge ─
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimToggle, Readout, useSimCanvas,
  canvasPos, useSimBeep, useReducedMotion, drawGrid,
} from '@/components/sims/sim-kit'
import { Plus, Minus, Trash2, Flag, RotateCcw } from 'lucide-react'

const MAX_CHARGES = 8
const GRID = 38

type Charge = { x: number; y: number; q: 1 | -1 }

export function ChargeFieldSim() {
  const [pending, setPending] = useState<1 | -1>(1)
  const [release, setRelease] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')
  const [note, setNote] = useState('')
  const [count, setCount] = useState(0)
  const [forceNote, setForceNote] = useState('no charges yet')
  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const charges = useRef<Charge[]>([])
  // mutable sim state — touched only inside the loop / handlers (never during render)
  const st = useRef({
    dragging: null as number | 'test' | null,
    test: { x: 64, y: 190, vx: 0, vy: 0 },
    startX: 64,
    startY: 190,
    seeded: false,
    skip: 0,
  })
  const doneRef = useRef(false)

  const startChallenge = () => {
    const canvas = canvasRef.current
    const s = st.current
    s.test = { x: 64, y: (canvas?.clientHeight ?? 400) / 2, vx: 0, vy: 0 }
    doneRef.current = false
    setChallenge('active')
    setResult('Place + and − charges so the drifting test charge lands in the amber goal zone on the right. Use “Reset test charge” to try again.')
  }
  const resetTest = () => {
    const canvas = canvasRef.current
    const s = st.current
    s.test = { x: 64, y: (canvas?.clientHeight ?? 400) / 2, vx: 0, vy: 0 }
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    s.startX = 64
    s.startY = h / 2

    // seed two demo charges on the first frame
    if (!s.seeded) {
      s.seeded = true
      charges.current = [
        { x: w * 0.34, y: h * 0.4, q: 1 },
        { x: w * 0.56, y: h * 0.62, q: -1 },
      ]
      setCount(2)
      s.test = { x: s.startX, y: s.startY, vx: 0, vy: 0 }
    }

    // Coulomb superposition (softened unit-vector approximation)
    const fieldAt = (px: number, py: number) => {
      let ex = 0, ey = 0
      for (const c of charges.current) {
        const dx = px - c.x
        const dy = py - c.y
        let d = Math.hypot(dx, dy)
        if (d < 1) d = 1
        const soft = Math.max(d, 22)
        const k = (c.q * 2600) / (soft * soft)
        ex += (k * dx) / d
        ey += (k * dy) / d
      }
      return { ex, ey }
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    drawGrid(ctx, w, h, GRID)

    // goal zone on the right edge
    const gx0 = w - 76, gx1 = w - 18
    const gy0 = h / 2 - 60, gy1 = h / 2 + 60
    ctx.fillStyle = 'rgba(245,158,11,0.12)'
    ctx.fillRect(gx0, gy0, gx1 - gx0, gy1 - gy0)
    ctx.setLineDash([6, 4])
    ctx.strokeStyle = CANVAS.amber
    ctx.lineWidth = 1.5
    ctx.strokeRect(gx0, gy0, gx1 - gx0, gy1 - gy0)
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.amber
    ctx.font = 'bold 11px ui-sans-serif, system-ui'
    ctx.textAlign = 'center'
    ctx.fillText('GOAL', (gx0 + gx1) / 2, gy0 - 8)
    // flag
    ctx.strokeStyle = CANVAS.amber
    ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.moveTo(gx0 + 16, gy1 - 12); ctx.lineTo(gx0 + 16, gy0 + 14); ctx.stroke()
    ctx.fillStyle = CANVAS.amber
    ctx.beginPath()
    ctx.moveTo(gx0 + 16, gy0 + 14)
    ctx.lineTo(gx0 + 42, gy0 + 22)
    ctx.lineTo(gx0 + 16, gy0 + 30)
    ctx.fill()

    // start pad
    ctx.setLineDash([4, 4])
    ctx.strokeStyle = CANVAS.emerald
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(s.startX, s.startY, 18, 0, Math.PI * 2); ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.emerald
    ctx.font = '10px ui-sans-serif, system-ui'
    ctx.fillText('start', s.startX, s.startY + 32)

    // field arrows on a grid
    for (let gx = GRID / 2; gx < w - 8; gx += GRID) {
      for (let gy = GRID / 2; gy < h - 8; gy += GRID) {
        const { ex, ey } = fieldAt(gx, gy)
        const mag = Math.hypot(ex, ey)
        if (mag < 0.02) continue
        const len = Math.min(15, 4 + mag * 14)
        const ux = ex / mag, uy = ey / mag
        ctx.globalAlpha = Math.min(0.85, 0.18 + mag * 0.5)
        ctx.strokeStyle = CANVAS.teal
        ctx.lineWidth = 1.4
        const hx = gx + ux * (len / 2)
        const hy = gy + uy * (len / 2)
        const tx = gx - ux * (len / 2)
        const ty = gy - uy * (len / 2)
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(hx - (ux * 4 - uy * 2.4), hy - (uy * 4 + ux * 2.4))
        ctx.lineTo(hx, hy)
        ctx.lineTo(hx - (ux * 4 + uy * 2.4), hy - (uy * 4 - ux * 2.4))
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    }

    // physics: test charge drifts with the field when released
    const tp = s.test
    const { ex, ey } = fieldAt(tp.x, tp.y)
    const mag = Math.hypot(ex, ey)
    if (release && !reducedMotion) {
      tp.vx += ex * 300 * dt
      tp.vy += ey * 300 * dt
      const damp = Math.max(0, 1 - 1.6 * dt)
      tp.vx *= damp
      tp.vy *= damp
      const sp = Math.hypot(tp.vx, tp.vy)
      if (sp > 300) { tp.vx *= 300 / sp; tp.vy *= 300 / sp }
      tp.x += tp.vx * dt
      tp.y += tp.vy * dt
      if (tp.x < -20 || tp.x > w + 20 || tp.y < -20 || tp.y > h + 20) {
        tp.x = s.startX; tp.y = s.startY; tp.vx = 0; tp.vy = 0
        setRelease(false)
        setResult('Zapped off the field! Rearrange your charges, then drag the test charge back to the start pad and release again.')
      }
      if (challenge === 'active' && !doneRef.current && tp.x > gx0 && tp.x < gx1 && tp.y > gy0 && tp.y < gy1) {
        doneRef.current = true
        setChallenge('won')
        setRelease(false)
        tp.vx = 0
        tp.vy = 0
        beep(660, 140)
        beep(880, 180)
        setResult('Goal! The field pushed the positive test charge along the arrows — away from + charges, toward − charges — right into the flag.')
      }
    }

    // force arrow on the test charge (always visible)
    if (mag > 0.02) {
      const len = Math.min(46, 14 + mag * 40)
      const ux = ex / mag, uy = ey / mag
      ctx.strokeStyle = CANVAS.emerald
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(tp.x, tp.y); ctx.lineTo(tp.x + ux * len, tp.y + uy * len); ctx.stroke()
      const hx = tp.x + ux * len, hy = tp.y + uy * len
      ctx.beginPath()
      ctx.moveTo(hx - (ux * 5 - uy * 3), hy - (uy * 5 + ux * 3))
      ctx.lineTo(hx, hy)
      ctx.lineTo(hx - (ux * 5 + uy * 3), hy - (uy * 5 - ux * 3))
      ctx.stroke()
    }

    // placed charges
    for (const c of charges.current) {
      ctx.beginPath()
      ctx.arc(c.x, c.y, 11, 0, Math.PI * 2)
      ctx.fillStyle = c.q > 0 ? CANVAS.red : CANVAS.violet
      ctx.fill()
      ctx.strokeStyle = 'rgba(250,250,249,0.55)'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.strokeStyle = CANVAS.fg
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(c.x - 5, c.y); ctx.lineTo(c.x + 5, c.y); ctx.stroke()
      if (c.q > 0) { ctx.beginPath(); ctx.moveTo(c.x, c.y - 5); ctx.lineTo(c.x, c.y + 5); ctx.stroke() }
    }

    // the test charge
    ctx.beginPath()
    ctx.arc(tp.x, tp.y, 9, 0, Math.PI * 2)
    ctx.fillStyle = CANVAS.emerald
    ctx.fill()
    ctx.strokeStyle = release ? CANVAS.fg : 'rgba(250,250,249,0.55)'
    ctx.lineWidth = 2
    ctx.setLineDash(release ? [] : [3, 3])
    ctx.stroke()
    ctx.setLineDash([])
    ctx.strokeStyle = CANVAS.bg
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(tp.x - 4, tp.y); ctx.lineTo(tp.x + 4, tp.y); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(tp.x, tp.y - 4); ctx.lineTo(tp.x, tp.y + 4); ctx.stroke()

    if (charges.current.length === 0) {
      ctx.fillStyle = CANVAS.muted
      ctx.font = '12px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('Pick + or − below, then tap the canvas to place a charge', w / 2, h / 2 - 80)
    }
    if (challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('★ Challenge complete!', w / 2, 20)
    }

    // publish force note ~8×/s
    s.skip += 1
    if (s.skip >= 8) {
      s.skip = 0
      if (charges.current.length === 0) {
        setForceNote('no charges yet')
      } else {
        const dirs = ['right', 'down-right', 'down', 'down-left', 'left', 'up-left', 'up', 'up-right']
        const idx = Math.round(Math.atan2(ey, ex) / (Math.PI / 4))
        const dir = dirs[((idx % 8) + 8) % 8]
        const strong = mag < 0.02 ? '≈ zero' : mag < 0.25 ? 'weak' : mag < 0.9 ? 'moderate' : 'strong'
        setForceNote(`pushed ${dir} · ${strong}`)
      }
    }
  }, 400)

  // ── pointer interactions: place / drag charges, drag the test charge ──────
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { x, y } = canvasPos(e, canvas)
    const s = st.current
    if (Math.hypot(x - s.test.x, y - s.test.y) < 20) {
      s.dragging = 'test'
      canvas.setPointerCapture(e.pointerId)
      return
    }
    for (let i = 0; i < charges.current.length; i++) {
      const c = charges.current[i]
      if (Math.hypot(x - c.x, y - c.y) < 16) {
        s.dragging = i
        canvas.setPointerCapture(e.pointerId)
        return
      }
    }
    if (charges.current.length >= MAX_CHARGES) {
      setNote(`Charge limit reached (${MAX_CHARGES}) — clear a few to add more.`)
      return
    }
    charges.current.push({ x, y, q: pending })
    setCount(charges.current.length)
    setNote('')
  }
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const s = st.current
    if (s.dragging === null) return
    const { x, y } = canvasPos(e, canvas)
    if (s.dragging === 'test') {
      s.test.x = x
      s.test.y = y
      s.test.vx = 0
      s.test.vy = 0
    } else if (typeof s.dragging === 'number') {
      const c = charges.current[s.dragging]
      if (c) { c.x = x; c.y = y }
    }
  }
  const onPointerUp = () => {
    st.current.dragging = null
  }

  return (
    <SimFrame
      title="Charge & Field Sandbox"
      brief="Tap to place the selected charge (max 8), drag anything to move it, then release the test charge and watch it surf the field."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="rounded-lg cursor-crosshair touch-none"
          style={{ height: 400 }}
          aria-label="Electric field sandbox: place positive and negative charges, watch the teal field arrows, and release the emerald positive test charge toward the amber goal flag on the right"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-wrap gap-2">
          <SimButton variant={pending === 1 ? 'default' : 'outline'} onClick={() => setPending(1)}>
            <Plus className="h-4 w-4 me-1" aria-hidden /> Place positive
          </SimButton>
          <SimButton variant={pending === -1 ? 'default' : 'outline'} onClick={() => setPending(-1)}>
            <Minus className="h-4 w-4 me-1" aria-hidden /> Place negative
          </SimButton>
          <SimButton
            variant="secondary"
            onClick={() => { charges.current = []; setCount(0); setNote('') }}
          >
            <Trash2 className="h-4 w-4 me-1" aria-hidden /> Clear
          </SimButton>
        </div>
        <SimToggle label="Release test charge" checked={release} onChange={setRelease} />
        <div className="flex flex-wrap gap-2">
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden />
            Challenge: reach the flag
          </SimButton>
          <SimButton variant="secondary" onClick={resetTest}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset test charge
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Charges" value={String(count)} unit={`/ ${MAX_CHARGES}`} />
        <Readout label="Force on test +" value={forceNote} tone="text-emerald-500" />
      </div>

      {note && <p className="text-xs text-muted-foreground" role="status">{note}</p>}
      {release && reducedMotion && (
        <p className="text-xs text-muted-foreground" role="status">
          Release is paused while reduced motion is on — drag the test charge yourself; the emerald arrow shows the force on it.
        </p>
      )}

      {result && (
        <p
          className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}
          role="status"
        >
          {result}
        </p>
      )}
    </SimFrame>
  )
}
