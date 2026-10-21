// ─── Physics Quest · Home = mission control with the world map grid ──────────
'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UNITS, allLessons, levelFor, rankFor, xpIntoLevel } from '@/lib/game/curriculum'
import { useGame } from '@/lib/game/progress'
import { navigate } from '@/lib/game/router'
import { RichText } from '@/components/game/tex'
import type { Lesson, UnitId } from '@/lib/game/types'
import {
  Rocket, Droplets, Flame, Waves, Sun, Zap, Atom, Search, Play,
  Zap as XpIcon, Trophy, BookOpenCheck, Compass,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export const UNIT_ICONS: Record<UnitId, typeof Rocket> = {
  mechanics: Rocket, fluids: Droplets, thermal: Flame, waves: Waves,
  optics: Sun, em: Zap, modern: Atom,
}

const DIFF_DOT: Record<Lesson['difficulty'], string> = {
  easy: 'bg-emerald-500', standard: 'bg-amber-500', challenge: 'bg-rose-500',
}

export function Home() {
  const lessons = useGame((s) => s.lessons)
  const xp = useGame((s) => s.xp)
  const streak = useGame((s) => s.streak)

  const [query, setQuery] = useState('')
  const [unitFilter, setUnitFilter] = useState<UnitId | 'all'>('all')
  const [diffFilter, setDiffFilter] = useState<Lesson['difficulty'] | 'all'>('all')

  const masteredCount = useMemo(
    () => Object.values(lessons).filter((l) => l.completed).length,
    [lessons],
  )
  const total = allLessons().length

  const continueLesson = useMemo(() => {
    const list = allLessons()
    return list.find((l) => !lessons[l.id]?.completed) ?? list[0]
  }, [lessons])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allLessons().filter((l) => {
      if (unitFilter !== 'all' && l.unitId !== unitFilter) return false
      if (diffFilter !== 'all' && l.difficulty !== diffFilter) return false
      if (!q) return true
      return [l.title, l.tagline, ...l.objectives].join(' ').toLowerCase().includes(q)
    })
  }, [query, unitFilter, diffFilter])

  const searching = query.trim() !== '' || unitFilter !== 'all' || diffFilter !== 'all'

  return (
    <div className="space-y-8">
      {/* hero */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/10 px-5 py-8 sm:px-8 sm:py-12">
        <div className="relative z-10 max-w-2xl space-y-4">
          <Badge variant="outline" className="border-amber-500/40 text-amber-700 dark:text-amber-400">
            Free · Open · No account needed
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Physics Quest
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Learn physics by playing: {total} interactive lessons across 7 worlds — with live
            simulations, guided practice, quizzes and badges. Original curriculum for
            middle school &amp; early high school.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {continueLesson && (
              <Button size="lg" onClick={() => navigate({ name: 'lesson', id: continueLesson.id })}>
                <Play className="mr-1.5 h-4 w-4" aria-hidden />
                {masteredCount === 0 ? 'Start your quest' : 'Continue'}: {continueLesson.title}
              </Button>
            )}
            <Button size="lg" variant="secondary" onClick={() => navigate({ name: 'playground' })}>
              <Compass className="mr-1.5 h-4 w-4" aria-hidden /> Physics Playground
            </Button>
          </div>
        </div>
        {/* decorative orbit */}
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border-4 border-dashed border-amber-500/20" />
        <div aria-hidden className="pointer-events-none absolute -right-6 top-10 h-24 w-24 rounded-full border-2 border-emerald-500/20" />
      </section>

      {/* stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Your progress">
        <StatCard icon={XpIcon} label="Total XP" value={`${xp}`} sub={`${xpIntoLevel(xp)}/300 to next level`} />
        <StatCard icon={Trophy} label="Level" value={`${levelFor(xp)}`} sub={rankFor(xp)} />
        <StatCard icon={BookOpenCheck} label="Mastered" value={`${masteredCount}/${total}`} sub="lessons complete" />
        <StatCard icon={Flame} label="Streak" value={`${streak}`} sub={streak === 1 ? 'day in a row' : 'days in a row'} />
      </section>

      {/* search + filters */}
      <section className="space-y-3" aria-label="Search lessons">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lessons: gravity, circuits, waves…"
              aria-label="Search lessons"
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={unitFilter} onValueChange={(v) => setUnitFilter(v as UnitId | 'all')}>
              <SelectTrigger className="w-[170px]" aria-label="Filter by world">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All worlds</SelectItem>
                {UNITS.map((u) => <SelectItem key={u.id} value={u.id}>{u.title}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={diffFilter} onValueChange={(v) => setDiffFilter(v as Lesson['difficulty'] | 'all')}>
              <SelectTrigger className="w-[130px]" aria-label="Filter by difficulty">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any level</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="challenge">Challenge</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* search results */}
      {searching && (
        <section aria-label="Search results" className="space-y-3">
          <h2 className="text-lg font-bold">
            {filtered.length} lesson{filtered.length === 1 ? '' : 's'} found
          </h2>
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              Nothing matched. Try “energy”, “light”, “momentum”…
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((l) => <LessonChip key={l.id} lesson={l} done={!!lessons[l.id]?.completed} />)}
            </div>
          )}
        </section>
      )}

      {/* world map */}
      {!searching && (
        <section aria-label="World map" className="space-y-5">
          <h2 className="text-xl font-bold">Choose your world</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {UNITS.map((u) => {
              const Icon = UNIT_ICONS[u.id]
              const uLessons = u.lessonIds.map((id) => allLessons().find((l) => l.id === id)!).filter(Boolean)
              const done = uLessons.filter((l) => lessons[l.id]?.completed).length
              return (
                <div key={u.id} className="rounded-xl border bg-card overflow-hidden flex flex-col">
                  <div className="flex items-start gap-3 border-b bg-muted/30 px-4 py-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
                      style={{ background: u.hex }}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold leading-tight">{u.title}</h3>
                      <p className="text-xs text-muted-foreground">{u.tagline}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 tabular-nums">{done}/{uLessons.length}</Badge>
                  </div>
                  <div className="px-4 py-3">
                    <Progress value={(done / Math.max(1, uLessons.length)) * 100} aria-label={`${u.title} progress`} className="h-1.5" />
                  </div>
                  <ul className="flex-1 space-y-1 px-2 pb-3">
                    {uLessons.map((l, i) => {
                      const isDone = !!lessons[l.id]?.completed
                      return (
                        <li key={l.id}>
                          <button
                            onClick={() => navigate({ name: 'lesson', id: l.id })}
                            className="group flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <span
                              className={cn(
                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                                isDone ? 'text-white' : 'bg-muted text-muted-foreground group-hover:bg-background',
                              )}
                              style={isDone ? { background: u.hex } : undefined}
                              aria-hidden
                            >
                              {isDone ? '✓' : i + 1}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium group-hover:underline underline-offset-2">
                                {l.title}
                              </span>
                              <span className="block truncate text-xs text-muted-foreground"><RichText text={l.tagline} /></span>
                            </span>
                            <span className={cn('h-2 w-2 shrink-0 rounded-full', DIFF_DOT[l.difficulty])} title={l.difficulty} aria-label={`difficulty: ${l.difficulty}`} />
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* how to play */}
      {!searching && (
        <section aria-label="How to play" className="rounded-xl border bg-muted/30 px-5 py-6">
          <h2 className="text-lg font-bold">How every lesson works</h2>
          <ol className="mt-3 grid gap-3 sm:grid-cols-4">
            {[
              { n: 1, t: 'Learn', d: 'A short, friendly explanation with real formulas (KaTeX-rendered).' },
              { n: 2, t: 'Simulate', d: 'Play with a live simulation — tweak, predict, observe.' },
              { n: 3, t: 'Practice', d: 'Guided questions with hints and instant feedback.' },
              { n: 4, t: 'Quiz', d: 'Score 70%+ to master the lesson and earn its badge + XP.' },
            ].map((s) => (
              <li key={s.n} className="rounded-lg border bg-card px-3 py-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground" aria-hidden>{s.n}</span>
                <p className="mt-2 text-sm font-bold">{s.t}</p>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">
            Progress is saved automatically in your browser (localStorage) — no account, no tracking.
            You can reset it anytime from <Button variant="link" className="h-auto p-0 text-xs underline" onClick={() => navigate({ name: 'progress' })}>My Progress</Button>.
          </p>
        </section>
      )}
    </div>
  )
}

function StatCard({
  icon: Icon, label, value, sub,
}: { icon: typeof XpIcon; label: string; value: string; sub: string }) {
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

function LessonChip({ lesson, done }: { lesson: Lesson; done: boolean }) {
  const unit = UNITS.find((u) => u.id === lesson.unitId)!
  const Icon = UNIT_ICONS[unit.id]
  return (
    <button
      onClick={() => navigate({ name: 'lesson', id: lesson.id })}
      className="group flex items-start gap-3 rounded-xl border bg-card px-4 py-3 text-left transition-colors hover:border-primary/50 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white" style={{ background: unit.hex }}>
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold group-hover:underline underline-offset-2">{lesson.title}</span>
        <span className="block truncate text-xs text-muted-foreground">{unit.title} · {lesson.difficulty} · {lesson.minutes} min</span>
      </span>
      {done && <span className="ml-auto text-emerald-500" aria-label="mastered">✓</span>}
    </button>
  )
}
