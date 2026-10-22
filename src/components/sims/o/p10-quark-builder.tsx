// ─── Sim: Quark Builder · snap u/d quarks into baryons and mesons ─────────────
'use client'

import { useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSelect, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Atom, Eraser, Flag, RotateCcw } from 'lucide-react'

type QKind = 'u' | 'd' | 'au' | 'ad'
type Mode = 'baryon' | 'meson'

const QDATA: Record<QKind, { label: string; charge: number; color: string }> = {
  u: { label: 'u', charge: 2, color: CANVAS.amber }, // +2/3
  d: { label: 'd', charge: -1, color: CANVAS.teal }, // −1/3
  au: { label: 'u\u0304', charge: -2, color: CANVAS.rose }, // −2/3
  ad: { label: 'd\u0304', charge: 1, color: CANVAS.emerald }, // +1/3
}

const PALETTE: { kind: QKind; label: string }[] = [
  { kind: 'u', label: 'u (+2/3)' },
  { kind: 'd', label: 'd (−1/3)' },
  { kind: 'au', label: 'anti-u (−2/3)' },
  { kind: 'ad', label: 'anti-d (+1/3)' },
]

type Verdict =
  | { state: 'incomplete' }
  | { state: 'error'; error: string }
  | { state: 'ok'; name: string; charge: number; mass: string; note?: string; excited?: boolean }

/** Charge in thirds → display string. */
const fmtCharge = (t: number) => {
  if (t === 0) return '0'
  if (t % 3 === 0) return `${t > 0 ? '+' : ''}${t / 3}`
  return `${t > 0 ? '+' : '−'}${Math.abs(t)}/3`
}

function detect(picks: QKind[], mode: Mode): Verdict {
  const target = mode === 'baryon' ? 3 : 2
  if (picks.length < target) return { state: 'incomplete' }
  const sum = picks.reduce((acc, k) => acc + QDATA[k].charge, 0)
  if (mode === 'baryon') {
    if (picks.some((k) => k === 'au' || k === 'ad')) {
      return { state: 'error', error: 'Baryons are built from 3 quarks — an antiquark does not belong in this line-up.' }
    }
    const nu = picks.filter((k) => k === 'u').length
    if (nu === 3) return { state: 'ok', name: 'Δ⁺⁺ (Delta-plus-plus)', charge: sum, mass: '≈ 1,232', excited: true, note: 'an excited resonance — real, but it decays in ~10⁻²⁴ s' }
    if (nu === 2) return { state: 'ok', name: 'Proton (p⁺)', charge: sum, mass: '938.3' }
    if (nu === 1) return { state: 'ok', name: 'Neutron (n⁰)', charge: sum, mass: '939.6' }
    return { state: 'ok', name: 'Δ⁻ (Delta-minus)', charge: sum, mass: '≈ 1,232', excited: true, note: 'an excited resonance — real, but it decays in ~10⁻²⁴ s' }
  }
  const anti = picks.filter((k) => k === 'au' || k === 'ad').length
  if (anti !== 1) return { state: 'error', error: 'A meson is one quark + one antiquark (e.g. u + d̄).' }
  const hasU = picks.includes('u'), hasD = picks.includes('d')
  if (hasU && picks.includes('ad')) return { state: 'ok', name: 'Pion π⁺', charge: sum, mass: '139.6' }
  if (hasD && picks.includes('au')) return { state: 'ok', name: 'Pion π⁻', charge: sum, mass: '139.6' }
  return { state: 'ok', name: 'Pion π⁰', charge: sum, mass: '135.0', note: 'uū and dd̄ both work — π⁰ is a quantum mix' }
}

