// ─── Physics Quest · App shell: header, sidebar, routed main area, footer ─────
'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { ThemeProvider } from 'next-themes'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { SidebarRail, MobileNav } from '@/components/game/sidebar'
import { Home } from '@/components/game/home'
import { LessonView } from '@/components/game/lesson-view'
import { Playground } from '@/components/game/playground'
import { ProgressPage } from '@/components/game/progress-page'
import { LicensesPage } from '@/components/game/licenses-page'
import { useHashRoute, navigate, type Route } from '@/lib/game/router'
import { useGame } from '@/lib/game/progress'
import { levelFor, rankFor, xpIntoLevel, allLessons } from '@/lib/game/curriculum'
import { Atom, Settings, Moon, Sun, Flame, Zap, Award, Volume2, VolumeX, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function GameShell() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Shell />
    </ThemeProvider>
  )
}

const emptySubscribe = () => () => {}

/** Hydration-safe mounted check (no setState-in-effect). */
function useMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, () => true, () => false)
}

function Shell() {
  const route = useHashRoute()
  const mounted = useMounted()

  // scroll main area to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background" role="status" aria-label="Loading Physics Quest">
        <div className="flex flex-col items-center gap-3">
          <Atom className="h-10 w-10 animate-spin text-amber-500 [animation-duration:2.5s]" aria-hidden />
          <p className="text-sm text-muted-foreground">Loading Physics Quest…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header route={route} />
      <div className="flex flex-1">
        <SidebarRail />
        <main className="min-w-0 flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            {route.name === 'home' && <Home />}
            {route.name === 'lesson' && <LessonView key={route.id} id={route.id} />}
            {route.name === 'playground' && <Playground />}
            {route.name === 'progress' && <ProgressPage />}
            {route.name === 'licenses' && <LicensesPage />}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

function Header({ route }: { route: Route }) {
  const xp = useGame((s) => s.xp)
  const streak = useGame((s) => s.streak)
  const mastered = Object.values(useGame((s) => s.lessons)).filter((l) => l.completed).length
  const total = allLessons().length

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <MobileNav />
        <button
          onClick={() => navigate({ name: 'home' })}
          className="flex items-center gap-2 font-black tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          aria-label="Physics Quest home"
        >
          <Atom className="h-6 w-6 text-amber-500" aria-hidden />
          <span className="text-lg hidden sm:inline">Physics<span className="text-amber-500">Quest</span></span>
        </button>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* XP / level */}
          <div className="hidden md:block w-44" title={`${xp} XP · Level ${levelFor(xp)} ${rankFor(xp)}`}>
            <div className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground mb-0.5">
              <span className="inline-flex items-center gap-1"><Zap className="h-3 w-3 text-amber-500" aria-hidden />{xp} XP</span>
              <span>Lv {levelFor(xp)} · {rankFor(xp)}</span>
            </div>
            <Progress value={(xpIntoLevel(xp) / 300) * 100} className="h-1.5" aria-label="Level progress" />
          </div>
          <Badge variant="secondary" className="gap-1 tabular-nums hidden sm:inline-flex" title="Lessons mastered">
            <Award className="h-3.5 w-3.5 text-emerald-500" aria-hidden />{mastered}/{total}
          </Badge>
          <Badge variant="secondary" className="gap-1 tabular-nums" title="Day streak">
            <Flame className={cn('h-3.5 w-3.5', streak > 0 ? 'text-orange-500' : 'text-muted-foreground')} aria-hidden />{streak}
          </Badge>
          <SettingsMenu />
        </div>
      </div>
    </header>
  )
}

function SettingsMenu() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const reducedMotion = useGame((s) => s.reducedMotion)
  const setReducedMotion = useGame((s) => s.setReducedMotion)
  const soundOn = useGame((s) => s.soundOn)
  const setSoundOn = useGame((s) => s.setSoundOn)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Settings">
          <Settings className="h-4.5 w-4.5" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 space-y-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Appearance</p>
          <div className="grid grid-cols-3 gap-1.5">
            {(['light', 'dark', 'system'] as const).map((t) => (
              <Button
                key={t}
                size="sm"
                variant={theme === t ? 'default' : 'outline'}
                onClick={() => setTheme(t)}
                className="capitalize"
              >
                {t === 'light' ? <Sun className="mr-1 h-3.5 w-3.5" aria-hidden /> : t === 'dark' ? <Moon className="mr-1 h-3.5 w-3.5" aria-hidden /> : <Sparkles className="mr-1 h-3.5 w-3.5" aria-hidden />}
                {t}
              </Button>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground">Currently: {resolvedTheme}</p>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="pq-motion" className="text-sm font-medium">Reduced motion</label>
          <Switch id="pq-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="pq-sound" className="text-sm font-medium">
            <span className="inline-flex items-center gap-1.5">{soundOn ? <Volume2 className="h-4 w-4" aria-hidden /> : <VolumeX className="h-4 w-4" aria-hidden />} Sim sounds</span>
            <span className="block text-[11px] font-normal text-muted-foreground">Off by default — visuals always shown</span>
          </label>
          <Switch id="pq-sound" checked={soundOn} onCheckedChange={setSoundOn} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Physics Quest</span> — a free &amp; open learning game.
          Original content: topic coverage inspired by classic middle-school physics curricula.
        </p>
        <nav className="flex items-center gap-4 text-xs" aria-label="Footer">
          <button className="text-muted-foreground underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded" onClick={() => navigate({ name: 'licenses' })}>
            Licenses &amp; attribution
          </button>
          <button className="text-muted-foreground underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded" onClick={() => navigate({ name: 'progress' })}>
            My progress
          </button>
          <span className="text-muted-foreground">100% free, forever</span>
        </nav>
      </div>
    </footer>
  )
}
