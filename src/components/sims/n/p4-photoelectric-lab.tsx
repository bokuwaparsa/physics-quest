// ─── Sim: Photoelectric Lab · photons vs work functions, KE = 1240/λ − φ ─────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, Legend, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

type MatId = 'cs' | 'na' | 'zn' | 'pt'
type ChState = 'idle' | 'active' | 'won' | 'lost'

const MATS: { value: MatId; label: string; name: string; phi: number }[] = [
  { value: 'cs', label: 'Caesium · φ = 2.1 eV', name: 'Caesium', phi: 2.1 },
  { value: 'na', label: 'Sodium · φ = 2.3 eV', name: 'Sodium', phi: 2.3 },
  { value: 'zn', label: 'Zinc · φ = 4.3 eV', name: 'Zinc', phi: 4.3 },
  { value: 'pt', label: 'Platinum · φ = 6.4 eV', name: 'Platinum', phi: 6.4 },
]

const KE_LO = 0.5 // eV — challenge band
const KE_HI = 1.0
const LAM_LO = Math.ceil(1240 / (4.3 + KE_HI)) // 234 nm
const LAM_HI = Math.floor(1240 / (4.3 + KE_LO)) // 258 nm

/** Approximate colour of light with wavelength λ (nm); UV drawn as violet-magenta. */
function wlColor(nm: number): string {
  if (nm < 380) return '#b266ff'
  if (nm > 700) return '#7a1a1a'
  let r = 0, g = 0, b = 0
  if (nm < 440) { r = -(nm - 440) / 60; b = 1 }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1 }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20 }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1 }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65 }
  else { r = 1 }
  let f = 1
  if (nm < 420) f = 0.35 + 0.65 * (nm - 380) / 40
  else if (nm > 645) f = 0.35 + 0.65 * (700 - nm) / 55
  const c = (x: number) => Math.round(255 * Math.max(0, Math.min(1, x * f)))
  return `rgb(${c(r)},${c(g)},${c(b)})`
}

interface Photon { x: number; y: number; ph: number }
interface Electron { x: number; y: number; vx: number; vy: number; age: number }

