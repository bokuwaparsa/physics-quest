// ─── Physics Quest · Sim registry slice A (mechanics m2–m5) ──────────────────
import type { SimComponent } from '@/lib/game/types'
import { AccelerationLabSim } from './a/m2-acceleration-lab'
import { ForceBalanceSim } from './a/m3-force-balance'
import { NewtonCartSim } from './a/m4-newton-cart'
import { RocketThirdLawSim } from './a/m5-rocket-third-law'

/** Registered by build agent — see worklog.md. */
export const simsA: Record<string, SimComponent> = {
  'acceleration-lab': AccelerationLabSim,
  'force-balance': ForceBalanceSim,
  'newton-cart': NewtonCartSim,
  'rocket-third-law': RocketThirdLawSim,
}
