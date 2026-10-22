// ─── Sim: Nucleus Lab · pack Z protons + N neutrons and ride the valley ───────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, Readout, useSimCanvas,
  useSimBeep, useReducedMotion,
} from '@/components/sims/sim-kit'
import { Flag, Radiation, RotateCcw, Zap } from 'lucide-react'

const EL = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P',
  'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn']

/** Stable neutron counts N for each Z = 1..30 (hand-checked against isotope tables). */
const STABLE_N: Record<number, number[]> = {
  1: [0, 1], 2: [1, 2], 3: [3, 4], 4: [5], 5: [5, 6], 6: [6, 7], 7: [7, 8], 8: [8, 9, 10],
  9: [10], 10: [10, 11, 12], 11: [12], 12: [12, 13, 14], 13: [14], 14: [14, 15, 16], 15: [16],
  16: [16, 17, 18, 20], 17: [18, 20], 18: [18, 20, 22], 19: [20, 22],
  20: [20, 22, 23, 24, 26, 28], 21: [24], 22: [24, 25, 26, 27, 28], 23: [28],
  24: [26, 28, 29, 30], 25: [30], 26: [28, 30, 31, 32], 27: [32],
  28: [30, 32, 33, 34, 36], 29: [34, 36], 30: [34, 36, 37, 38, 40],
}

const isStable = (z: number, n: number) => (STABLE_N[z]?.includes(n) ?? false)
const nMin = (z: number) => (STABLE_N[z] ? Math.min(...STABLE_N[z]) : 0)
const nMax = (z: number) => (STABLE_N[z] ? Math.max(...STABLE_N[z]) : 99)

type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; r: number }
type Flash = { x: number; y: number; life: number }

/** Deterministic ring packing of `count` nucleons (centred on 0,0). */
function nucleonLayout(count: number): { x: number; y: number }[] {
  const pts = [{ x: 0, y: 0 }]
  let ring = 1
  while (pts.length < count && ring < 12) {
    const nInRing = ring * 6
    const r = ring * 13
    for (let i = 0; i < nInRing && pts.length < count; i++) {
      const a = (i / nInRing) * Math.PI * 2 - Math.PI / 2 + (ring % 2 ? 0.16 : -0.16)
      pts.push({ x: r * Math.cos(a), y: r * Math.sin(a) })
    }
    ring++
  }
  return pts
}

