// ─── Physics Quest · Free-play physics playground (sandbox mode) ──────────────
'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getSim } from '@/components/sims/registry'
import { useGame } from '@/lib/game/progress'
import { Rocket, Orbit, Waves } from 'lucide-react'

const SANDBOX = [
  { key: 'projectile-range', label: 'Launch lab', icon: Rocket, blurb: 'Angle, speed and gravity with no rules — how far can you fling things?' },
  { key: 'collision-lab', label: 'Collision lab', icon: Orbit, blurb: 'Crash pucks of any mass and speed. Momentum always balances the books.' },
  { key: 'wave-machine', label: 'Wave machine', icon: Waves, blurb: 'Stretch, squeeze and speed up waves just for fun.' },
]

const emptySubscribe = () => () => {}

export function Playground() {
  const awardSpecial = useGame((s) => s.awardSpecial)
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  useEffect(() => {
    awardSpecial('sandbox-visitor')
  }, [awardSpecial])

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Physics Playground</h1>
        <p className="max-w-2xl text-muted-foreground">
          No quizzes, no goals — just open-ended sandboxes where you can experiment freely.
          Perfect for testing wild ideas after a lesson (or before one).
        </p>
      </header>

      <Tabs defaultValue={SANDBOX[0].key} className="w-full">
        <TabsList className="flex-wrap h-auto">
          {SANDBOX.map((s) => (
            <TabsTrigger key={s.key} value={s.key} className="gap-1.5">
              <s.icon className="h-4 w-4" aria-hidden /> {s.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {SANDBOX.map((s) => {
          const Sim = getSim(s.key)
          return (
            <TabsContent key={s.key} value={s.key} className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground">{s.blurb}</p>
              {mounted ? <Sim lessonId={s.key} sandbox /> : null}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
