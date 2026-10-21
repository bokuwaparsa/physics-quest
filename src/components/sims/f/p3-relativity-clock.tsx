// ─── Sim: Relativity & the Quantum World · light clock + double slit ──────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Crosshair, Flag, Sparkles, Trash2, Zap } from 'lucide-react'

const C_PX = 130 // "speed of light" on the canvas, px/s
const MIRROR_SEP = 44 // px between the light-clock mirrors
const SHIP_W = 150 // px, ship rest length

type Tab = 'clock' | 'slit'

export function RelativityClockSim() {
  const [tab, setTab] = useState<Tab>('clock')
  const [beta, setBeta] = useState(0.5)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [guess, setGuess] = useState('')
  const [stats, setStats] = useState({ gamma: 1, shipTicks: 0, labTicks: 0, fired: 0 })

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const skip = useRef(0)

  const st = useRef({
    photons: [] as { x: number; y: number; slit: number; through: boolean }[],
    impacts: [] as number[],
    queue: 0,
    spawnT: 0,
    fired: 0,
  })

  const fire = () => { st.current.queue += 100 }
  const clearPattern = () => {
    st.current.impacts = []
    st.current.photons = []
    st.current.fired = 0
    st.current.queue = 0
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t, dt) => {
    const s = st.current
    const g = 1 / Math.sqrt(1 - beta * beta)

    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    if (tab === 'clock') drawClockTab(ctx, w, beta, g, t, reducedMotion)
    else drawSlitTab(ctx, w, s, dt)

    // publish readouts ~7×/s
    skip.current += 1
    if (skip.current >= 9) {
      skip.current = 0
      const T0 = (2 * MIRROR_SEP) / C_PX
      const te = reducedMotion ? 0 : t
      setStats({
        gamma: g,
        shipTicks: Math.floor(te / (T0 * g)),
        labTicks: Math.floor(te / T0),
        fired: s.fired,
      })
    }
  })

  const startChallenge = () => {
    if (tab !== 'clock') {
      setChallenge('lost')
      setResult('This challenge lives in the Light clock tab — switch over first.')
      return
    }
    const v = parseFloat(guess)
    if (Number.isFinite(v) && v >= 1.6 && v <= 1.7) {
      setChallenge('won')
      beep(660, 140); beep(880, 180)
      setResult('★ Exactly! γ = 1/√(1 − 0.8²) = 1/√0.36 = 1/0.6 ≈ 1.67 — at 0.8c the ship clock ticks 1.67 times slower.')
    } else {
      setChallenge('lost')
      setResult('Not yet — set the slider to 0.8c and read γ: γ = 1/√(1 − v²/c²) = 1/√(1 − 0.64) = 1/0.6. Try again!')
    }
  }

  const gamma = 1 / Math.sqrt(1 - beta * beta)
  const isClock = tab === 'clock'

  return (
    <SimFrame
      title="Relativity & Quantum Bench"
      brief="Tab 1: a light clock on a fast ship — moving clocks run slow and the ship shrinks. Tab 2: fire photons one by one at a double slit."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg"
        style={{ height: 400 }}
        aria-label="Relativity simulator: a spaceship carrying a light clock passing a laboratory clock with time dilation and length contraction, plus a double-slit experiment building an interference pattern one photon at a time"
        role="img"
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimButton variant={isClock ? 'default' : 'outline'} onClick={() => { setTab('clock'); setResult('') }}>
          <Zap className="h-4 w-4 mr-1" aria-hidden /> Light clock
        </SimButton>
        <SimButton variant={!isClock ? 'default' : 'outline'} onClick={() => { setTab('slit'); setResult('') }}>
          <Sparkles className="h-4 w-4 mr-1" aria-hidden /> Double slit
        </SimButton>
        {isClock ? (
          <SimSlider label="Ship speed" value={beta} min={0} max={0.99} step={0.01} unit="c" onChange={setBeta} />
        ) : (
          <>
            <SimButton onClick={fire}>
              <Crosshair className="h-4 w-4 mr-1" aria-hidden /> Fire 100 photons
            </SimButton>
            <SimButton variant="ghost" onClick={clearPattern}>
              <Trash2 className="h-4 w-4 mr-1" aria-hidden /> Clear pattern
            </SimButton>
          </>
        )}
      </div>

      {isClock && (
        <div className="flex flex-wrap items-end gap-3">
          <SimButton variant="outline" onClick={startChallenge}>
            <Flag className="h-4 w-4 mr-1" aria-hidden /> Challenge: gamma at 0.8c
          </SimButton>
        </div>
      )}

      {isClock && challenge !== 'idle' && (
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs font-medium text-muted-foreground">
            At v = 0.8c, what is the time dilation factor γ?
          </label>
          <input
            value={guess}
            onChange={(ev) => setGuess(ev.target.value)}
            inputMode="decimal"
            placeholder="γ = ?"
            aria-label="Predict the gamma factor at 0.8c"
            className="h-8 w-24 rounded-md border bg-background px-2 text-sm"
          />
          <SimButton variant="secondary" onClick={startChallenge}>Check</SimButton>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {isClock ? (
          <>
            <Readout label="Speed" value={beta.toFixed(2)} unit="c" />
            <Readout label="Gamma γ" value={gamma.toFixed(2)} tone="text-amber-500" />
            <Readout label="Ship clock" value={`${stats.shipTicks}`} unit="ticks" tone="text-teal-400" />
            <Readout label="Lab clock" value={`${stats.labTicks}`} unit="ticks" />
            <Readout label="Ship length" value={`×${(1 / gamma).toFixed(2)}`} tone="text-violet-400" />
          </>
        ) : (
          <>
            <Readout label="Photons fired" value={`${stats.fired}`} tone="text-amber-500" />
            <Readout label="Pattern" value="histogram builds up" tone="text-violet-400" />
          </>
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

// ── tab (a): the light clock on a moving ship ─────────────────────────────────
function drawClockTab(
  ctx: CanvasRenderingContext2D, w: number,
  beta: number, g: number, t: number, reducedMotion: boolean,
) {
  const te = reducedMotion ? 0 : t
  const T0 = (2 * MIRROR_SEP) / C_PX
  const vPx = beta * C_PX
  const span = Math.max(200, w - 60)
  const sx = 100 + ((te * vPx) % span)
  const yc = 140
  const hw = SHIP_W / (2 * g)

  // ground reference + lab clock
  ctx.strokeStyle = CANVAS.muted
  ctx.lineWidth = 2
  ctx.setLineDash([2, 6])
  ctx.beginPath(); ctx.moveTo(20, 250); ctx.lineTo(w - 20, 250); ctx.stroke()
  ctx.setLineDash([])

  // motion streaks
  if (vPx > 1) {
    ctx.strokeStyle = 'rgba(247,151,22,0.35)'
    ctx.lineWidth = 2
    for (let k = 0; k < 4; k++) {
      const yy = yc - 34 + k * 22
      ctx.beginPath()
      ctx.moveTo(sx - hw - 14 - k * 10, yy)
      ctx.lineTo(sx - hw - 52 - k * 26, yy)
      ctx.stroke()
    }
  }

  // ship body (length-contracted: rest length / γ)
  ctx.fillStyle = CANVAS.panel
  ctx.strokeStyle = CANVAS.white
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(sx - hw, yc + 50)
  ctx.lineTo(sx - hw, yc - 34)
  ctx.quadraticCurveTo(sx - hw, yc - 50, sx - hw + 16, yc - 50)
  ctx.lineTo(sx + hw - 16, yc - 50)
  ctx.quadraticCurveTo(sx + hw, yc - 50, sx + hw, yc - 34)
  ctx.lineTo(sx + hw, yc + 50)
  ctx.lineTo(sx - hw + 14, yc + 50)
  ctx.lineTo(sx - hw + 4, yc + 40)
  ctx.lineTo(sx - hw + 4, yc + 50)
  ctx.closePath()
  ctx.fill(); ctx.stroke()

  // light clock: two mirrors + bouncing photon
  const mirTop = yc - MIRROR_SEP / 2
  const mirBot = yc + MIRROR_SEP / 2
  ctx.strokeStyle = CANVAS.white
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(sx - 20, mirTop); ctx.lineTo(sx + 20, mirTop)
  ctx.moveTo(sx - 20, mirBot); ctx.lineTo(sx + 20, mirBot)
  ctx.stroke()
  const ph = (te * (C_PX / g) / (2 * MIRROR_SEP)) % 1
  const tri = ph < 0.5 ? ph * 2 : 2 - ph * 2
  const py = mirTop + tri * MIRROR_SEP
  // diagonal path hint (what the stationary observer sees)
  if (vPx > 1) {
    ctx.strokeStyle = 'rgba(245,158,11,0.25)'
    ctx.setLineDash([3, 4])
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(sx - vPx * 0.12, py - Math.sign(tri - 0.5) * 10); ctx.lineTo(sx, py); ctx.stroke()
    ctx.setLineDash([])
  }
  ctx.fillStyle = CANVAS.amber
  ctx.beginPath(); ctx.arc(sx, py, 4.5, 0, Math.PI * 2); ctx.fill()

  // ship clock face + hand (proper time: ticks every γ·T0 of lab time)
  const shipTicks = Math.floor(te / (T0 * g))
  const tickFrac = (te / (T0 * g)) % 1
  ctx.fillStyle = CANVAS.panelLight
  ctx.beginPath(); ctx.arc(sx, yc + 34, 11, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = CANVAS.white
  ctx.lineWidth = 1.5
  ctx.stroke()
  const sa = (te / (T0 * g)) * (Math.PI / 2)
  ctx.strokeStyle = CANVAS.teal
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(sx, yc + 34)
  ctx.lineTo(sx + Math.cos(sa) * 8, yc + 34 + Math.sin(sa) * 8)
  ctx.stroke()
  if (shipTicks > 0 && tickFrac < 0.25) {
    ctx.globalAlpha = 1 - tickFrac * 4
    ctx.strokeStyle = CANVAS.teal
    ctx.beginPath(); ctx.arc(sx, yc + 34, 14, 0, Math.PI * 2); ctx.stroke()
    ctx.globalAlpha = 1
  }

  // lab clock (at rest: ticks every T0)
  const lx = 84
  const ly = 330
  ctx.fillStyle = CANVAS.panelLight
  ctx.beginPath(); ctx.arc(lx, ly, 22, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = CANVAS.white
  ctx.lineWidth = 2
  ctx.stroke()
  const la = (te / T0) * (Math.PI / 2)
  ctx.strokeStyle = CANVAS.white
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(lx, ly)
  ctx.lineTo(lx + Math.cos(la) * 15, ly + Math.sin(la) * 15)
  ctx.stroke()

  // labels
  ctx.fillStyle = CANVAS.muted
  ctx.font = '10px ui-monospace, monospace'
  ctx.textAlign = 'center'
  ctx.fillText(`ship clock · ${shipTicks} ticks`, sx, yc + 66)
  ctx.fillText(`lab clock · ${Math.floor(te / T0)} ticks`, lx, ly + 36)
  ctx.fillStyle = CANVAS.fg
  ctx.font = 'bold 12px ui-sans-serif, system-ui'
  ctx.fillText(`γ = 1/√(1 − v²/c²) = ${g.toFixed(2)}  ·  ship length × ${(1 / g).toFixed(2)}`, w / 2, 24)
  ctx.fillStyle = CANVAS.muted
  ctx.font = '10px ui-sans-serif, system-ui'
  ctx.fillText('the ship clock ticks slower by exactly γ — and the ship is shorter by 1/γ', w / 2, 40)
}

// ── tab (b): double slit, one photon at a time ────────────────────────────────
function drawSlitTab(
  ctx: CanvasRenderingContext2D, w: number,
  s: {
    photons: { x: number; y: number; slit: number; through: boolean }[]
    impacts: number[]
    queue: number
    spawnT: number
    fired: number
  },
  dt: number,
) {
  const barrierX = Math.max(210, w * 0.36)
  const screenX = Math.min(w - 16, Math.max(barrierX + 120, w * 0.72))
  const gunY = 190
  const slitA = gunY - 26
  const slitB = gunY + 26

  // spawn queued photons
  if (s.queue > 0) {
    s.spawnT += dt
    while (s.spawnT > 0.035 && s.queue > 0) {
      s.photons.push({ x: 74, y: gunY, slit: Math.random() < 0.5 ? 0 : 1, through: false })
      s.queue -= 1
      s.fired += 1
      s.spawnT -= 0.035
    }
  }

  // move photons; sample impact position from the two-slit intensity pattern
  for (const p of s.photons) {
    p.x += 320 * dt
    if (!p.through && p.x >= barrierX) {
      p.through = true
      p.y = p.slit === 0 ? slitA : slitB
    }
    if (p.through && p.x >= screenX) {
      let iy = gunY
      for (let tries = 0; tries < 24; tries++) {
        const yy = gunY + (Math.random() * 2 - 1) * 140
        const intensity =
          Math.pow(Math.cos((Math.PI * (yy - gunY)) / 30), 2) *
          Math.exp(-Math.pow(yy - gunY, 2) / (2 * 78 * 78))
        if (Math.random() < intensity) { iy = yy; break }
      }
      s.impacts.push(iy)
      if (s.impacts.length > 1400) s.impacts.shift()
      p.x = -999 // remove below
    }
  }
  s.photons = s.photons.filter((p) => p.x > -1)

  // labels
  ctx.fillStyle = CANVAS.muted
  ctx.font = '10px ui-sans-serif, system-ui'
  ctx.textAlign = 'center'
  ctx.fillText('each photon goes through BOTH slits? — quantum weirdness', (barrierX + screenX) / 2, 26)

  // photon gun
  ctx.fillStyle = CANVAS.orange
  ctx.fillRect(46, gunY - 9, 26, 18)
  ctx.fillStyle = CANVAS.muted
  ctx.fillText('gun', 59, gunY + 28)

  // barrier with two slits
  ctx.fillStyle = CANVAS.panelLight
  ctx.strokeStyle = CANVAS.white
  ctx.lineWidth = 1.5
  ctx.fillRect(barrierX - 4, 66, 8, slitA - 9 - 66)
  ctx.strokeRect(barrierX - 4, 66, 8, slitA - 9 - 66)
  ctx.fillRect(barrierX - 4, slitA + 9, 8, slitB - 9 - (slitA + 9))
  ctx.strokeRect(barrierX - 4, slitA + 9, 8, slitB - 9 - (slitA + 9))
  ctx.fillRect(barrierX - 4, slitB + 9, 8, 330 - (slitB + 9))
  ctx.strokeRect(barrierX - 4, slitB + 9, 8, 330 - (slitB + 9))

  // screen
  ctx.strokeStyle = CANVAS.white
  ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(screenX, 60); ctx.lineTo(screenX, 336); ctx.stroke()
  ctx.fillStyle = CANVAS.muted
  ctx.fillText('screen', screenX, 350)

  // accumulated impacts + histogram
  for (const iy of s.impacts) {
    ctx.globalAlpha = 0.5
    ctx.fillStyle = CANVAS.amber
    ctx.beginPath(); ctx.arc(screenX, iy, 2, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1
  }
  const bins = new Array(36).fill(0)
  for (const iy of s.impacts) {
    const b = Math.floor((iy - 56) / 8)
    if (b >= 0 && b < 36) bins[b] += 1
  }
  const maxBin = Math.max(1, ...bins)
  const barMax = Math.max(24, w - screenX - 14)
  ctx.fillStyle = 'rgba(139,92,246,0.75)'
  for (let b = 0; b < 36; b++) {
    if (bins[b] === 0) continue
    const bw = (bins[b] / maxBin) * barMax
    ctx.fillRect(screenX + 3, 56 + b * 8, bw, 6)
  }

  // photons in flight (with "both slits" ghost lines)
  for (const p of s.photons) {
    if (p.through) {
      ctx.strokeStyle = 'rgba(245,158,11,0.28)'
      ctx.setLineDash([2, 4])
      ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(barrierX, slitA); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(barrierX, slitB); ctx.stroke()
      ctx.setLineDash([])
    }
    ctx.fillStyle = CANVAS.amber
    ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); ctx.fill()
  }
}
