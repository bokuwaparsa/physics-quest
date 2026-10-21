// ─── Sim: Doppler & Echo · moving siren wavefronts + sonar ranging ────────────
'use client'

import { useRef, useState } from 'react'
import {
  CANVAS, SimFrame, SimButton, SimSlider, SimToggle, Readout, useSimCanvas,
  useSimBeep, useReducedMotion, drawGrid,
} from '@/components/sims/sim-kit'
import { Input } from '@/components/ui/input'
import { Play, Pause, RotateCcw, Send, Flag, Sparkles } from 'lucide-react'

const VW = 105 // visual wavefront speed, px/s (ratios are honest, scale is not)
const V_SOUND = 343 // m/s

interface Front { x: number; r: number; counted: boolean }
interface Chirp { x: number; dir: 1 | -1 }

export function DopplerEchoSim() {
  const [mode, setMode] = useState<'doppler' | 'echo'>('doppler')
  const [running, setRunning] = useState(false)
  const [vs, setVs] = useState(20)
  const [f, setF] = useState(700)
  const [challenge, setChallenge] = useState<'idle' | 'active' | 'won'>('idle')
  const [result, setResult] = useState('')
  const [echo, setEcho] = useState<{ t: number; d: number } | null>(null)
  const [typed, setTyped] = useState('')
  const [chirping, setChirping] = useState(false)
  const [wallD, setWallD] = useState(420)

  const beep = useSimBeep()
  const reducedMotion = useReducedMotion()

  const st = useRef({
    mode: 'doppler' as 'doppler' | 'echo',
    running: false, vs: 20, f: 700, wallD: 420,
    sx: 60, acc: 0,
    fronts: [] as Front[],
    chirp: null as Chirp | null,
    flashWall: 0, flashListen: 0,
    challenge: 'idle' as 'idle' | 'active' | 'won',
  })

  const fAhead = (f * V_SOUND) / (V_SOUND - vs)
  const fBehind = (f * V_SOUND) / (V_SOUND + vs)

  const stopMotion = () => {
    st.current.sx = 60
    st.current.acc = 0
    st.current.fronts = []
    st.current.chirp = null
    setRunning(false)
    setEcho(null)
    setTyped('')
    setChirping(false)
  }

  const toggleEcho = (on: boolean) => {
    setMode(on ? 'echo' : 'doppler')
    stopMotion()
    setResult('')
  }

  const startChallenge = () => {
    setMode('echo')
    stopMotion()
    setWallD(343)
    setChallenge('active')
    setResult('Send a chirp, read the echo time t, then type the wall distance: d = 343 × t ÷ 2 (metres).')
  }

  const newWall = () => {
    stopMotion()
    setChallenge('idle')
    setWallD(Math.round(220 + Math.random() * 340))
    setResult('')
  }

  const sendChirp = () => {
    if (!st.current.chirp) {
      st.current.chirp = { x: 90, dir: 1 }
      setEcho(null)
      setTyped('')
      setChirping(true)
    }
  }

  const checkAnswer = () => {
    const val = parseFloat(typed.replace(',', '.'))
    const d = wallD
    const t = (2 * d) / V_SOUND
    if (Number.isFinite(val) && Math.abs(val - d) <= 0.01 * d) {
      setChallenge('won')
      setResult(`d = 343 × ${t.toFixed(2)} ÷ 2 = ${d.toFixed(0)} m — sonar solved! Bats and submarines do this without thinking.`)
      beep(660, 140); beep(990, 200)
    } else {
      setResult('Not quite — use d = v·t ÷ 2 with v = 343 m/s and the exact echo time shown. (The ÷2 is because the chirp flies there AND back.)')
    }
  }

  const { canvasRef } = useSimCanvas((ctx, w, h, _t, dt) => {
    const s = st.current
    s.mode = mode
    s.running = running
    s.vs = vs
    s.f = f
    s.wallD = wallD
    s.challenge = challenge
    const roadY = 200

    // ── physics ────────────────────────────────────────────────────────────
    if (s.mode === 'doppler' && s.running) {
      s.acc += dt
      if (s.acc >= 0.5) {
        s.acc = 0
        s.fronts.push({ x: s.sx, r: 0, counted: false })
      }
      s.sx += s.vs * (VW / V_SOUND) * dt
      if (s.sx > w - 130) { s.sx = 60; s.fronts = [] }
      const lx = w - 70
      for (const fr of s.fronts) {
        fr.r += VW * dt
        if (!fr.counted && fr.r >= Math.abs(lx - fr.x)) {
          fr.counted = true
          s.flashListen = 1
          const fHeard = (s.f * V_SOUND) / Math.max(1, V_SOUND - s.vs)
          beep(fHeard, 45, 'sine', 0.02)
        }
      }
      s.fronts = s.fronts.filter((fr) => fr.r < 340)
    }
    if (s.mode === 'echo' && s.chirp) {
      s.chirp.x += s.chirp.dir * 300 * dt
      const wx = w - 60
      if (s.chirp.dir === 1 && s.chirp.x >= wx) {
        s.chirp.dir = -1
        s.flashWall = 1
        beep(700, 60, 'square', 0.03)
      }
      if (s.chirp.dir === -1 && s.chirp.x <= 90) {
        s.chirp = null
        setChirping(false)
        const t = (2 * s.wallD) / V_SOUND
        setEcho({ t, d: s.wallD })
        beep(520, 100, 'sine', 0.04)
        setResult(s.challenge === 'active'
          ? `Echo returned after ${t.toFixed(2)} s. Now type the wall distance: d = 343 × ${t.toFixed(2)} ÷ 2.`
          : `Echo returned after ${t.toFixed(2)} s → distance = 343 × ${t.toFixed(2)} ÷ 2 = ${s.wallD.toFixed(0)} m.`)
      }
    }
    s.flashWall = Math.max(0, s.flashWall - dt * 2)
    s.flashListen = Math.max(0, s.flashListen - dt * 2.5)

    // ── drawing ────────────────────────────────────────────────────────────
    ctx.fillStyle = CANVAS.bg
    ctx.fillRect(0, 0, w, h)
    drawGrid(ctx, w, h, 40)

    // road
    ctx.fillStyle = CANVAS.panel
    ctx.fillRect(0, roadY - 42, w, 84)
    ctx.strokeStyle = CANVAS.muted
    ctx.lineWidth = 1
    ctx.setLineDash([10, 12])
    ctx.beginPath(); ctx.moveTo(0, roadY); ctx.lineTo(w, roadY); ctx.stroke()
    ctx.setLineDash([])

    if (s.mode === 'doppler') {
      // wavefront circles
      for (const fr of s.fronts) {
        ctx.strokeStyle = CANVAS.violet
        ctx.globalAlpha = Math.max(0, 0.8 * (1 - fr.r / 340))
        ctx.lineWidth = 2
        ctx.beginPath(); ctx.arc(fr.x, roadY, fr.r, 0, Math.PI * 2); ctx.stroke()
      }
      ctx.globalAlpha = 1

      // listener
      const lx = w - 70
      ctx.fillStyle = CANVAS.emerald
      ctx.beginPath(); ctx.arc(lx, roadY - 14, 6, 0, Math.PI * 2); ctx.fill()
      ctx.fillRect(lx - 5, roadY - 8, 10, 18)
      ctx.fillStyle = CANVAS.muted
      ctx.font = '10px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('listener', lx, roadY + 34)
      if (s.flashListen > 0) {
        ctx.strokeStyle = CANVAS.emerald
        ctx.globalAlpha = s.flashListen
        ctx.lineWidth = 2
        ctx.beginPath(); ctx.arc(lx, roadY - 6, 12 + (1 - s.flashListen) * 16, 0, Math.PI * 2); ctx.stroke()
        ctx.globalAlpha = 1
      }

      // moving siren
      ctx.fillStyle = CANVAS.violet
      ctx.beginPath(); ctx.arc(s.sx, roadY, 9, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = CANVAS.fg
      ctx.beginPath(); ctx.arc(s.sx - 3, roadY - 2, 1.8, 0, Math.PI * 2); ctx.arc(s.sx + 3, roadY - 2, 1.8, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = CANVAS.muted
      ctx.textAlign = 'center'
      ctx.fillText(`siren · ${s.vs} m/s →`, s.sx, roadY + 34)

      ctx.fillStyle = CANVAS.muted
      ctx.font = '11px ui-sans-serif, system-ui'
      ctx.textAlign = 'left'
      ctx.fillText('wavefronts bunch AHEAD (higher pitch) and stretch BEHIND (lower pitch) · spacing ratios real, scale not', 16, h - 12)
    } else {
      // echo / sonar mode
      const srcX = 90
      const wx = w - 60

      // wall
      ctx.fillStyle = s.flashWall > 0 ? CANVAS.emerald : CANVAS.panelLight
      ctx.fillRect(wx, roadY - 70, 10, 140)
      ctx.strokeStyle = CANVAS.muted
      ctx.lineWidth = 1
      for (let yy = roadY - 66; yy < roadY + 66; yy += 12) {
        ctx.beginPath(); ctx.moveTo(wx, yy); ctx.lineTo(wx + 10, yy + 6); ctx.stroke()
      }
      ctx.fillStyle = CANVAS.muted
      ctx.font = '10px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('wall (distance hidden!)', wx, roadY + 84)

      // source
      ctx.fillStyle = CANVAS.violet
      ctx.beginPath(); ctx.arc(srcX, roadY, 9, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = CANVAS.muted
      ctx.fillText('you (sonar)', srcX, roadY + 34)

      // distance ruler is intentionally omitted: no metre marks in echo mode
      ctx.fillStyle = CANVAS.muted
      ctx.font = '11px ui-sans-serif, system-ui'
      ctx.textAlign = 'left'
      ctx.fillText('chirp speed 343 m/s · the wall is somewhere to the right — measure it with sound', 16, h - 12)

      // chirp packet
      if (s.chirp) {
        ctx.strokeStyle = CANVAS.amber
        ctx.globalAlpha = 0.4
        ctx.lineWidth = 2
        ctx.beginPath(); ctx.arc(s.chirp.x, roadY, 14, 0, Math.PI * 2); ctx.stroke()
        ctx.globalAlpha = 1
        ctx.fillStyle = CANVAS.amber
        ctx.beginPath(); ctx.arc(s.chirp.x, roadY, 6, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = CANVAS.muted
        ctx.textAlign = 'center'
        ctx.fillText(s.chirp.dir === 1 ? 'chirp →' : '← echo', s.chirp.x, roadY - 20)
      }
      if (s.flashWall > 0) {
        ctx.strokeStyle = CANVAS.emerald
        ctx.globalAlpha = s.flashWall
        ctx.lineWidth = 3
        ctx.beginPath(); ctx.arc(wx + 5, roadY, 16 + (1 - s.flashWall) * 20, 0, Math.PI * 2); ctx.stroke()
        ctx.globalAlpha = 1
      }
    }

    if (s.challenge === 'won') {
      ctx.fillStyle = CANVAS.emerald
      ctx.font = 'bold 13px ui-sans-serif, system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('★ Challenge complete — you ranged the wall like a bat!', w / 2, 26)
    }
  }, 400)

  return (
    <SimFrame
      title="Doppler & Echo Lab"
      brief="Left: a moving siren bunches its wavefronts ahead and stretches them behind. Toggle echo mode to range a hidden wall with sound — slow motion, ratios real."
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg"
        style={{ height: 400 }}
        aria-label="Doppler effect lab: a moving siren emitting wavefront circles toward a listener, with an echo mode showing a chirp travelling to a wall and back"
        role="img"
      />

      <div className="flex flex-wrap items-end gap-3">
        <SimSlider label="Siren speed vₛ" value={vs} min={0} max={50} step={1} unit="m/s" onChange={setVs} disabled={mode === 'echo'} />
        <SimSlider label="Siren pitch f" value={f} min={200} max={1000} step={10} unit="Hz" onChange={setF} />
        <SimToggle label="Echo mode (sonar)" checked={mode === 'echo'} onChange={toggleEcho} className="pb-1.5" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-wrap gap-2">
          {mode === 'doppler' && (
            <SimButton onClick={() => setRunning((r) => !r)}>
              {running ? <Pause className="h-4 w-4 me-1" aria-hidden /> : <Play className="h-4 w-4 me-1" aria-hidden />}
              {running ? 'Pause' : 'Play'}
            </SimButton>
          )}
          {mode === 'echo' && (
            <SimButton onClick={sendChirp} disabled={chirping}>
              <Send className="h-4 w-4 me-1" aria-hidden /> Send chirp
            </SimButton>
          )}
          <SimButton variant="secondary" onClick={() => { stopMotion(); setResult('') }}>
            <RotateCcw className="h-4 w-4 me-1" aria-hidden /> Reset
          </SimButton>
          <SimButton
            variant={challenge === 'active' ? 'destructive' : 'outline'}
            onClick={startChallenge}
            disabled={challenge === 'won'}
          >
            <Flag className="h-4 w-4 me-1" aria-hidden /> Challenge: range the wall
          </SimButton>
          {challenge === 'won' && (
            <SimButton variant="secondary" onClick={newWall}>
              <Sparkles className="h-4 w-4 me-1" aria-hidden /> New hidden wall
            </SimButton>
          )}
        </div>
      </div>

      {challenge === 'active' && (
        <div className="flex flex-wrap items-center gap-2">
          <Input
            aria-label="Wall distance in metres"
            inputMode="decimal"
            value={typed}
            placeholder="wall distance?"
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            disabled={!echo}
            className="font-mono max-w-[160px]"
          />
          <SimButton onClick={checkAnswer} disabled={!echo || !typed}>Check</SimButton>
          <span className="text-xs text-muted-foreground">Type the distance in metres, then press Check.</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {mode === 'doppler' ? (
          <>
            <Readout label="Heard ahead f′" value={fAhead.toFixed(0)} unit="Hz" tone="text-violet-500" />
            <Readout label="Heard behind f′" value={fBehind.toFixed(0)} unit="Hz" tone="text-teal-500" />
            <Readout label="Emitted f" value={f.toFixed(0)} unit="Hz" />
          </>
        ) : (
          <>
            <Readout label="Echo time t" value={echo ? echo.t.toFixed(2) : '—'} unit="s" tone="text-amber-500" />
            {challenge === 'idle' && echo && (
              <Readout label="Distance 343·t/2" value={echo.d.toFixed(0)} unit="m" tone="text-emerald-500" />
            )}
            {challenge === 'won' && (
              <Readout label="Wall distance" value={wallD.toFixed(0)} unit="m" tone="text-emerald-500" />
            )}
          </>
        )}
      </div>

      {result && (
        <p
          className={`text-sm font-medium rounded-lg px-3 py-2 ${challenge === 'won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted/60 text-foreground'}`}
          role="status"
        >
          {result}
        </p>
      )}
    </SimFrame>
  )
}
