// ─── Sim: Lens Bench · converging-lens ray diagram with a draggable object ───
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, Legend, useSimCanvas,
  canvasPos, useSimBeep, useReducedMotion, drawGrid,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw } from 'lucide-react'

const F = 2 // focal length (m)
const H_OBJ = 0.8 // object height (m)
const X_SPAN = 8 // bench half-width in metres
const TARGET_DI = 4 // challenge goal (m)

export function LensBenchSim() {
  const [dObj, setDObj] = useState(3)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')
  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  // derived physics (thin lens equation) for the DOM readouts
  const invDi = 1 / F - 1 / dObj
  const dImg = Math.abs(invDi) < 1e-9 ? Infinity : 1 / invDi
  const finite = Number.isFinite(dImg)
  const mag = finite ? -dImg / dObj : Infinity
  const typeLabel = !finite ? 'at infinity' : dImg > 0 ? 'real · inverted' : 'virtual · upright'

  // refs touched only inside the loop / event handlers (never during render)
  const draggingRef = useRef(false)
  const doneRef = useRef(false)

  const startChallenge = () => {
    doneRef.current = false
    setChallenge('active')
    setResult('Goal: move the object until the Image distance readout shows 4 m (±0.1 m). Hint: try m = -1 …')
  }
  const reset = () => {
    doneRef.current = false
    setChallenge('idle')
    setResult('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, t, _dt) => {
    const dobj = dObj

    // ── physics: thin lens equation ────────────────────────────────────────
    const invDi = 1 / F - 1 / dobj
    const dImg = Math.abs(invDi) < 1e-9 ? Infinity : 1 / invDi
    const hImg = Number.isFinite(dImg) ? (-dImg / dobj) * H_OBJ : 0

    // challenge check (image at exactly 4 m)
    if (challenge === 'active' && !doneRef.current && Number.isFinite(dImg) && Math.abs(dImg - TARGET_DI) <= 0.1) {
      doneRef.current = true
      setChallenge('won')
      beep(660, 140)
      beep(880, 180)
      setResult(`Focused! Object at ${dobj.toFixed(1)} m → image at ${dImg.toFixed(1)} m, magnification ${(-dImg / dobj).toFixed(1)}. With f = 2 m, an object at 4 m (= 2f) images at 4 m — real, inverted, same size.`)
    }

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    drawGrid(ctx, w, h, 44)

    const ppm = w / (2 * X_SPAN)
    const axY = h * 0.5
    const ax = (xm: number) => w / 2 + xm * ppm
    const ay = (ym: number) => axY - ym * ppm
    const xEdge = X_SPAN * 0.97

    // optical axis + metre ticks
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(ax(-xEdge), axY); ctx.lineTo(ax(xEdge), axY); ctx.stroke()
    ctx.font = '10px ui-monospace, monospace'
    ctx.textAlign = 'center'
    for (let m = -7; m <= 7; m++) {
      if (m === 0) continue
      const big = Math.abs(m) === 2 || Math.abs(m) === 4
      ctx.fillStyle = big ? CANVAS.teal : CANVAS.muted
      ctx.fillRect(ax(m) - 0.5, axY - (big ? 6 : 3), 1, big ? 12 : 6)
      if (m % 2 === 0) {
        ctx.fillStyle = CANVAS.muted
        ctx.fillText(`${m}`, ax(m), axY + 22)
      }
    }
    ctx.fillStyle = CANVAS.teal
    ctx.fillText('2F', ax(-4), axY + 34)
    ctx.fillText('F', ax(-2), axY + 34)
    ctx.fillText('F', ax(2), axY + 34)
    ctx.fillText('2F', ax(4), axY + 34)
    // focal point dots
    for (const fx of [-4, -2, 2, 4]) {
      ctx.beginPath(); ctx.arc(ax(fx), axY, 2.5, 0, Math.PI * 2); ctx.fill()
    }

    // the lens (vertical lens silhouette at x = 0)
    const lensH = 76
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(ax(0), axY - lensH)
    ctx.quadraticCurveTo(ax(0) + 15, axY, ax(0), axY + lensH)
    ctx.quadraticCurveTo(ax(0) - 15, axY, ax(0), axY - lensH)
    ctx.closePath()
    ctx.globalAlpha = 0.16
    ctx.fillStyle = CANVAS.teal
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.strokeStyle = CANVAS.teal
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()

    // ray helpers (metre coordinates)
    const ray = (x1: number, y1: number, x2: number, y2: number, color: string, dashed = false) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 1.8
      ctx.setLineDash(dashed ? [5, 4] : [])
      ctx.beginPath(); ctx.moveTo(ax(x1), ay(y1)); ctx.lineTo(ax(x2), ay(y2)); ctx.stroke()
      ctx.setLineDash([])
    }

    const virtual = Number.isFinite(dImg) && dImg < 0
    // Ray 1 (yellow): parallel to axis, then through far focus (0→F direction)
    ray(-dobj, H_OBJ, 0, H_OBJ, CANVAS.yellow)
    const sA = -H_OBJ / F
    ray(0, H_OBJ, xEdge, H_OBJ + sA * xEdge, CANVAS.yellow)
    if (virtual) ray(0, H_OBJ, dImg, hImg, CANVAS.yellow, true)

    // Ray 2 (rose): straight through the lens centre
    const sB = -H_OBJ / dobj
    ray(-dobj, H_OBJ, xEdge, sB * xEdge, CANVAS.rose)
    if (virtual) ray(-dobj, H_OBJ, dImg, hImg, CANVAS.rose, true)

    // Ray 3 (violet): lined up with near focus, emerges parallel to the axis
    if (Math.abs(dobj - F) > 1e-6) {
      const sC = -H_OBJ / (dobj - F)
      const yC = sC * F
      ray(-dobj, H_OBJ, 0, yC, CANVAS.violet)
      if (dobj < F) ray(-dobj, H_OBJ, -F - 0.5, sC * (-F - 0.5 + F), CANVAS.violet, true)
      ray(0, yC, xEdge, yC, CANVAS.violet)
      if (virtual) ray(0, yC, dImg, yC, CANVAS.violet, true)
    }

    // image arrow
    if (Number.isFinite(dImg) && Math.abs(dImg) <= xEdge - 0.15) {
      const tipX = ax(dImg)
      const tipY = ay(hImg)
      const color = virtual ? CANVAS.violet : CANVAS.fg
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.setLineDash(virtual ? [6, 4] : [])
      ctx.beginPath(); ctx.moveTo(tipX, axY); ctx.lineTo(tipX, tipY); ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = color
      const dir = hImg >= 0 ? -1 : 1 // canvas y grows downward
      ctx.beginPath()
      ctx.moveTo(tipX, tipY + dir * 9)
      ctx.lineTo(tipX - 6, tipY)
      ctx.lineTo(tipX + 6, tipY)
      ctx.fill()
      ctx.font = 'bold 11px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(virtual ? 'virtual image (upright)' : 'real image (inverted)', tipX, tipY + dir * 18)
    } else if (Number.isFinite(dImg)) {
      // image would land off the bench
      ctx.fillStyle = CANVAS.fg
      ctx.font = '11px ui-monospace, monospace'
      ctx.textAlign = dImg > 0 ? 'right' : 'left'
      const ly = ay(Math.max(-3.2, Math.min(3.2, hImg)))
      ctx.fillText(`image at ${dImg.toFixed(0)} m ${dImg > 0 ? '→' : '←'} (off the bench)`, dImg > 0 ? w - 12 : 12, ly)
    } else {
      ctx.fillStyle = CANVAS.fg
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('object at F — rays leave parallel, image at infinity', w / 2, 24)
    }

    // object arrow (drag me!)
    const objX = ax(-dobj)
    const objTipY = ay(H_OBJ)
    ctx.strokeStyle = CANVAS.orange
    ctx.lineWidth = 3
    ctx.beginPath(); ctx.moveTo(objX, axY); ctx.lineTo(objX, objTipY); ctx.stroke()
    ctx.fillStyle = CANVAS.orange
    ctx.beginPath()
    ctx.moveTo(objX, objTipY - 9)
    ctx.lineTo(objX - 6, objTipY)
    ctx.lineTo(objX + 6, objTipY)
    ctx.fill()
    ctx.font = 'bold 11px ui-sans-serif, system-ui'
    ctx.textAlign = 'center'
    ctx.fillText('object', objX, ay(0) + 38)
    if (draggingRef.current) {
      ctx.setLineDash([3, 3])
      ctx.strokeStyle = CANVAS.amber
      ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(objX, axY, 18, 0, Math.PI * 2); ctx.stroke()
      ctx.setLineDash([])
    }

    // photons drifting along ray 2 (paused under reduced motion)
    if (!reducedMotion) {
      ctx.fillStyle = CANVAS.rose
      for (let k = 0; k < 3; k++) {
        const p = (t * 0.2 + k / 3) % 1
        const xm = -dobj + p * (xEdge + dobj)
        ctx.globalAlpha = 0.75
        ctx.beginPath(); ctx.arc(ax(xm), ay(sB * xm), 2.2, 0, Math.PI * 2); ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    if (challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('★ Challenge complete!', w / 2, h - 12)
    }
  }, 400)

  // drag the object along the bench
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { x } = canvasPos(e, canvas)
    const ppm = canvas.clientWidth / (2 * X_SPAN)
    const objX = canvas.clientWidth / 2 - dObj * ppm
    if (Math.abs(x - objX) < 24) {
      draggingRef.current = true
      canvas.setPointerCapture(e.pointerId)
    }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const { x } = canvasPos(e, canvas)
    const ppm = canvas.clientWidth / (2 * X_SPAN)
    const next = Math.round((-(x - canvas.clientWidth / 2) / ppm) * 10) / 10
    setDObj(Math.min(6, Math.max(0.5, next)))
  }
  const onPointerUp = () => {
    draggingRef.current = false
  }

  return (
    <SimFrame
      title="Lens Bench"
      brief="A converging lens (f = 2 m) sits at the centre. Drag the amber object or use the slider — the three principal rays build the image."
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="rounded-lg cursor-ew-resize touch-none"
          style={{ height: 400 }}
          aria-label="Optical bench: a converging lens with focal length 2 metres forms an image of an arrow-shaped object; drag the object to move it and watch the three principal rays rebuild the image"
          role="img"
        />
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <Legend color={CANVAS.yellow} label="ray 1: parallel → refracts through F" />
        <Legend color={CANVAS.rose} label="ray 2: straight through the centre" />
        <Legend color={CANVAS.violet} label="ray 3: lined up with F → leaves parallel" />
        <Legend color={CANVAS.fg} label="image (solid real · dashed virtual)" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider
          label="Object distance" value={dObj} min={0.5} max={6} step={0.1} unit="m"
          onChange={setDObj}
        />
        <div className="flex gap-2">
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 mr-1" aria-hidden />
            Challenge: image at 4 m
          </SimButton>
          <SimButton variant="secondary" onClick={reset}>
            <RotateCcw className="h-4 w-4 mr-1" aria-hidden /> Reset
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Object dist" value={dObj.toFixed(1)} unit="m" tone="text-orange-500" />
        <Readout label="Image dist" value={finite ? dImg.toFixed(2) : '∞'} unit="m" tone="text-amber-500" />
        <Readout label="Magnification" value={finite ? mag.toFixed(2) : '—'} unit="×" />
        <Readout label="Image type" value={typeLabel} tone="text-teal-500" />
      </div>

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
