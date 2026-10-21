import type { SimComponent } from '@/lib/game/types'
import { LensBenchSim } from './e/o3-lens-bench'
import { ColorMixerSim } from './e/o4-color-mixer'
import { ChargeFieldSim } from './e/e1-charge-field'
import { OhmCircuitSim } from './e/e2-ohm-circuit'

/** Sims built by agent E — see worklog.md. */
export const simsE: Record<string, SimComponent> = {
  'lens-bench': LensBenchSim,
  'color-mixer': ColorMixerSim,
  'charge-field': ChargeFieldSim,
  'ohm-circuit': OhmCircuitSim,
}
