import type { SimComponent } from '@/lib/game/types'
import { SeriesParallelSim } from './f/e3-series-parallel'
import { ElectromagnetSim } from './f/e4-electromagnet'
import { AtomBuilderSim } from './f/p1-atom-builder'
import { HalfLifeSim } from './f/p2-half-life'
import { RelativityClockSim } from './f/p3-relativity-clock'

/** Agent F — electricity e3–e4 + modern physics p1–p3. */
export const simsF: Record<string, SimComponent> = {
  'series-parallel': SeriesParallelSim,
  'electromagnet': ElectromagnetSim,
  'atom-builder': AtomBuilderSim,
  'half-life': HalfLifeSim,
  'relativity-clock': RelativityClockSim,
}
