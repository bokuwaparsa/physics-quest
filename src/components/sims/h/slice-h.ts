// ─── Physics Quest · Sims slice H (mechanics x4–x6, Task 16) ──────────────────
import type { SimComponent } from '@/lib/game/types'
import { RollingRaceSim } from './x4-rolling-race'
import { BeamBalanceSim } from './x5-beam-balance'
import { OrbitSandboxSim } from './x6-orbit-sandbox'

/** simKey → component (see worklog.md simKey map). */
export const simsH: Record<string, SimComponent> = {
  'rolling-race': RollingRaceSim,
  'beam-balance': BeamBalanceSim,
  'orbit-sandbox': OrbitSandboxSim,
}