export function NucleusLabSim() {
  const [z, setZ] = useState(6)
  const [n, setN] = useState(8)
  const [decays, setDecays] = useState(0)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won' | 'lost'>('idle')
  const [msg, setMsg] = useState('')

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()
  const fx = useRef({ particles: [] as Particle[], flashes: [] as Flash[] })

  const A = z + n
  const stable = isStable(z, n)
  const be8 = z === 4 && n === 4
  const fix = stable ? '—' : n > nMax(z) ? 'β⁻' : n < nMin(z) ? 'β⁺/EC' : '—'

  const pushFx = (kind: 'alpha' | 'beta') => {
    if (reducedMotion) return
    const cx = Math.max(96, 0.3 * 640) // approximate nucleus centre used by the draw fn
    const cy = 214
    const a = Math.random() * Math.PI * 2
    if (kind === 'alpha') {
      const px = -Math.sin(a), py = Math.cos(a)
      const cols = [CANVAS.amber, CANVAS.teal, CANVAS.teal, CANVAS.amber]
      for (let i = 0; i < 4; i++) {
        const off = (i - 1.5) * 9
        fx.current.particles.push({ x: cx + Math.cos(a) * 60 + px * off, y: cy + Math.sin(a) * 60 + py * off, vx: Math.cos(a) * 150, vy: Math.sin(a) * 150, life: 0.9, color: cols[i], r: 5 })
      }
    } else {
      fx.current.particles.push({ x: cx + Math.cos(a) * 60, y: cy + Math.sin(a) * 60, vx: Math.cos(a) * 230, vy: Math.sin(a) * 230, life: 0.7, color: CANVAS.rose, r: 3.5 })
    }
    fx.current.flashes.push({ x: cx, y: cy, life: 0.5 })
  }

  const afterDecay = (zv: number, nv: number, used: number) => {
    if (challenge !== 'active') { setMsg(''); return }
    const a2 = zv + nv
    if (isStable(zv, nv) && a2 === 20) {
      setChallenge('won')
      beep(660, 120); beep(880, 160)
      setMsg(`★ ${EL[zv - 1]}-${a2} (Z=${zv}, N=${nv}) is stable and A stayed 20 — one β⁻ (neutron → proton) fixed the neutron-rich nucleus!`)
    } else if (used >= 2) {
      setChallenge('lost')
      setMsg(a2 !== 20
        ? `${EL[zv - 1]}-${a2} may be stable, but α changed A (${a2} ≠ 20) — α is the wrong tool here. Reset the challenge to retry!`
        : 'Two decays used and still unstable. The winning move is a single β⁻ (n → p). Reset to retry!')
    } else {
      setMsg(`${EL[zv - 1]}-${a2} (Z=${zv}, N=${nv}). One decay left — and A must stay 20.`)
    }
  }

  const fireAlpha = () => {
    if (z < 3) { setMsg('Too light for α decay — α particles (He-4) only escape from heavy nuclei.'); return }
    const zv = z - 2, nv = Math.max(0, n - 2)
    pushFx('alpha')
    setZ(zv); setN(nv)
    const used = decays + 1
    setDecays(used)
    afterDecay(zv, nv, used)
  }

  const fireBeta = () => {
    if (n < 1) { setMsg('No neutrons left to convert — β⁻ decay needs a neutron (n → p).'); return }
    if (z + 1 > 30) { setMsg('That leaves the lab bench (Z > 30 not modelled here).'); return }
    const zv = z + 1, nv = n - 1
    pushFx('beta')
    setZ(zv); setN(nv)
    const used = decays + 1
    setDecays(used)
    afterDecay(zv, nv, used)
  }

  const startChallenge = () => {
    setZ(9); setN(11); setDecays(0)
    setChallenge('active')
    setMsg('F-20 (Z=9, N=11) is neutron-rich and unstable. Make it stable with at most 2 decays — and keep A = 20. (α changes A; β⁻ does not!)')
  }

  const reset = () => {
    setZ(6); setN(8); setDecays(0)
    setChallenge('idle'); setMsg('')
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const f = fx.current
    const cx = Math.max(96, w * 0.3)
    const cy = 214

    // ── fx physics ────────────────────────────────────────────────────────────
    if (reducedMotion) { f.particles = []; f.flashes = [] }
    for (const p of f.particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt }
    f.particles = f.particles.filter((p) => p.life > 0)
    for (const fl of f.flashes) fl.life -= dt
    f.flashes = f.flashes.filter((fl) => fl.life > 0)

    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)

    // ── isotope label + verdict ───────────────────────────────────────────────
    ctx.textAlign = 'center'
    ctx.fillStyle = CANVAS.fg
    ctx.font = 'bold 24px ui-monospace, monospace'
    ctx.fillText(`${EL[z - 1]}-${A}`, cx, 52)
    ctx.fillStyle = CANVAS.muted
    ctx.font = '11px ui-monospace, monospace'
    ctx.fillText(`Z = ${z}   N = ${n}`, cx, 70)
    ctx.font = 'bold 15px ui-sans-serif, system-ui'
    ctx.fillStyle = stable ? CANVAS.emerald : CANVAS.rose
    ctx.fillText(stable ? 'STABLE ✓' : 'UNSTABLE ✗', cx, 96)

    // ── nucleon cluster (protons amber, neutrons teal, packed in a ball) ──────
    const pts = nucleonLayout(A)
    let leftP = z, leftN = n
    for (let i = 0; i < pts.length; i++) {
      const isP = leftP > 0 && (i % 2 === 0 || leftN === 0)
      if (isP) leftP--; else leftN--
      ctx.fillStyle = isP ? CANVAS.amber : CANVAS.teal
      ctx.beginPath(); ctx.arc(cx + pts[i].x, cy + pts[i].y, 5.4, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.arc(cx + pts[i].x, cy + pts[i].y, 5.4, 0, Math.PI * 2); ctx.stroke()
    }
    // legend
    ctx.textAlign = 'left'
    ctx.fillStyle = CANVAS.amber; ctx.beginPath(); ctx.arc(24, h - 14, 4, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = CANVAS.muted; ctx.font = '11px ui-sans-serif, system-ui'
    ctx.fillText('proton', 33, h - 10)
    ctx.fillStyle = CANVAS.teal; ctx.beginPath(); ctx.arc(96, h - 14, 4, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = CANVAS.muted; ctx.fillText('neutron', 105, h - 10)

    // ── decay suggestion ──────────────────────────────────────────────────────
    ctx.textAlign = 'center'
    ctx.font = 'bold 12px ui-sans-serif, system-ui'
    if (be8) {
      ctx.fillStyle = CANVAS.rose
      ctx.fillText('Be-8 cannot hold: it instantly splits into two α particles!', cx, h - 34)
    } else if (!stable) {
      ctx.fillStyle = CANVAS.amber
      ctx.fillText(n > nMax(z)
        ? 'Too many neutrons → β⁻ decay (n → p) suggested'
        : 'Too few neutrons → β⁺ / electron capture (p → n) suggested', cx, h - 34)
    } else {
      ctx.fillStyle = CANVAS.emerald
      ctx.fillText('Inside the valley of stability — nothing to fix', cx, h - 34)
    }

    // ── valley-of-stability chart (right) ────────────────────────────────────
    const bx = w - 166, by = 64, bw = 150, bh = 272
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(bx, by, bw, bh)
    ctx.strokeStyle = CANVAS.grid; ctx.lineWidth = 1
    ctx.strokeRect(bx, by, bw, bh)
    ctx.fillStyle = CANVAS.muted; ctx.font = '10px ui-monospace, monospace'
    ctx.fillText('valley of stability', bx + bw / 2, by - 8)
    const toX = (zz: number) => bx + 10 + (zz / 31) * (bw - 22)
    const toY = (nn: number) => by + bh - 14 - (nn / 35) * (bh - 30)
    ctx.fillStyle = CANVAS.teal
    for (let zz = 1; zz <= 30; zz++) for (const nn of (STABLE_N[zz] ?? [])) ctx.fillRect(toX(zz) - 1.2, toY(nn) - 1.2, 2.4, 2.4)
    ctx.fillStyle = CANVAS.muted
    ctx.textAlign = 'right'; ctx.fillText('N=35', bx + 12, by + 14)
    ctx.textAlign = 'left'; ctx.fillText('Z=31', bx + bw - 34, by + bh - 10)
    // current position
    const px2 = toX(z), py2 = toY(n)
    ctx.strokeStyle = 'rgba(250,250,249,0.25)'; ctx.setLineDash([3, 3])
    ctx.beginPath(); ctx.moveTo(bx + 10, py2); ctx.lineTo(px2, py2); ctx.lineTo(px2, by + bh - 14); ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = stable ? CANVAS.emerald : CANVAS.amber
    ctx.beginPath(); ctx.arc(px2, py2, 4.5, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = CANVAS.fg; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(px2, py2, 6.5, 0, Math.PI * 2); ctx.stroke()

    // ── decay fx ──────────────────────────────────────────────────────────────
    for (const fl of f.flashes) {
      ctx.globalAlpha = Math.max(0, fl.life / 0.5) * 0.7
      ctx.strokeStyle = CANVAS.yellow; ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(fl.x, fl.y, 30 + (0.5 - fl.life) * 90, 0, Math.PI * 2); ctx.stroke()
      ctx.globalAlpha = 1
    }
    for (const pt of f.particles) {
      ctx.globalAlpha = Math.max(0, pt.life)
      ctx.fillStyle = pt.color
      ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1
    }

    // ── challenge banner ──────────────────────────────────────────────────────
    if (challenge !== 'idle') {
      ctx.textAlign = 'center'
      ctx.font = 'bold 12px ui-sans-serif, system-ui'
      if (challenge === 'active') {
        ctx.fillStyle = CANVAS.amber
        ctx.fillText('Challenge: turn F-20 stable in ≤ 2 decays, keeping A = 20', w / 2, 18)
        ctx.fillText(`decays used: ${decays}`, w / 2, 33)
      } else {
        ctx.fillStyle = challenge === 'won' ? CANVAS.emerald : CANVAS.rose
        ctx.fillText(challenge === 'won' ? '★ Challenge complete — Ne-20 stable!' : 'Out of decays — the nucleus is still not right. Retry!', w / 2, 18)
      }
    }
  }, 400)

  return (
    <SimFrame
      title="Nucleus Lab"
      brief="Dial in protons Z and neutrons N, see if the nucleus sits in the valley of stability, then fire α or β⁻ decays to fix it."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg"
        style={{ height: 400 }}
        aria-label="A ball of amber protons and teal neutrons with a valley-of-stability chart showing whether the chosen isotope is stable"
        role="img"
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Protons Z" value={z} min={1} max={30} step={1} onChange={setZ} disabled={challenge === 'active'} />
        <SimSlider label="Neutrons N" value={n} min={0} max={35} step={1} onChange={setN} disabled={challenge === 'active'} />
        <div className="flex flex-wrap gap-2">
          <SimButton onClick={fireAlpha}>
            <Radiation className="h-4 w-4 me-1" aria-hidden /> Fire α
          </SimButton>
          <SimButton onClick={fireBeta}>
            <Zap className="h-4 w-4 me-1" aria-hidden /> Fire β⁻
          </SimButton>
          <SimButton variant="ghost" onClick={reset}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: tame F-20
          </SimButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Readout label="Nucleus" value={`${EL[z - 1]}-${A}`} />
        <Readout label="Mass number A" value={`${A}`} />
        <Readout label="Verdict" value={stable ? 'stable' : 'unstable'} tone={stable ? 'text-emerald-500' : 'text-rose-500'} />
        <Readout label="Suggested fix" value={fix} tone={stable ? '' : 'text-amber-500'} />
        <Readout label="Decays used" value={`${decays}`} />
      </div>

      {msg && (
        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : challenge === 'lost' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`} role="status">
          {msg}
        </p>
      )}
    </SimFrame>
  )
}