export function PhotoelectricLabSim() {
  const [lam, setLam] = useState(400) // nm
  const [rate, setRate] = useState(6) // photons per second
  const [mat, setMat] = useState<MatId>('na')
  const [challenge, setChallenge] = useState<ChState>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const photons = useRef<Photon[]>([])
  const electrons = useRef<Electron[]>([])
  const acc = useRef(0)
  const wobble = useRef(0)

  const metal = MATS.find((m) => m.value === mat) ?? MATS[1]
  const ePhoton = 1240 / lam // eV
  const keMax = ePhoton - metal.phi // eV
  const ejecting = keMax > 0

  const evaluate = (m: MatId, l: number) => {
    const info = MATS.find((x) => x.value === m) ?? MATS[1]
    const ke = 1240 / l - info.phi
    const ok = m === 'zn' && ke >= KE_LO && ke <= KE_HI
    if (ok) { beep(660, 120); beep(880, 160) }
    setChallenge(ok ? 'won' : 'lost')
    if (ok) {
      setResult(`Zinc: KE = 1240/${l} − 4.3 = ${ke.toFixed(2)} eV — inside the 0.5–1.0 eV band! Any λ from ${LAM_LO} to ${LAM_HI} nm does it. One rich photon pays the 4.3 eV fee and hands the electron the change.`)
    } else if (m !== 'zn') {
      setResult(`You used ${info.name} — the challenge is to eject electrons from zinc (φ = 4.3 eV). Switch the metal, then find λ where 1240/λ − 4.3 lands between 0.5 and 1.0 eV.`)
    } else if (ke <= 0) {
      setResult(`KE = 1240/${l} − 4.3 = ${ke.toFixed(2)} eV — below zero, so nothing is ejected. Shorten the wavelength (richer photons) to get into the 0.5–1.0 eV band.`)
    } else {
      setResult(`KE = 1240/${l} − 4.3 = ${ke.toFixed(2)} eV — ejected, but outside the 0.5–1.0 eV band. Nudge λ between ${LAM_LO} and ${LAM_HI} nm.`)
    }
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    if (w < 60 || h < 60) return
    wobble.current += dt * 9

    const beamY = Math.round(h * 0.46)
    const plateX = w - 66
    const plateTop = 96
    const plateBot = h - 96
    const col = wlColor(lam)

    // ── lamp ────────────────────────────────────────────────────────────────
    const lampX = 40
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(lampX - 18, beamY - 34, 36, 68)
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.strokeRect(lampX - 18, beamY - 34, 36, 68)
    ctx.fillStyle = col
    ctx.beginPath(); ctx.arc(lampX, beamY, 11, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.fg; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(lampX, beamY, 11, 0, Math.PI * 2); ctx.stroke()
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText(`${lam} nm${lam < 380 ? ' (UV)' : lam > 700 ? ' (IR)' : ''}`, lampX, beamY - 44)

    // ── photons: count on screen ∝ intensity, colour by λ ───────────────────
    const maxLive = Math.min(24, 3 + rate)
    if (!reducedMotion) {
      acc.current += dt * rate
      while (acc.current >= 1 && photons.current.length < maxLive) {
        acc.current -= 1
        photons.current.push({ x: 60, y: beamY - 26 + (photons.current.length % 4) * 17, ph: wobble.current * 2 })
      }
    }
    const speed = 240 // px/s
    const drawPhoton = (p: Photon) => {
      ctx.strokeStyle = col; ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = 0; i <= 20; i += 2) {
        const yy = p.y + 3.5 * Math.sin(i * 0.9 + p.ph)
        if (i === 0) ctx.moveTo(p.x + i, yy); else ctx.lineTo(p.x + i, yy)
      }
      ctx.stroke()
      ctx.fillStyle = col
      ctx.beginPath()
      ctx.moveTo(p.x + 25, p.y)
      ctx.lineTo(p.x + 18, p.y - 4)
      ctx.lineTo(p.x + 18, p.y + 4)
      ctx.closePath(); ctx.fill()
    }
    if (reducedMotion) {
      // static photons staked along the beam (no autonomous motion)
      const n = Math.max(1, Math.min(10, Math.round(rate / 2)))
      for (let i = 0; i < n; i++) {
        const px = 62 + (i * (plateX - 110)) / n
        drawPhoton({ x: px, y: beamY - 20 + (i % 3) * 20, ph: i })
      }
    } else {
      const survivors: Photon[] = []
      for (const p of photons.current) {
        p.x += speed * dt
        p.ph += dt * 14
        if (p.x + 26 < plateX) { survivors.push(p); drawPhoton(p) }
      }
      photons.current = survivors
    }

    // ── metal plate ─────────────────────────────────────────────────────────
    ctx.fillStyle = ejecting ? CANVAS.white : CANVAS.panelLight
    ctx.fillRect(plateX, plateTop, 14, plateBot - plateTop)
    ctx.strokeStyle = ejecting ? CANVAS.amber : CANVAS.muted; ctx.lineWidth = 2
    ctx.strokeRect(plateX, plateTop, 14, plateBot - plateTop)
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 11px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText(metal.name, plateX + 7, plateTop - 22)
    ctx.fillText(`φ = ${metal.phi.toFixed(1)} eV`, plateX + 7, plateTop - 8)

    // ── ejected electrons: dots, speed ∝ √KE ────────────────────────────────
    if (ejecting && !reducedMotion) {
      for (const p of photons.current) {
        if (p.x + 24 >= plateX - 6 && Math.random() < Math.min(1, dt * 14)) {
          const v = (58 + 52 * Math.sqrt(keMax)) * (0.75 + 0.5 * Math.random())
          electrons.current.push({
            x: plateX - 4,
            y: plateTop + 20 + Math.random() * (plateBot - plateTop - 40),
            vx: -30 - 40 * Math.random(),
            vy: -v,
            age: 0,
          })
        }
      }
    }
    const alive: Electron[] = []
    for (const e of electrons.current) {
      e.age += dt
      e.x += e.vx * dt
      e.y += e.vy * dt
      e.vy += 26 * dt // gentle spray
      const gone = e.y < 14 || e.age > 1.6
      if (!gone && !reducedMotion) {
        ctx.fillStyle = CANVAS.emerald
        ctx.globalAlpha = Math.max(0, 1 - e.age / 1.6)
        ctx.beginPath(); ctx.arc(e.x, e.y, 3, 0, Math.PI * 2); ctx.fill()
        ctx.globalAlpha = 1
        alive.push(e)
      }
    }
    electrons.current = alive
    if (ejecting && reducedMotion) {
      // static emission indicator instead of animation
      ctx.fillStyle = CANVAS.emerald; ctx.font = 'bold 12px ui-monospace, monospace'
      for (let i = 0; i < Math.min(7, 1 + Math.round(keMax * 2)); i++) {
        ctx.beginPath(); ctx.arc(plateX - 16 - (i % 2) * 14, plateTop + 34 + i * 22, 3.5, 0, Math.PI * 2); ctx.fill()
      }
      ctx.fillText('electrons out →', plateX - 96, plateBot + 20)
    }
    if (!ejecting) {
      ctx.fillStyle = CANVAS.rose; ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('below threshold — no electrons', plateX + 7, plateBot + 20)
    }

    // ── ground line + formula note ──────────────────────────────────────────
    ctx.strokeStyle = CANVAS.grid; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(14, h - 46); ctx.lineTo(w - 14, h - 46); ctx.stroke()
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.fillText(`KE_max = 1240/${lam} − ${metal.phi.toFixed(1)} = ${ejecting ? keMax.toFixed(2) : '—'} eV · electron speed ∝ √KE`, 16, h - 28)

    // ── challenge banner ────────────────────────────────────────────────────
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: eject electrons from ZINC with KE between 0.5 and 1.0 eV!', w / 2, 20)
    } else if (challenge === 'won' || challenge === 'lost') {
      ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText(challenge === 'won' ? '★ Challenge complete!' : 'Not in the band yet — tune λ (or the metal)!', w / 2, 20)
    }
  }, 400)

  return (
    <SimFrame
      title="Photoelectric Lab"
      brief="A lamp fires photons of wavelength λ at a metal. Each photon alone must pay the work function φ: KE_max = 1240/λ − φ (eV). Brightness only changes how many photons arrive."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A lamp sending coloured photon arrows toward a metal plate; ejected electron dots fly off with speed set by their kinetic energy, and a below-threshold notice appears when the photon energy is too low"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <Legend color={wlColor(lam)} label={`photon · ${lam} nm`} />
        <Legend color={CANVAS.emerald} label="ejected electron" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Wavelength λ" value={lam} min={200} max={700} step={1} unit="nm"
          onChange={(v) => { setLam(v); if (challenge === 'active' || challenge === 'lost') evaluate(mat, v) }}
        />
        <SimSlider
          label="Intensity" value={rate} min={1} max={20} step={1} unit="photons/s"
          onChange={setRate}
        />
        <SimSelect
          label="Metal" value={mat}
          options={MATS.map((m) => ({ value: m.value, label: m.label }))}
          onChange={(v) => { setMat(v); if (challenge === 'active' || challenge === 'lost') evaluate(v, lam) }}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={() => { setChallenge('idle'); setResult(''); setLam(400); setRate(6); setMat('na'); photons.current = []; electrons.current = [] }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { setChallenge('active'); setResult(''); evaluate(mat, lam) }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: Zn electrons at 0.5–1 eV
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="E photon" value={ePhoton.toFixed(2)} unit="eV" tone="text-amber-500" />
        <Readout label="Work fn φ" value={metal.phi.toFixed(1)} unit="eV" tone="text-white" />
        <Readout label="KE max" value={ejecting ? keMax.toFixed(2) : '—'} unit="eV" tone={ejecting ? 'text-emerald-500' : 'text-rose-500'} />
        <Readout label="Photocurrent" value={ejecting ? String(rate) : '0'} unit="a.u." tone={ejecting ? 'text-teal-500' : undefined} />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
