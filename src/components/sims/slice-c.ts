// ─── Physics Quest · Sims slice C (fluids + thermal, built by agent C) ───────
import type { SimComponent } from '@/lib/game/types'
import { PressureLabSim } from './c/f1-pressure-lab'
import { BuoyancyTankSim } from './c/f2-buoyancy-tank'
import { PascalLiftSim } from './c/f3-pascal-lift'
import { HeatMixingSim } from './c/t1-heat-mixing'
import { HeatTransferSim } from './c/t2-heat-transfer'
import { PhaseChangeSim } from './c/t3-phase-change'

export const simsC: Record<string, SimComponent> = {
  'pressure-lab': PressureLabSim,
  'buoyancy-tank': BuoyancyTankSim,
  'pascal-lift': PascalLiftSim,
  'heat-mixing': HeatMixingSim,
  'heat-transfer': HeatTransferSim,
  'phase-change': PhaseChangeSim,
}
