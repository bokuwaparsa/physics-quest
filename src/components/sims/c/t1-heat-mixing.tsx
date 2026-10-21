// ─── Sim: Heat Mixing · pour beaker B into A, energy finds its balance ───────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Droplets, Flag, RotateCcw } from 'lucide-react'

const C_WATER = 4186
const fmt = (n: number) => Math.round(n).toLocaleString('en-US')

const tempColor = (T: number) => {
  const f = Math.min(1, Math.max(0, T / 90))
  return `hsl(${Math.round(215 - 207 * f)}, 72%, 46%)`
}

export function HeatMixingSim() {
  const [mA, setMA] = useState(1)
  const [tA, setTA] = useState(30)
  const [mB, setMB] = useState(0.5)
  const [tB, setTB] = useState(70)
  const [phase, setPhase] = useState<'setup' | 'pouring' | 'done'>('setup')
  const [finalT, setFinalT] = useState<number | null>(null)
  const [qMoved, setQMoved] = useState(0)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({ pourT: 0 })
  const savedA = useRef({ m: 1, t: 30 })

  const mixT = (mA * tA + mB * tB) / (mA + mB)

  const finishPour = (f: number) => {
    setPhase('done')
    if (challenge === 'active') {
      const ok = Math.abs(f - 40) <= 0.5
      if (ok) { beep(660, 120); beep(880, 160) }
      setChallenge(ok ? 'won' : 'lost')
      setResult(ok
        ? `Final: ${f.toFixed(1)} °C — a perfect bath! The hot water lost exactly as much heat as the cold water gained. (One recipe: 1 kg at 80 °C + ≈ 1.33 kg at 10 °C.)`
        : `Final: ${f.toFixed(1)} °C — not 40 °C yet. Balance the heat: the hot water must lose exactly m·c·ΔT as the cold water gains. Tweak beaker B and pour again!`)
    }
  }

  const pour = () => {
    if (phase !== 'setup') return
    const f = mixT
    const hot = tA >= tB ? { m: mA, t: tA } : { m: mB, t: tB }
    setQMoved(C_WATER * hot.m * (hot.t - f))
    setFinalT(f)
    savedA.current = { m: mA, t: tA }
    st.current.pourT = 0
    if (reducedMotion) finishPour(f)
    else setPhase('pouring')
  }

  const reset = () => {
    setPhase('setup')
    setFinalT(null)
    setQMoved(0)
    setMA(savedA.current.m)
    setTA(savedA.current.t)
    setChallenge('idle')
    setResult('')
  }

  const startChallenge = () => {
    if (phase === 'setup') savedA.current = { m: mA, t: tA }
    setMA(1)
    setTA(80)
    setPhase('setup')
    setFinalT(null)
    setQMoved(0)
    setChallenge('active')
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t, dt) => {
    if (phase === 'pouring') {
      st.current.pourT += dt / 1.4
      if (st.current.pourT >= 1) finishPour(finalT as number)
    }
    const pourP = phase === 'setup' ? 0 : Math.min(1, st.current.pourT)

    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    // beaker geometry
    const margin = 46, gap = 56
    const bw = Math.min(170, (w - 2 * margin - gap) / 2)
    const ax = margin
    const bx = w - margin - bw
    const bBottom = 312, bHeight = 168
    const levelOf = (m: number) => 18 + Math.min(1, m / 2) * 118

    const lvA0 = levelOf(mA)
    const lvA1 = levelOf(Math.min(2, mA + mB))
    const lvB0 = levelOf(mB)
    const lvA = phase === 'setup' ? lvA0 : lvA0 + (lvA1 - lvA0) * pourP
    const lvB = phase === 'setup' ? lvB0 : Math.max(10, lvB0 + (10 - lvB0) * pourP)

    // ── beaker A ────────────────────────────────────────────────────────────
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(ax, bBottom - bHeight)
    ctx.lineTo(ax, bBottom)
    ctx.lineTo(ax + bw, bBottom)
    ctx.lineTo(ax + bw, bBottom - bHeight)
    ctx.stroke()
    ctx.fillStyle = tempColor(tA)
    ctx.globalAlpha = 0.85
    ctx.fillRect(ax + 3, bBottom - lvA, bw - 6, lvA - 2)
    ctx.globalAlpha = 1
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 11px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText('A', ax + bw / 2, bBottom - bHeight - 10)
    ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-monospace, monospace'
    ctx.fillText(phase === 'done' && finalT !== null
      ? `A: ${(mA + mB).toFixed(2)} kg · ${finalT.toFixed(1)} °C`
      : `A: ${mA.toFixed(2)} kg · ${tA} °C`, ax + bw / 2, bBottom + 22)

    // thermometer A
    const drawThermo = (x: number, T: number) => {
      ctx.fillStyle = CANVAS.panelLight
      ctx.fillRect(x - 4, 200, 8, 96)
      ctx.beginPath(); ctx.arc(x, 304, 8, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = tempColor(T)
      ctx.fillRect(x - 2, 200 + 96 * (1 - Math.min(1, T / 90)), 4, 96 * Math.min(1, T / 90))
      ctx.beginPath(); ctx.arc(x, 304, 6, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1.5
      ctx.strokeRect(x - 4, 200, 8, 96)
      ctx.beginPath(); ctx.arc(x, 304, 8, 0, Math.PI * 2); ctx.stroke()
    }
    drawThermo(ax - 22, phase === 'done' && finalT !== null ? finalT : tA)

    // ── beaker B (tilts while pouring) ─────────────────────────────────────
    ctx.save()
    if (phase === 'pouring') {
      ctx.translate(bx + bw, bBottom)
      ctx.rotate(-0.3 * pourP)
      ctx.translate(-(bx + bw), -bBottom)
    }
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(bx, bBottom - bHeight)
    ctx.lineTo(bx, bBottom)
    ctx.lineTo(bx + bw, bBottom)
    ctx.lineTo(bx + bw, bBottom - bHeight)
    ctx.stroke()
    ctx.fillStyle = tempColor(tB)
    ctx.globalAlpha = 0.85
    ctx.fillRect(bx + 3, bBottom - lvB, bw - 6, lvB - 2)
    ctx.globalAlpha = 1
    ctx.restore()
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 11px ui-monospace, monospace'
    ctx.fillText('B', bx + bw / 2, bBottom - bHeight - 10)
    ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-monospace, monospace'
    ctx.fillText(phase === 'setup' ? `B: ${mB.toFixed(2)} kg · ${tB} °C` : 'B: empty', bx + bw / 2, bBottom + 22)
    drawThermo(bx + bw + 22, tB)

    // ── pouring stream ──────────────────────────────────────────────────────
    if (phase === 'pouring' && pourP > 0.12) {
      ctx.strokeStyle = tempColor(tB); ctx.lineWidth = 6
      ctx.globalAlpha = 0.9
      ctx.beginPath()
      ctx.moveTo(bx + bw / 2, bBottom - bHeight + 4)
      ctx.quadraticCurveTo((ax + bx + bw) / 2, bBottom - bHeight - 44, ax + bw / 2, bBottom - lvA + 2)
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    // ── energy bars (after mixing) ──────────────────────────────────────────
    if (phase === 'done' && qMoved > 0) {
      const wBar = 40 + 150 * Math.min(1, qMoved / 500000)
      ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
      ctx.textAlign = 'left'
      ctx.fillText(`hot water lost ${(qMoved / 1000).toFixed(1)} kJ`, ax, 344)
      ctx.textAlign = 'right'
      ctx.fillText(`cold water gained ${(qMoved / 1000).toFixed(1)} kJ`, bx + bw, 344)
      ctx.fillStyle = CANVAS.rose
      ctx.fillRect(ax, 350, wBar, 10)
      ctx.fillStyle = CANVAS.emerald
      ctx.fillRect(bx + bw - wBar, 350, wBar, 10)
    }

    // ── banners ─────────────────────────────────────────────────────────────
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Goal: 40 ± 0.5 °C. Beaker A is set to 1 kg at 80 °C — set B, then pour!', w / 2, 20)
    } else if (challenge === 'won' || challenge === 'lost') {
      ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText(challenge === 'won' ? '★ Challenge complete!' : 'So close — tweak B and pour again!', w / 2, 20)
    } else if (phase === 'done' && finalT !== null) {
      ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 14px ui-monospace, monospace'
      ctx.fillText(`Final: ${finalT.toFixed(1)} °C`, w / 2, 22)
    }
    if (!reducedMotion && phase === 'pouring') {
      // gentle steam wisps above beaker A
      ctx.strokeStyle = 'rgba(250,250,249,0.25)'; ctx.lineWidth = 2
      for (let i = 0; i < 3; i++) {
        const sxp = ax + 30 + i * 45
        ctx.beginPath()
        ctx.moveTo(sxp, bBottom - lvA - 8)
        ctx.quadraticCurveTo(sxp + 6 * Math.sin(t * 3 + i), bBottom - lvA - 30, sxp, bBottom - lvA - 52)
        ctx.stroke()
      }
    }
  }, 380)

  return (
    <SimFrame
      title="Heat Mixing Lab"
      brief="Set the mass and temperature of two beakers of water, then pour B into A. Final temperature = (mA·TA + mB·TB) / (mA + mB)."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 380 }}
          aria-label="Two beakers of water with thermometers; beaker B pours into beaker A showing the mixed final temperature"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Mass A" value={mA} min={0.1} max={2} step={0.05} unit="kg" onChange={setMA} disabled={phase !== 'setup'} />
        <SimSlider label="Temp A" value={tA} min={0} max={90} step={1} unit="°C" onChange={setTA} disabled={phase !== 'setup'} />
        <SimSlider label="Mass B" value={mB} min={0.1} max={2} step={0.05} unit="kg" onChange={setMB} disabled={phase !== 'setup'} />
        <SimSlider label="Temp B" value={tB} min={0} max={90} step={1} unit="°C" onChange={setTB} disabled={phase !== 'setup'} />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex gap-2">
          <SimButton onClick={pour} disabled={phase !== 'setup'}>
            <Droplets className="h-4 w-4 mr-1" aria-hidden /> Pour B into A
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 mr-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 mr-1" aria-hidden /> Challenge: a 40 °C bath
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Final temp" value={finalT !== null ? finalT.toFixed(1) : '—'} unit="°C" tone="text-emerald-500" />
        <Readout label="Heat moved" value={qMoved > 0 ? (qMoved / 1000).toFixed(1) : '—'} unit="kJ" tone="text-rose-500" />
        <Readout label="Mass A" value={mA.toFixed(2)} unit="kg" />
        <Readout label="Temp A" value={String(tA)} unit="°C" tone="text-orange-500" />
        <Readout label="Mass B" value={mB.toFixed(2)} unit="kg" />
        <Readout label="Temp B" value={String(tB)} unit="°C" tone="text-amber-500" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
