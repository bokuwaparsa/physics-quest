// ─── Sim: Chain Reaction · U-235 lattice, neutrons, and control rods ──────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimToggle, Readout, useSimCanvas,
  useSimBeep, useReducedMotion, canvasPos,
} from '@/components/sims/sim-kit'
import { Flag, RotateCcw, Zap } from 'lucide-react'

const COLS = 10
const ROWS = 7
const NUCLEI = COLS * ROWS // 70
const HIT_R = 13 // neutron-nucleus capture radius (px)
const ROD_HALF = 11 // rod absorption half-width (px)
const MAX_GEN = 3 // neutron generations that may trigger a fission (gen 1..3)
const MEV_PER_FISSION = 200

type Neutron = { x: number; y: number; vx: number; vy: number; gen: number }
type Flash = { x: number; y: number; life: number; kind: 'fission' | 'absorb' }

interface Geom { x0: number; y0: number; cw: number; ch: number; cx: number[]; cy: number[] }

function geom(w: number): Geom {
  const x0 = 26, y0 = 74
  const cw = Math.min(54, Math.max(30, (w - 150) / COLS))
  const ch = 34
  const cx: number[] = [], cy: number[] = []
  for (let c = 0; c < COLS; c++) cx.push(x0 + cw * (c + 0.5))
  for (let r = 0; r < ROWS; r++) cy.push(y0 + ch * (r + 0.5))
  return { x0, y0, cw, ch, cx, cy }
}

interface SimState {
  genOf: number[] // -1 intact, else fission generation (0..3)
  neutrons: Neutron[]
  flashes: Flash[]
  genCounts: number[] // fissions per generation 0..3
  total: number
  absorbed: number
  escaped: number
  maxGen: number
  running: boolean
  ended: boolean
}

const freshState = (): SimState => ({
  genOf: new Array(NUCLEI).fill(-1),
  neutrons: [], flashes: [],
  genCounts: [0, 0, 0, 0],
  total: 0, absorbed: 0, escaped: 0, maxGen: -1,
  running: false, ended: false,
})

