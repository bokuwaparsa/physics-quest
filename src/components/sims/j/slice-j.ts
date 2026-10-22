// ─── Physics Quest · Sim registry slice J (waves w5–w6, Task 15) ──────────────
import type { SimComponent } from '@/lib/game/types'
import { StandingWavesSim } from './w5-standing-waves'
import { BeatsLabSim } from './w6-beats-lab'

/** simKey → component (see worklog.md simKey map). */
export const simsJ: Record<string, SimComponent> = {
  'standing-waves': StandingWavesSim,
  'beats-lab': BeatsLabSim,
}
