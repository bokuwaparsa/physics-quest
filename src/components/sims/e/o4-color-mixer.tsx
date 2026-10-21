// ─── Sim: Color Mixer · additive spotlights vs subtractive filters ───────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimToggle, SimSelect, Readout, Legend,
  useSimCanvas, useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

type FilterName = 'none' | 'red' | 'green' | 'blue' | 'cyan' | 'magenta' | 'yellow'

const FILTER_INFO: Record<FilterName, { rgb: [number, number, number]; passes: string; absorbs: string; channels: [boolean, boolean, boolean] }> = {
  none: { rgb: [255, 255, 255], passes: 'everything', absorbs: 'nothing', channels: [true, true, true] },
  red: { rgb: [255, 0, 0], passes: 'red', absorbs: 'green + blue', channels: [true, false, false] },
  green: { rgb: [0, 255, 0], passes: 'green', absorbs: 'red + blue', channels: [false, true, false] },
  blue: { rgb: [0, 0, 255], passes: 'blue', absorbs: 'red + green', channels: [false, false, true] },
  cyan: { rgb: [0, 255, 255], passes: 'green + blue', absorbs: 'red', channels: [false, true, true] },
  magenta: { rgb: [255, 0, 255], passes: 'red + blue', absorbs: 'green', channels: [true, false, true] },
  yellow: { rgb: [255, 255, 0], passes: 'red + green', absorbs: 'blue', channels: [true, true, false] },
}

const PRESETS: { label: string; rgb: [number, number, number] }[] = [
  { label: 'Red', rgb: [255, 0, 0] },
  { label: 'Yellow', rgb: [255, 255, 0] },
  { label: 'Cyan', rgb: [0, 255, 255] },
  { label: 'Magenta', rgb: [255, 0, 255] },
  { label: 'White', rgb: [255, 255, 255] },
]

const CHANNEL_COLORS = ['#ef4444', '#22c55e', '#3b82f6'] // R, G, B
const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase()