export function ChainReactionSim() {
  const [rodsOn, setRodsOn] = useState(false)
  const [rods, setRods] = useState(4)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [msg, setMsg] = useState('')
  const [stats, setStats] = useState({ total: 0, gen: -1, genCounts: [0, 0, 0, 0] as number[], absorbed: 0, escaped: 0, running: false, ended: false })

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const st = useRef<SimState>(freshState())
  const tick = useRef(0)

  const publish = () => {
    const s = st.current
    setStats({ total: s.total, gen: s.maxGen, genCounts: [...s.genCounts], absorbed: s.absorbed, escaped: s.escaped, running: s.running, ended: s.ended })
  }

  const spawn = (x: number, y: number, gen: number) => {
    const count = Math.random() < 0.5 ? 2 : 3 // each fission frees 2-3 neutrons
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2
      st.current.neutrons.push({ x, y, vx: Math.cos(a) * 220, vy: Math.sin(a) * 220, gen })
    }
  }

  const rodX = (k: number, g: Geom) => g.x0 + COLS * g.cw * ((k + 1) / (rods + 1))

  /** Advance the cascade by dt (s). Fissions allowed for neutron generations 1..MAX_GEN. */
  const step = (dt: number, g: Geom) => {
    const s = st.current
    const latW = COLS * g.cw, latH = ROWS * g.ch
    const alive: Neutron[] = []
    for (const nu of s.neutrons) {
      nu.x += nu.vx * dt
      nu.y += nu.vy * dt
      let dead = false
      // control rods: absorb neutrons passing near
      if (rodsOn) {
        for (let k = 0; k < rods; k++) {
          if (Math.abs(nu.x - rodX(k, g)) <= ROD_HALF && nu.y > g.y0 - 10 && nu.y < g.y0 + latH + 10) {
            s.absorbed++
            s.flashes.push({ x: nu.x, y: nu.y, life: 0.35, kind: 'absorb' })
            dead = true
            break
          }
        }
      }
      if (dead) continue
      // capture by an intact nucleus
      let hit = -1
      if (nu.gen <= MAX_GEN) {
        for (let i = 0; i < NUCLEI; i++) {
          if (s.genOf[i] !== -1) continue
          const dx = nu.x - g.cx[i % COLS], dy = nu.y - g.cy[Math.floor(i / COLS)]
          if (dx * dx + dy * dy < HIT_R * HIT_R) { hit = i; break }
        }
      }
      if (hit >= 0) {
        const gen = nu.gen
        s.genOf[hit] = gen
        s.genCounts[gen]++
        s.total++
        s.maxGen = Math.max(s.maxGen, gen)
        s.flashes.push({ x: g.cx[hit % COLS], y: g.cy[Math.floor(hit / COLS)], life: 0.4, kind: 'fission' })
        spawn(g.cx[hit % COLS], g.cy[Math.floor(hit / COLS)], gen + 1)
        continue // neutron is consumed
      }
      if (nu.x < g.x0 - 30 || nu.x > g.x0 + latW + 30 || nu.y < g.y0 - 30 || nu.y > g.y0 + latH + 30) {
        s.escaped++
        continue
      }
      alive.push(nu)
    }
    s.neutrons = alive
    for (const fl of s.flashes) fl.life -= dt
    s.flashes = s.flashes.filter((fl) => fl.life > 0)
    if (s.running && s.neutrons.length === 0) {
      s.running = false
      s.ended = true
      publish()
      if (challenge === 'active') evaluate()
    }
  }

  const evaluate = () => {
    const total = st.current.total
    if (total >= 12 && total <= 20) {
      setChallenge('won')
      beep(660, 120); beep(880, 160)
      setMsg(`★ ${total} fissions (≈ ${(total * MEV_PER_FISSION).toLocaleString('en-US')} MeV) — steady power! The rods kept about one neutron per fission on duty.`)
    } else if (total > 20) {
      setChallenge('lost')
      setMsg(`${total} fissions — the chain ran away (supercritical). Each fission freed more than one useful neutron: pull in more rod and retry.`)
    } else {
      setChallenge('lost')
      setMsg(`Only ${total} fissions — the chain died out (subcritical): too many neutrons absorbed or escaped. Try fewer rods and retry.`)
    }
  }

  const fire = (i: number, canvasW: number) => {
    if (st.current.running) return
    st.current = freshState()
    const g = geom(canvasW)
    st.current.genOf[i] = 0
    st.current.genCounts[0] = 1
    st.current.total = 1
    st.current.maxGen = 0
    spawn(g.cx[i % COLS], g.cy[Math.floor(i / COLS)], 1)
    st.current.running = true
    if (reducedMotion) {
      // resolve the whole user-triggered cascade instantly, no per-frame animation
      for (let guard = 0; guard < 800 && st.current.neutrons.length > 0; guard++) step(0.05, g)
      publish()
    } else {
      publish()
    }
  }

  const onCanvasClick = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (st.current.running) return
    const cv = e.currentTarget
    const p = canvasPos(e, cv)
    const g = geom(cv.clientWidth)
    for (let i = 0; i < NUCLEI; i++) {
      const dx = p.x - g.cx[i % COLS], dy = p.y - g.cy[Math.floor(i / COLS)]
      if (dx * dx + dy * dy < 16 * 16) { fire(i, cv.clientWidth); return }
    }
  }

  const reset = () => {
    st.current = freshState()
    publish()
    setMsg('')
  }

  const startChallenge = () => {
    setChallenge('active')
    setRodsOn(true)
    setRods(4)
    st.current = freshState()
    publish()
    setMsg('Keep steady power: land 12–20 total fissions across 3 generations. Tune the rods, then Fire — under 12 the chain dies, over 20 it runs away.')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    const g = geom(w)
    if (s.running && !reducedMotion) step(dt, g)
    if (!reducedMotion) {
      tick.current += 1
      if (tick.current >= 9) { tick.current = 0; publish() }
    }

    const latW = COLS * g.cw, latH = ROWS * g.ch

    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-sans-serif, system-ui'
    ctx.textAlign = 'left'
    ctx.fillText('U-235 lattice · click a nucleus or press Fire', g.x0, 30)
    ctx.fillText(`gen ${Math.max(0, s.maxGen)} · g0:${s.genCounts[0]} g1:${s.genCounts[1]} g2:${s.genCounts[2]} g3:${s.genCounts[3]}`, g.x0, 48)

    // ── control rods ──────────────────────────────────────────────────────────
    if (rodsOn) {
      for (let k = 0; k < rods; k++) {
        const rx = rodX(k, g)
        ctx.fillStyle = CANVAS.white
        ctx.fillRect(rx - 5, g.y0 - 14, 10, latH + 22)
        ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 1
        for (let yy = g.y0 - 8; yy < g.y0 + latH; yy += 9) {
          ctx.beginPath(); ctx.moveTo(rx - 5, yy); ctx.lineTo(rx + 5, yy + 4); ctx.stroke()
        }
        ctx.fillStyle = CANVAS.muted; ctx.font = 'bold 10px ui-monospace, monospace'; ctx.textAlign = 'center'
        ctx.fillText('B', rx, g.y0 - 18)
      }
    }

    // ── nuclei ────────────────────────────────────────────────────────────────
    for (let i = 0; i < NUCLEI; i++) {
      const x = g.cx[i % COLS], y = g.cy[Math.floor(i / COLS)]
      if (s.genOf[i] === -1) {
        ctx.fillStyle = CANVAS.amber
        ctx.beginPath(); ctx.arc(x, y, 11, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = CANVAS.bg
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill()
      } else {
        ctx.globalAlpha = 0.8
        ctx.strokeStyle = CANVAS.rose; ctx.lineWidth = 2
        ctx.beginPath(); ctx.arc(x, y, 11, 0, Math.PI * 2); ctx.stroke()
        ctx.globalAlpha = 1
        ctx.fillStyle = CANVAS.muted; ctx.font = '8px ui-monospace, monospace'; ctx.textAlign = 'center'
        ctx.fillText(`g${s.genOf[i]}`, x, y + 3)
      }
    }

    // ── flashes + neutrons ────────────────────────────────────────────────────
    for (const fl of s.flashes) {
      const k = fl.kind === 'fission' ? 0.4 : 0.35
      ctx.globalAlpha = Math.max(0, fl.life / k)
      ctx.strokeStyle = fl.kind === 'fission' ? CANVAS.rose : CANVAS.white
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(fl.x, fl.y, 6 + (k - fl.life) * 70, 0, Math.PI * 2); ctx.stroke()
      ctx.globalAlpha = 1
    }
    for (const nu of s.neutrons) {
      ctx.strokeStyle = 'rgba(20,184,166,0.45)'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(nu.x - nu.vx * 0.05, nu.y - nu.vy * 0.05); ctx.lineTo(nu.x, nu.y); ctx.stroke()
      ctx.fillStyle = CANVAS.teal
      ctx.beginPath(); ctx.arc(nu.x, nu.y, 3.4, 0, Math.PI * 2); ctx.fill()
    }

    // ── right panel (wide screens) / footer strip (narrow) ───────────────────
    const panelX = g.x0 + latW + 14
    if (w - panelX > 96) {
      const pw = w - panelX - 10
      ctx.fillStyle = CANVAS.panel
      ctx.fillRect(panelX, g.y0 - 14, pw, latH + 22)
      ctx.strokeStyle = CANVAS.grid; ctx.lineWidth = 1
      ctx.strokeRect(panelX, g.y0 - 14, pw, latH + 22)
      ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'left'
      ctx.fillText('fissions / generation', panelX + 10, g.y0 + 2)
      const maxC = Math.max(1, ...s.genCounts)
      const labels = ['g0', 'g1', 'g2', 'g3']
      for (let i = 0; i < 4; i++) {
        const yy = g.y0 + 16 + i * 26
        ctx.fillStyle = CANVAS.muted
        ctx.fillText(labels[i], panelX + 10, yy + 10)
        ctx.fillStyle = CANVAS.teal
        ctx.fillRect(panelX + 32, yy, (pw - 78) * (s.genCounts[i] / maxC), 12)
        ctx.fillStyle = CANVAS.fg
        ctx.fillText(`${s.genCounts[i]}`, panelX + pw - 36, yy + 10)
      }
      ctx.fillStyle = CANVAS.muted
      ctx.fillText(`absorbed ${s.absorbed}`, panelX + 10, g.y0 + latH - 22)
      ctx.fillText(`escaped  ${s.escaped}`, panelX + 10, g.y0 + latH - 8)
      ctx.fillStyle = CANVAS.amber; ctx.font = 'bold 12px ui-monospace, monospace'
      ctx.fillText(`${(s.total * MEV_PER_FISSION).toLocaleString('en-US')} MeV`, panelX + 10, g.y0 + latH + 4)
    } else {
      ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-monospace, monospace'; ctx.textAlign = 'center'
      ctx.fillText(`absorbed ${s.absorbed} · escaped ${s.escaped} · ${(s.total * MEV_PER_FISSION).toLocaleString('en-US')} MeV`, w / 2, h - 8)
    }

    // ── banner ────────────────────────────────────────────────────────────────
    if (challenge !== 'idle') {
      ctx.textAlign = 'center'
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      if (challenge === 'active') {
        ctx.fillStyle = CANVAS.amber
        ctx.fillText('Challenge: steady power — 12 to 20 total fissions after 3 generations', w / 2, 16)
      } else {
        ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
        ctx.fillText(challenge === 'won' ? '★ Steady power achieved!' : 'Not steady — read the message below and retry!', w / 2, 16)
      }
    } else if (s.ended) {
      ctx.textAlign = 'center'
      ctx.fillStyle = CANVAS.fg; ctx.font = 'bold 12px ui-monospace, monospace'
      ctx.fillText(`chain ended · ${s.total} fissions · ${(s.total * MEV_PER_FISSION).toLocaleString('en-US')} MeV`, w / 2, 16)
    }
  }, 400)

  return (
    <SimFrame
      title="Chain Reaction Lab"
      brief="Split one U-235 nucleus and watch neutrons cascade through the lattice. Control rods (boron) absorb neutrons — tune them for steady power."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg cursor-pointer"
        style={{ height: 400 }}
        aria-label="A ten by seven lattice of uranium-235 nuclei; firing one starts a fission cascade of teal neutrons that control rods can absorb"
        role="img"
        onPointerDown={onCanvasClick}
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimToggle label="Control rods (boron)" checked={rodsOn} onChange={setRodsOn} />
        <SimSlider label="Rods in core" value={rods} min={0} max={6} step={1} onChange={setRods} disabled={!rodsOn} />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={() => fire(Math.floor(Math.random() * NUCLEI), canvasRef.current?.clientWidth ?? 640)} disabled={stats.running}>
            <Zap className="h-4 w-4 me-1" aria-hidden /> Fire neutron
          </SimButton>
          <SimButton variant="ghost" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: steady power
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Total fissions" value={`${stats.total}`} tone="text-amber-500" />
        <Readout label="Energy released" value={`${(stats.total * MEV_PER_FISSION).toLocaleString('en-US')}`} unit="MeV" />
        <Readout label="Neutrons absorbed" value={`${stats.absorbed}`} tone="text-teal-500" />
        <Readout label="Neutrons escaped" value={`${stats.escaped}`} />
        <Readout label="Chain" value={stats.running ? 'running…' : stats.ended ? 'ended' : 'ready'} />
      </div>

      {msg && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : challenge === 'lost' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`} role="status">
          {msg}
        </p>
      )}
    </SimFrame>
  )
}
