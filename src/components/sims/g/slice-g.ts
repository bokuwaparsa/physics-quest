// ─── Physics Quest · Sims slice G (mechanics expansion x1–x3, built by agent G) ─
import type { SimComponent } from '@/lib/game/types'
import { UnitLabSim } from './x1-unit-lab'
import { VectorLabSim } from './x2-vector-lab'
import { RotationLabSim } from './x3-rotation-lab'

export const simsG: Record<string, SimComponent> = {
  'unit-lab': UnitLabSim,
  'vector-lab': VectorLabSim,
  'rotation-lab': RotationLabSim,
}
