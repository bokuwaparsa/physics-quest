// ─── Sim: Heat Transfer · conduction along a rod, convection & a heat lamp ───
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimToggle, SimSelect, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

type MatId = 'copper' | 'steel' | 'wood'

const MATS: { value: MatId; label: string; k: number; lam: number; tau: number }[] = [
  { value: 'copper', label: 'Copper · k ≈ 400', k: 400, lam: 0.25, tau: 2.5 },
  { value: 'steel', label: 'Steel · k ≈ 50', k: 50, lam: 0.1, tau: 6 },
  { value: 'wood', label: 'Wood · k ≈ 0.1', k: 0.1, lam: 0.03, tau: 20 },
]

const N = 26            // rod segments
const ROD_L = 0.5       // m
const AMB = 20          // °C

const tempColor = (T: number) => {
  const f = Math.min(1, Math.max(0, (T - 20) / 300))
  return `hsl(${Math.round(220 - 212 * f)}, 78%, ${Math.round(40 + 22 * f)}%)`
}

export function HeatTransferSim() {
  const [matId, setMatId] = useState<MatId>('steel')
  const [power, setPower] = useState(80)
  const [burnerOn, setBurnerOn] = useState(false)
  const [lampOn, setLampOn] = useState(false)
  const [lampI, setLampI] = useState(60)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [result, setResult] = useState('')
  const [farT, setFarT] = useState(AMB)
  const [heatT, setHeatT] = useState(0)

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const mat = MATS.find((m) => m.value === matId) ?? MATS[0]

  const st = useRef({
    temps: new Array<number>(N).fill(AMB),
    heatTime: 0,
    skip: 0,
    ph: new Array<number>(N).fill(0).map(() => Math.random() * 6.28),
  })

  const resetRod = () => {
    st.current.temps = new Array<number>(N).fill(AMB)
    st.current.heatTime = 0
    setHeatT(0)
    setFarT(AMB)
  }

  const reset = () => {
    resetRod()
    setBurnerOn(false)
    setLampOn(false)
    setChallenge('idle')
    setResult('')
  }

  const startChallenge = () => {
    resetRod()
    setBurnerOn(true)
    setLampOn(false)
    setChallenge('active')
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t, dt) => {
    const s = st.current
    const tFlame = 140 + 1.8 * power // burner dial: 176–320 °C, copper always passes the 10 s test

    // ── physics: T(x) relaxes toward steady state, λ per material ──────────
    if (burnerOn) s.heatTime += dt
    for (let i = 0; i < N; i++) {
      const x = ((i + 0.5) / N) * ROD_L
      let target = AMB
      if (burnerOn) target += (tFlame - AMB) * Math.exp(-x / mat.lam)
      if (lampOn) target += lampI * 0.8 * (x / ROD_L) // radiation: ignores the material
      const tau = burnerOn ? mat.tau : 8
      s.temps[i] += (target - s.temps[i]) * (1 - Math.exp(-dt / tau))
    }
    // challenge: far end must exceed 40 °C after 10 s of heating
    if (challenge === 'active' && s.heatTime >= 10) {
      const far = s.temps[N - 1]
      const ok = far > 40
      if (ok) { beep(660, 120); beep(880, 160) }
      setChallenge(ok ? 'won' : 'lost')
      setResult(ok
        ? `After 10 s the far end reads ${far.toFixed(0)} °C — over 40 °C! Copper’s k ≈ 400 W/(m·°C) moves heat along the rod fast.`
        : `After 10 s the far end reads only ${far.toFixed(0)} °C. This material traps heat near the flame — which metal conducts about 8× better than steel?`)
    }

    // publish readouts ~10×/s
    st.current.skip += 1
    if (st.current.skip >= 6) {
      st.current.skip = 0
      setFarT(s.temps[N - 1])
      setHeatT(s.heatTime)
    }

    // ── drawing ─────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const x0 = 90, x1 = w - 170, rodY = 168, rodH = 18
    const cellW = (x1 - x0) / N

    // rod segments
    for (let i = 0; i < N; i++) {
      ctx.fillStyle = tempColor(s.temps[i])
      ctx.fillRect(x0 + i * cellW, rodY, cellW + 0.5, rodH)
    }
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.strokeRect(x0, rodY, x1 - x0, rodH)

    // particles jiggle with temperature
    for (let i = 0; i < N; i++) {
      const T = s.temps[i]
      const amp = ((T - AMB) / 300) * 4.5
      const cx = x0 + (i + 0.5) * cellW
      const px = cx + (reducedMotion ? 0 : Math.cos(t * 3.1 + s.ph[i]) * amp)
      const py = rodY + rodH / 2 + (reducedMotion ? 0 : Math.sin(t * (4 + T / 40) + s.ph[i] * 1.7) * amp)
      ctx.fillStyle = CANVAS.fg
      ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2); ctx.fill()
    }

    // burner under the left end
    ctx.fillStyle = CANVAS.panelLight
    ctx.fillRect(x0 - 26, 236, 52, 8)
    if (burnerOn) {
      for (let j = 0; j < 3; j++) {
        const fx = x0 - 14 + j * 14
        const fl = (j === 1 ? 28 : 20) * (reducedMotion ? 1 : 1 + 0.18 * Math.sin(t * 12 + j * 2))
        ctx.fillStyle = j === 1 ? CANVAS.amber : CANVAS.orange
        ctx.beginPath()
        ctx.moveTo(fx - 6, 236)
        ctx.lineTo(fx, 236 - fl)
        ctx.lineTo(fx + 6, 236)
        ctx.closePath(); ctx.fill()
      }
    }
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText(burnerOn ? `flame ${tFlame.toFixed(0)} °C` : 'burner off', x0, 262)

    // heat lamp (radiation)
    const lampX = x1 - 20, lampY = 58
    ctx.fillStyle = CANVAS.violet
    ctx.beginPath(); ctx.arc(lampX, lampY, 16, Math.PI, 0); ctx.fill()
    ctx.fillRect(lampX - 16, lampY, 32, 5)
    if (lampOn) {
      ctx.strokeStyle = CANVAS.yellow; ctx.lineWidth = 2
      ctx.setLineDash([7, 7])
      if (!reducedMotion) ctx.lineDashOffset = -t * 36
      for (let j = -1; j <= 1; j++) {
        ctx.beginPath()
        ctx.moveTo(lampX + j * 10, lampY + 8)
        ctx.quadraticCurveTo(lampX + j * 30, (lampY + rodY) / 2 + j * 14, x1 - 26, rodY + rodH / 2 + j * 10)
        ctx.stroke()
      }
      ctx.setLineDash([])
      ctx.fillStyle = CANVAS.yellow; ctx.globalAlpha = 0.3
      ctx.beginPath(); ctx.arc(x1 - 26, rodY + rodH / 2, 10, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1
      ctx.fillStyle = CANVAS.yellow; ctx.font = '10px ui-monospace, monospace'
      ctx.fillText('radiation — works through air!', lampX, 30)
    }

    // far-end thermometer
    const thX = x1 + 26
    ctx.fillStyle = CANVAS.panelLight
    ctx.fillRect(thX - 4, 130, 8, 96)
    ctx.beginPath(); ctx.arc(thX, 234, 8, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = tempColor(s.temps[N - 1])
    const fFrac = Math.min(1, Math.max(0, (s.temps[N - 1] - AMB) / 300))
    ctx.fillRect(thX - 2, 130 + 96 * (1 - fFrac), 4, 96 * fFrac)
    ctx.beginPath(); ctx.arc(thX, 234, 6, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1.5
    ctx.strokeRect(thX - 4, 130, 8, 96)
    ctx.beginPath(); ctx.arc(thX, 234, 8, 0, Math.PI * 2); ctx.stroke()
    ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 11px ui-monospace, monospace'; ctx.textAlign = 'center'
    ctx.fillText(`${s.temps[N - 1].toFixed(0)} °C`, thX, 120)

    // convection beaker (right side)
    const bX0 = w - 148, bX1 = w - 28, bY0 = 268, bY1 = 360
    ctx.fillStyle = CANVAS.teal
    ctx.globalAlpha = 0.25
    ctx.fillRect(bX0, bY0, bX1 - bX0, bY1 - bY0)
    ctx.globalAlpha = 1
    ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(bX0, 256); ctx.lineTo(bX0, bY1); ctx.lineTo(bX1, bY1); ctx.lineTo(bX1, 256)
    ctx.stroke()
    const dashOff = reducedMotion ? 0 : -t * 30
    // warm water rises (left)
    ctx.strokeStyle = CANVAS.rose; ctx.lineWidth = 3
    ctx.setLineDash([8, 7]); ctx.lineDashOffset = dashOff
    ctx.beginPath()
    ctx.moveTo(bX0 + 22, bY1 - 18)
    ctx.bezierCurveTo(bX0 + 4, bY1 - 60, bX0 + 4, bY0 + 44, bX0 + 24, bY0 + 20)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.rose
    ctx.beginPath(); ctx.moveTo(bX0 + 24, bY0 + 12); ctx.lineTo(bX0 + 18, bY0 + 24); ctx.lineTo(bX0 + 31, bY0 + 24); ctx.closePath(); ctx.fill()
    // cool water sinks (right)
    ctx.strokeStyle = CANVAS.teal
    ctx.setLineDash([8, 7]); ctx.lineDashOffset = dashOff
    ctx.beginPath()
    ctx.moveTo(bX1 - 22, bY0 + 20)
    ctx.bezierCurveTo(bX1 - 4, bY0 + 60, bX1 - 4, bY1 - 54, bX1 - 24, bY1 - 16)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = CANVAS.teal
    ctx.beginPath(); ctx.moveTo(bX1 - 24, bY1 - 8); ctx.lineTo(bX1 - 31, bY1 - 22); ctx.lineTo(bX1 - 17, bY1 - 22); ctx.closePath(); ctx.fill()
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
    ctx.fillText('convection', (bX0 + bX1) / 2, 374)

    // banners
    ctx.textAlign = 'center'
    if (challenge === 'active') {
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.fillText(`Challenge: best conductor — heat for 10 s, far end must pass 40 °C (${Math.min(10, s.heatTime).toFixed(1)} / 10 s)`, w / 2, 18)
    } else if (challenge === 'won' || challenge === 'lost') {
      ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.fillText(challenge === 'won' ? '★ Challenge complete!' : 'The far end stayed cold — switch the material!', w / 2, 18)
    }
  }, 400)

  return (
    <SimFrame
      title="Heat Transfer Bench"
      brief="A burner heats the rod’s left end; particles jiggle harder where it is hot. Switch the material to change conduction, or switch on the radiation lamp — it warms the far end no matter the material."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 400 }}
          aria-label="A metal rod heated by a burner at the left end with temperature-coloured particles, a radiation lamp and a convection beaker"
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSelect
          label="Rod material" value={matId}
          options={MATS.map((m) => ({ value: m.value, label: m.label }))}
          onChange={(v) => { setMatId(v); resetRod() }}
        />
        <SimSlider label="Burner power" value={power} min={20} max={100} step={5} unit="%" onChange={setPower} />
        <SimToggle label="Burner on" checked={burnerOn} onChange={setBurnerOn} />
        {challenge !== 'active' && (
          <>
            <SimToggle label="Heat lamp (radiation)" checked={lampOn} onChange={setLampOn} />
            {lampOn && <SimSlider label="Lamp intensity" value={lampI} min={0} max={100} step={5} unit="%" onChange={setLampI} />}
          </>
        )}
        <div className="flex flex-wrap gap-2">
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: best conductor, 10 s
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Far-end temp" value={farT.toFixed(0)} unit="°C" tone={farT > 40 ? 'text-emerald-500' : 'text-rose-500'} />
        <Readout label="Flame temp" value={(140 + 1.8 * power).toFixed(0)} unit="°C" tone="text-orange-500" />
        <Readout label="Heating time" value={heatT.toFixed(1)} unit="s" />
        <Readout label="Conductivity k" value={String(mat.k)} unit="W/(m·°C)" tone="text-amber-500" />
      </div>

      {result && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`} role="status">
          {result}
        </p>
      )}
    </SimFrame>
  )
}
