import type { SimComponent } from '@/lib/game/types'
import { EmSpectrumSim } from './o5-em-spectrum'
import { DoubleSlitSim } from './o6-double-slit'
import { SingleSlitSim } from './o7-single-slit'

/** Agent 20-a — Optics lessons o5–o7: EM spectrum, interference, diffraction. */
export const simsM: Record<string, SimComponent> = {
  'em-spectrum': EmSpectrumSim,
  'double-slit': DoubleSlitSim,
  'single-slit': SingleSlitSim,
}
