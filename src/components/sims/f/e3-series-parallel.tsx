// ─── Sim: Series & Parallel · rewire two bulbs, chase the electrons ───────────
'use client'

import { useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimToggle, Readout, useSimCanvas,
  canvasPos, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw, Unlock, Lock } from 'lucide-react'

const V_BAT = 12 // V (fixed)
const R_BULB = 6 // Ω per bulb
const LX = 64 // left rail x
const TY = 84 // top rail y
const BY = 316 // bottom rail y
const BAT_TOP = 186 // battery + terminal y
const BAT_BOT = 202 // battery − terminal y
const BULB_Y_BRANCH = 200 // bulb y on a parallel branch

type Mode = 'series' | 'parallel'

interface Seg { x1: number; y1: number; x2: number; y2: number; i: number }

function brightnessWord(rel: number): string {
  if (rel <= 0.02) return 'off'
  if (rel < 0.45) return 'dim'
  if (rel < 0.95) return 'half'
  return 'full'
}

/** Solve the circuit: returns voltage & current per bulb + battery current. */
function solve(mode: Mode, third: boolean, out: boolean[]) {
  const n = third ? 3 : 2
  const v: number[] = []
  const i: number[] = []
  if (mode === 'series') {
    // one path: any unscrewed bulb breaks the whole loop
    const broken = Array.from({ length: n }, (_, k) => out[k]).some(Boolean)
    const I = broken ? 0 : V_BAT / (R_BULB * n)
    for (let k = 0; k < n; k++) {
      v.push(out[k] ? 0 : I * R_BULB)
      i.push(out[k] ? 0 : I)
    }
    return { v, i, itot: I }
  }
  // parallel: every screwed-in bulb gets the full battery voltage
  let itot = 0
  for (let k = 0; k < n; k++) {
    v.push(out[k] ? 0 : V_BAT)
    i.push(out[k] ? 0 : V_BAT / R_BULB)
    itot += out[k] ? 0 : V_BAT / R_BULB
  }
  return { v, i, itot }
}

function bulbXs(w: number, n: number): number[] {
  const span = w - 2 * LX - 12
  const fr = n === 2 ? [0.42, 0.74] : [0.30, 0.56, 0.82]
  return fr.map((f) => LX + f * span)
}

