// ─── Physics Quest · Curriculum registry & helpers ────────────────────────────
'use client'

import type { Lesson, Unit, UnitId } from '@/lib/game/types'

import { lessonsMechA } from '@/data/lessons-mech-a'
import { lessonsMechB } from '@/data/lessons-mech-b'
import { lessonsFluids } from '@/data/lessons-fluids'
import { lessonsThermal } from '@/data/lessons-thermal'
import { lessonsWaves } from '@/data/lessons-waves'
import { lessonsOpticsA } from '@/data/lessons-optics-a'
import { lessonsOpticsB } from '@/data/lessons-optics-b'
import { lessonsEmA } from '@/data/lessons-em-a'
import { lessonsEmB } from '@/data/lessons-em-b'
import { lessonsModern } from '@/data/lessons-modern'
import { lessonsMech } from '@/data/lessons-mech'
import { lessonsMechC } from '@/data/lessons-mech-c'
import { lessonsMechD } from '@/data/lessons-mech-d'
import { lessonsThermalB } from '@/data/lessons-thermal-b'
import { lessonsWavesB } from '@/data/lessons-waves-b'
import { lessonsWavesC } from '@/data/lessons-waves-c'

export const UNITS: Unit[] = [
  {
    id: 'mechanics', title: 'Mechanics', tagline: 'Motion, forces, energy & machines',
    accent: 'text-orange-600 dark:text-orange-400', hex: '#ea580c',
    lessonIds: [...lessonsMech, ...lessonsMechA, ...lessonsMechB, ...lessonsMechC, ...lessonsMechD]
      .sort((a, b) => a.order - b.order).map((l) => l.id),
  },
  {
    id: 'fluids', title: 'Fluids & Pressure', tagline: 'Squeezing, floating & flowing',
    accent: 'text-teal-600 dark:text-teal-400', hex: '#0d9488',
    lessonIds: lessonsFluids.sort((a, b) => a.order - b.order).map((l) => l.id),
  },
  {
    id: 'thermal', title: 'Heat & Thermal Physics', tagline: 'Hot, cold & everything in between',
    accent: 'text-rose-600 dark:text-rose-400', hex: '#e11d48',
    lessonIds: lessonsThermal.concat(lessonsThermalB).sort((a, b) => a.order - b.order).map((l) => l.id),
  },
  {
    id: 'waves', title: 'Waves & Sound', tagline: 'Ripples, rumbles & echoes',
    accent: 'text-violet-600 dark:text-violet-400', hex: '#7c3aed',
    lessonIds: lessonsWaves.concat(lessonsWavesB, lessonsWavesC).sort((a, b) => a.order - b.order).map((l) => l.id),
  },
  {
    id: 'optics', title: 'Light & Optics', tagline: 'Rays, rainbows & lenses',
    accent: 'text-amber-600 dark:text-amber-400', hex: '#d97706',
    lessonIds: lessonsOpticsA.concat(lessonsOpticsB).sort((a, b) => a.order - b.order).map((l) => l.id),
  },
  {
    id: 'em', title: 'Electricity & Magnetism', tagline: 'Charges, currents & fields',
    accent: 'text-yellow-600 dark:text-yellow-400', hex: '#ca8a04',
    lessonIds: lessonsEmA.concat(lessonsEmB).sort((a, b) => a.order - b.order).map((l) => l.id),
  },
  {
    id: 'modern', title: 'Modern Physics', tagline: 'Atoms, nuclei & the quantum world',
    accent: 'text-emerald-600 dark:text-emerald-400', hex: '#059669',
    lessonIds: lessonsModern.sort((a, b) => a.order - b.order).map((l) => l.id),
  },
]

const ALL_LESSONS: Lesson[] = [
  ...lessonsMech, ...lessonsMechA, ...lessonsMechB, ...lessonsMechC, ...lessonsMechD,
  ...lessonsFluids, ...lessonsThermal, ...lessonsThermalB, ...lessonsWaves,
  ...lessonsWavesB, ...lessonsWavesC,
  ...lessonsOpticsA, ...lessonsOpticsB, ...lessonsEmA, ...lessonsEmB,
  ...lessonsModern,
]

const LESSON_MAP = new Map<string, Lesson>(ALL_LESSONS.map((l) => [l.id, l]))

export function getLesson(id: string): Lesson | undefined {
  return LESSON_MAP.get(id)
}

export function getUnit(id: UnitId): Unit {
  return UNITS.find((u) => u.id === id) ?? UNITS[0]
}

export function allLessons(): Lesson[] {
  return UNITS.flatMap((u) => u.lessonIds.map((id) => LESSON_MAP.get(id)!)).filter(Boolean)
}

export function nextLessonAfter(id: string): Lesson | undefined {
  const list = allLessons()
  const i = list.findIndex((l) => l.id === id)
  return i >= 0 && i < list.length - 1 ? list[i + 1] : undefined
}

export function searchLessons(query: string, unit?: UnitId | 'all', difficulty?: string | 'all'): Lesson[] {
  const q = query.trim().toLowerCase()
  return allLessons().filter((l) => {
    if (unit && unit !== 'all' && l.unitId !== unit) return false
    if (difficulty && difficulty !== 'all' && l.difficulty !== difficulty) return false
    if (!q) return true
    const hay = [
      l.title, l.tagline, ...l.objectives,
      getUnit(l.unitId).title,
    ].join(' ').toLowerCase()
    return hay.includes(q)
  })
}

// ─── Ranks & badges ──────────────────────────────────────────────────────────
export const RANKS = [
  'Spark', 'Tinkerer', 'Explorer', 'Trailblazer', 'Engineer',
  'Investigator', 'Scientist', 'Physicist', 'Master Physicist', 'Quantum Legend',
]

export function levelFor(xp: number): number {
  return Math.floor(xp / 300) + 1
}

export function rankFor(xp: number): string {
  return RANKS[Math.min(levelFor(xp) - 1, RANKS.length - 1)]
}

export function xpIntoLevel(xp: number): number {
  return xp % 300
}

export interface SpecialBadge {
  id: string
  title: string
  description: string
  icon: string // lucide icon key handled in UI
}

export const SPECIAL_BADGES: SpecialBadge[] = [
  { id: 'first-lesson', title: 'First Steps', description: 'Master your very first lesson', icon: 'Footprints' },
  { id: 'five-lessons', title: 'Getting Rolling', description: 'Master 5 lessons', icon: 'CircleGauge' },
  { id: 'ten-lessons', title: 'Half the Hills', description: 'Master 10 lessons', icon: 'Hill' },
  { id: 'twenty-lessons', title: 'Force of Habit', description: 'Master 20 lessons', icon: 'Mountain' },
  { id: 'all-lessons', title: 'Physics Champion', description: 'Master every lesson in the game', icon: 'Trophy' },
  { id: 'perfect-quiz', title: 'Flawless', description: 'Score 100% on any quiz', icon: 'Sparkles' },
  { id: 'streak-3', title: 'On Fire', description: 'Play 3 days in a row', icon: 'Flame' },
  { id: 'sandbox-visitor', title: 'Open Mind', description: 'Visit the Physics Playground', icon: 'Wand2' },
]
