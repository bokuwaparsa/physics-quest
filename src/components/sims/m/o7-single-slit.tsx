// ─── Sim: Single Slit & Gratings · a·sinθ = mλ minima, sharp grating orders ──
'use client'

import { useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

type Mode = 'single' | 'g600' | 'g1200'

const MODES: { value: Mode; label: string }[] = [
  { value: 'single', label: 'Single slit' },
  { value: 'g600', label: 'Grating 600 lines/mm' },
  { value: 'g1200', label: 'Grating 1200 lines/mm' },
]

const dOf = (m: Mode) => (m === 'g600' ? 1 / 600e3 : m === 'g1200' ? 1 / 1200e3 : 0)
const asinDeg = (x: number) => (Math.asin(x) * 180) / Math.PI
const fmt1 = (x: number) => x.toFixed(1)
const fmt2 = (x: number) => x.toFixed(2)

export function SingleSlitSim() {
  const [lamNm, setLamNm] = useState(550)
  const [aMm, setAMm] = useState(0.1)
  const [mode, setMode] = useState<Mode>('single')
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const lam = lamNm * 1e-9
  const a = aMm * 1e-3
  const isGrating = mode !== 'single'
  const d = dOf(mode)
  const sWin = isGrating ? 1 : 0.05 // screen shows sinθ ∈ [−sWin, +sWin]
  const th1 = isGrating ? asinDeg(lam / d) : asinDeg(lam / a)
  const mMax = isGrating ? Math.floor(d / lam) : 0

  const evaluate = (m: Mode) => {
    const dd = dOf(m)
    const th450 = asinDeg(4.5e-7 / dd)
    const th650 = asinDeg(6.5e-7 / dd)
    const sep = th650 - th450
    if (sep >= 8) {
      setChallenge('won')
      setResult(`θ₄₅₀ = ${fmt1(th450)}°, θ₆₅₀ = ${fmt1(th650)}° → ${fmt1(sep)}° apart — the first orders are clearly separated. Finer gratings spread colours further!`)
      beep(660, 120); beep(880, 160)
    } else {
      setResult(`θ₄₅₀ = ${fmt1(th450)}°, θ₆₅₀ = ${fmt1(th650)}° → only ${fmt1(sep)}° apart. You need ≥ 8°: a grating with more lines per mm (smaller d) bends the orders further out.`)
    }
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t) => {
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const cy = h / 2
    const barrierX = 72
    const screenX = w - 64
    const stripTop = 24
    const stripH = h - 48

    // challenge banner
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: separate the first orders of 450 & 650 nm by ≥ 8°', w / 2, 16)
    } else if (challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Challenge complete — orders separated by ≥ 8°!', w / 2, 16)
    }

    // incoming plane waves
    const off = reducedMotion ? 0 : (t * 40) % 14
    ctx.strokeStyle = 'rgba(245,158,11,0.35)'
    ctx.lineWidth = 2
    for (let x = 10 + off; x < barrierX - 8; x += 14) {
      ctx.beginPath(); ctx.moveTo(x, 30); ctx.lineTo(x, h - 30); ctx.stroke()
    }

    // barrier: single slit (width ∝ a) or a grating of fine slits
    ctx.fillStyle = CANVAS.panelLight
    ctx.fillRect(barrierX, stripTop, 10, stripH)
    if (isGrating) {
      ctx.fillStyle = CANVAS.bg
      for (let y = cy - 70; y <= cy + 70; y += 6) ctx.fillRect(barrierX, y, 10, 2.5)
      ctx.fillStyle = CANVAS.muted
      ctx.font = '10px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText(`${mode === 'g600' ? '600' : '1200'} lines/mm · d = ${(1e6 / d).toFixed(2)} μm`, barrierX + 5, h - 8)
    } else {
      const aPx = Math.max(8, Math.min(60, 10 + 50 * ((Math.log10(a) + 4.7) / 1.3)))
      ctx.fillStyle = CANVAS.bg
      ctx.fillRect(barrierX, cy - aPx / 2, 10, aPx)
      ctx.fillStyle = CANVAS.muted
      ctx.font = '10px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText(`a = ${fmt2(aMm)} mm`, barrierX + 5, h - 8)
    }

    // spreading wavefronts from the aperture (schematic)
    const lamPx = Math.min(26, Math.max(8, 20000 * lam))
    const phase = reducedMotion ? 0 : (t * 60) % lamPx
    for (let i = 0; i < 11; i++) {
      const r = i * lamPx + phase
      if (r > screenX - barrierX - 12) break
      ctx.strokeStyle = `rgba(245,158,11,${0.4 * (1 - r / (screenX - barrierX - 10))})`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(barrierX + 10, cy, r, -1.2, 1.2)
      ctx.stroke()
    }

    // optical axis
    ctx.strokeStyle = 'rgba(250,250,249,0.12)'
    ctx.setLineDash([4, 5])
    ctx.beginPath(); ctx.moveTo(barrierX + 10, cy); ctx.lineTo(screenX, cy); ctx.stroke()
    ctx.setLineDash([])

    // screen intensity: sinc² for a single slit, sharp orders for a grating
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(screenX, stripTop, 14, stripH)
    const intenAt = (s: number): number => {
      if (!isGrating) {
        const beta = (Math.PI * a * s) / lam
        return Math.abs(beta) < 1e-9 ? 1 : (Math.sin(beta) / beta) ** 2
      }
      let best = 0
      for (let m = -mMax; m <= mMax; m++) {
        const sm = (m * lam) / d
        const g = Math.exp(-(((s - sm) / 0.01) ** 2))
        if (g > best) best = g
      }
      return best
    }
    for (let py = 0; py < stripH; py++) {
      const s = ((py / stripH) * 2 - 1) * sWin
      ctx.fillStyle = `rgba(245,158,11,${0.08 + 0.92 * intenAt(s)})`
      ctx.fillRect(screenX, stripTop + py, 14, 1)
    }
    ctx.strokeStyle = 'rgba(245,158,11,0.8)'
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let py = 0; py < stripH; py++) {
      const s = ((py / stripH) * 2 - 1) * sWin
      const x = screenX - 12 - intenAt(s) * 74
      if (py === 0) ctx.moveTo(x, stripTop + py); else ctx.lineTo(x, stripTop + py)
    }
    ctx.stroke()

    // order markers (grating): emerald dots at sinθ = mλ/d
    if (isGrating) {
      for (let m = -mMax; m <= mMax; m++) {
        if (m === 0) continue
        const sm = (m * lam) / d
        if (Math.abs(sm) > 1) continue
        const py = (sm + 1) / 2 * stripH + stripTop
        ctx.fillStyle = CANVAS.emerald
        ctx.beginPath(); ctx.arc(screenX + 7, py, 3.5, 0, Math.PI * 2); ctx.fill()
      }
    }

    ctx.fillStyle = CANVAS.muted
    ctx.font = '9px ui-monospace, monospace'
    ctx.textAlign = 'left'
    if (isGrating) {
      ctx.fillText('sinθ = +1', screenX + 20, stripTop + 10)
      ctx.fillText('0', screenX + 20, cy + 3)
      ctx.fillText('−1', screenX + 20, stripTop + stripH - 4)
    } else {
      ctx.fillText('+0.05', screenX + 20, stripTop + 10)
      ctx.fillText('0', screenX + 20, cy + 3)
      ctx.fillText('−0.05', screenX + 20, stripTop + stripH - 4)
    }
    ctx.fillText('screen', screenX - 14, stripTop + stripH + 12)
    ctx.textAlign = 'right'
    ctx.fillText(`θ₁ = ${fmt1(th1)}°`, w - 8, h - 8)
  }, 400)

  return (
    <SimFrame
      title="Diffraction: Single Slit & Gratings"
      brief="Squeeze light through a slit and it fans out (minima at a·sinθ = mλ). Swap in a grating and the same angles turn into razor-sharp orders d·sinθ = mλ."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Plane waves hitting a single slit or a diffraction grating, with the resulting sinc or sharp-order intensity pattern drawn on a screen at the right"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Wavelength" value={lamNm} min={400} max={700} step={10} unit="nm"
          disabled={challenge === 'active'}
          onChange={setLamNm}
        />
        <SimSlider
          label="Slit width" value={aMm} min={0.02} max={0.4} step={0.01} unit="mm"
          format={fmt2}
          disabled={isGrating || challenge === 'active'}
          onChange={setAMm}
        />
        <SimSelect
          label="Aperture" value={mode}
          options={MODES}
          onChange={(v) => { setMode(v); if (challenge === 'active') evaluate(v) }}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={() => { setLamNm(550); setAMm(0.1); setMode('single'); setChallenge('idle'); setResult('') }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => {
              if (challenge === 'active') { setChallenge('idle'); setResult(''); return }
              setMode('g600')
              setChallenge('active')
              evaluate('g600')
            }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: split 450 & 650 nm
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="First min / order θ₁" value={fmt1(th1)} unit="°" />
        {isGrating ? (
          <>
            <Readout label="Highest order m" value={String(mMax)} />
            <Readout label="Orders on screen" value={String(2 * mMax + 1)} />
          </>
        ) : (
          <>
            <Readout label="Central spread 2θ₁" value={fmt1(2 * th1)} unit="°" />
            <Readout label="First minimum sinθ = λ/a" value={(lam / a).toExponential(2)} />
          </>
        )}
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : challenge === 'active' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : ''}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