function drawBulb(ctx: CanvasRenderingContext2D, x: number, y: number, lit: number, out: boolean) {
  if (out) {
    ctx.save()
    ctx.translate(x, y - 10)
    ctx.rotate(0.55)
    ctx.fillStyle = CANVAS.panel
    ctx.strokeStyle = CANVAS.muted
    ctx.setLineDash([3, 3])
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    ctx.setLineDash([])
    ctx.restore()
    return
  }
  if (lit > 0.02) {
    ctx.globalAlpha = 0.12 + 0.38 * Math.min(1, lit)
    ctx.fillStyle = CANVAS.yellow
    ctx.beginPath(); ctx.arc(x, y, 24, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1
  }
  ctx.fillStyle = CANVAS.panelLight
  ctx.strokeStyle = lit > 0.02 ? CANVAS.yellow : CANVAS.muted
  ctx.lineWidth = 1.6
  ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  ctx.strokeStyle = lit > 0.02 ? CANVAS.amber : CANVAS.muted
  ctx.beginPath()
  ctx.moveTo(x - 5, y + 6); ctx.lineTo(x - 3, y - 4); ctx.lineTo(x, y + 2)
  ctx.lineTo(x + 3, y - 4); ctx.lineTo(x + 5, y + 6)
  ctx.stroke()
  ctx.fillStyle = CANVAS.muted
  ctx.fillRect(x - 6, y + 13, 12, 6)
}

export function SeriesParallelSim() {
  const [mode, setMode] = useState<Mode>('series')
  const [third, setThird] = useState(false)
  const [out, setOut] = useState([false, false, false])
  const [challenge, setChallenge] = useState<'idle' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const { canvasRef } = useSimCanvas((ctx, w, h, t) => {
    const n = third ? 3 : 2
    const sol = solve(mode, third, out)
    const xs = bulbXs(w, n)
    const RXs = w - LX

    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    // ── wires ───────────────────────────────────────────────────────────────
    ctx.strokeStyle = CANVAS.white
    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(LX, BAT_BOT); ctx.lineTo(LX, BY)
    if (mode === 'series') {
      ctx.moveTo(LX, BY); ctx.lineTo(RXs, BY)
      ctx.moveTo(RXs, BY); ctx.lineTo(RXs, TY)
      ctx.moveTo(RXs, TY); ctx.lineTo(LX, TY)
    } else {
      const last = xs[n - 1]
      ctx.moveTo(LX, BY); ctx.lineTo(last, BY)
      ctx.moveTo(LX, TY); ctx.lineTo(last, TY)
      for (let k = 0; k < n; k++) { ctx.moveTo(xs[k], BY); ctx.lineTo(xs[k], TY) }
    }
    ctx.moveTo(LX, TY); ctx.lineTo(LX, BAT_TOP)
    ctx.stroke()

    // battery symbol on the left rail
    ctx.strokeStyle = CANVAS.fg
    ctx.lineWidth = 3
    ctx.beginPath(); ctx.moveTo(LX - 16, BAT_TOP); ctx.lineTo(LX + 16, BAT_TOP); ctx.stroke()
    ctx.lineWidth = 6
    ctx.beginPath(); ctx.moveTo(LX - 8, BAT_BOT); ctx.lineTo(LX + 8, BAT_BOT); ctx.stroke()
    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText('+', LX + 24, BAT_TOP - 1)
    ctx.fillText('−', LX + 24, BAT_BOT + 9)
    ctx.fillText(`${V_BAT} V`, LX - 52, (BAT_TOP + BAT_BOT) / 2 + 4)

    // ── electron flow (− terminal → + terminal) ─────────────────────────────
    const segs: Seg[] = []
    if (mode === 'series') {
      const I = sol.itot
      segs.push({ x1: LX, y1: BAT_BOT, x2: LX, y2: BY, i: I })
      segs.push({ x1: LX, y1: BY, x2: RXs, y2: BY, i: I })
      segs.push({ x1: RXs, y1: BY, x2: RXs, y2: TY, i: I })
      segs.push({ x1: RXs, y1: TY, x2: LX, y2: TY, i: I })
      segs.push({ x1: LX, y1: TY, x2: LX, y2: BAT_TOP, i: I })
    } else {
      segs.push({ x1: LX, y1: BAT_BOT, x2: LX, y2: BY, i: sol.itot })
      let prevX = LX
      let cum = sol.itot
      for (let k = 0; k < n; k++) {
        segs.push({ x1: prevX, y1: BY, x2: xs[k], y2: BY, i: cum })
        segs.push({ x1: xs[k], y1: BY, x2: xs[k], y2: TY, i: sol.i[k] })
        cum -= sol.i[k]
        prevX = xs[k]
      }
      let cumT = 0
      for (let k = n - 1; k >= 0; k--) {
        cumT += sol.i[k]
        const nextX = k > 0 ? xs[k - 1] : LX
        segs.push({ x1: xs[k], y1: TY, x2: nextX, y2: TY, i: cumT })
      }
      segs.push({ x1: LX, y1: TY, x2: LX, y2: BAT_TOP, i: sol.itot })
    }
    ctx.fillStyle = CANVAS.teal
    for (const seg of segs) {
      if (seg.i <= 0.001) continue
      const len = Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1)
      const spacing = 30
      const speed = 26 + 20 * Math.min(1.4, seg.i)
      const off = reducedMotion ? 0 : (t * speed) % spacing
      const count = Math.floor(len / spacing)
      for (let k = 0; k <= count; k++) {
        const d = k * spacing + off
        if (d > len) continue
        const f = d / len
        ctx.beginPath()
        ctx.arc(seg.x1 + (seg.x2 - seg.x1) * f, seg.y1 + (seg.y2 - seg.y1) * f, 3.4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // junction dots (parallel)
    if (mode === 'parallel') {
      ctx.fillStyle = CANVAS.white
      for (let k = 0; k < n; k++) {
        ctx.beginPath(); ctx.arc(xs[k], TY, 3.5, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(xs[k], BY, 3.5, 0, Math.PI * 2); ctx.fill()
      }
    }

    // ── bulbs ───────────────────────────────────────────────────────────────
    for (let k = 0; k < n; k++) {
      const bx = xs[k]
      const by = mode === 'series' ? TY : BULB_Y_BRANCH
      ctx.fillStyle = CANVAS.bg
      ctx.beginPath(); ctx.arc(bx, by, 20, 0, Math.PI * 2); ctx.fill()
      const lit = out[k] ? 0 : sol.v[k] / V_BAT
      drawBulb(ctx, bx, by, lit, out[k])
      ctx.fillStyle = CANVAS.bg
      ctx.fillRect(bx - 32, by + 26, 64, 13)
      ctx.fillStyle = out[k] ? CANVAS.rose : CANVAS.muted
      ctx.font = '10px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText(out[k] ? 'unscrewed' : `${sol.v[k].toFixed(1)} V · ${brightnessWord(lit)}`, bx, by + 36)
    }

    // mode caption
    ctx.fillStyle = CANVAS.muted
    ctx.font = 'bold 12px ui-sans-serif, system-ui'
    ctx.textAlign = 'center'
    ctx.fillText(
      mode === 'series'
        ? 'SERIES — one loop · same current everywhere · voltage shared'
        : 'PARALLEL — one branch per bulb · same voltage across each · currents add',
      w / 2, 26,
    )
  })

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { x, y } = canvasPos(e, canvas)
    const n = third ? 3 : 2
    const xs = bulbXs(canvas.clientWidth, n)
    for (let k = 0; k < n; k++) {
      const by = mode === 'series' ? TY : BULB_Y_BRANCH
      if (Math.hypot(x - xs[k], y - by) < 22) {
        setOut((o) => { const c = [...o]; c[k] = !c[k]; return c })
        setChallenge('idle')
        setResult('')
        return
      }
    }
  }

  const solView = solve(mode, third, out)
  const nView = third ? 3 : 2

  const startChallenge = () => {
    const sol = solve(mode, third, out)
    if (out[0] || out[1]) {
      setChallenge('lost')
      setResult('Both main bulbs must be screwed in first — click a bulb to screw it back in.')
      return
    }
    if (sol.v[0] > 11 && sol.v[1] > 11) {
      setChallenge('won')
      beep(660, 140); beep(880, 180)
      setResult('★ Both bulbs get the full 12 V! In parallel each bulb sits on its own branch straight across the battery, so every bulb shines at full brightness.')
    } else {
      setChallenge('lost')
      setResult(`Each bulb only gets ${sol.v[0].toFixed(1)} V here — in series the 12 V is shared between the bulbs. Try the other wiring!`)
    }
  }

  const screwBtn = (k: number, name: string) => (
    <SimButton
      key={k}
      variant={out[k] ? 'secondary' : 'outline'}
      onClick={() => { setOut((o) => { const c = [...o]; c[k] = !c[k]; return c }); setChallenge('idle'); setResult('') }}
    >
      {out[k] ? <Lock className="h-4 w-4 mr-1" aria-hidden /> : <Unlock className="h-4 w-4 mr-1" aria-hidden />}
      {out[k] ? `Screw in ${name}` : `Unscrew ${name}`}
    </SimButton>
  )

  return (
    <SimFrame
      title="Circuit Rewiring Lab"
      brief="Flip between series and parallel wiring, unscrew bulbs, and watch the electron flow react. Click a bulb to unscrew it."
    >
      <canvas
        ref={canvasRef}
        onClick={onCanvasClick}
        className="rounded-lg cursor-pointer"
        style={{ height: 400 }}
        aria-label="Circuit simulator: a 12 volt battery wired to identical 6 ohm bulbs in series or parallel, with animated electron flow, per-bulb voltage and brightness"
        role="img"
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimButton variant={mode === 'series' ? 'default' : 'outline'} onClick={() => { setMode('series'); setChallenge('idle'); setResult('') }}>
          Series
        </SimButton>
        <SimButton variant={mode === 'parallel' ? 'default' : 'outline'} onClick={() => { setMode('parallel'); setChallenge('idle'); setResult('') }}>
          Parallel
        </SimButton>
        <SimToggle label="Third bulb" checked={third} onChange={(v) => { setThird(v); setChallenge('idle'); setResult('') }} />
        <div className="flex gap-2">
          {Array.from({ length: nView }, (_, k) => screwBtn(k, ['A', 'B', 'C'][k]))}
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimButton variant="outline" onClick={startChallenge}>
          <Flag className="h-4 w-4 mr-1" aria-hidden /> Challenge: full brightness
        </SimButton>
        <SimButton variant="secondary" onClick={() => { setOut([false, false, false]); setChallenge('idle'); setResult('') }}>
          <RotateCcw className="h-4 w-4 mr-1" aria-hidden /> Screw all back
        </SimButton>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Battery" value="12" unit="V" />
        <Readout label="Total current" value={solView.itot.toFixed(2)} unit="A" tone="text-yellow-500" />
        <Readout label={`Bulb A · ${brightnessWord(solView.v[0] / V_BAT)}`} value={solView.i[0].toFixed(2)} unit="A" />
        <Readout label={`Bulb B · ${brightnessWord(solView.v[1] / V_BAT)}`} value={solView.i[1].toFixed(2)} unit="A" />
        {third && (
          <Readout label={`Bulb C · ${brightnessWord(solView.v[2] / V_BAT)}`} value={solView.i[2].toFixed(2)} unit="A" />
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
