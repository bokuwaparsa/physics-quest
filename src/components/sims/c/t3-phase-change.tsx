// ─── Sim: Phase Change · heat ice into steam, find the flat plateaus ─────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, Pause, Play, RotateCcw } from 'lucide-react'

const M = 0.5               // kg of ice
const C_ICE = 2100          // J/(kg·°C)
const C_WATER = 4186        // J/(kg·°C)
const L_F = 334000          // J/kg
const L_V = 2260000         // J/kg
const E1 = M * C_ICE * 20            // warm ice −20 → 0 °C: 21,000 J
const E2 = E1 + M * L_F              // melt: 188,000 J
const E3 = E2 + M * C_WATER * 100    // warm water 0 → 100 °C: 397,300 J
const E4 = E3 + M * L_V              // boil away: 1,527,300 J
const SPEED = 40            // time compression

const tempAt = (E: number): number => {
  if (E < E1) return -20 + (E / E1) * 20
  if (E < E2) return 0
  if (E < E3) return ((E - E2) / (E3 - E2)) * 100
  return 100
}
const stateAt = (E: number): string => {
  if (E <= 0) return 'Solid — ready'
  if (E < E1) return 'Solid (warming)'
  if (E < E2) return 'MELTING — plateau'
  if (E < E3) return 'Liquid (warming)'
  if (E < E4) return 'BOILING — plateau'
  return 'GAS — all boiled away'
}
const shortState = (E: number): string => {
  if (E < E1) return 'Solid'
  if (E < E2) return 'Melting'
  if (E < E3) return 'Liquid'
  if (E < E4) return 'Boiling'
  return 'Gas'
}
const freedomAt = (E: number): number => {
  if (E < E1) return 0
  if (E < E2) return 0.5 * ((E - E1) / (E2 - E1))
  if (E < E3) return 0.5
  if (E < E4) return 0.5 + 0.5 * ((E - E3) / (E4 - E3))
  return 1
}

