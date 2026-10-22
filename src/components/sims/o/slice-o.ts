import type { SimComponent } from '@/lib/game/types'
import { NucleusLabSim } from './p8-nucleus-lab'
import { ChainReactionSim } from './p9-chain-reaction'
import { QuarkBuilderSim } from './p10-quark-builder'

/** Agent 20-c — modern physics p8–p10. */
export const simsO: Record<string, SimComponent> = {
  'nucleus-lab': NucleusLabSim,
  'chain-reaction': ChainReactionSim,
  'quark-builder': QuarkBuilderSim,
}
