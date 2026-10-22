// ─── Physics Quest · Simulation registry ──────────────────────────────────────
'use client'

import type { SimComponent } from '@/lib/game/types'
import { simsMechCore } from './mech-core'
import { simsA } from './slice-a'
import { simsB } from './slice-b'
import { simsC } from './slice-c'
import { simsD } from './slice-d'
import { simsE } from './slice-e'
import { simsF } from './slice-f'
import { simsG } from './g/slice-g'
import { simsH } from './h/slice-h'
import { simsI } from './i/slice-i'

export const SIMS: Record<string, SimComponent> = {
  ...simsMechCore,
  ...simsA,
  ...simsB,
  ...simsC,
  ...simsD,
  ...simsE,
  ...simsF,
  ...simsG,
  ...simsH,
  ...simsI,
}

function SimMissing({ lessonId }: { lessonId: string }) {
  return (
    <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
      Simulation “{lessonId}” is not registered.
    </div>
  )
}

export function getSim(key: string): SimComponent {
  return SIMS[key] ?? SimMissing
}
