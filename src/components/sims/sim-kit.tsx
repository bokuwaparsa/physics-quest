// ─── Physics Quest · Sim kit: shared canvas hook, frame & control primitives ──
'use client'

import {
  useEffect, useRef, useState,
  type ReactNode, type RefObject,
} from 'react'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useGame } from '@/lib/game/progress'

// ─── Canvas palette (fixed "night lab" look in both themes) ──────────────────
export const CANVAS = {
  bg: '#1c1917',
  panel: '#292524',
  panelLight: '#37332f',
  fg: '#fafaf9',
  muted: '#a8a29e',
  grid: 'rgba(250,250,249,0.08)',
  amber: '#f59e0b',
  orange: '#f97316',
  emerald: '#10b981',
  teal: '#14b8a6',
  rose: '#f43f5e',
  red: '#ef4444',
  violet: '#8b5cf6',
  yellow: '#eab308',
  white: '#d6d3d1',
}

export type DrawFn = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  dt: number,
) => void

/**
 * Canvas hook: handles DPR, resize and the RAF loop.
 * The draw callback receives CSS-pixel coordinates (ctx is pre-scaled).
 * `t` = seconds since loop start, `dt` = seconds since last frame (≤ 0.05).
 */
export function useSimCanvas(
  draw: DrawFn,
  height = 380,
): { canvasRef: RefObject<HTMLCanvasElement | null> } {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawRef = useRef<DrawFn>(draw)

  // keep the latest draw fn available to the RAF loop without restarting it
  useEffect(() => {
    drawRef.current = draw
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let start = performance.now()
    let last = start
    let cssW = 0
    let cssH = height

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      cssW = parent.clientWidth
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(cssW * dpr))
      canvas.height = Math.max(1, Math.round(cssH * dpr))
      canvas.style.width = '100%'
      canvas.style.height = `${cssH}px`
    }

    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)
    resize()

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const t = (now - start) / 1000
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawRef.current(ctx, cssW, cssH, t, dt)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [height])

  return { canvasRef }
}

/** True when the player asked for reduced motion — sims must respect it. */
export function useReducedMotion(): boolean {
  return useGame((s) => s.reducedMotion)
}

/** Pointer position in canvas CSS-pixel coordinates. */
export function canvasPos(e: React.PointerEvent | React.MouseEvent, canvas: HTMLCanvasElement) {
  const r = canvas.getBoundingClientRect()
  return { x: e.clientX - r.left, y: e.clientY - r.top }
}

/** Draw crisp grid lines. */
export function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, step = 40) {
  ctx.strokeStyle = CANVAS.grid
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let x = step; x < w; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, h) }
  for (let y = step; y < h; y += step) { ctx.moveTo(0, y); ctx.lineTo(w, y) }
  ctx.stroke()
}

/** SmallWebAudio blip that respects the sound setting. */
export function useSimBeep() {
  const soundOn = useGame((s) => s.soundOn)
  const ctxRef = useRef<AudioContext | null>(null)
  return (freq = 440, ms = 90, type: OscillatorType = 'sine', gain = 0.04) => {
    if (!soundOn || typeof window === 'undefined') return
    try {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      ctxRef.current ??= new AC()
      const ac = ctxRef.current
      if (ac.state === 'suspended') void ac.resume()
      const osc = ac.createOscillator()
      const g = ac.createGain()
      osc.type = type
      osc.frequency.value = freq
      g.gain.setValueAtTime(gain, ac.currentTime)
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + ms / 1000)
      osc.connect(g).connect(ac.destination)
      osc.start()
      osc.stop(ac.currentTime + ms / 1000)
    } catch { /* audio unavailable — stay silent */ }
  }
}

// ─── Layout frame ─────────────────────────────────────────────────────────────
export function SimFrame({
  title, brief, children, className,
}: { title?: string; brief?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl border bg-card overflow-hidden', className)}>
      {(title || brief) && (
        <div className="border-b bg-muted/40 px-4 py-3">
          {title && <p className="font-semibold text-sm">{title}</p>}
          {brief && <p className="text-xs text-muted-foreground mt-0.5">{brief}</p>}
        </div>
      )}
      <div className="p-3 sm:p-4 space-y-3">{children}</div>
    </div>
  )
}

// ─── Controls ────────────────────────────────────────────────────────────────
export function SimSlider({
  label, value, min, max, step = 1, unit, onChange, format, disabled, className,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (v: number) => void
  format?: (v: number) => string
  disabled?: boolean
  className?: string
}) {
  return (
    <div className={cn('min-w-[150px] flex-1', className)}>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span className="text-xs font-mono font-semibold tabular-nums">
          {format ? format(value) : value}{unit ? `\u2009${unit}` : ''}
        </span>
      </div>
      <Slider
        aria-label={label}
        value={[value]}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onValueChange={(v) => onChange(v[0])}
      />
    </div>
  )
}

export function SimButton({
  children, onClick, variant = 'default', className, disabled, title,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  className?: string
  disabled?: boolean
  title?: string
}) {
  return (
    <Button size="sm" variant={variant} onClick={onClick} disabled={disabled} title={title} className={className}>
      {children}
    </Button>
  )
}

export function SimToggle({
  label, checked, onChange, className,
}: { label: string; checked: boolean; onChange: (v: boolean) => void; className?: string }) {
  return (
    <label className={cn('flex items-center gap-2 text-xs font-medium text-muted-foreground cursor-pointer select-none', className)}>
      <Switch aria-label={label} checked={checked} onCheckedChange={onChange} />
      {label}
    </label>
  )
}

export function SimSelect<T extends string>({
  label, value, options, onChange, className,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  className?: string
}) {
  return (
    <div className={cn('min-w-[130px]', className)}>
      {label && <p className="text-xs font-medium text-muted-foreground mb-1.5">{label}</p>}
      <Select value={value} onValueChange={(v) => onChange(v as T)}>
        <SelectTrigger size="sm" aria-label={label} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function Readout({
  label, value, unit, tone,
}: { label: string; value: string; unit?: string; tone?: string }) {
  return (
    <div className="rounded-lg border bg-muted/40 px-2.5 py-1.5 min-w-[86px]">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground leading-none">{label}</p>
      <p className={cn('text-sm font-mono font-semibold tabular-nums mt-0.5', tone)}>
        {value}{unit ? <span className="text-muted-foreground font-normal">{'\u2009'}{unit}</span> : null}
      </p>
    </div>
  )
}

export function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} aria-hidden />
      {label}
    </span>
  )
}

/** Use when a sim has internal sub-modes (tabs are too heavy inside sims). */
export function useLocal<T>(initial: T) {
  return useState<T>(initial)
}
