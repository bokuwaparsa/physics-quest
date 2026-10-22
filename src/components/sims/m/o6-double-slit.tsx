// ─── Sim: Double Slit · expanding wavefronts, fringes Δy = λL/d on a screen ──
'use client'

import { useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas, useSimBeep,
  useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

const S_WINDOW = 0.04 // screen shows sinθ ∈ [−0.04, +0.04]

const fmt1 = (x: number) => x.toFixed(1)
const fmt2 = (x: number) => x.toFixed(2)

export function DoubleSlitSim() {
  const [lamNm, setLamNm] = useState(550)
  const [dMm, setDMm] = useState(0.1)
  const [distM, setDistM] = useState(2)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const lam = lamNm * 1e-9
  const d = dMm * 1e-3
  const dyMm = (lam * distM) / d * 1000 // fringe spacing in mm
  const fringes = 2 * Math.floor((S_WINDOW * d) / lam) + 1 // bright fringes on screen

  const evaluate = (l: number, dd: number, L: number) => {
    const dy = (l * 1e-9 * L) / (dd * 1e-3) * 1000
    if (Math.abs(dy - 8) <= 0.16) {
      setChallenge('won')
      setResult(`Δy = λL/d = ${fmt2(dy)} mm — within 2% of 8.0 mm! Sharper colours and a wider slit would each shrink it; more distance stretches it.`)
      beep(660, 120); beep(880, 160)
    } else {
      setResult(`Δy = ${fmt2(dy)} mm — target is 8.0 ± 0.16 mm. Remember Δy = λL/d: λ and L stretch the fringes, d squeezes them.`)
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
      ctx.fillText('Challenge: tune λ, d and L until Δy = 8.0 mm (±2%)', w / 2, 16)
    } else if (challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Challenge complete — Δy = 8.0 mm!', w / 2, 16)
    }

    // incoming plane waves
    const lamPx = Math.min(26, Math.max(8, 20000 * lam))
    const off = reducedMotion ? 0 : (t * 40) % 14
    ctx.strokeStyle = 'rgba(245,158,11,0.35)'
    ctx.lineWidth = 2
    for (let x = 10 + off; x < barrierX - 8; x += 14) {
      ctx.beginPath(); ctx.moveTo(x, 30); ctx.lineTo(x, h - 30); ctx.stroke()
    }

    // barrier with two slits
    const gap = 26
    ctx.fillStyle = CANVAS.panelLight
    ctx.fillRect(barrierX, stripTop, 10, cy - gap / 2 - 3 - stripTop)
    ctx.fillRect(barrierX, cy - gap / 2 + 3, 10, gap - 6)
    ctx.fillRect(barrierX, cy + gap / 2 + 3, 10, stripTop + stripH - (cy + gap / 2 + 3))
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText(`d = ${fmt2(dMm)} mm`, barrierX + 5, h - 8)

    // expanding circular wavefronts from each slit
    const phase = reducedMotion ? 0 : (t * 60) % lamPx
    for (const sy of [cy - gap / 2, cy + gap / 2]) {
      for (let i = 0; i < 11; i++) {
        const r = i * lamPx + phase
        if (r > screenX - barrierX - 12) break
        ctx.strokeStyle = `rgba(245,158,11,${0.4 * (1 - r / (screenX - barrierX - 10))})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(barrierX + 10, sy, r, -1.2, 1.2)
        ctx.stroke()
      }
    }

    // optical axis
    ctx.strokeStyle = 'rgba(250,250,249,0.12)'
    ctx.setLineDash([4, 5])
    ctx.beginPath(); ctx.moveTo(barrierX + 10, cy); ctx.lineTo(screenX, cy); ctx.stroke()
    ctx.setLineDash([])

    // screen with the computed intensity pattern I ∝ cos²(π·d·sinθ/λ)
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(screenX, stripTop, 14, stripH)
    for (let py = 0; py < stripH; py++) {
      const s = ((py / stripH) * 2 - 1) * S_WINDOW
      const inten = Math.cos((Math.PI * d * s) / lam) ** 2
      ctx.fillStyle = `rgba(245,158,11,${0.08 + 0.92 * inten})`
      ctx.fillRect(screenX, stripTop + py, 14, 1)
    }
    // intensity profile just left of the screen
    ctx.strokeStyle = 'rgba(245,158,11,0.8)'
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let py = 0; py < stripH; py++) {
      const s = ((py / stripH) * 2 - 1) * S_WINDOW
      const inten = Math.cos((Math.PI * d * s) / lam) ** 2
      const x = screenX - 12 - inten * 74
      if (py === 0) ctx.moveTo(x, stripTop + py); else ctx.lineTo(x, stripTop + py)
    }
    ctx.stroke()

    // first-order maxima markers (sinθ = ±λ/d, when on screen)
    const s1 = lam / d
    if (s1 <= S_WINDOW) {
      for (const sg of [-1, 1]) {
        const py = ((sg * s1) / S_WINDOW + 1) / 2 * stripH + stripTop
        ctx.fillStyle = CANVAS.emerald
        ctx.beginPath(); ctx.arc(screenX + 7, py, 4, 0, Math.PI * 2); ctx.fill()
      }
    }
    ctx.fillStyle = CANVAS.muted
    ctx.font = '9px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText('+0.04', screenX + 20, stripTop + 10)
    ctx.fillText('0', screenX + 20, cy + 3)
    ctx.fillText('−0.04', screenX + 20, stripTop + stripH - 4)
    ctx.fillText('screen', screenX - 14, stripTop + stripH + 12)
    ctx.textAlign = 'right'
    ctx.fillText(`Δy = ${fmt2(dyMm)} mm`, w - 8, h - 8)
  }, 400)

  return (
    <SimFrame
      title="Double-Slit Interference"
      brief="Two coherent slits ripple outward and overlap on the screen: bright where the paths differ by whole wavelengths, dark in between. Δy = λL/d."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Two slits emitting circular wavefronts toward a screen showing the cos-squared interference pattern with bright and dark fringes"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Wavelength" value={lamNm} min={400} max={700} step={10} unit="nm"
          onChange={(v) => { setLamNm(v); if (challenge === 'active') evaluate(v, dMm, distM) }}
        />
        <SimSlider
          label="Slit separation" value={dMm} min={0.05} max={0.5} step={0.01} unit="mm"
          format={fmt2}
          onChange={(v) => { setDMm(v); if (challenge === 'active') evaluate(lamNm, v, distM) }}
        />
        <SimSlider
          label="Screen distance" value={distM} min={0.5} max={4} step={0.05} unit="m"
          format={fmt2}
          onChange={(v) => { setDistM(v); if (challenge === 'active') evaluate(lamNm, dMm, v) }}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={() => { setLamNm(550); setDMm(0.1); setDistM(2); setChallenge('idle'); setResult('') }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => {
              if (challenge === 'active') { setChallenge('idle'); setResult(''); return }
              setChallenge('active'); setResult('')
              evaluate(lamNm, dMm, distM)
            }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: Δy = 8.0 mm
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Fringe spacing Δy = λL/d" value={fmt2(dyMm)} unit="mm" tone={challenge === 'active' && Math.abs(dyMm - 8) <= 0.16 ? 'text-emerald-500' : undefined} />
        <Readout label="Bright fringes on screen" value={String(fringes)} />
        <Readout label="First order at sinθ = λ/d" value={(lam / d).toExponential(2)} />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : challenge === 'active' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : ''}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
