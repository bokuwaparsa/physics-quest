// ─── Sim: Unit Lab · read a length on the ruler, convert between mm, cm, m ────
'use client'

import { useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSelect, Readout, useSimCanvas, useSimBeep,
} from '@/components/sims/sim-kit'
import { useI18n } from '@/lib/game/i18n'
import { Flag, RotateCcw } from 'lucide-react'

type ObjId = 'pencil' | 'book' | 'rope'

const OBJECTS: { value: ObjId; label: string; name: string; cm: number; span: number }[] = [
  { value: 'pencil', label: 'Pencil · 14 cm', name: 'pencil', cm: 14, span: 16 },
  { value: 'book', label: 'Book · 24 cm', name: 'book', cm: 24, span: 26 },
  { value: 'rope', label: 'Rope · 1.85 m', name: 'rope', cm: 185, span: 200 },
]

const UNITS = ['mm', 'cm', 'm'] as const
type Unit = (typeof UNITS)[number]

const toUnit = (cm: number, u: Unit) => (u === 'mm' ? cm * 10 : u === 'cm' ? cm : cm / 100)

/** Compact, comma-grouped value for option labels ("1,850", "0.185"). */
const fmtVal = (v: number) => {
  const s = Math.abs(v) >= 1 ? v.toFixed(2) : v.toFixed(4)
  const trimmed = s.replace(/\.?0+$/, '')
  return Number(trimmed).toLocaleString('en-US', { maximumFractionDigits: 4 })
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface ChallengeData {
  objName: string
  fromLabel: string
  targetUnit: Unit
  correctLabel: string
  options: string[]
}

export function UnitLabSim() {
  const [objId, setObjId] = useState<ObjId>('pencil')
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [cData, setCData] = useState<ChallengeData | null>(null)
  const [chosen, setChosen] = useState('')
  const [result, setResult] = useState('')

  const beep = useSimBeep()
  const { simT } = useI18n()

  const obj = OBJECTS.find((o) => o.value === objId) ?? OBJECTS[0]
  const lenCm = obj.cm

  const fill = (s: string, vars: Record<string, string | number>) => {
    let out = s
    for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(String(v))
    return out
  }

  const startChallenge = () => {
    const o = OBJECTS[Math.floor(Math.random() * OBJECTS.length)]
    const u = UNITS[Math.floor(Math.random() * UNITS.length)]
    const correct = toUnit(o.cm, u)
    const pool = [correct * 10, correct / 10, correct * 100, correct / 100]
    const distractors: number[] = []
    for (const c of pool) {
      if (distractors.length >= 3) break
      if (Math.abs(c - correct) > 1e-9 && !distractors.some((d) => Math.abs(d - c) < 1e-9)) distractors.push(c)
    }
    const labels = shuffle([correct, ...distractors]).map((v) => `${fmtVal(v)} ${u}`)
    const natural = o.cm >= 100 ? `${fmtVal(o.cm / 100)} m` : `${o.cm} cm`
    setCData({
      objName: o.name,
      fromLabel: natural,
      targetUnit: u,
      correctLabel: `${fmtVal(correct)} ${u}`,
      options: labels,
    })
    setChosen('')
    setResult('')
    setChallenge('active')
  }

  const evaluate = (pick: string) => {
    const c = cData
    if (!c) return
    const ok = pick === c.correctLabel
    if (ok) { beep(660, 120); beep(880, 160) }
    setChallenge(ok ? 'won' : 'lost')
    setResult(ok
      ? fill(simT('Correct! {a} {fu} = {b} {tu} — same length, different unit.'),
          { a: c.fromLabel.split(' ')[0], fu: c.fromLabel.split(' ')[1], b: c.correctLabel.split(' ')[0], tu: c.targetUnit })
      : fill(simT('Not quite: {a} {fu} = {b} {tu}. You picked {c} {tu}.'),
          { a: c.fromLabel.split(' ')[0], fu: c.fromLabel.split(' ')[1], b: c.correctLabel.split(' ')[0], tu: c.targetUnit, c: pick }))
  }

  const onPick = (v: string) => {
    if (v === 'none') return
    setChosen(v)
    if (challenge === 'active' || challenge === 'lost') evaluate(v)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h) => {
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const x0 = 60
    const pxPerCm = (w - 120) / obj.span
    const xEnd = x0 + lenCm * pxPerCm
    const rulerY = h - 120

    // ── challenge banner ────────────────────────────────────────────────────
    ctx.textAlign = 'center'
    if (challenge === 'active' && cData) {
      ctx.fillStyle = CANVAS.amber
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText(`Challenge: report the ${cData.objName} length in ${cData.targetUnit}!`, w / 2, 20)
    } else if (challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Challenge complete!', w / 2, 20)
    } else if (challenge === 'lost') {
      ctx.fillStyle = CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('Watch the powers of ten — try again!', w / 2, 20)
    }

    // ── the object (drawn to scale, left end at the 0 mark) ─────────────────
    const objY = h - 235
    if (objId === 'pencil') {
      ctx.fillStyle = CANVAS.rose
      ctx.fillRect(x0, objY - 6, 8, 12)
      ctx.fillStyle = CANVAS.orange
      ctx.fillRect(x0 + 8, objY - 6, Math.max(2, xEnd - x0 - 24), 12)
      ctx.fillStyle = CANVAS.white
      ctx.beginPath()
      ctx.moveTo(xEnd - 16, objY - 6)
      ctx.lineTo(xEnd, objY)
      ctx.lineTo(xEnd - 16, objY + 6)
      ctx.closePath(); ctx.fill()
    } else if (objId === 'book') {
      ctx.fillStyle = CANVAS.violet
      ctx.fillRect(x0, objY - 14, xEnd - x0, 28)
      ctx.fillStyle = CANVAS.white
      ctx.fillRect(x0 + 4, objY - 10, xEnd - x0 - 8, 4)
      ctx.fillRect(x0 + 4, objY + 6, xEnd - x0 - 8, 4)
      ctx.fillStyle = CANVAS.bg
      ctx.fillRect(x0 + 10, objY - 4, Math.min(40, (xEnd - x0) * 0.3), 8)
    } else {
      ctx.strokeStyle = CANVAS.teal
      ctx.lineWidth = 4
      ctx.beginPath()
      for (let x = x0; x <= xEnd; x += 2) {
        const y = objY + Math.sin((x - x0) / 22) * 7
        if (x === x0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.lineWidth = 1
    }

    // ── dimension line with the measured length ────────────────────────────
    const dimY = objY + 44
    ctx.strokeStyle = CANVAS.fg
    ctx.fillStyle = CANVAS.fg
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(x0, dimY); ctx.lineTo(xEnd, dimY); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x0, dimY); ctx.lineTo(x0 + 7, dimY - 4); ctx.lineTo(x0 + 7, dimY + 4); ctx.closePath(); ctx.fill()
    ctx.beginPath(); ctx.moveTo(xEnd, dimY); ctx.lineTo(xEnd - 7, dimY - 4); ctx.lineTo(xEnd - 7, dimY + 4); ctx.closePath(); ctx.fill()
    ctx.font = 'bold 12px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText(obj.cm >= 100 ? `${fmtVal(obj.cm / 100)} m` : `${obj.cm} cm`, (x0 + xEnd) / 2, dimY - 8)

    // dashed guides down to the ruler
    ctx.strokeStyle = CANVAS.muted
    ctx.setLineDash([4, 4])
    ctx.beginPath(); ctx.moveTo(x0, dimY); ctx.lineTo(x0, rulerY); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(xEnd, dimY); ctx.lineTo(xEnd, rulerY); ctx.stroke()
    ctx.setLineDash([])

    // ── the ruler ───────────────────────────────────────────────────────────
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(x0 - 14, rulerY); ctx.lineTo(xEnd + 14, rulerY); ctx.stroke()
    const minor = pxPerCm >= 6 ? 1 : 5
    const medium = minor * 5
    const major = medium * 2
    const labelStep = pxPerCm >= 12 ? medium : major
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    for (let c = 0; c <= obj.span; c += minor) {
      const x = Math.round(x0 + c * pxPerCm) + 0.5
      const isMed = c % medium === 0
      const isMaj = c % major === 0
      ctx.strokeStyle = isMaj ? CANVAS.white : CANVAS.muted
      ctx.lineWidth = isMaj ? 2 : 1
      const tick = isMaj ? 16 : isMed ? 11 : 6
      ctx.beginPath(); ctx.moveTo(x, rulerY); ctx.lineTo(x, rulerY - tick); ctx.stroke()
      if (isMaj && pxPerCm >= 20) {
        // millimetre sub-ticks when zoomed in enough
        ctx.strokeStyle = CANVAS.muted
        ctx.lineWidth = 1
        for (let mm = 1; mm < 10; mm++) {
          const xm = Math.round(x0 + (c * 10 + mm) * pxPerCm / 10) + 0.5
          if (xm < xEnd + 14) {
            ctx.beginPath(); ctx.moveTo(xm, rulerY); ctx.lineTo(xm, rulerY - 4); ctx.stroke()
          }
        }
      }
      if (c % labelStep === 0) {
        ctx.fillStyle = CANVAS.muted
        ctx.fillText(`${c}`, x, rulerY + 16)
      }
    }
    ctx.fillStyle = CANVAS.muted
    ctx.font = '10px ui-monospace, monospace'
    ctx.fillText('ruler (cm)', x0 - 26, rulerY + 16)
  }, 400)

  const readM = lenCm / 100
  const readMm = lenCm * 10

  return (
    <SimFrame
      title="Unit Lab"
      brief="Pick an object, read its length on the ruler, then convert between mm, cm and m."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A pencil, book or rope drawn to scale above a centimetre ruler, with its length shown in centimetres, metres and millimetres"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSelect
          label="Object" value={objId}
          options={OBJECTS.map((o) => ({ value: o.value, label: o.label }))}
          onChange={setObjId}
        />
        {challenge !== 'idle' && cData && (
          <SimSelect
            label="Your answer" value={chosen || 'none'}
            options={[
              { value: 'none', label: 'Choose an answer' },
              ...cData.options.map((o) => ({ value: o, label: o })),
            ]}
            onChange={onPick}
          />
        )}
        <div className="flex flex-wrap gap-2">
          <SimButton
            variant="secondary"
            onClick={() => { setChallenge('idle'); setCData(null); setChosen(''); setResult('') }}
          >
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: convert it
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Length" value={`${lenCm}`} unit="cm" />
        <Readout label="Length" value={`${readM}`} unit="m" tone="text-teal-500" />
        <Readout label="Length" value={`${readMm}`} unit="mm" tone="text-violet-500" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
