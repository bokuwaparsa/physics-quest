import type { SimComponent } from '@/lib/game/types'
import { MotionGraphsSim } from './m1-motion-graphs'

/** Built by the orchestrator. */
export const simsMechCore: Record<string, SimComponent> = {
  'motion-graphs': MotionGraphsSim,
}
