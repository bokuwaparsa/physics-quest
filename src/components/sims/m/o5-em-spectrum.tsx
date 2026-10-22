// ─── Sim: EM Spectrum · ride the log-wavelength ruler from radio to gamma ────
'use client'

import { useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimToggle, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

const C_LIGHT = 3e8
const H_PLANCK = 6.626e-34
const Q_E = 1.602e-19
const EXP_MIN = -12 // 1 pm
const EXP_MAX = 3 // 1 km
const LOG_VIS_LO = Math.log10(4e-7) // ≈ −6.398 (400 nm)
const LOG_VIS_HI = Math.log10(7e-7) // ≈ −6.155 (700 nm)
const RAINBOW = ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#eab308', '#f97316', '#ef4444']

type IconKind = 'antenna' | 'oven' | 'remote' | 'eye' | 'sunscreen' | 'bone' | 'hazard'

interface Band {
  id: string
  name: string
  short: string
  lo: number // lower log10(λ) bound
  hi: number
  color: string
  range: string
  use: string
  danger: string
  icon: IconKind
}

const BANDS: Band[] = [
  { id: 'gamma', name: 'Gamma rays', short: 'gamma', lo: -99, hi: -11, color: '#f43f5e', range: 'λ < 10 pm', use: 'Cancer therapy · sterilising', danger: 'Ionising — deadly', icon: 'hazard' },
  { id: 'xray', name: 'X-rays', short: 'X-ray', lo: -11, hi: -8, color: '#60a5fa', range: '10 pm – 10 nm', use: 'Medical imaging · security', danger: 'Ionising — cancer risk', icon: 'bone' },
  { id: 'uv', name: 'Ultraviolet', short: 'UV', lo: -8, hi: LOG_VIS_LO, color: '#8b5cf6', range: '10 – 400 nm', use: 'Sterilising · tanning', danger: 'Sunburn · skin cancer', icon: 'sunscreen' },
  { id: 'visible', name: 'Visible light', short: 'visible', lo: LOG_VIS_LO, hi: LOG_VIS_HI, color: '#eab308', range: '400 – 700 nm', use: 'Sight · lasers · fibre optics', danger: 'Bright beams hurt eyes', icon: 'eye' },
  { id: 'ir', name: 'Infrared', short: 'IR', lo: LOG_VIS_HI, hi: -3, color: '#ef4444', range: '700 nm – 1 mm', use: 'Remotes · thermal cameras', danger: 'Strong beams burn skin', icon: 'remote' },
  { id: 'micro', name: 'Microwaves', short: 'microwave', lo: -3, hi: 0, color: '#14b8a6', range: '1 mm – 1 m', use: 'Ovens · radar · Wi-Fi', danger: 'Cooks tissue at high power', icon: 'oven' },
  { id: 'radio', name: 'Radio waves', short: 'radio', lo: 0, hi: 99, color: '#6366f1', range: 'λ > 1 m', use: 'Broadcasting · MRI · astronomy', danger: 'Very strong fields heat', icon: 'antenna' },
]

const bandOf = (exp: number): Band =>
  BANDS.find((b) => exp >= b.lo && exp < b.hi) ?? BANDS[6]

/** 3-sig-fig string without exponents (scaled value always in [1, 1000)). */
const sig = (x: number) => String(parseFloat(x.toPrecision(3)))

function fmtLength(lam: number): { v: string; u: string } {
  if (lam >= 1000) return { v: sig(lam / 1000), u: 'km' }
  if (lam >= 1) return { v: sig(lam), u: 'm' }
  if (lam >= 1e-3) return { v: sig(lam / 1e-3), u: 'mm' }
  if (lam >= 1e-6) return { v: sig(lam / 1e-6), u: 'μm' }
  if (lam >= 1e-9) return { v: sig(lam / 1e-9), u: 'nm' }
  return { v: sig(lam / 1e-12), u: 'pm' }
}

function fmtFreq(f: number): { v: string; u: string } {
  if (f >= 1e12) return { v: sig(f / 1e12), u: 'THz' }
  if (f >= 1e9) return { v: sig(f / 1e9), u: 'GHz' }
  if (f >= 1e6) return { v: sig(f / 1e6), u: 'MHz' }
  if (f >= 1e3) return { v: sig(f / 1e3), u: 'kHz' }
  return { v: sig(f), u: 'Hz' }
}

function fmtEnergy(eV: number): { v: string; u: string } {
  if (eV >= 1e6) return { v: sig(eV / 1e6), u: 'MeV' }
  if (eV >= 1e3) return { v: sig(eV / 1e3), u: 'keV' }
  if (eV >= 1) return { v: sig(eV), u: 'eV' }
  if (eV >= 1e-3) return { v: sig(eV * 1e3), u: 'meV' }
  if (eV >= 1e-6) return { v: sig(eV * 1e6), u: 'μeV' }
  if (eV >= 1e-9) return { v: sig(eV * 1e9), u: 'neV' }
  return { v: sig(eV * 1e12), u: 'peV' }
}

/** Simple per-band pictogram. */
function drawIcon(ctx: CanvasRenderingContext2D, kind: IconKind, cx: number, cy: number, color: string) {
  ctx.save()
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.strokeStyle = color
  ctx.fillStyle = color
  if (kind === 'antenna') {
    ctx.beginPath(); ctx.moveTo(cx, cy + 12); ctx.lineTo(cx, cy - 10); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(cx, cy + 12); ctx.lineTo(cx - 11, cy + 24); ctx.moveTo(cx, cy + 12); ctx.lineTo(cx + 11, cy + 24); ctx.stroke()
    ctx.beginPath(); ctx.arc(cx, cy - 10, 3, 0, Math.PI * 2); ctx.fill()
    for (const r of [7, 13]) {
      ctx.beginPath(); ctx.arc(cx, cy - 12, r, -0.7, 0.7); ctx.stroke()
      ctx.beginPath(); ctx.arc(cx, cy - 12, r, Math.PI - 0.7, Math.PI + 0.7); ctx.stroke()
    }
  } else if (kind === 'oven') {
    ctx.strokeRect(cx - 21, cy - 16, 42, 32)
    ctx.strokeRect(cx - 15, cy - 10, 22, 20)
    ctx.lineWidth = 2
    for (const dx of [-8, -1, 6]) {
      ctx.beginPath()
      for (let i = 0; i <= 8; i++) {
        const yy = cy - 8 + i * 2.4
        const xx = cx + dx + Math.sin(i * 1.6) * 3
        if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy)
      }
      ctx.stroke()
    }
  } else if (kind === 'remote') {
    ctx.strokeStyle = CANVAS.white
    ctx.strokeRect(cx - 9, cy - 10, 18, 34)
    for (const dy of [-4, 4, 12]) { ctx.beginPath(); ctx.arc(cx, cy + dy, 2, 0, Math.PI * 2); ctx.fill() }
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    for (const r of [6, 11]) { ctx.beginPath(); ctx.arc(cx, cy - 12, r, -2.2, -0.9); ctx.stroke() }
  } else if (kind === 'eye') {
    ctx.beginPath(); ctx.moveTo(cx - 24, cy)
    ctx.quadraticCurveTo(cx, cy - 20, cx + 24, cy)
    ctx.quadraticCurveTo(cx, cy + 20, cx - 24, cy)
    ctx.closePath(); ctx.stroke()
    ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.stroke()
    ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, Math.PI * 2); ctx.fill()
  } else if (kind === 'sunscreen') {
    ctx.strokeRect(cx - 10, cy - 12, 20, 28)
    ctx.strokeRect(cx - 6, cy - 18, 12, 6)
    ctx.beginPath(); ctx.arc(cx + 15, cy - 16, 4, 0, Math.PI * 2); ctx.stroke()
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2
      ctx.beginPath()
      ctx.moveTo(cx + 15 + Math.cos(a) * 6.5, cy - 16 + Math.sin(a) * 6.5)
      ctx.lineTo(cx + 15 + Math.cos(a) * 10, cy - 16 + Math.sin(a) * 10)
      ctx.stroke()
    }
  } else if (kind === 'bone') {
    ctx.strokeStyle = CANVAS.white
    ctx.lineWidth = 5
    ctx.beginPath(); ctx.moveTo(cx - 13, cy + 7); ctx.lineTo(cx + 13, cy - 7); ctx.stroke()
    ctx.lineWidth = 2.5
    for (const [dx, dy] of [[-15, 3], [-10, 12], [10, -12], [15, -3]]) {
      ctx.beginPath(); ctx.arc(cx + dx, cy + dy, 4.5, 0, Math.PI * 2); ctx.stroke()
    }
  } else { // hazard trefoil
    for (const a0 of [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6]) {
      ctx.beginPath()
      ctx.arc(cx, cy, 16, a0 - 0.42, a0 + 0.42)
      ctx.arc(cx, cy, 7, a0 + 0.42, a0 - 0.42, true)
      ctx.closePath(); ctx.fill()
    }
    ctx.beginPath(); ctx.arc(cx, cy, 3.2, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()
}

const EXP_DEFAULT = -4.5 // ≈ 31.6 μm (infrared, safely outside the visible band)

export function EmSpectrumSim() {
  const [exp, setExp] = useState(EXP_DEFAULT)
  const [showWave, setShowWave] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const lam = 10 ** exp
  const band = bandOf(exp)
  const freq = C_LIGHT / lam
  const energy = (H_PLANCK * C_LIGHT) / lam / Q_E // photon energy in eV
  const inVisible = lam >= 4e-7 && lam <= 7e-7

  const tryWin = (e: number) => {
    const l = 10 ** e
    if (l >= 4e-7 && l <= 7e-7) {
      const f = fmtLength(l)
      setChallenge('won')
      setResult(`λ = ${f.v} ${f.u} — inside 400–700 nm: visible light! Your eyes are tuned to a razor-thin slice of the spectrum.`)
      beep(660, 120); beep(880, 160)
    }
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t) => {
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const sx0 = 16, sx1 = w - 16, sy = 56, sh = 34
    const xOf = (e: number) => sx0 + ((e - EXP_MIN) / (EXP_MAX - EXP_MIN)) * (sx1 - sx0)

    // ── banded spectrum strip ────────────────────────────────────────────────
    for (const b of BANDS) {
      const xa = Math.max(sx0, xOf(Math.max(b.lo, EXP_MIN)))
      const xb = Math.min(sx1, xOf(Math.min(b.hi, EXP_MAX)))
      if (xb <= xa) continue
      if (b.id === 'visible') {
        const n = RAINBOW.length
        for (let i = 0; i < n; i++) {
          ctx.fillStyle = RAINBOW[i]
          ctx.fillRect(xa + ((xb - xa) * i) / n, sy, (xb - xa) / n + 0.5, sh)
        }
      } else {
        ctx.fillStyle = b.color
        ctx.fillRect(xa, sy, xb - xa, sh)
      }
      // atmospheric window marks (radio & visible reach the ground)
      if (b.id === 'radio' || b.id === 'visible') {
        ctx.fillStyle = CANVAS.emerald
        ctx.fillRect(xa + 1, sy + sh - 4, xb - xa - 2, 3)
      }
      // band name below the strip when it fits
      if (xb - xa >= 30) {
        ctx.fillStyle = CANVAS.muted
        ctx.font = '9px ui-monospace, monospace'
        ctx.textAlign = 'center'
        ctx.fillText(b.short, (xa + xb) / 2, sy + sh + 13)
      }
    }
    ctx.strokeStyle = CANVAS.bg
    ctx.lineWidth = 1
    for (const e of [-11, -8, LOG_VIS_LO, LOG_VIS_HI, -3, 0]) {
      const x = xOf(e)
      if (x > sx0 && x < sx1) { ctx.beginPath(); ctx.moveTo(x, sy); ctx.lineTo(x, sy + sh); ctx.stroke() }
    }
    // decade ticks
    ctx.fillStyle = CANVAS.muted
    ctx.font = '9px ui-monospace, monospace'
    ctx.textAlign = 'center'
    for (const [e, lbl] of [[-12, '1 pm'], [-9, '1 nm'], [-6, '1 μm'], [-3, '1 mm'], [0, '1 m'], [3, '1 km']] as const) {
      const x = xOf(e)
      ctx.strokeStyle = CANVAS.muted
      ctx.beginPath(); ctx.moveTo(x, sy + sh); ctx.lineTo(x, sy + sh + 5); ctx.stroke()
      ctx.fillText(lbl, Math.min(Math.max(x, 18), w - 18), sy + sh + 16)
    }
    ctx.textAlign = 'right'
    ctx.fillStyle = CANVAS.emerald
    ctx.fillText('▬ atmospheric windows (radio + visible)', sx1, sy + sh + 30)

    // ── marker ───────────────────────────────────────────────────────────────
    const mx = xOf(exp)
    const mColor = challenge === 'active' ? (inVisible ? CANVAS.emerald : CANVAS.amber) : CANVAS.amber
    ctx.fillStyle = mColor
    ctx.beginPath()
    ctx.moveTo(mx, sy - 4); ctx.lineTo(mx - 5, sy - 12); ctx.lineTo(mx + 5, sy - 12)
    ctx.closePath(); ctx.fill()
    ctx.strokeStyle = mColor
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(mx, sy - 4); ctx.lineTo(mx, sy + sh + 4); ctx.stroke()
    const fl = fmtLength(lam)
    ctx.fillStyle = mColor
    ctx.font = 'bold 11px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText(`λ = ${fl.v} ${fl.u}`, Math.min(Math.max(mx, 34), w - 34), sy - 16)
    if (xOf(LOG_VIS_HI) - xOf(LOG_VIS_LO) < 40) {
      ctx.fillStyle = CANVAS.fg
      ctx.font = 'bold 10px ui-sans-serif, system-ui'
      ctx.fillText('visible 400–700 nm', (xOf(LOG_VIS_LO) + xOf(LOG_VIS_HI)) / 2, sy - 30)
    }

    // ── band info panel ──────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.panelLight
    ctx.beginPath(); ctx.roundRect(24, 128, 92, 106, 8); ctx.fill()
    drawIcon(ctx, band.icon, 70, 181, band.color)
    ctx.textAlign = 'left'
    ctx.fillStyle = CANVAS.fg
    ctx.font = 'bold 15px ui-sans-serif, system-ui'
    ctx.fillText(band.name, 132, 150)
    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-monospace, monospace'
    ctx.fillText(band.range, 132, 170)
    ctx.font = '11px ui-sans-serif, system-ui'
    ctx.fillText(`Use: ${band.use}`, 132, 192)
    ctx.fillStyle = CANVAS.rose
    ctx.fillText(`Danger: ${band.danger}`, 132, 212)

    // ── wave panel ───────────────────────────────────────────────────────────
    const wy = 254, wh = h - wy - 20
    if (showWave) {
      const cycles = 5 - 3.2 * ((exp - EXP_MIN) / (EXP_MAX - EXP_MIN))
      const k = (2 * Math.PI * cycles) / (w - 88)
      const ph = reducedMotion ? 0 : t * 6
      const drawWave = (cy: number, amp: number, color: string, label: string) => {
        ctx.strokeStyle = 'rgba(250,250,249,0.15)'
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(44, cy); ctx.lineTo(w - 44, cy); ctx.stroke()
        ctx.strokeStyle = color
        ctx.lineWidth = 2.5
        ctx.beginPath()
        for (let x = 44; x <= w - 44; x += 2) {
          const y = cy - amp * Math.sin(k * (x - 44) - ph)
          if (x === 44) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.fillStyle = color
        ctx.font = 'bold 12px ui-sans-serif, system-ui'
        ctx.textAlign = 'center'
        ctx.fillText(label, 26, cy + 4)
      }
      drawWave(wy + 42, 24, CANVAS.amber, 'E')
      drawWave(wy + 96, 24, CANVAS.teal, 'B')
      // propagation arrow
      ctx.strokeStyle = CANVAS.fg
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(w - 78, wy + 16); ctx.lineTo(w - 50, wy + 16); ctx.stroke()
      ctx.fillStyle = CANVAS.fg
      ctx.beginPath()
      ctx.moveTo(w - 44, wy + 16); ctx.lineTo(w - 52, wy + 12); ctx.lineTo(w - 52, wy + 20)
      ctx.closePath(); ctx.fill()
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText('c', w - 64, wy + 10)
      ctx.fillStyle = CANVAS.muted
      ctx.font = '9px ui-monospace, monospace'
      ctx.textAlign = 'right'
      ctx.fillText(`schematic — not to scale${reducedMotion ? ' · static (reduced motion)' : ''}`, w - 16, h - 6)
    } else {
      ctx.strokeStyle = CANVAS.grid
      ctx.lineWidth = 1.5
      ctx.setLineDash([5, 5])
      ctx.beginPath(); ctx.roundRect(24, wy, w - 48, wh, 8); ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = CANVAS.muted
      ctx.font = '11px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText("Toggle 'Show wave' to see the oscillating", w / 2, wy + wh / 2 - 8)
      ctx.fillText('electric (E) and magnetic (B) fields', w / 2, wy + wh / 2 + 10)
    }

    // ── challenge banner ─────────────────────────────────────────────────────
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: land the marker inside the rainbow — 400–700 nm!', w / 2, 18)
    } else if (challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Challenge complete — you found visible light!', w / 2, 18)
    }
  }, 400)

  return (
    <SimFrame
      title="EM Spectrum Explorer"
      brief="Slide across 15 decades of wavelength: each band lights up with its use, its danger, its frequency f = c/λ and its photon energy E = hf."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A logarithmic electromagnetic-spectrum strip from gamma rays to radio waves with a movable wavelength marker, band information and an optional oscillating E/B wave"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Wavelength" value={exp} min={EXP_MIN} max={EXP_MAX} step={0.02}
          format={(e) => { const f = fmtLength(10 ** e); return `${f.v} ${f.u}` }}
          onChange={(v) => { setExp(v); if (challenge === 'active') tryWin(v) }}
        />
        <SimToggle label="Show wave" checked={showWave} onChange={setShowWave} />
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={() => { setExp(EXP_DEFAULT); setShowWave(false); setChallenge('idle'); setResult('') }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            disabled={challenge === 'won'}
            onClick={() => { setChallenge('active'); setResult('Aim at the rainbow band on the strip — it sits between UV (400 nm) and IR (700 nm).') }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: find visible light
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Band" value={band.name} />
        <Readout label="Wavelength" value={fmtLength(lam).v} unit={fmtLength(lam).u} />
        <Readout label="Frequency f = c/λ" value={fmtFreq(freq).v} unit={fmtFreq(freq).u} />
        <Readout label="Photon E = hf" value={fmtEnergy(energy).v} unit={fmtEnergy(energy).u} />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
