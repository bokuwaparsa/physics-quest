// ─── Sim: Mirror & Laser · aim a reflected beam at targets (θi = θr) ──────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas,
  useSimBeep, useReducedMotion, drawGrid, canvasPos,
} from '@/components/sims/sim-kit'
import { Flag, RefreshCcw } from 'lucide-react'

const H = 400

interface Vec { x: number; y: number }

function segDist(p: Vec, a: Vec, b: Vec): number {
  const abx = b.x - a.x, aby = b.y - a.y
  const len2 = abx * abx + aby * aby
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * abx + (p.y - a.y) * aby) / len2))
  const dx = p.x - (a.x + t * abx), dy = p.y - (a.y + t * aby)
  return Math.hypot(dx, dy)
}

export function MirrorLaserSim() {
  const [deg, setDeg] = useState(10)
  const [ti, setTi] = useState(67) // published angle of incidence (deg)
  const [hits, setHits] = useState(0)
  const [glow, setGlow] = useState(0)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')
  const dragging = useRef(false)
  const skip = useRef(0)

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({
    deg: 10, glow: 0, flash: 0, cool: 0,
    challenge: 'idle' as 'idle' | 'active' | 'won',
  })

  const startChallenge = () => {
    setChallenge('active')
    setResult('Tilt the mirror so the reflected beam lands on the glowing target — the law of reflection does the aiming for you.')
  }

  const replay = () => {
    const next = (glow + 1 + Math.floor(Math.random() * 2)) % 3
    setGlow(next)
    setChallenge('active')
    setResult('New glowing target — find its angle!')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t) => {
    const s = st.current
    s.deg = deg
    s.glow = glow
    s.challenge = challenge

    // ── geometry: fixed laser (top-left) → mirror centre → reflected beam ──
    const M: Vec = { x: w / 2, y: h / 2 }
    const S: Vec = { x: 70, y: 60 }
    const phi = (s.deg * Math.PI) / 180
    const u: Vec = { x: Math.cos(phi), y: Math.sin(phi) } // mirror surface direction
    const n: Vec = { x: -Math.sin(phi), y: Math.cos(phi) } // unit normal
    let din: Vec = { x: M.x - S.x, y: M.y - S.y }
    const dl = Math.hypot(din.x, din.y)
    din = { x: din.x / dl, y: din.y / dl }
    const dot = din.x * n.x + din.y * n.y
    const dout: Vec = { x: din.x - 2 * dot * n.x, y: din.y - 2 * dot * n.y }
    const thetaI = (Math.acos(Math.max(-1, Math.min(1, Math.abs(dot)))) * 180) / Math.PI

    // ray-march the reflected beam to the canvas edge
    let B: Vec = { ...M }
    for (let i = 0; i < 600; i++) {
      const nx = B.x + dout.x * 4, ny = B.y + dout.y * 4
      if (nx < 0 || nx > w || ny < 0 || ny > h) break
      B = { x: nx, y: ny }
    }

    // three targets: two on the right wall, one on the floor
    const targets: Vec[] = [
      { x: w - 30, y: 96 },
      { x: w - 30, y: h - 110 },
      { x: w * 0.7, y: h - 26 },
    ]
    const hitIdx = targets.findIndex((T) => segDist(T, M, B) < 15)

    // hit detection (cooldown-latched so resting on the target doesn't spam)
    s.cool = Math.max(0, s.cool - 0.016)
    if (hitIdx === s.glow && s.cool === 0) {
      s.cool = 0.9
      s.flash = 1
      setHits((v) => v + 1)
      const next = (s.glow + 1 + Math.floor(Math.random() * 2)) % 3
      s.glow = next
      setGlow(next)
      beep(880, 130); beep(1318, 170)
      if (s.challenge !== 'won') {
        s.challenge = 'won'
        setChallenge('won')
        setResult(`Direct hit! The beam bounced off with θi = θr = ${thetaI.toFixed(1)}° — equal angles always.`)
      }
    }
    s.flash = Math.max(0, s.flash - 0.02)

    skip.current += 1
    if (skip.current >= 6) { skip.current = 0; setTi(thetaI) }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    drawGrid(ctx, w, h, 40)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 2
    ctx.strokeRect(4, 4, w - 8, h - 8)

    // normal (dashed)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1.5
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(M.x - n.x * 90, M.y - n.y * 90)
    ctx.lineTo(M.x + n.x * 90, M.y + n.y * 90)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-sans-serif, system-ui'
    ctx.textAlign = 'left'
    ctx.fillText('normal', M.x + n.x * 98 + 4, M.y + n.y * 98 + 3)

    // mirror (silver bar) + stand
    ctx.strokeStyle = reducedMotion ? CANVAS.white : CANVAS.fg
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.moveTo(M.x - u.x * 70, M.y - u.y * 70)
    ctx.lineTo(M.x + u.x * 70, M.y + u.y * 70)
    ctx.stroke()
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(M.x, M.y + 16); ctx.lineTo(M.x, M.y + 34); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(M.x - 12, M.y + 34); ctx.lineTo(M.x + 12, M.y + 34); ctx.stroke()

    // protractor arcs: incoming→normal (θi, amber) and normal→reflected (θr, green)
    const aIn = Math.atan2(S.y - M.y, S.x - M.x)
    const nSide = dot < 0 ? n : { x: -n.x, y: -n.y }
    const aN = Math.atan2(nSide.y, nSide.x)
    const aOut = Math.atan2(dout.y, dout.x)
    const arc = (a1: number, a2: number, r: number, color: string): number | undefined => {
      const delta = (((a2 - a1 + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) - Math.PI
      if (Math.abs(delta) < 0.02) return undefined
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(M.x, M.y, r, a1, a1 + delta, delta < 0)
      ctx.stroke()
      return a1 + delta / 2
    }
    const midI = arc(aIn, aN, 46, CANVAS.amber)
    const midR = arc(aN, aOut, 46, CANVAS.emerald)
    ctx.font = '11px ui-monospace, monospace'
    ctx.textAlign = 'center'
    if (midI !== undefined) {
      ctx.fillStyle = CANVAS.amber
      ctx.fillText(`${thetaI.toFixed(0)}°`, M.x + Math.cos(midI) * 66, M.y + Math.sin(midI) * 66 + 4)
    }
    if (midR !== undefined) {
      ctx.fillStyle = CANVAS.emerald
      ctx.fillText(`${thetaI.toFixed(0)}°`, M.x + Math.cos(midR) * 66, M.y + Math.sin(midR) * 66 + 4)
    }

    // laser device + incoming beam
    ctx.fillStyle = CANVAS.panelLight
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1.5
    ctx.fillRect(S.x - 30, S.y - 12, 34, 24)
    ctx.strokeRect(S.x - 30, S.y - 12, 34, 24)
    ctx.strokeStyle = CANVAS.red
    ctx.globalAlpha = 0.22
    ctx.lineWidth = 8
    ctx.beginPath(); ctx.moveTo(S.x, S.y); ctx.lineTo(M.x, M.y); ctx.stroke()
    ctx.globalAlpha = 1
    ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.moveTo(S.x, S.y); ctx.lineTo(M.x, M.y); ctx.stroke()

    // reflected beam
    ctx.globalAlpha = 0.22
    ctx.lineWidth = 8
    ctx.beginPath(); ctx.moveTo(M.x, M.y); ctx.lineTo(B.x, B.y); ctx.stroke()
    ctx.globalAlpha = 1
    ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.moveTo(M.x, M.y); ctx.lineTo(B.x, B.y); ctx.stroke()

    // targets
    targets.forEach((T, i) => {
      const isGlow = i === s.glow
      const pulse = reducedMotion ? 0.6 : 0.5 + 0.5 * Math.sin(4 * t)
      if (isGlow) {
        ctx.fillStyle = CANVAS.amber
        ctx.globalAlpha = 0.25 + 0.35 * pulse
        ctx.beginPath(); ctx.arc(T.x, T.y, 22 + 5 * pulse, 0, Math.PI * 2); ctx.fill()
        ctx.globalAlpha = 1
      }
      ctx.fillStyle = isGlow ? CANVAS.amber : CANVAS.panelLight
      ctx.strokeStyle = isGlow ? CANVAS.fg : CANVAS.muted
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(T.x, T.y, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = isGlow ? CANVAS.bg : CANVAS.muted
      ctx.font = 'bold 10px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText(`${i + 1}`, T.x, T.y + 3.5)
    })

    // win flash
    if (s.flash > 0) {
      ctx.fillStyle = CANVAS.emerald
      ctx.globalAlpha = s.flash * 0.25
      ctx.fillRect(0, 0, w, h)
      ctx.globalAlpha = 1
    }
    if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('★ Target hit — θi = θr never misses!', w / 2, h - 10)
    }
  }, H)

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { x, y } = canvasPos(e, canvas)
    const r = canvas.getBoundingClientRect()
    if (Math.hypot(x - r.width / 2, y - r.height / 2) < 90) {
      dragging.current = true
      canvas.setPointerCapture(e.pointerId)
      onPointerMove(e)
    }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragging.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const { x, y } = canvasPos(e, canvas)
    const r = canvas.getBoundingClientRect()
    let a = (Math.atan2(y - r.height / 2, x - r.width / 2) * 180) / Math.PI
    a = ((a % 180) + 180) % 180
    if (a > 90) a = 180 - a
    setDeg(Math.round(a * 2) / 2)
  }

  const endDrag = () => { dragging.current = false }

  return (
    <SimFrame
      title="Mirror & Laser Bench"
      brief="A fixed laser fires at the mirror's centre. Tilt the mirror (slider, or drag near it) and bounce the beam onto the glowing target."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg cursor-grab touch-none"
        style={{ height: H }}
        aria-label="Laser reflection bench: a red beam from the top left hits a tiltable flat mirror at the centre; the angle of incidence and angle of reflection are drawn as protractor arcs, and three targets wait on the right wall and floor"
        role="img"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Mirror tilt" value={deg} min={0} max={90} step={0.5} unit="°" onChange={setDeg} />
        <div className="flex flex-wrap gap-2">
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={challenge === 'won' ? replay : startChallenge}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden />
            {challenge === 'won' ? 'New glowing target' : 'Challenge: hit the target'}
          </SimButton>
          <SimButton variant="secondary" onClick={() => { setDeg(10); setResult('') }}>
            <RefreshCcw className="h-4 w-4 me-1" aria-hidden /> Reset angle
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Angle of incidence θᵢ" value={ti.toFixed(1)} unit="°" tone="text-amber-500" />
        <Readout label="Angle of reflection θᵣ" value={ti.toFixed(1)} unit="°" tone="text-emerald-500" />
        <Readout label="Mirror tilt" value={deg.toFixed(1)} unit="°" />
        <Readout label="Targets hit" value={String(hits)} tone="text-rose-500" />
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
