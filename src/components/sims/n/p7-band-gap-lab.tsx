// ─── Sim: Band Gap Lab · valence/conduction bands, thermal excitation ────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimSelect, Readout, Legend, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

type MatId = 'copper' | 'diamond' | 'silicon' | 'germanium' | 'ledred' | 'ledblue'
type ChState = 'idle' | 'active' | 'won' | 'lost'

const KB = 8.617e-5 // eV/K
const MODEL_SCALE = 1e6 // model carriers per "unit" — exaggerated ~10¹⁶× for visibility

const MATS: { value: MatId; label: string; name: string; eg: number | null; klass: string; led: boolean }[] = [
  { value: 'copper', label: 'Copper · conductor', name: 'Copper', eg: null, klass: 'conductor', led: false },
  { value: 'diamond', label: 'Diamond · 5.5 eV', name: 'Diamond', eg: 5.5, klass: 'insulator', led: false },
  { value: 'silicon', label: 'Silicon · 1.1 eV', name: 'Silicon', eg: 1.1, klass: 'semiconductor', led: false },
  { value: 'germanium', label: 'Germanium · 0.67 eV', name: 'Germanium', eg: 0.67, klass: 'semiconductor', led: false },
  { value: 'ledred', label: 'LED red (GaAs) · 1.9 eV', name: 'GaAs LED', eg: 1.9, klass: 'semiconductor (doped)', led: true },
  { value: 'ledblue', label: 'LED blue (GaN) · 2.7 eV', name: 'GaN LED', eg: 2.7, klass: 'semiconductor (doped)', led: true },
]

/** Approximate colour of light with wavelength λ (nm); outside visible → grey. */
function wlColor(nm: number): string {
  if (nm < 380 || nm > 700) return '#9c9891'
  let r = 0, g = 0, b = 0
  if (nm < 440) { r = -(nm - 440) / 60; b = 1 }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1 }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20 }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1 }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65 }
  else { r = 1 }
  const c = (x: number) => Math.round(255 * Math.max(0, Math.min(1, x)))
  return `rgb(${c(r)},${c(g)},${c(b)})`
}

