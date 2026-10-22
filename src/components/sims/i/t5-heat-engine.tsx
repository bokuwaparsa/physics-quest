// ─── Sim: Heat Engine · Qh in → W out + Qc dumped, Carnot limit in kelvin ─────
// e = W/Qh = min(engine's rated efficiency, 1 − Tc/Th); challenge: W ≥ 500 J
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, Legend,
  useSimCanvas, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flame, RotateCcw, Flag } from 'lucide-react'

const QH = 1000 // joules per pour
const POUR_TIME = 1.6 // s of pour animation

type EngineId = 'carnot' | 'steam' | 'petrol' | 'diesel'
const ENGINES: { value: EngineId; label: string; rated: number }[] = [
  { value: 'carnot', label: 'Ideal Carnot (reversible)', rated: 1 },
  { value: 'steam', label: 'Steam turbine · 15%', rated: 0.15 },
  { value: 'petrol', label: 'Petrol engine · 25%', rated: 0.25 },
  { value: 'diesel', label: 'Diesel engine · 37%', rated: 0.37 },
]

export function HeatEngineSim() {
  const [th, setTh] = useState(600)
  const [tc, setTc] = useState(300)
  const [engine, setEngine] = useState<EngineId>('carnot')
  const [pouring, setPouring] = useState(false)
  const [ePct, setEPct] = useState(0)
  const [wOut, setWOut] = useState(0)
  const [qOut, setQOut] = useState(0)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const carnot = 1 - tc / th
  const rated = ENGINES.find((e) => e.value === engine)?.rated ?? 1
  const overtemp = tc >= th // only possible in principle — sliders cannot reach it
  const eff = Math.max(0, Math.min(rated, carnot))

  const st = useRef({
    pour: 0, // 0 = idle, 0…1 animation, 1 done
    wheel: 0,
    W: 0, Qc: 0, e: 0,
    challenge: 'idle' as 'idle' | 'active' | 'won',
  })

  const pour = () => {
    const s = st.current
    s.W = Math.round(eff * QH)
    s.Qc = QH - s.W
    s.e = eff
    setResult('')
    if (reducedMotion) {
      s.pour = 1
      finishPour()
    } else {
      s.pour = 0.001
      setPouring(true)
    }
  }

  const finishPour = () => {
    const s = st.current
    setPouring(false)
    setEPct(Math.round(s.e * 100))
    setWOut(s.W)
    setQOut(s.Qc)
    if (s.challenge === 'active') {
      if (s.W >= 500) {
        s.challenge = 'won'
        setChallenge('won')
        beep(660, 120); beep(880, 160)
        setResult(`★ W = ${s.W} J from one 1000 J pour! Efficiency ${Math.round(s.e * 100)}% ≥ 50% needs the Carnot limit ≥ 50% — that means Th ≥ 2×Tc. Real engines (15–37%) can never get there; only the ideal reversible one can.`)
      } else {
        setResult(`${s.W} J — short of the 500 J goal. You need e ≥ 50%, so the Carnot limit 1 − Tc/Th must reach 50%: make Th ≥ 2×Tc (e.g. 600 K over 300 K) and pick 'Ideal Carnot' — a 1000 J pour then splits 500 J work / 500 J waste.`)
      }
    } else {
      setResult(`Poured 1000 J: W = ${s.W} J out, Qc = ${s.Qc} J dumped. e = ${Math.round(s.e * 100)}% against a Carnot ceiling of ${Math.round(carnot * 100)}%.`)
    }
  }

  const startChallenge = () => {
    st.current.challenge = 'active'
    st.current.pour = 0
    setChallenge('active')
    setPouring(false)
    setResult('Goal: get W ≥ 500 J from ONE 1000 J pour. Hint: e = min(engine rating, 1 − Tc/Th) must clear 50% — tune Th and Tc, and remember the rated engines stay at 15–37%.')
  }

  const reset = () => {
    const s = st.current
    s.challenge = 'idle'; s.pour = 0; s.W = 0; s.Qc = 0; s.e = 0
    setChallenge('idle'); setPouring(false)
    setEPct(0); setWOut(0); setQOut(0)
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t, dt) => {
    const s = st.current
    s.challenge = challenge

    // ── pour animation ──────────────────────────────────────────────────────
    if (pouring && s.pour < 1) {
      s.pour = Math.min(1, s.pour + dt)
      s.wheel += dt * 5
      if (s.pour >= 1) { s.pour = 1; finishPour() }
    }

    // ── draw ────────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const ex = Math.min(120, w * 0.18) // engine x
    const ey = h / 2

    // hot reservoir
    ctx.fillStyle = CANVAS.amber
    ctx.fillRect(ex - 90, 56, 180, 44)
    ctx.fillStyle = CANVAS.bg; ctx.font = 'bold 12px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText(`hot · Th = ${th} K`, ex, 82)

    // cold reservoir
    ctx.fillStyle = CANVAS.rose
    ctx.fillRect(ex - 90, h - 58, 180, 44)
    ctx.fillStyle = CANVAS.bg
    ctx.fillText(`cold · Tc = ${tc} K`, ex, h - 30)
    if (tc >= th) {
      ctx.fillStyle = CANVAS.red; ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('Tc ≥ Th — engine cannot run!', ex, h - 70)
    }

    // engine body + flywheel
    ctx.fillStyle = CANVAS.panelLight
    ctx.beginPath(); ctx.arc(ex, ey, 38, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.violet; ctx.lineWidth = 4
    ctx.beginPath(); ctx.arc(ex, ey, 38, 0, Math.PI * 2); ctx.stroke()
    ctx.strokeStyle = CANVAS.violet; ctx.lineWidth = 2
    for (let i = 0; i < 3; i++) {
      const a = s.wheel + (i * Math.PI * 2) / 3
      ctx.beginPath()
      ctx.moveTo(ex, ey)
      ctx.lineTo(ex + Math.cos(a) * 30, ey + Math.sin(a) * 30)
      ctx.stroke()
    }
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 11px ui-sans-serif, system-ui'
    ctx.fillText('ENGINE', ex, ey + 4)

    // arrows: Qh in, W out, Qc out
    const arrow = (x0: number, y0: number, x1: number, y1: number, color: string, label: string) => {
      ctx.strokeStyle = color; ctx.lineWidth = 5
      ctx.setLineDash([9, 7])
      ctx.lineDashOffset = pouring ? -t * 60 : 0
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
      ctx.setLineDash([])
      const a = Math.atan2(y1 - y0, x1 - x0)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(x1 + Math.cos(a) * 10, y1 + Math.sin(a) * 10)
      ctx.lineTo(x1 + Math.cos(a + 2.5) * 11, y1 + Math.sin(a + 2.5) * 11)
      ctx.lineTo(x1 + Math.cos(a - 2.5) * 11, y1 + Math.sin(a - 2.5) * 11)
      ctx.closePath(); ctx.fill()
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText(label, x1 + Math.cos(a) * 26, y1 + Math.sin(a) * 26 + 4)
    }
    const p = s.pour
    arrow(ex, 100, ex, ey - 42, CANVAS.amber, `Qh ${Math.round(QH * p)} J`)
    arrow(ex + 42, ey, ex + 118, ey, CANVAS.emerald, `W ${Math.round(s.W * p)} J`)
    arrow(ex, ey + 42, ex, h - 62, CANVAS.rose, `Qc ${Math.round(s.Qc * p)} J`)

    // energy bars (max = 1000 J)
    const barX = Math.min(ex + 160, w - 260)
    const barW = Math.min(230, w - barX - 24)
    if (barW > 120) {
      const bar = (y: number, frac: number, color: string, label: string, val: number, marker?: number) => {
        ctx.textAlign = 'left'
        ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
        ctx.fillText(label, barX, y - 5)
        ctx.fillStyle = CANVAS.panelLight
        ctx.fillRect(barX, y, barW, 18)
        ctx.fillStyle = color
        ctx.fillRect(barX, y, Math.max(0, Math.min(1, frac)) * barW, 18)
        ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1
        ctx.strokeRect(barX, y, barW, 18)
        ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 10px ui-monospace, monospace'; ctx.textAlign = 'right'
        ctx.fillText(`${Math.round(val)} J`, barX + barW, y + 13)
        if (marker !== undefined) {
          ctx.strokeStyle = CANVAS.fg; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(barX + barW * marker, y - 2)
          ctx.lineTo(barX + barW * marker, y + 20)
          ctx.stroke()
          ctx.setLineDash([])
        }
      }
      bar(88, p, CANVAS.amber, 'Qh in (heat)', QH * p)
      bar(148, (s.W / QH) * p, CANVAS.emerald, 'W out (work) — dashed = Carnot max', s.W * p, carnot)
      bar(208, (s.Qc / QH) * p, CANVAS.rose, 'Qc dumped (waste)', s.Qc * p)
    }

    // challenge banner
    ctx.textAlign = 'center'
    if (s.challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: get W ≥ 500 J from one 1000 J pour — needs Carnot ≥ 50% (Th ≥ 2×Tc)!', w / 2, 20)
    } else if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ W ≥ 500 J — challenge complete!', w / 2, 20)
    }
  }, 400)

  return (
    <SimFrame
      title="Heat Engine"
      brief="Pour 1000 J of heat in: the engine outputs work W and dumps waste heat Qc. Efficiency e = W/Qh is capped by Carnot, e_max = 1 − Tc/Th, in kelvin. Beat 500 J if you can!"
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A heat engine between a hot and a cold reservoir: heat flows in, work flows out and waste heat is dumped, with three energy bars and the Carnot limit marked"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Hot reservoir Th" value={th} min={400} max={900} step={10} unit="K" onChange={setTh} disabled={pouring} />
        <SimSlider label="Cold reservoir Tc" value={tc} min={280} max={350} step={5} unit="K" onChange={setTc} disabled={pouring} />
        <SimSelect
          label="Engine type" value={engine}
          options={ENGINES.map((e) => ({ value: e.value, label: e.label }))}
          onChange={setEngine}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={pour} disabled={pouring}>
            <Flame className="h-4 w-4 me-1" aria-hidden /> Pour 1000 J
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
            disabled={challenge === 'won'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: W ≥ 500 J
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Efficiency e = W/Qh" value={`${ePct}`} unit="%" tone="text-emerald-500" />
        <Readout label="Carnot limit 1 − Tc/Th" value={Math.round(carnot * 100).toString()} unit="%" tone={overtemp ? 'text-red-500' : 'text-amber-500'} />
        <Readout label="Work W" value={`${wOut}`} unit="J" tone="text-emerald-500" />
        <Readout label="Waste heat Qc" value={`${qOut}`} unit="J" tone="text-rose-500" />
      </div>
      <div className="flex flex-wrap gap-4">
        <Legend color={CANVAS.amber} label="heat in Qh" />
        <Legend color={CANVAS.emerald} label="work out W" />
        <Legend color={CANVAS.rose} label="waste heat Qc" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted/60 text-foreground'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
