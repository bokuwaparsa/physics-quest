import type { SimComponent } from '@/lib/game/types'
import { PhotoelectricLabSim } from './p4-photoelectric-lab'
import { MatterWaveSlitSim } from './p5-matter-wave-slit'
import { AtomLevelsSim } from './p6-atom-levels'
import { BandGapLabSim } from './p7-band-gap-lab'

/** Agent B — Modern physics lessons p4–p7: photons, matter waves, atomic levels, band theory. */
export const simsN: Record<string, SimComponent> = {
  'photoelectric-lab': PhotoelectricLabSim,
  'matter-wave-slit': MatterWaveSlitSim,
  'atom-levels': AtomLevelsSim,
  'band-gap-lab': BandGapLabSim,
}
