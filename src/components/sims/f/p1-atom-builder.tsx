// ─── Sim: Atom Builder · stack protons, neutrons & electrons ──────────────────
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, Minus, Plus, RotateCcw } from 'lucide-react'

const ELEMENTS = ['?', 'Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen', 'Fluorine', 'Neon']
const SYMBOLS = ['?', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne']

function elementName(p: number): string {
  return p <= 10 ? ELEMENTS[p] : 'Mystery!'
}
function elementSymbol(p: number): string {
  return p <= 10 ? SYMBOLS[p] : 'X?'
}
function chargeLabel(q: number): string {
  if (q === 0) return 'neutral'
  return q > 0 ? `+${q} ion` : `${q} ion`
}
function stabilityHint(p: number, n: number): { text: string; warn: boolean } {
  if (p === 0 && n === 0) return { text: 'Empty space… add some particles!', warn: false }
  if (p === 0) return { text: 'A lone neutron is unstable — free neutrons decay in about 15 minutes.', warn: true }
  if (p === 1 && n === 0) return { text: 'Plain hydrogen (protium) — stable, and the most common atom in the universe.', warn: false }
  if (p === 6 && n === 8) return { text: 'Carbon-14 is radioactive! It decays with a half-life of 5730 years — the trick behind carbon dating.', warn: true }
  if (n === 0 && p > 1) return { text: 'Protons with no neutrons push each other apart — this nucleus is unstable!', warn: true }
  if (Math.abs(p - n) > 2) return { text: `Too many ${p > n ? 'protons' : 'neutrons'} for the strong force to hold — likely unstable.`, warn: true }
  return { text: 'A stable combination — this nucleus holds together.', warn: false }
}

export function AtomBuilderSim() {
  const [p, setP] = useState(1)
  const [n, setN] = useState(0)
  const [e, setE] = useState(1)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({ p: 1, n: 0, e: 1, challenge: 'idle' as 'idle' | 'active' | 'won' | 'lost' })
  // sync React state into the mutable sim state (never during render)
  useEffect(() => {
    st.current.p = p
    st.current.n = n
    st.current.e = e
    st.current.challenge = challenge
  })

  const skip = useRef(0)

  const { canvasRef } = useSimCanvas((ctx, w, _h, t) => {
    const s = st.current
    const cx = w / 2
    const cy = 165

    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, _h)

    // ── electron shells ──────────────────────────────────────────────────────
    ctx.setLineDash([4, 6])
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.arc(cx, cy, 62, 0, Math.PI * 2); ctx.stroke()
    ctx.beginPath(); ctx.arc(cx, cy, 100, 0, Math.PI * 2); ctx.stroke()
    ctx.setLineDash([])

    const e1 = Math.min(s.e, 2)
    const e2 = Math.min(Math.max(s.e - 2, 0), 8)
    const drawShell = (count: number, radius: number, phase: number) => {
      for (let i = 0; i < count; i++) {
        const a = phase + (i * Math.PI * 2) / count
        const x = cx + radius * Math.cos(a)
        const y = cy + radius * Math.sin(a)
        ctx.fillStyle = CANVAS.teal
        ctx.beginPath(); ctx.arc(x, y, 5.5, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = CANVAS.bg
        ctx.font = 'bold 8px ui-monospace, monospace'
        ctx.textAlign = 'center'
        ctx.fillText('−', x, y + 3)
      }
    }
    drawShell(e1, 62, reducedMotion ? 1.2 : -t * 0.7)
    drawShell(e2, 100, reducedMotion ? 0.3 : -t * 0.4 + 0.6)

    // ── nucleus (phyllotaxis packing of protons + neutrons) ─────────────────
    const particles: ('p' | 'n')[] = []
    const total = s.p + s.n
    let pi = 0, ni = 0
    for (let k = 0; k < total; k++) {
      if (k % 2 === 0 && pi < s.p) { particles.push('p'); pi++ }
      else if (ni < s.n) { particles.push('n'); ni++ }
      else if (pi < s.p) { particles.push('p'); pi++ }
    }
    const scale = total > 9 ? Math.min(1, 5.6 * Math.sqrt(8) / (5.6 * Math.sqrt(Math.max(total - 1, 1)))) : 1
    particles.forEach((kind, k) => {
      const r = k === 0 ? 0 : 6.2 * Math.sqrt(k) * scale
      const a = k * 2.39996
      const x = cx + r * Math.cos(a)
      const y = cy + r * Math.sin(a)
      if (kind === 'p') {
        ctx.fillStyle = CANVAS.red
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = CANVAS.fg
        ctx.font = 'bold 9px ui-monospace, monospace'
        ctx.textAlign = 'center'
        ctx.fillText('+', x, y + 3.5)
      } else {
        ctx.fillStyle = CANVAS.muted
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill()
      }
    })

    // ── labels ───────────────────────────────────────────────────────────────
    const A = s.p + s.n
    const q = s.p - s.e
    ctx.fillStyle = CANVAS.fg
    ctx.font = 'bold 17px ui-sans-serif, system-ui'
    ctx.textAlign = 'center'
    ctx.fillText(s.p > 0 ? `${elementName(s.p)} (${elementSymbol(s.p)})` : 'Nothing yet…', cx, 26)
    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-monospace, monospace'
    ctx.fillText(`A = ${s.p} + ${s.n} = ${A}   ·   charge = ${s.p} − ${s.e} = ${q >= 0 ? '+' + q : q}`, cx, 46)

    const hint = stabilityHint(s.p, s.n)
    ctx.fillStyle = s.p > 0 ? CANVAS.teal : CANVAS.muted
    ctx.font = 'bold 13px ui-sans-serif, system-ui'
    ctx.fillText(s.p > 0 ? `${elementName(s.p)}-${A}` : '—', cx, 306)
    ctx.fillStyle = hint.warn ? CANVAS.amber : CANVAS.emerald
    ctx.font = '11px ui-sans-serif, system-ui'
    ctx.fillText(hint.text, cx, 330)

    // challenge auto-detect (neutral helium)
    skip.current += 1
    if (skip.current >= 10) {
      skip.current = 0
      if (s.challenge === 'active' && s.p === 2 && s.e === 2) {
        s.challenge = 'won'
        setChallenge('won')
        beep(660, 140); beep(880, 180)
        setResult(`★ Neutral helium built — 2 protons and 2 electrons balance out. Add 2 neutrons too and you get helium-4, the kind the Sun fuses!`)
      }
    }
  })

  const counter = (label: string, value: number, set: (v: number) => void) => (
    <div className="flex items-center gap-1.5" key={label}>
      <span className="text-xs font-medium text-muted-foreground w-[74px]">{label}</span>
      <SimButton variant="outline" onClick={() => set(Math.max(0, value - 1))} title={`remove one ${label.toLowerCase()}`}>
        <Minus className="h-4 w-4" aria-hidden />
      </SimButton>
      <span className="w-6 text-center font-mono font-semibold tabular-nums">{value}</span>
      <SimButton variant="outline" onClick={() => set(Math.min(10, value + 1))} title={`add one ${label.toLowerCase()}`}>
        <Plus className="h-4 w-4" aria-hidden />
      </SimButton>
    </div>
  )

  const startChallenge = () => {
    if (p === 2 && e === 2) {
      setChallenge('won')
      beep(660, 140); beep(880, 180)
      setResult('★ Neutral helium — 2 protons and 2 electrons balance out to charge 0.')
      return
    }
    setChallenge('active')
    setResult(`Right now that is ${p > 0 ? `${elementName(p)}-${p + n}` : 'nothing'} with charge ${chargeLabel(p - e)}. You need exactly 2 protons and 2 electrons — tune the counters!`)
  }

  const A = p + n
  const q = p - e

  return (
    <SimFrame
      title="Atom Builder"
      brief="Add or remove protons, neutrons and electrons — watch the element, the charge and the isotope name change live."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg"
        style={{ height: 380 }}
        aria-label="Atom builder: a nucleus of red protons and grey neutrons with teal electrons orbiting in shells, labelled with element name, mass number and charge"
        role="img"
      />

      <div className="flex flex-wrap items-center gap-3">
        {counter('Protons +', p, setP)}
        {counter('Neutrons 0', n, setN)}
        {counter('Electrons −', e, setE)}
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimButton variant="outline" onClick={startChallenge}>
          <Flag className="h-4 w-4 mr-1" aria-hidden /> Challenge: build neutral helium
        </SimButton>
        <SimButton
          variant="secondary"
          onClick={() => { setP(6); setN(6); setE(6); setChallenge('idle'); setResult('') }}
        >
          Try carbon-12
        </SimButton>
        <SimButton variant="ghost" onClick={() => { setP(1); setN(0); setE(1); setChallenge('idle'); setResult('') }}>
          <RotateCcw className="h-4 w-4 mr-1" aria-hidden /> Reset
        </SimButton>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Element" value={p > 0 ? elementName(p) : '—'} tone="text-emerald-500" />
        <Readout label="Isotope" value={p > 0 ? `${elementName(p)}-${A}` : '—'} />
        <Readout label="Mass number A" value={`${A}`} unit="u" />
        <Readout label="Charge" value={chargeLabel(q)} tone={q === 0 ? 'text-emerald-500' : 'text-amber-500'} />
        <Readout label="Electrons" value={`${e}`} />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
