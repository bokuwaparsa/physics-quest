// ─── Physics Quest · Sim registry slice D (waves + optics o1–o2) ──────────────
import type { SimComponent } from '@/lib/game/types'
import { WaveMachineSim } from './d/w1-wave-machine'
import { SoundLabSim } from './d/w2-sound-lab'
import { DopplerEchoSim } from './d/w3-doppler-echo'
import { MirrorLaserSim } from './d/o1-mirror-laser'
import { RefractionTankSim } from './d/o2-refraction-tank'

/** simKey → component (see worklog.md simKey map). */
export const simsD: Record<string, SimComponent> = {
  'wave-machine': WaveMachineSim,
  'sound-lab': SoundLabSim,
  'doppler-echo': DopplerEchoSim,
  'mirror-laser': MirrorLaserSim,
  'refraction-tank': RefractionTankSim,
}