export function ColorMixerSim() {
  const [mode, setMode] = useState<'lights' | 'filter'>('lights')
  const [r, setR] = useState(255)
  const [g, setG] = useState(90)
  const [b, setB] = useState(30)
  const [filter, setFilter] = useState<FilterName>('cyan')
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')
  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  // ref touched only inside the loop / handlers (never during render)
  const doneRef = useRef(false)

  // the wall color
  const wall = mode === 'lights' ? { r, g, b } : (() => {
    const [wr, wg, wb] = FILTER_INFO[filter].rgb
    return { r: wr, g: wg, b: wb }
  })()
  const hex = `#${toHex(wall.r)}${toHex(wall.g)}${toHex(wall.b)}`
  const lum = 0.2126 * wall.r + 0.7152 * wall.g + 0.0722 * wall.b

  const startChallenge = () => {
    doneRef.current = false
    setChallenge('active')
    setResult('Goal: turn up the spotlights until the wall reads white (every channel ≥ 240).')
  }
  const reset = () => {
    doneRef.current = false
    setChallenge('idle')
    setResult('')
    setMode('lights')
    setR(255)
    setG(90)
    setB(30)
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t, _dt) => {
    const s = { mode, filter }
    const wallRGB = s.mode === 'lights' ? [r, g, b] : FILTER_INFO[s.filter].rgb
    const wallHex = `#${toHex(wallRGB[0])}${toHex(wallRGB[1])}${toHex(wallRGB[2])}`

    // challenge check: make white light
    if (challenge === 'active' && !doneRef.current && s.mode === 'lights' && r >= 240 && g >= 240 && b >= 240) {
      doneRef.current = true
      setChallenge('won')
      beep(660, 140)
      beep(880, 180)
      setResult('White light achieved! With R, G and B all ≥ 240, all three color sensors in your eye fire strongly — the brain reads that as white. Bonus: switch on Filter mode and pick cyan — which channels survive to the wall now?')
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    const wallX = Math.round(w * 0.44)
    const wallY = 26
    const wallW = w - wallX - 20
    const wallH = h - 74
    const midY = wallY + wallH / 2

    // the stage wall
    ctx.fillStyle = `rgb(${wallRGB[0]},${wallRGB[1]},${wallRGB[2]})`
    ctx.fillRect(wallX, wallY, wallW, wallH)
    ctx.strokeStyle = CANVAS.panelLight
    ctx.lineWidth = 2
    ctx.strokeRect(wallX, wallY, wallW, wallH)
    const wallLum = 0.2126 * wallRGB[0] + 0.7152 * wallRGB[1] + 0.0722 * wallRGB[2]
    ctx.fillStyle = wallLum > 140 ? CANVAS.bg : CANVAS.fg
    ctx.font = 'bold 15px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText(wallHex, wallX + wallW / 2, wallY + wallH - 14)
    ctx.font = '10px ui-sans-serif, system-ui'
    ctx.fillText('the wall', wallX + wallW / 2, wallY + 16)

    if (s.mode === 'lights') {
      // three spotlights with additive cones
      const ys = [wallY + wallH * 0.2, midY, wallY + wallH * 0.8]
      const chans: { v: number; color: string; rgb: string; label: string }[] = [
        { v: r, color: CANVAS.red, rgb: '255,0,0', label: 'R' },
        { v: g, color: CANVAS.emerald, rgb: '16,185,129', label: 'G' },
        { v: b, color: CANVAS.violet, rgb: '139,92,246', label: 'B' },
      ]
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      chans.forEach((c, i) => {
        const inten = c.v / 255
        const pulse = reducedMotion ? 1 : 0.85 + 0.15 * Math.sin(t * 2.4 + i * 2)
        if (inten > 0) {
          ctx.fillStyle = `rgba(${c.rgb},${(inten * 0.32 * pulse).toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(46, ys[i])
          ctx.lineTo(wallX, ys[i] - 52)
          ctx.lineTo(wallX, ys[i] + 52)
          ctx.closePath()
          ctx.fill()
        }
      })
      ctx.restore()
      chans.forEach((c, i) => {
        ctx.beginPath()
        ctx.arc(30, ys[i], 13, 0, Math.PI * 2)
        ctx.fillStyle = c.v > 0 ? c.color : CANVAS.panelLight
        ctx.fill()
        ctx.strokeStyle = CANVAS.muted
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.fillStyle = CANVAS.muted
        ctx.font = 'bold 10px ui-sans-serif, system-ui'
        ctx.textAlign = 'center'
        ctx.fillText(c.label, 30, ys[i] + 28)
      })
    } else {
      // white beam → filter slab → colored beam → wall
      const fx = Math.round(w * 0.26)
      const info = FILTER_INFO[s.filter]
      // incoming white beam
      ctx.fillStyle = 'rgba(250,250,249,0.5)'
      ctx.fillRect(46, midY - 30, fx - 46, 60)
      // outgoing (filtered) beam
      ctx.fillStyle = `rgba(${info.rgb[0]},${info.rgb[1]},${info.rgb[2]},0.55)`
      ctx.fillRect(fx + 10, midY - 30, wallX - fx - 10, 60)
      // the slab
      ctx.fillStyle = `rgba(${info.rgb[0]},${info.rgb[1]},${info.rgb[2]},0.8)`
      ctx.fillRect(fx - 8, wallY + 18, 16, wallH - 36)
      ctx.strokeStyle = CANVAS.fg
      ctx.lineWidth = 1.5
      ctx.strokeRect(fx - 8, wallY + 18, 16, wallH - 36)
      // channel audit: R, G, B dots in → passed dots out
      const names = ['R', 'G', 'B']
      info.channels.forEach((passed, i) => {
        const cy = wallY + 30 + i * 20
        if (passed) {
          ctx.fillStyle = CHANNEL_COLORS[i]
          ctx.beginPath(); ctx.arc(fx - 20, cy, 4.5, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.arc(fx + 20, cy, 4.5, 0, Math.PI * 2); ctx.fill()
        } else {
          ctx.fillStyle = CANVAS.panelLight
          ctx.beginPath(); ctx.arc(fx - 20, cy, 4.5, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.arc(fx + 20, cy, 4.5, 0, Math.PI * 2); ctx.fill()
          ctx.strokeStyle = CANVAS.rose
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(fx + 16.5, cy - 3.5); ctx.lineTo(fx + 23.5, cy + 3.5)
          ctx.moveTo(fx + 23.5, cy - 3.5); ctx.lineTo(fx + 16.5, cy + 3.5)
          ctx.stroke()
        }
        ctx.fillStyle = CANVAS.muted
        ctx.font = 'bold 9px ui-sans-serif, system-ui'
        ctx.textAlign = 'center'
        ctx.fillText(names[i], fx - 20, cy - 8)
      })
      // white source lamp
      ctx.beginPath(); ctx.arc(30, midY, 13, 0, Math.PI * 2)
      ctx.fillStyle = CANVAS.fg; ctx.fill()
      ctx.strokeStyle = CANVAS.muted; ctx.lineWidth = 1.5; ctx.stroke()
      ctx.fillStyle = CANVAS.muted
      ctx.font = 'bold 10px ui-sans-serif, system-ui'
      ctx.fillText('W', 30, midY + 28)
    }

    if (challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('★ Challenge complete!', w / 2, 16)
    }
  }, 380)

  return (
    <SimFrame
      title="Color Mixer Stage"
      brief="Blend R/G/B spotlights additively — or flip to Filter mode and subtract channels from white light."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ height: 380 }}
          aria-label="Stage wall lit by red, green and blue spotlights, or by white light through a selectable color filter; the wall shows the resulting color and hex code"
          role="img"
        />
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <Legend color={CANVAS.red} label="red channel" />
        <Legend color={CANVAS.emerald} label="green channel" />
        <Legend color={CANVAS.violet} label="blue channel" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Red" value={r} min={0} max={255} step={5} unit="/255" disabled={mode === 'filter'} onChange={setR} />
        <SimSlider label="Green" value={g} min={0} max={255} step={5} unit="/255" disabled={mode === 'filter'} onChange={setG} />
        <SimSlider label="Blue" value={b} min={0} max={255} step={5} unit="/255" disabled={mode === 'filter'} onChange={setB} />
        <SimToggle label="Filter mode" checked={mode === 'filter'} onChange={(v) => setMode(v ? 'filter' : 'lights')} />
        {mode === 'filter' && (
          <SimSelect<FilterName>
            label="Filter"
            value={filter}
            options={[
              { value: 'none', label: 'plain glass' },
              { value: 'red', label: 'red' },
              { value: 'green', label: 'green' },
              { value: 'blue', label: 'blue' },
              { value: 'cyan', label: 'cyan' },
              { value: 'magenta', label: 'magenta' },
              { value: 'yellow', label: 'yellow' },
            ]}
            onChange={setFilter}
          />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">Presets:</span>
        {PRESETS.map((p) => (
          <SimButton
            key={p.label}
            variant="secondary"
            disabled={mode === 'filter'}
            onClick={() => { setR(p.rgb[0]); setG(p.rgb[1]); setB(p.rgb[2]) }}
          >
            {p.label}
          </SimButton>
        ))}
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimButton
          variant={challenge === 'active' ? 'destructive' : 'outline'}
          onClick={startChallenge}
        >
          <Flag className="h-4 w-4 mr-1" aria-hidden />
          Challenge: make white light
        </SimButton>
        <SimButton variant="secondary" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-1" aria-hidden /> Reset
        </SimButton>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Wall color" value={hex} tone="text-amber-500" />
        <Readout label="Brightness" value={lum.toFixed(0)} unit="%" />
        <Readout label="R" value={String(wall.r)} tone="text-red-500" />
        <Readout label="G" value={String(wall.g)} tone="text-green-500" />
        <Readout label="B" value={String(wall.b)} tone="text-blue-500" />
      </div>

      {mode === 'filter' && (
        <p className="text-xs text-muted-foreground rounded-lg px-3 py-2 bg-muted" role="status">
          {filter === 'none'
            ? 'Plain glass passes every channel — the wall stays white.'
            : `White light hits the ${filter} filter: it passes ${FILTER_INFO[filter].passes} and absorbs ${FILTER_INFO[filter].absorbs}. Only ${FILTER_INFO[filter].passes} reach the wall.`}
        </p>
      )}

      {result && (
        <p
          className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}
          role="status"
        >
          {result}
        </p>
      )}
    </SimFrame>
  )
}
