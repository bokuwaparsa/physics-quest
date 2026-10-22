// ─── Sim: Capacitor Lab · parallel-plate capacitor with dielectrics, C = κε₀A/d ─
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, Legend, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

const EPS0 = 8.854e-12 // C²/(N·m²)

type MatId = 'vacuum' | 'paper' | 'glass' | 'water'
type ChState = 'idle' | 'active' | 'won' | 'lost'

const MATS: { value: MatId; label: string; kappa: number }[] = [
  { value: 'vacuum', label: 'Vacuum · κ = 1', kappa: 1 },
  { value: 'paper', label: 'Paper · κ = 3', kappa: 3 },
  { value: 'glass', label: 'Glass · κ = 7', kappa: 7 },
  { value: 'water', label: 'Water · κ = 80', kappa: 80 },
]
const TINT: Record<MatId, string> = {
  vacuum: 'rgba(250,250,249,0.05)',
  paper: 'rgba(234,179,8,0.30)',
  glass: 'rgba(20,184,166,0.28)',
  water: 'rgba(139,92,246,0.26)',
}

const SQ0 = Math.sqrt(0.001)
const SQ1 = Math.sqrt(0.05)

const fmtC = (pF: number) =>
  pF < 100 ? pF.toFixed(1) : Math.round(pF).toLocaleString('en-US')
const fmtSmall = (n: number) =>
  n < 10 ? n.toFixed(2) : n < 100 ? n.toFixed(1) : Math.round(n).toLocaleString('en-US')

