import type { SimComponent } from '@/lib/game/types'
import { FluxLabSim } from './e5-flux-lab'
import { PotentialMapSim } from './e6-potential-map'
import { CapacitorLabSim } from './e7-capacitor-lab'

/** Agent C — EM lessons e5–e7: flux & Gauss, potential, capacitance. */
export const simsK: Record<string, SimComponent> = {
  'flux-lab': FluxLabSim,
  'potential-map': PotentialMapSim,
  'capacitor-lab': CapacitorLabSim,
}
