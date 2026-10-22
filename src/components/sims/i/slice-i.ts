// ─── Physics Quest · Sims slice I (waves w4 + thermal t4–t5, Task 16) ─────────
import type { SimComponent } from '@/lib/game/types'
import { ShmLabSim } from './w4-shm-lab'
import { GasBoxSim } from './t4-gas-box'
import { HeatEngineSim } from './t5-heat-engine'

/** simKey → component (see worklog.md simKey map). */
export const simsI: Record<string, SimComponent> = {
  'shm-lab': ShmLabSim,
  'gas-box': GasBoxSim,
  'heat-engine': HeatEngineSim,
}
