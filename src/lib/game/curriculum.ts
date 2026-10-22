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
import { lessonsEmC } from '@/data/lessons-em-c'
import { lessonsEmD } from '@/data/lessons-em-d'
import { lessonsOpticsC } from '@/data/lessons-optics-c'
import { lessonsModernB } from '@/data/lessons-modern-b'
import { lessonsModernC } from '@/data/lessons-modern-c'

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
    lessonIds: lessonsOpticsA.concat(lessonsOpticsB, lessonsOpticsC).sort((a, b) => a.order - b.order).map((l) => l.id),
  },
  {
    id: 'em', title: 'Electricity & Magnetism', tagline: 'Charges, currents & fields',
    accent: 'text-yellow-600 dark:text-yellow-400', hex: '#ca8a04',
    lessonIds: lessonsEmA.concat(lessonsEmB, lessonsEmC, lessonsEmD).sort((a, b) => a.order - b.order).map((l) => l.id),
  },
  {
    id: 'modern', title: 'Modern Physics', tagline: 'Atoms, nuclei & the quantum world',
    accent: 'text-emerald-600 dark:text-emerald-400', hex: '#059669',
    lessonIds: lessonsModern.concat(lessonsModernB, lessonsModernC).sort((a, b) => a.order - b.order).map((l) => l.id),
  },
]