export function QuarkBuilderSim() {
  const [mode, setMode] = useState<Mode>('baryon')
  const [picks, setPicks] = useState<QKind[]>([])
  const [stage, setStage] = useState(0) // challenge step: 0 = neutron, 1 = π⁺, 2 = done
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [msg, setMsg] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const target = mode === 'baryon' ? 3 : 2
  const verdict = detect(picks, mode)
  const total = picks.reduce((acc, k) => acc + QDATA[k].charge, 0)

  const pick = (kind: QKind) => {
    const next = picks.length >= target ? [kind] : [...picks, kind]
    setPicks(next)
    if (next.length < target) return
    const v = detect(next, mode)
    if (v.state !== 'ok' || challenge !== 'active') { if (v.state === 'error') setMsg(v.error); else if (challenge !== 'active') setMsg(''); return }
    if (stage === 0 && v.name.startsWith('Neutron')) {
      setStage(1)
      setMsg('★ Step 1 done — neutron (udd, charge 0) built! Step 2: switch to Meson mode and build π⁺ (u + anti-d).')
    } else if (stage === 1 && v.name.startsWith('Pion π⁺')) {
      setStage(2)
      setChallenge('won')
      beep(660, 120); beep(880, 160)
      setMsg('★ Both built! Proton uud (+1), neutron udd (0), π⁺ u d̄ (+1) — every legal combo sums to a whole charge.')
    } else {
      setMsg(stage === 0 ? 'Not the target yet — a neutron needs u + d + d in Baryon mode.' : 'Close! π⁺ needs u + anti-d in Meson mode (switch the mode selector). Progress is kept.')
    }
  }

  const startChallenge = () => {
    setChallenge('active')
    setStage(0)
    setMode('baryon')
    setPicks([])
    setMsg('Step 1: build a NEUTRON — Baryon mode, pick u + d + d. Then I will ask for a π⁺.')
  }

  const reset = () => {
    setMode('baryon'); setPicks([]); setStage(0); setChallenge('idle'); setMsg('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t, _dt) => {
    const cx = Math.max(150, w * 0.27)
    const cy = 190

    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-sans-serif, system-ui'
    ctx.textAlign = 'left'
    ctx.fillText(mode === 'baryon' ? 'Baryon mode · pick 3 quarks' : 'Meson mode · pick 1 quark + 1 antiquark', 20, 26)
    ctx.textAlign = 'right'
    ctx.fillText('colour-neutral line-ups only!', w - 20, 26)

    // ── composite zone: slots + quark balls ───────────────────────────────────
    const slots = mode === 'baryon'
      ? [0, 1, 2].map((i) => ({ x: cx + 46 * Math.cos((-90 + i * 120) * Math.PI / 180), y: cy + 46 * Math.sin((-90 + i * 120) * Math.PI / 180) }))
      : [{ x: cx - 52, y: cy }, { x: cx + 52, y: cy }]
    ctx.setLineDash([6, 5])
    ctx.strokeStyle = 'rgba(250,250,249,0.3)'; ctx.lineWidth = 2
    if (mode === 'baryon') {
      ctx.beginPath(); ctx.arc(cx, cy, 88, 0, Math.PI * 2); ctx.stroke()
    } else {
      ctx.beginPath(); ctx.moveTo(slots[0].x - 30, cy - 30); ctx.lineTo(slots[1].x + 30, cy - 30)
      ctx.lineTo(slots[1].x + 30, cy + 30); ctx.lineTo(slots[0].x - 30, cy + 30); ctx.closePath(); ctx.stroke()
    }
    ctx.setLineDash([])

    picks.forEach((k, i) => {
      const q = QDATA[k]
      const s = slots[i]
      // gentle pulse (skipped under reduced motion)
      const pr = 27 + (reducedMotion ? 0 : Math.sin(t * 3 + i) * 1.2)
      ctx.fillStyle = q.color
      ctx.beginPath(); ctx.arc(s.x, s.y, pr, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(s.x, s.y, pr, 0, Math.PI * 2); ctx.stroke()
      ctx.fillStyle = CANVAS.bg
      ctx.font = 'bold 16px ui-monospace, monospace'; ctx.textAlign = 'center'
      ctx.fillText(q.label, s.x, s.y + 2)
      ctx.fillStyle = CANVAS.fg
      ctx.font = '10px ui-monospace, monospace'
      ctx.fillText(fmtCharge(q.charge), s.x, s.y + pr + 14)
    })
    for (let i = picks.length; i < slots.length; i++) {
      ctx.strokeStyle = 'rgba(168,162,158,0.5)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(slots[i].x, slots[i].y, 27, 0, Math.PI * 2); ctx.stroke()
      ctx.setLineDash([])
    }
    ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText(`${picks.length} / ${target} quarks`, cx, cy + (mode === 'baryon' ? 122 : 58))

    // ── charge ledger (right) ─────────────────────────────────────────────────
    const lx = w * 0.56, rx = w - 18
    ctx.textAlign = 'left'
    ctx.fillStyle = CANVAS.muted; ctx.font = 'bold 11px ui-sans-serif, system-ui'
    ctx.fillText('CHARGE LEDGER', lx, 66)
    picks.forEach((k, i) => {
      const q = QDATA[k]
      const yy = 92 + i * 30
      ctx.fillStyle = q.color
      ctx.beginPath(); ctx.arc(lx + 6, yy - 4, 6, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 13px ui-monospace, monospace'
      ctx.fillText(`${q.label} ${k.startsWith('a') ? '(anti)' : ''}`.replace('  ', ' '), lx + 20, yy)
      ctx.textAlign = 'right'
      ctx.fillText(fmtCharge(q.charge), rx, yy)
      ctx.textAlign = 'left'
    })
    const ly = 92 + picks.length * 30 + 8
    ctx.strokeStyle = CANVAS.grid; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ly); ctx.stroke()
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 15px ui-monospace, monospace'
    ctx.fillText('TOTAL', lx, ly + 26)
    ctx.textAlign = 'right'
    ctx.fillText(fmtCharge(total), rx, ly + 26)
    ctx.textAlign = 'left'

    // ── verdict block ─────────────────────────────────────────────────────────
    const vy = ly + 62
    if (verdict.state === 'ok') {
      ctx.fillStyle = verdict.excited ? CANVAS.violet : CANVAS.emerald
      ctx.font = 'bold 15px ui-sans-serif, system-ui'
      ctx.fillText(`${verdict.name} · charge ${fmtCharge(verdict.charge)}`, lx, vy)
      ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-monospace, monospace'
      ctx.fillText(`mass ≈ ${verdict.mass} MeV/c²`, lx, vy + 20)
      if (verdict.note) ctx.fillText(verdict.note, lx, vy + 38)
    } else if (verdict.state === 'error') {
      ctx.fillStyle = CANVAS.rose; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText(verdict.error.slice(0, 44), lx, vy)
      ctx.fillText(verdict.error.slice(44), lx, vy + 18)
    } else {
      ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-sans-serif, system-ui'
      ctx.fillText(`Pick ${target - picks.length} more quark${target - picks.length > 1 ? 's' : ''} from the palette…`, lx, vy)
    }

    // ── challenge progress ────────────────────────────────────────────────────
    if (challenge !== 'idle') {
      ctx.textAlign = 'center'
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      if (challenge === 'won') {
        ctx.fillStyle = CANVAS.emerald
        ctx.fillText('★ Neutron + π⁺ both built — quark chemist!', w / 2, h - 14)
      } else {
        ctx.fillStyle = CANVAS.amber
        ctx.fillText(stage === 0 ? 'Step 1/2 — build a NEUTRON (Baryon: u + d + d)' : 'Step 2/2 — build π⁺ (Meson: u + d̄) · switch mode!', w / 2, h - 14)
      }
    }
  }, 380)

  return (
    <SimFrame
      title="Quark Builder"
      brief="Pick quarks from the palette and check the charge ledger: proton uud (+1), neutron udd (0), π⁺ u d̄ (+1) — combos must sum to whole charges."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg"
        style={{ height: 380 }}
        aria-label="A quark composer: chosen quarks appear inside a dashed outline with a running charge ledger on the right"
        role="img"
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimSelect<Mode>
          label="Hadron mode"
          value={mode}
          options={[
            { value: 'baryon', label: 'Baryon · 3 quarks' },
            { value: 'meson', label: 'Meson · quark + antiquark' },
          ]}
          onChange={(v) => { setMode(v); setPicks([]) }}
        />
        <div className="flex flex-wrap gap-2">
          {PALETTE.map((p) => (
            <SimButton key={p.kind} variant="secondary" onClick={() => pick(p.kind)} title={`add ${p.label}`}>
              <Atom className="h-4 w-4 me-1" aria-hidden /> {p.label}
            </SimButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <SimButton variant="ghost" onClick={() => setPicks([])}>
            <Eraser className="h-4 w-4 me-1" aria-hidden /> Clear
          </SimButton>
          <SimButton variant="ghost" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: neutron then π⁺
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Total charge" value={fmtCharge(total)} tone={verdict.state === 'ok' ? 'text-emerald-500' : ''} />
        <Readout label="Detected hadron" value={verdict.state === 'ok' ? verdict.name.split(' ')[0] : '—'} />
        <Readout label="Mass hint" value={verdict.state === 'ok' ? verdict.mass : '—'} unit={verdict.state === 'ok' ? 'MeV/c²' : undefined} />
        <Readout label="Quarks" value={`${picks.length} / ${target}`} />
      </div>

      {msg && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`} role="status">
          {msg}
        </p>
      )}
    </SimFrame>
  )
}
