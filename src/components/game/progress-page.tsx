// ─── Physics Quest · My Progress: stats, badges, per-lesson scores, reset ─────
'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  UNITS, allLessons, levelFor, rankFor, xpIntoLevel, SPECIAL_BADGES,
} from '@/lib/game/curriculum'
import { useGame } from '@/lib/game/progress'
import { navigate } from '@/lib/game/router'
import { UNIT_ICONS } from '@/components/game/home'
import {
  Trophy, Zap, Flame, BookOpenCheck, RotateCcw, Lock, CheckCircle2, Compass, Play,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import * as Lucide from 'lucide-react'

export function ProgressPage() {
  const state = useGame()
  const total = allLessons().length
  const mastered = useMemo(() => Object.values(state.lessons).filter((l) => l.completed).length, [state.lessons])

  const resetAll = useGame((s) => s.resetAll)

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">My Progress</h1>
          <p className="text-muted-foreground">Everything is stored in this browser only — nothing leaves your device.</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <RotateCcw className="mr-1 h-4 w-4" aria-hidden /> Reset all progress
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
              <AlertDialogDescription>
                This erases all XP, badges, streaks and quiz scores in this browser. Lessons stay unlocked —
                nothing is ever gated — but your journey starts fresh. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep my progress</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-white hover:bg-destructive/90"
                onClick={() => resetAll()}
              >
                Yes, reset everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </header>

      {/* stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Stats">
        <Stat icon={Zap} label="Total XP" value={`${state.xp}`} sub={`${xpIntoLevel(state.xp)}/300 to next level`} />
        <Stat icon={Trophy} label="Level" value={`${levelFor(state.xp)}`} sub={rankFor(state.xp)} />
        <Stat icon={BookOpenCheck} label="Mastered" value={`${mastered}/${total}`} sub="lessons" />
        <Stat icon={Flame} label="Day streak" value={`${state.streak}`} sub="play daily to grow it" />
      </section>

      {/* unit bars */}
      <section className="space-y-3" aria-label="Progress by world">
        <h2 className="text-lg font-bold">Worlds</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {UNITS.map((u) => {
            const done = u.lessonIds.filter((id) => state.lessons[id]?.completed).length
            const Icon = UNIT_ICONS[u.id]
            return (
              <div key={u.id} className="rounded-xl border bg-card px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ background: u.hex }}>
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="flex-1 text-sm font-semibold">{u.title}</p>
                  <span className="text-xs tabular-nums text-muted-foreground">{done}/{u.lessonIds.length}</span>
                </div>
                <Progress value={(done / Math.max(1, u.lessonIds.length)) * 100} className="mt-2.5 h-1.5" aria-label={`${u.title} progress`} />
              </div>
            )
          })}
        </div>
      </section>

      {/* special badges */}
      <section className="space-y-3" aria-label="Special badges">
        <h2 className="text-lg font-bold">Special badges</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SPECIAL_BADGES.map((b) => {
            const earned = state.specialBadges.includes(b.id)
            const Icon = (Lucide as unknown as Record<string, typeof Zap>)[b.icon] ?? Zap
            return (
              <div
                key={b.id}
                className={cn(
                  'rounded-xl border px-4 py-4 text-center',
                  earned ? 'border-amber-500/50 bg-amber-500/10' : 'opacity-60',
                )}
              >
                <span className={cn('mx-auto flex h-11 w-11 items-center justify-center rounded-full', earned ? 'bg-amber-500 text-white' : 'bg-muted text-muted-foreground')}>
                  {earned ? <Icon className="h-5 w-5" aria-hidden /> : <Lock className="h-4 w-4" aria-hidden />}
                </span>
                <p className="mt-2 text-sm font-bold">{b.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{b.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* all lessons table */}
      <section className="space-y-3" aria-label="Lesson scores">
        <h2 className="text-lg font-bold">Lesson scores</h2>
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-3 py-2 font-semibold">Lesson</th>
                <th className="px-3 py-2 font-semibold">Practice</th>
                <th className="px-3 py-2 font-semibold">Best quiz</th>
                <th className="px-3 py-2 font-semibold">XP</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th><span className="sr-only">Open</span></th>
              </tr>
            </thead>
            <tbody>
              {allLessons().map((l) => {
                const p = state.lessons[l.id]
                const unit = UNITS.find((u) => u.id === l.unitId)!
                return (
                  <tr key={l.id} className="border-t">
                    <td className="px-3 py-2">
                      <span className="block font-medium">{l.title}</span>
                      <span className="text-xs text-muted-foreground">{unit.title}</span>
                    </td>
                    <td className="px-3 py-2">{p?.practiceDone ? '✅' : '—'}</td>
                    <td className="px-3 py-2 tabular-nums">{p ? `${p.quizBest}%` : '—'}</td>
                    <td className="px-3 py-2 tabular-nums">{p?.xp ?? 0}/{l.xp}</td>
                    <td className="px-3 py-2">
                      {p?.completed
                        ? <Badge className="border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"><CheckCircle2 className="mr-1 h-3 w-3" aria-hidden />Mastered</Badge>
                        : <Badge variant="secondary">In progress</Badge>}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <Button size="sm" variant="ghost" onClick={() => navigate({ name: 'lesson', id: l.id })} aria-label={`Open ${l.title}`}>
                        {p?.completed ? <Compass className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function Stat({ icon: Icon, label, value, sub }: { icon: typeof Zap; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border bg-card px-4 py-3">
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-amber-500" aria-hidden /> {label}
      </p>
      <p className="mt-1 text-2xl font-extrabold tabular-nums leading-none">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  )
}