export function BandGapLabSim() {
  const [mat, setMat] = useState<MatId>('silicon')
  const [temp, setTemp] = useState(300) // K
  const [challenge, setChallenge] = useState<ChState>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const climber = useRef(0) // 0→1 animation of one electron crossing the gap
  const drawnCount = useRef(0) // eased count of conduction dots

  const info = MATS.find((m) => m.value === mat) ?? MATS[2]
  const eg = info.eg
  const count = eg === null ? Infinity : Math.round(MODEL_SCALE * Math.exp(-eg / (2 * KB * temp)))
  const ledLam = info.led && eg !== null ? 1240 / eg : null

  const evaluate = (m: MatId, T: number) => {
    const inf = MATS.find((x) => x.value === m) ?? MATS[2]
    if (inf.eg === null) {
      setChallenge('lost')
      setResult('Copper conducts at ANY temperature — its bands overlap, so there is nothing to demonstrate. The challenge wants a semiconductor: silicon or germanium, warmed until at least 5 electrons jump the gap.')
      return
    }
    const n = Math.round(MODEL_SCALE * Math.exp(-inf.eg / (2 * KB * T)))
    const ok = n >= 5 && (m === 'silicon' || m === 'germanium')
    if (ok) { beep(660, 120); beep(880, 160) }
    setChallenge(ok ? 'won' : 'lost')
    if (ok) {
      setResult(`${inf.name}: n ∝ e^(−Eg/2kT) = e^(−${inf.eg}/(2×8.617e-5×${T})) → model count ${n} ≥ 5. A small gap plus a little heat frees carriers — warm semiconductors conduct better, the exact opposite of metals!`)
    } else if (m === 'diamond') {
      setChallenge('lost')
      setResult(`Diamond's 5.5 eV gap is a wall: even at ${T} K the model count is 0. Diamond is an insulator — pick silicon (1.1 eV) or germanium (0.67 eV) and heat them up.`)
    } else {
      setResult(`${inf.name} at ${T} K: only ${n} excited electrons — not the ≥ 5 you need. Turn up the temperature (or pick the smaller-gap semiconductor, germanium).`)
    }
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    if (w < 60 || h < 60) return

    const bandX = 34
    const bandW = Math.min(280, w - 190)
    const condTop = 66
    const condH = 58
    const gapPx = eg === null ? 0 : 16 + eg * 26 // diamond → 159 px, Ge → 33 px
    const valTop = condTop + condH + gapPx
    const valH = 62

    // ── bands ───────────────────────────────────────────────────────────────
    if (eg === null) {
      // metal: merged band, electron sea
      ctx.fillStyle = CANVAS.panelLight
      ctx.fillRect(bandX, condTop, bandW, condH + 24 + valH + 40)
      ctx.strokeStyle = CANVAS.teal; ctx.lineWidth = 2
      ctx.strokeRect(bandX, condTop, bandW, condH + 24 + valH + 40)
      ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'center'
      ctx.fillText('valence & conduction bands OVERLAP — no gap', bandX + bandW / 2, condTop + 16)
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('electron sea → conducts at any temperature', bandX + bandW / 2, condTop + 34)
    } else {
      ctx.fillStyle = CANVAS.panelLight
      ctx.fillRect(bandX, condTop, bandW, condH)
      ctx.fillRect(bandX, valTop, bandW, valH)
      ctx.strokeStyle = CANVAS.teal; ctx.lineWidth = 2
      ctx.strokeRect(bandX, condTop, bandW, condH)
      ctx.strokeRect(bandX, valTop, bandW, valH)
      ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'center'
      ctx.fillText('conduction band (mobile electrons)', bandX + bandW / 2, condTop - 8)
      ctx.fillText('valence band (bonding electrons)', bandX + bandW / 2, valTop + valH + 14)
      // gap arrows
      ctx.strokeStyle = CANVAS.amber; ctx.lineWidth = 1.5
      const ax = bandX + bandW + 14
      ctx.beginPath()
      ctx.moveTo(ax, condTop + condH); ctx.lineTo(ax, valTop)
      ctx.moveTo(ax - 4, condTop + condH + 6); ctx.lineTo(ax, condTop + condH); ctx.lineTo(ax + 4, condTop + condH + 6)
      ctx.moveTo(ax - 4, valTop - 6); ctx.lineTo(ax, valTop); ctx.lineTo(ax + 4, valTop - 6)
      ctx.stroke()
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText(`Eg = ${eg.toFixed(2)} eV`, ax + 10, (condTop + condH + valTop) / 2 + 4)
    }

    // ── valence filler dots + holes (open circles = missing electrons) ───────
    const vTop = eg === null ? condTop + condH + 44 : valTop
    const nCols = Math.max(6, Math.floor((bandW - 16) / 20))
    const nRows = 2
    const dotsTotal = nCols * nRows
    const shown = eg === null ? 0 : Math.min(count, 10) // holes drawn (cap for clarity)
    for (let i = 0; i < dotsTotal; i++) {
      const r = Math.floor(i / nCols)
      const c = i % nCols
      const dx = bandX + 14 + c * 20
      const dy = vTop + 14 + r * ((valH - 22) / Math.max(1, nRows - 1))
      if (i >= dotsTotal - shown) {
        ctx.strokeStyle = CANVAS.rose; ctx.lineWidth = 1.8
        ctx.beginPath(); ctx.arc(dx, dy, 4.2, 0, Math.PI * 2); ctx.stroke()
      } else {
        ctx.fillStyle = CANVAS.teal
        ctx.beginPath(); ctx.arc(dx, dy, 3.4, 0, Math.PI * 2); ctx.fill()
      }
    }

    // conduction electrons (eased count so changes feel alive, not jumpy)
    const targetDots = eg === null ? 24 : Math.min(count, 36) // metal: a full electron sea
    drawnCount.current = reducedMotion ? targetDots : drawnCount.current + (targetDots - drawnCount.current) * Math.min(1, dt * 6)
    const nDraw = Math.round(drawnCount.current)
    if (!reducedMotion) climber.current = (climber.current + dt / 1.2) % 1
    for (let i = 0; i < nDraw; i++) {
      const jx = bandX + 12 + ((i * 37) % (bandW - 20)) + (reducedMotion ? 0 : 3 * Math.sin(_t * 3 + i))
      const jy = condTop + 14 + ((i * 13) % (condH - 22))
      ctx.fillStyle = CANVAS.amber
      ctx.beginPath(); ctx.arc(jx, jy, 3.4, 0, Math.PI * 2); ctx.fill()
    }
    // one electron climbing the gap
    if (eg !== null && count >= 1 && climber.current < 0.92) {
      const cp = reducedMotion ? 0.5 : climber.current
      const cy = condTop + condH + gapPx * cp
      ctx.fillStyle = CANVAS.amber
      ctx.beginPath(); ctx.arc(bandX + 40, cy, 3.4, 0, Math.PI * 2); ctx.fill()
    }

    // ── LED glow ────────────────────────────────────────────────────────────
    if (ledLam !== null) {
      const gx = bandX + bandW + 74
      const gy = condTop + condH + gapPx / 2
      const col = wlColor(ledLam)
      const glow = reducedMotion ? 0.5 : 0.4 + 0.25 * Math.sin(_t * 4)
      ctx.fillStyle = col
      ctx.globalAlpha = glow
      ctx.beginPath(); ctx.arc(gx, gy, 16, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1
      ctx.strokeStyle = col; ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(gx, gy, 16, 0, Math.PI * 2); ctx.stroke()
      ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 10px ui-monospace, monospace'; ctx.textAlign = 'center'
      ctx.fillText(`${Math.round(ledLam)} nm`, gx, gy + 30)
    }

    // ── thermometer strip ───────────────────────────────────────────────────
    const tx = 16
    const tTop = condTop
    const tBot = valTop + valH
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(tx, tTop, 10, tBot - tTop)
    const tFrac = (temp - 100) / 500
    ctx.fillStyle = tFrac > 0.66 ? CANVAS.red : tFrac > 0.33 ? CANVAS.orange : CANVAS.teal
    const th = (tBot - tTop) * (0.25 + 0.75 * tFrac)
    ctx.fillRect(tx + 2, tBot - th, 6, th)
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'left'
    ctx.fillText(`${temp} K`, tx - 4, tBot + 14)

    // ── footer notes ────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
    ctx.fillText(`n ∝ e^(−Eg/2kT) · hotter ⇒ more climbers (semiconductors only) · model exaggerated ~10¹⁶× for visibility`, 16, h - 26)

    // ── challenge banner ────────────────────────────────────────────────────
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: pick the semiconductor whose conduction sits between metal & insulator — heat it to ≥ 5 excited electrons!', w / 2, 20)
    } else if (challenge === 'won' || challenge === 'lost') {
      ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText(challenge === 'won' ? '★ Challenge complete!' : 'Not there yet — adjust material or temperature!', w / 2, 20)
    }
  }, 400)

  return (
    <SimFrame
      title="Band Gap Lab"
      brief="Electrons must climb the band gap Eg to conduct. Metals have no gap, insulators a wall, semiconductors a stepladder that heat helps to climb: n ∝ e^(−Eg/2kT). LEDs pay the gap back as light, λ = 1240/Eg."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Energy band diagram with a conduction band on top and a valence band below, separated by a gap whose height depends on the chosen material; thermal electrons jump the gap, holes appear in the valence band, and LED materials glow at their emission wavelength"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <Legend color={CANVAS.amber} label="conduction electron" />
        <Legend color={CANVAS.teal} label="valence electron" />
        <Legend color={CANVAS.rose} label="hole" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSelect
          label="Material" value={mat}
          options={MATS.map((m) => ({ value: m.value, label: m.label }))}
          onChange={(v) => { setMat(v); if (challenge === 'active' || challenge === 'lost') evaluate(v, temp) }}
        />
        <SimSlider
          label="Temperature" value={temp} min={100} max={600} step={5} unit="K"
          onChange={(v) => { setTemp(v); if (challenge === 'active' || challenge === 'lost') evaluate(mat, v) }}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={() => { setChallenge('idle'); setResult(''); setMat('silicon'); setTemp(300) }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { setChallenge('active'); setResult(''); evaluate(mat, temp) }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: find & heat the semiconductor
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Band gap Eg" value={eg === null ? '0' : eg.toFixed(2)} unit="eV" tone="text-amber-500" />
        <Readout label="Class" value={info.klass} tone="text-teal-500" />
        <Readout label="Excited electrons" value={eg === null ? '∞ (sea)' : count.toLocaleString('en-US')} tone="text-emerald-500" />
        <Readout label="LED λ = 1240/Eg" value={ledLam === null ? '—' : String(Math.round(ledLam))} unit="nm" tone={ledLam === null ? undefined : 'text-rose-400'} />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