export function PhaseChangeSim() {
  const [power, setPower] = useState(1500)
  const [running, setRunning] = useState(false)
  const [challenge, setChallenge] = useState<'idle' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [answer, setAnswer] = useState('')
  const [temp, setTemp] = useState(-20)
  const [energyKJ, setEnergyKJ] = useState(0)
  const [simT, setSimT] = useState(0)
  const [label, setLabel] = useState('Solid')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({
    E: 0, simT: 0, lastSample: -1,
    hist: [] as { t: number; T: number }[],
    skip: 0,
    lat: new Array<{ x: number; y: number }>(16).fill({ x: 0, y: 0 }).map((_, i) => ({ x: 16 + (i % 4) * 30, y: 16 + Math.floor(i / 4) * 20 })),
    sca: new Array<{ x: number; y: number }>(16).fill({ x: 0, y: 0 }).map(() => ({ x: 12 + Math.random() * 104, y: 12 + Math.random() * 66 })),
    ph: new Array<number>(16).fill(0).map(() => Math.random() * 6.28),
  })

  const reset = () => {
    const s = st.current
    s.E = 0; s.simT = 0; s.lastSample = -1; s.hist = []
    setRunning(false)
    setTemp(-20); setEnergyKJ(0); setSimT(0); setLabel('Solid')
  }

  const checkAnswer = () => {
    const v = parseFloat(answer)
    if (Number.isFinite(v) && Math.abs(v - 100) <= 0.5) {
      beep(660, 120); beep(880, 160)
      setChallenge('won')
      setResult('Correct — 100 °C! While boiling, every joule goes into turning liquid into gas, so the thermometer refuses to budge until the pot is dry.')
    } else {
      setChallenge('lost')
      setResult('Not quite. Start the heater and watch the graph: it goes flat twice. The second flat stretch is boiling — at what temperature does it sit?')
    }
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t, dt) => {
    const s = st.current

    // ── physics (40× time compression) ──────────────────────────────────────
    if (running && s.E < E4) {
      s.E = Math.min(E4, s.E + power * SPEED * dt)
      s.simT = s.E / power
      if (s.lastSample < 0 || s.simT - s.lastSample >= 0.5) {
        s.hist.push({ t: s.simT, T: tempAt(s.E) })
        s.lastSample = s.simT
        if (s.hist.length > 4000) s.hist.shift()
      }
      if (s.E >= E4) setRunning(false)
    }
    // publish readouts ~10×/s
    s.skip += 1
    if (s.skip >= 6) {
      s.skip = 0
      setTemp(tempAt(s.E))
      setEnergyKJ(s.E / 1000)
      setSimT(s.simT)
      setLabel(shortState(s.E))
    }

    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    // ── scene: pot on a stove ───────────────────────────────────────────────
    const potX0 = 48, potX1 = 162, potTop = 222, potBottom = 306
    // flame
    if (running) {
      const fh = 8 + 14 * (power / 3000) * (reducedMotion ? 1 : 1 + 0.2 * Math.sin(t * 11))
      for (let j = 0; j < 3; j++) {
        const fx = 70 + j * 35
        ctx.fillStyle = j === 1 ? CANVAS.amber : CANVAS.orange
        ctx.beginPath()
        ctx.moveTo(fx - 8, 318)
        ctx.lineTo(fx, 318 - fh - (j === 1 ? 6 : 0))
        ctx.lineTo(fx + 8, 318)
        ctx.closePath(); ctx.fill()
      }
    }
    // stove
    ctx.fillStyle = CANVAS.panelLight
    ctx.fillRect(36, 318, 138, 10)
    // water level
    let lvl = 0
    if (s.E >= E1) {
      if (s.E < E2) lvl = 70 * ((s.E - E1) / (E2 - E1))
      else if (s.E < E4) lvl = 70 * ((E4 - s.E) / (E4 - E2))
      else lvl = 0
    }
    if (lvl > 1) {
      ctx.fillStyle = CANVAS.teal
      ctx.globalAlpha = 0.6
      ctx.fillRect(potX0 + 3, potBottom - lvl, potX1 - potX0 - 6, lvl - 2)
      ctx.globalAlpha = 1
    }
    // ice chunk
    if (s.E < E2) {
      const iceFrac = s.E < E1 ? 1 : 1 - (s.E - E1) / (E2 - E1)
      const isz = 10 + 30 * iceFrac
      const iy = lvl > 4 ? potBottom - lvl - isz + 6 : potBottom - isz
      ctx.fillStyle = '#bfdbfe'
      ctx.fillRect(105 - isz / 2, iy, isz, isz)
      ctx.strokeStyle = CANVAS.white; ctx.lineWidth = 1.5
      ctx.strokeRect(105 - isz / 2, iy, isz, isz)
    }
    // pot
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(potX0, potTop, potX1 - potX0, potBottom - potTop)
    ctx.strokeStyle = CANVAS.white; ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(potX0, potTop); ctx.lineTo(potX0, potBottom); ctx.lineTo(potX1, potBottom); ctx.lineTo(potX1, potTop)
    ctx.stroke()
    // steam
    if (s.E >= E3) {
      ctx.strokeStyle = 'rgba(250,250,249,0.5)'; ctx.lineWidth = 2
      for (let i = 0; i < 3; i++) {
        const sxp = 72 + i * 33
        const wob = reducedMotion ? 0 : 6 * Math.sin(t * 2 + i * 1.4)
        ctx.beginPath()
        ctx.moveTo(sxp, potTop - 8)
        ctx.quadraticCurveTo(sxp + wob, potTop - 30, sxp + wob * 0.5, potTop - 52)
        ctx.stroke()
      }
    }
    // state label
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 13px ui-sans-serif, system-ui'; ctx.textAlign = 'center'
    ctx.fillText(stateAt(s.E), 105, 40)
    ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-monospace, monospace'
    ctx.fillText(`${tempAt(s.E).toFixed(0)} °C`, 105, 62)
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
    ctx.fillText(`E = ${(s.E / 1000).toFixed(0)} kJ`, 105, 348)
    ctx.fillText(`P = ${power} W · 40× speed`, 105, 366)

    // ── graph ───────────────────────────────────────────────────────────────
    const gx0 = 216, gx1 = w - 24, gy0 = 44, gy1 = 336
    const tMax = Math.max(20, s.simT * 1.08)
    const toGX = (tt: number) => gx0 + (tt / tMax) * (gx1 - gx0)
    const toGY = (T: number) => gy1 - ((T + 30) / 160) * (gy1 - gy0)
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(gx0, gy0, gx1 - gx0, gy1 - gy0)
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.strokeRect(gx0, gy0, gx1 - gx0, gy1 - gy0)
    // plateau guides
    ctx.setLineDash([5, 5])
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1.5
    for (const T of [0, 100]) {
      ctx.beginPath(); ctx.moveTo(gx0, toGY(T)); ctx.lineTo(gx1, toGY(T)); ctx.stroke()
    }
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'left'
    ctx.fillText('100 °C — boiling', gx0 + 8, toGY(100) - 6)
    ctx.fillText('0 °C — melting', gx0 + 8, toGY(0) - 6)
    ctx.fillText('temperature (°C) ↑', gx0 + 8, gy0 + 14)
    ctx.textAlign = 'center'
    for (let i = 0; i <= 5; i++) {
      const v = (tMax * i) / 5
      ctx.fillStyle = CANVAS.muted
      ctx.fillText(`${Math.round(v)}`, toGX(v), gy1 + 14)
    }
    ctx.fillText('time (s)', (gx0 + gx1) / 2, gy1 + 28)
    // curve
    ctx.strokeStyle = CANVAS.amber; ctx.lineWidth = 2.5
    ctx.beginPath()
    s.hist.forEach((p, i) => {
      const x = toGX(p.t), y = toGY(p.T)
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    })
    ctx.stroke()
    ctx.fillStyle = CANVAS.amber
    ctx.beginPath(); ctx.arc(toGX(s.simT), toGY(tempAt(s.E)), 4, 0, Math.PI * 2); ctx.fill()

    // ── particle inset ──────────────────────────────────────────────────────
    const ibx = gx1 - 140, iby = gy0 + 10
    ctx.fillStyle = CANVAS.panelLight
    ctx.fillRect(ibx, iby, 128, 90)
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1.5
    ctx.strokeRect(ibx, iby, 128, 90)
    const f = freedomAt(s.E)
    for (let i = 0; i < 16; i++) {
      const spread = Math.max(0, (f - 0.5) / 0.5)
      const bx = s.lat[i].x + (s.sca[i].x - s.lat[i].x) * spread
      const by = s.lat[i].y + (s.sca[i].y - s.lat[i].y) * spread
      const amp = f <= 0.5 ? 1.2 + f * 5 : 5 + f * 7
      const jx = reducedMotion ? 0 : Math.sin(t * (2 + f * 8) + s.ph[i]) * amp
      const jy = reducedMotion ? 0 : Math.cos(t * (2.3 + f * 8) + s.ph[i] * 1.9) * amp
      const px = Math.min(120, Math.max(8, bx + jx))
      const py = Math.min(82, Math.max(8, by + jy))
      ctx.fillStyle = f < 0.45 ? '#bfdbfe' : f < 0.55 ? CANVAS.teal : 'rgba(226,232,240,0.85)'
      ctx.beginPath()
      ctx.arc(ibx + px, iby + py, f < 0.45 ? 3.2 : f < 0.55 ? 3.6 : 2.6, 0, Math.PI * 2)
      ctx.fill()
    }

    // challenge banner
    if (challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('★ Challenge complete!', w / 2, 18)
    } else if (challenge === 'lost') {
      ctx.fillStyle = CANVAS.rose; ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText('Not quite — watch the second flat spot!', w / 2, 18)
    }
  }, 400)

  return (
    <SimFrame
      title="Phase Change Lab"
      brief="Half a kilogram of ice on a stove. Press Start and watch the temperature–time graph climb, flatten at 0 °C while it melts, then flatten again at 100 °C while it boils."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="Ice melting in a pot on a stove with a live temperature–time graph and a particle inset"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Heating power" value={power} min={500} max={3000} step={100} unit="W" onChange={setPower} />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={() => setRunning((r) => !r)} disabled={st.current.E >= E4}>
            {running ? <Pause className="h-4 w-4 me-1" aria-hidden /> : <Play className="h-4 w-4 me-1" aria-hidden />}
            {running ? 'Pause' : 'Start'}
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Challenge: at what temperature does the second plateau appear?</span>
        <input
          type="number"
          inputMode="numeric"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          aria-label="Your predicted plateau temperature in degrees Celsius"
          placeholder="°C"
          className="h-8 w-24 rounded-md border bg-background px-2 text-sm"
        />
        <SimButton variant="outline" onClick={checkAnswer}>
          <Flag className="h-4 w-4 me-1" aria-hidden /> Check answer
        </SimButton>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Temperature" value={temp.toFixed(0)} unit="°C" tone="text-amber-500" />
        <Readout label="State" value={label} />
        <Readout label="Energy added" value={energyKJ.toFixed(0)} unit="kJ" tone="text-orange-500" />
        <Readout label="Heating time" value={simT.toFixed(0)} unit="s" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
