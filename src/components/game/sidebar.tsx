// ─── Physics Quest · Persistent lesson index sidebar (desktop rail / mobile sheet)
'use client'

import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { UNITS, allLessons } from '@/lib/game/curriculum'
import { useGame } from '@/lib/game/progress'
import { navigate } from '@/lib/game/router'
import { UNIT_ICONS } from '@/components/game/home'
import { cn } from '@/lib/utils'
import { Search, Menu, Compass, BarChart3, Scale, Home as HomeIcon } from 'lucide-react'
import type { UnitId } from '@/lib/game/types'

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const lessons = useGame((s) => s.lessons)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    return allLessons().filter((l) =>
      [l.title, l.tagline, ...l.objectives].join(' ').toLowerCase().includes(q))
  }, [query])

  const go = (id: string) => {
    navigate({ name: 'lesson', id })
    onNavigate?.()
  }

  const link = (icon: React.ReactNode, label: string, route: 'home' | 'playground' | 'progress' | 'licenses') => (
    <button
      onClick={() => { navigate({ name: route }); onNavigate?.() }}
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {icon} {label}
    </button>
  )

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-3 p-3 border-b">
        {link(<HomeIcon className="h-4 w-4" />, 'Home / World map', 'home')}
        {link(<Compass className="h-4 w-4" />, 'Physics Playground', 'playground')}
        {link(<BarChart3 className="h-4 w-4" />, 'My Progress', 'progress')}
        {link(<Scale className="h-4 w-4" />, 'Licenses & Attribution', 'licenses')}
        <div className="relative pt-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all lessons…"
              aria-label="Search all lessons"
              className="pl-8 h-9"
            />
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-2" aria-label="Lesson index">
          {filtered ? (
            <ul className="space-y-0.5 px-1">
              {filtered.length === 0 && (
                <li className="px-2 py-4 text-sm text-muted-foreground">No lessons match “{query}”.</li>
              )}
              {filtered.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className={cn('h-2 w-2 rounded-full shrink-0')} style={{ background: UNITS.find((u) => u.id === l.unitId)?.hex }} aria-hidden />
                    <span className="truncate">{l.title}</span>
                    {lessons[l.id]?.completed && <span className="ml-auto text-emerald-500 text-xs" aria-label="mastered">✓</span>}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            UNITS.map((u) => {
              const Icon = UNIT_ICONS[u.id]
              const done = u.lessonIds.filter((id) => lessons[id]?.completed).length
              return (
                <div key={u.id} className="mb-3">
                  <p className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" style={{ color: u.hex }} aria-hidden />
                    <span className="truncate">{u.title}</span>
                    <Badge variant="secondary" className="ml-auto tabular-nums">{done}/{u.lessonIds.length}</Badge>
                  </p>
                  <ul className="space-y-0.5 px-1">
                    {u.lessonIds.map((id) => {
                      const l = allLessons().find((x) => x.id === id)
                      if (!l) return null
                      return (
                        <li key={id}>
                          <button
                            onClick={() => go(id)}
                            className="flex w-full items-center gap-2 rounded-lg px-2 pl-4 py-1.5 text-left text-sm hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <span className="truncate">{l.title}</span>
                            {lessons[id]?.completed && <span className="ml-auto text-emerald-500 text-xs" aria-label="mastered">✓</span>}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })
          )}
        </nav>
      </ScrollArea>
    </div>
  )
}

export function SidebarRail() {
  return (
    <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-64 shrink-0 border-r bg-card/40 lg:block">
      <SidebarContent />
    </aside>
  )
}

export function MobileNav() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Open lesson index"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetTitle className="sr-only">Lesson index</SheetTitle>
        <SidebarContent onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

export type { UnitId }