export function CapacitorLabSim() {
  const [area, setArea] = useState(0.01) // m²
  const [dmm, setDmm] = useState(1.0) // mm
  const [mat, setMat] = useState<MatId>('vacuum')
  const [volts, setVolts] = useState(12) // V
  const [challenge, setChallenge] = useState<ChState>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const sym = useRef(4) // eased charge-symbol count

  const kappa = MATS.find((m) => m.value === mat)?.kappa ?? 1
  const CpF = (kappa * EPS0 * area) / (dmm / 1000) * 1e12 // pF
  const QnC = (CpF * volts) / 1000 // pF × V = 1e-12 C = 1e-3 nC
  const UnJ = (0.5 * CpF * volts * volts) / 1000
  const EkV = volts / dmm // kV/m

  const evaluate = (nA: number, nD: number, nMat: MatId) => {
    const k = MATS.find((m) => m.value === nMat)?.kappa ?? 1
    const c = (k * EPS0 * nA) / (nD / 1000) * 1e12
    const u = (0.5 * c * 20 * 20) / 1000 // U in nJ at V = 20
    const ok = u >= 200
    if (ok) { beep(660, 120); beep(880, 160) }
    setChallenge(ok ? 'won' : 'lost')
    setResult(ok
      ? `U = ½CV² = ½ × ${fmtC(c)} pF × (20 V)² = ${fmtSmall(u)} nJ — past the 200 nJ target! Big area A, tiny gap d and a high-κ dielectric all boost C = κε₀A/d.`
      : `U = ${fmtSmall(u)} nJ at 20 V — not yet. You need C ≥ 1000 pF: widen the plates, squeeze the gap, or slide in a juicier dielectric.`)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    if (w < 60 || h < 60) return

    const pw = 60 + 120 * ((Math.sqrt(area) - SQ0) / (SQ1 - SQ0)) // plate width px
    const gap = 12 + 78 * ((dmm - 0.2) / 4.8) // px between plates
    const cx = Math.round(w * 0.42)
    const cy = Math.round(h * 0.5)
    const pt = 10 // plate thickness

    // ── dielectric slab between the plates ──────────────────────────────────
    ctx.fillStyle = TINT[mat]
    ctx.fillRect(cx - pw / 2 + 6, cy - gap / 2 + 3, pw - 12, gap - 6)
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText(mat === 'vacuum' ? 'vacuum · κ = 1' : `${mat} · κ = ${kappa}`, cx, cy + 3)

    // ── field arrows (+ plate → − plate), density/alpha ∝ E ─────────────────
    if (volts > 0) {
      ctx.strokeStyle = CANVAS.rose
      ctx.globalAlpha = 0.25 + 0.75 * Math.min(1, EkV / 60)
      ctx.lineWidth = 2
      const nA = 4
      for (let i = 0; i < nA; i++) {
        const ax = cx - pw / 2 + 16 + (i * (pw - 32)) / (nA - 1)
        const y1 = cy - gap / 2 - 2, y2 = cy + gap / 2 + 2
        ctx.beginPath(); ctx.moveTo(ax, y1); ctx.lineTo(ax, y2 - 7); ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(ax, y2)
        ctx.lineTo(ax - 4, y2 - 7)
        ctx.lineTo(ax + 4, y2 - 7)
        ctx.closePath()
        ctx.fillStyle = CANVAS.rose; ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // ── plates + charge symbols (density ∝ Q) ───────────────────────────────
    const target = Math.max(1, Math.min(18, Math.round(4 + 2.5 * Math.log10(Math.max(QnC, 0.001)))))
    sym.current = reducedMotion ? target : sym.current + (target - sym.current) * Math.min(1, dt * 8)
    const nSym = Math.round(sym.current)
    const charged = volts > 0
    ctx.fillStyle = charged ? CANVAS.amber : CANVAS.white
    ctx.fillRect(cx - pw / 2, cy - gap / 2 - pt, pw, pt)
    ctx.fillStyle = charged ? CANVAS.teal : CANVAS.white
    ctx.fillRect(cx - pw / 2, cy + gap / 2, pw, pt)
    ctx.font = 'bold 11px ui-monospace, monospace'
    ctx.fillStyle = CANVAS.bg
    for (let i = 0; i < nSym; i++) {
      const sxp = cx - pw / 2 + ((i + 0.5) * pw) / nSym
      ctx.fillText('+', sxp, cy - gap / 2 - 2)
      ctx.fillText('−', sxp, cy + gap / 2 + 9)
    }

    // ── battery + wires ─────────────────────────────────────────────────────
    const bx = Math.min(cx + pw / 2 + 70, w - 34)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(cx + pw / 2, cy - gap / 2 - pt / 2); ctx.lineTo(bx, cy - gap / 2 - pt / 2); ctx.lineTo(bx, cy - 16)
    ctx.moveTo(cx + pw / 2, cy + gap / 2 + pt / 2); ctx.lineTo(bx, cy + gap / 2 + pt / 2); ctx.lineTo(bx, cy + 16)
    ctx.stroke()
    ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.moveTo(bx - 12, cy - 16); ctx.lineTo(bx + 12, cy - 16); ctx.stroke() // long plate (+)
    ctx.lineWidth = 5
    ctx.beginPath(); ctx.moveTo(bx - 6, cy + 16); ctx.lineTo(bx + 6, cy + 16); ctx.stroke() // short plate (−)
    ctx.fillStyle = CANVAS.fg
    ctx.font = 'bold 11px ui-monospace, monospace'
    ctx.fillText(`${volts} V`, bx, cy + 34)
    ctx.fillStyle = CANVAS.amber
    ctx.fillText('+', bx + 20, cy - 13)
    ctx.fillStyle = CANVAS.teal
    ctx.fillText('−', bx + 20, cy + 19)

    // ── labels ──────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText(`d = ${dmm.toFixed(1)} mm`, 14, h - 30)
    ctx.fillText(`A = ${area.toFixed(3)} m² · C = κε₀A/d = ${fmtC(CpF)} pF`, 14, h - 14)

    // ── challenge banner ────────────────────────────────────────────────────
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: locked at V = 20 — tune A, d and the dielectric to bank at least 200 nJ!', w / 2, 18)
    } else if (challenge === 'won' || challenge === 'lost') {
      ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText(challenge === 'won' ? '★ Challenge complete!' : 'Not enough energy — crank up C!', w / 2, 18)
    }
  }, 400)

  return (
    <SimFrame
      title="Capacitor Lab"
      brief="Two plates, one hungry battery: charge piles up until Q = CV. Widen the plates, squeeze the gap, insert a dielectric — then watch the energy U = ½CV² climb."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Parallel-plate capacitor with plus signs on the top plate, minus signs on the bottom plate, a tinted dielectric slab between them, field arrows, and a battery showing the applied voltage"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <Legend color={CANVAS.amber} label="+ plate" />
        <Legend color={CANVAS.teal} label="− plate" />
        <Legend color={CANVAS.violet} label="dielectric slab" />
        <Legend color={CANVAS.rose} label="field E = V/d" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Plate area A" value={area} min={0.001} max={0.05} step={0.001} unit="m²"
          onChange={(v) => { setArea(v); if (challenge === 'active' || challenge === 'lost') evaluate(v, dmm, mat) }}
          format={(v) => v.toFixed(3)}
        />
        <SimSlider
          label="Gap d" value={dmm} min={0.2} max={5} step={0.1} unit="mm"
          onChange={(v) => { setDmm(v); if (challenge === 'active' || challenge === 'lost') evaluate(area, v, mat) }}
          format={(v) => v.toFixed(1)}
        />
        <SimSelect
          label="Dielectric" value={mat}
          options={MATS.map((m) => ({ value: m.value, label: m.label }))}
          onChange={(v) => { setMat(v); if (challenge === 'active' || challenge === 'lost') evaluate(area, dmm, v) }}
        />
        <SimSlider
          label="Voltage V" value={volts} min={0} max={50} step={1} unit="V"
          onChange={setVolts}
          disabled={challenge === 'active'}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={() => { setChallenge('idle'); setResult(''); setArea(0.01); setDmm(1.0); setMat('vacuum'); setVolts(12) }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { setVolts(20); setChallenge('active'); setResult(''); evaluate(area, dmm, mat) }}
            disabled={challenge === 'active'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: bank 200 nJ at 20 V
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Capacitance C" value={fmtC(CpF)} unit="pF" tone="text-violet-400" />
        <Readout label="Charge Q" value={fmtSmall(QnC)} unit="nC" tone="text-amber-500" />
        <Readout label="Energy U" value={fmtSmall(UnJ)} unit="nJ" tone={UnJ >= 200 ? 'text-emerald-500' : undefined} />
        <Readout label="Field E" value={fmtSmall(EkV)} unit="kV/m" tone="text-rose-400" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
