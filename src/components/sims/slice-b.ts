import type { SimComponent } from '@/lib/game/types'
import { ProjectileRangeSim } from './b/m6-projectile-range'
import { EnergyCoasterSim } from './b/m7-energy-coaster'
import { CollisionLabSim } from './b/m8-collision-lab'
import { CircularMotionSim } from './b/m9-circular-motion'
import { SimpleMachinesSim } from './b/m10-simple-machines'

/** Unit 1 (mechanics) lessons m6–m10 — built by Agent B (task 6-b). */
export const simsB: Record<string, SimComponent> = {
  'projectile-range': ProjectileRangeSim,
  'energy-coaster': EnergyCoasterSim,
  'collision-lab': CollisionLabSim,
  'circular-motion': CircularMotionSim,
  'simple-machines': SimpleMachinesSim,
}
