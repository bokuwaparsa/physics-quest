// ─── Sim: Atom Levels · hydrogen ladder E_n = −13.6/n², photons on jumps ─────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSelect, Readout, Legend, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

type ChState = 'idle' | 'active' | 'won' | 'lost'

const N_MAX = 6
const EN = (n: number) => -13.6 / (n * n) // eV
const SERIES = ['', 'Lyman', 'Balmer', 'Paschen', 'Brackett', 'Pfund', 'Humphreys']

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

export function AtomLevelsSim() {
  const [from, setFrom] = useState(3)
  const [to, setTo] = useState(2)
  const [challenge, setChallenge] = useState<ChState>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const prog = useRef(1) // 0→1 transition animation
  const lastKey = useRef('3>2')

  const emitting = from > to
  const dE = Math.abs(EN(to) - EN(from)) // eV
  const lam = dE > 0 ? 1240 / dE : 0 // nm
  const nLo = Math.min(from, to)
  const series = dE > 0 ? SERIES[nLo] : '—'
  const kind = dE === 0 ? 'none' : emitting ? 'emission' : 'absorption'

  const evaluate = (f: number, t: number) => {
    const de = Math.abs(EN(t) - EN(f))
    if (de === 0) {
      setChallenge('lost')
      setResult('Same level — no jump, no photon. Choose two different rungs (e.g. from n = 3 down to n = 2).')
      return
    }
    const l = 1240 / de
    const isEmission = f > t
    const ok = isEmission && Math.abs(l - 656) <= 5
    if (ok) { beep(660, 120); beep(880, 160) }
    setChallenge(ok ? 'won' : 'lost')
    if (ok) {
      setResult(`Dropping to n = 2 releases ΔE = ${de.toFixed(2)} eV → λ = 1240/${de.toFixed(2)} ≈ 656 nm — the red H-alpha Balmer line, the colour of glowing nebulae!`)
    } else if (!isEmission) {
      setResult(`That's an absorption (the electron climbs UP). Emission means falling DOWN to a lower rung — try setting "to" below "from" so ΔE pays out as light.`)
    } else {
      setResult(`λ = 1240/${de.toFixed(2)} ≈ ${Math.round(l)} nm — a real hydrogen line, but not the red 656 nm one. The Balmer lines end on n = 2; which drop into n = 2 gives ~656 nm?`)
    }
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    if (w < 60 || h < 60) return

    const top = 34
    const bottom = h - 44
    const yOf = (E: number) => top + ((0 - E) / 14) * (bottom - top) // E = 0 → top, E = −14 → bottom
    const x0 = 150
    const x1 = w - 52

    // ── ladder (drawn to scale) ─────────────────────────────────────────────
    ctx.textAlign = 'right'
    for (let n = 1; n <= N_MAX; n++) {
      const y = yOf(EN(n))
      ctx.strokeStyle = n === Math.max(from, to) || n === Math.min(from, to) ? CANVAS.amber : CANVAS.muted
      ctx.lineWidth = n === from || n === to ? 2.5 : 1.5
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke()
      ctx.fillStyle = n === from ? CANVAS.orange : n === to ? CANVAS.teal : CANVAS.muted
      ctx.font = '10px ui-monospace, monospace'
      // stagger the text for the crowded top rungs (lines themselves stay to scale)
      const dy = n === 5 ? 9 : n === 6 ? -9 : 3
      ctx.fillText(`n=${n}  ${EN(n).toFixed(n <= 3 ? 2 : 3)} eV`, x0 - 10, y + dy)
    }
    // ionization limit
    ctx.strokeStyle = CANVAS.grid; ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.beginPath(); ctx.moveTo(x0, top); ctx.lineTo(x1, top); ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.muted; ctx.textAlign = 'left'
    ctx.fillText('E = 0 — electron free (ionization at 13.6 eV above ground)', x0, top - 8)

    // ── animated electron + photon ──────────────────────────────────────────
    const key = `${from}>${to}`
    if (key !== lastKey.current) { lastKey.current = key; prog.current = 0 }
    if (reducedMotion) prog.current = 1
    else if (prog.current < 1) prog.current = Math.min(1, prog.current + dt / 0.9)
    const p = prog.current
    const ease = p * p * (3 - 2 * p)

    const yA = yOf(EN(from))
    const yB = yOf(EN(to))
    const ex = 208
    const yNow = yA + (yB - yA) * ease

    if (dE > 0) {
      const col = wlColor(lam)
      const midY = (yA + yB) / 2
      const span = x1 - ex - 26
      let px: number // photon head x
      if (emitting) {
        px = ex + 24 + span * ease
      } else {
        px = x1 - 26 - span * (1 - ease)
      }
      if (p < 1 || reducedMotion) {
        // squiggle + arrowhead
        ctx.strokeStyle = col; ctx.lineWidth = 2.5
        ctx.beginPath()
        const tail = px - 26 * (emitting ? 1 : -1)
        for (let i = 0; i <= 20; i++) {
          const xx = tail + ((px - tail) * i) / 20
          const yy = midY + 4 * Math.sin(i * 1.1)
          if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy)
        }
        ctx.stroke()
        const dir = emitting ? 1 : -1
        ctx.fillStyle = col
        ctx.beginPath()
        ctx.moveTo(px + 6 * dir, midY)
        ctx.lineTo(px - 1 * dir, midY - 5)
        ctx.lineTo(px - 1 * dir, midY + 5)
        ctx.closePath(); ctx.fill()
        ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 11px ui-monospace, monospace'; ctx.textAlign = 'center'
        ctx.fillText(`λ ≈ ${Math.round(lam)} nm`, (tail + px) / 2, midY - 14)
        ctx.fillText(lam < 380 ? '(UV)' : lam > 700 ? '(IR)' : kind, (tail + px) / 2, midY + 22)
      }
    }

    // electron dot (with a short trail)
    ctx.fillStyle = CANVAS.orange
    ctx.beginPath(); ctx.arc(ex, yNow, 6, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.fg; ctx.lineWidth = 1.2
    ctx.beginPath(); ctx.arc(ex, yNow, 6, 0, Math.PI * 2); ctx.stroke()
    if (p < 1 && !reducedMotion) {
      const pe = Math.max(0, p - 0.07)
      const yPrev = yA + (yB - yA) * pe * pe * (3 - 2 * pe)
      ctx.globalAlpha = 0.35
      ctx.beginPath(); ctx.arc(ex, yPrev, 4, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1
    }

    // ── footer ──────────────────────────────────────────────────────────────
    ctx.textAlign = 'left'
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
    ctx.fillText(`ΔE = |E_${to} − E_${from}| = ${dE.toFixed(2)} eV · λ = 1240/ΔE = ${dE > 0 ? Math.round(lam) : '—'} nm · levels to scale`, 16, h - 26)

    // ── challenge banner ────────────────────────────────────────────────────
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText('Challenge: emit the red 656 nm Balmer line — pick the right drop!', w / 2, 20)
    } else if (challenge === 'won' || challenge === 'lost') {
      ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText(challenge === 'won' ? '★ Challenge complete!' : 'Not the red Balmer line yet — try another drop!', w / 2, 20)
    }
  }, 400)

  return (
    <SimFrame
      title="Atomic Levels & Spectra"
      brief="Hydrogen's ladder, drawn to scale: E_n = −13.6/n² eV. Pick a drop (emission) or a climb (absorption) and watch the photon carry exactly the gap energy, λ = 1240/ΔE."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Hydrogen energy-level ladder from n=1 to n=6 drawn to scale, with an electron dot that drops between levels while a coloured photon squiggle flies out, or absorbs one while climbing"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <Legend color={CANVAS.orange} label="electron" />
        <Legend color={CANVAS.amber} label="active levels" />
        <Legend color="#9c9891" label="photon (UV/IR shown grey)" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSelect
          label="From level n" value={String(from)}
          options={[1, 2, 3, 4, 5, 6].map((n) => ({ value: String(n), label: `n = ${n}` }))}
          onChange={(v) => { const f = Number(v); setFrom(f); if (challenge === 'active' || challenge === 'lost') evaluate(f, to) }}
        />
        <SimSelect
          label="To level n" value={String(to)}
          options={[1, 2, 3, 4, 5, 6].map((n) => ({ value: String(n), label: `n = ${n}` }))}
          onChange={(v) => { const t = Number(v); setTo(t); if (challenge === 'active' || challenge === 'lost') evaluate(from, t) }}
        />
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={() => { setChallenge('idle'); setResult(''); setFrom(3); setTo(2) }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={() => { setChallenge('active'); setResult(''); evaluate(from, to) }}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: make the 656 nm line
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="ΔE photon" value={dE > 0 ? dE.toFixed(2) : '—'} unit="eV" tone="text-amber-500" />
        <Readout label="Wavelength" value={dE > 0 ? String(Math.round(lam)) : '—'} unit="nm" tone="text-rose-400" />
        <Readout label="Series" value={series} tone="text-teal-500" />
        <Readout label="Type" value={kind} tone={kind === 'emission' ? 'text-emerald-500' : kind === 'absorption' ? 'text-violet-400' : undefined} />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