const ALL_LESSONS: Lesson[] = [
  ...lessonsMech, ...lessonsMechA, ...lessonsMechB, ...lessonsMechC, ...lessonsMechD,
  ...lessonsFluids, ...lessonsThermal, ...lessonsThermalB, ...lessonsWaves,
  ...lessonsWavesB, ...lessonsWavesC,
  ...lessonsOpticsA, ...lessonsOpticsB, ...lessonsOpticsC, ...lessonsEmA, ...lessonsEmB,
  ...lessonsEmC, ...lessonsEmD,
  ...lessonsModern, ...lessonsModernB, ...lessonsModernC,
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

// ─── Book coverage map ───────────────────────────────────────────────────────
// The 44 chapters of a standard "fundamentals of physics" course (the classic
// Halliday topic map) and the lesson(s) that teach each one. Chapter titles are
// standard curriculum topics; all lesson content is original.
export interface BookChapter {
  ch: number
  title: string
  lessonIds: string[]
}

export const BOOK_CHAPTERS: BookChapter[] = [
  { ch: 1, title: 'Measurement', lessonIds: ['x1-measurement'] },
  { ch: 2, title: 'Motion Along a Straight Line', lessonIds: ['m1-motion-graphs', 'm2-acceleration-lab'] },
  { ch: 3, title: 'Vectors', lessonIds: ['x2-vectors'] },
  { ch: 4, title: 'Motion in Two and Three Dimensions', lessonIds: ['m6-projectile-range'] },
  { ch: 5, title: 'Force and Motion I', lessonIds: ['m3-force-balance', 'm4-newton-cart'] },
  { ch: 6, title: 'Force and Motion II', lessonIds: ['m9-circular-motion'] },
  { ch: 7, title: 'Kinetic Energy and Work', lessonIds: ['m7-energy-coaster', 'm10-simple-machines'] },
  { ch: 8, title: 'Potential Energy and Conservation of Energy', lessonIds: ['m7-energy-coaster'] },
  { ch: 9, title: 'Center of Mass and Linear Momentum', lessonIds: ['m8-collision-lab', 'm5-rocket-third-law'] },
  { ch: 10, title: 'Rotation', lessonIds: ['x3-rotation'] },
  { ch: 11, title: 'Rolling, Torque, and Angular Momentum', lessonIds: ['x4-rolling', 'x3-rotation'] },
  { ch: 12, title: 'Equilibrium and Elasticity', lessonIds: ['x5-equilibrium'] },
  { ch: 13, title: 'Gravitation', lessonIds: ['x6-gravitation'] },
  { ch: 14, title: 'Fluids', lessonIds: ['f1-pressure', 'f2-buoyancy', 'f3-pascal-lift'] },
  { ch: 15, title: 'Oscillations', lessonIds: ['w4-oscillations'] },
  { ch: 16, title: 'Waves I', lessonIds: ['w1-wave-machine', 'w5-standing-waves'] },
  { ch: 17, title: 'Waves II', lessonIds: ['w2-sound-lab', 'w3-doppler-echo', 'w6-beats-intensity'] },
  { ch: 18, title: 'Temperature, Heat, and the First Law', lessonIds: ['t1-heat-mixing', 't2-heat-transfer', 't3-phase-change'] },
  { ch: 19, title: 'The Kinetic Theory of Gases', lessonIds: ['t4-kinetic-theory'] },
  { ch: 20, title: 'Entropy and the Second Law', lessonIds: ['t5-entropy-engines'] },
  { ch: 21, title: "Coulomb's Law", lessonIds: ['e1-charge-field'] },
  { ch: 22, title: 'Electric Fields', lessonIds: ['e1-charge-field'] },
  { ch: 23, title: "Gauss' Law", lessonIds: ['e5-gauss-flux'] },
  { ch: 24, title: 'Electric Potential', lessonIds: ['e6-potential'] },
  { ch: 25, title: 'Capacitance', lessonIds: ['e7-capacitance'] },
  { ch: 26, title: 'Current and Resistance', lessonIds: ['e2-ohm-circuit'] },
  { ch: 27, title: 'Circuits', lessonIds: ['e2-ohm-circuit', 'e3-series-parallel'] },
  { ch: 28, title: 'Magnetic Fields', lessonIds: ['e8-magnetic-force', 'e4-electromagnet'] },
  { ch: 29, title: 'Magnetic Fields Due to Currents', lessonIds: ['e4-electromagnet'] },
  { ch: 30, title: 'Induction and Inductance', lessonIds: ['e9-induction'] },
  { ch: 31, title: 'EM Oscillations and Alternating Current', lessonIds: ['e10-ac-resonance'] },
  { ch: 32, title: "Maxwell's Equations; Magnetism of Matter", lessonIds: ['o5-em-spectrum'] },
  { ch: 33, title: 'Electromagnetic Waves', lessonIds: ['o5-em-spectrum', 'o4-color-mixer'] },
  { ch: 34, title: 'Images', lessonIds: ['o1-mirror-laser', 'o2-refraction-tank', 'o3-lens-bench'] },
  { ch: 35, title: 'Interference', lessonIds: ['o6-interference'] },
  { ch: 36, title: 'Diffraction', lessonIds: ['o7-diffraction'] },
  { ch: 37, title: 'Relativity', lessonIds: ['p3-relativity-clock'] },
  { ch: 38, title: 'Photons and Matter Waves', lessonIds: ['p4-photons'] },
  { ch: 39, title: 'More About Matter Waves', lessonIds: ['p5-matter-waves'] },
  { ch: 40, title: 'All About Atoms', lessonIds: ['p6-quantum-atom', 'p1-atom-builder'] },
  { ch: 41, title: 'Conduction of Electricity in Solids', lessonIds: ['p7-semiconductors'] },
  { ch: 42, title: 'Nuclear Physics', lessonIds: ['p8-nuclear-structure', 'p2-half-life'] },
  { ch: 43, title: 'Energy from the Nucleus', lessonIds: ['p9-nuclear-energy'] },
  { ch: 44, title: 'Quarks, Leptons, and the Big Bang', lessonIds: ['p10-particles-cosmos'] },
]

export function bookChapterProgress(chapter: BookChapter, completed: Set<string>): 'done' | 'started' | 'todo' {
  const states = chapter.lessonIds.map((id) => completed.has(id))
  if (states.every(Boolean)) return 'done'
  if (states.some(Boolean)) return 'started'
  return 'todo'
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
