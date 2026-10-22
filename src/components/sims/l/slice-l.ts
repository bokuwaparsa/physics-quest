// ─── Physics Quest · Sims slice L (EM e8–e10, Task 19-b) ──────────────────────
import type { SimComponent } from '@/lib/game/types'
import { ChargeBFieldSim } from './e8-charge-b-field'
import { InductionCoilSim } from './e9-induction-coil'
import { RlcResonanceSim } from './e10-rlc-resonance'

/** simKey → component (see worklog.md simKey map). */
export const simsL: Record<string, SimComponent> = {
  'charge-b-field': ChargeBFieldSim,
  'induction-coil': InductionCoilSim,
  'rlc-resonance': RlcResonanceSim,
}
