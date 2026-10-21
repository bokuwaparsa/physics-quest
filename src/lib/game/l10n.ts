// ─── Physics Quest · Localized curriculum hooks ───────────────────────────────
'use client'

import { useMemo } from 'react'
import { useI18n, type Locale } from './i18n'
import { allLessons, UNITS, RANKS, SPECIAL_BADGES, levelFor } from './curriculum'
import { applyLessonOv, localizedUnit, localizedRank } from './translate'
import { OVERLAYS } from '@/data/i18n/overlays'
import type { Lesson, Unit, Difficulty } from './types'

const cache = new Map<Locale, Lesson[]>()

/** All 30 lessons with the active locale's overlay applied (memoized per locale). */
export function lessonsFor(locale: Locale): Lesson[] {
  let v = cache.get(locale)
  if (!v) {
    const ov = OVERLAYS[locale] ?? {}
    v = allLessons().map((l) => applyLessonOv(l, ov[l.id]))
    cache.set(locale, v)
  }
  return v
}

export function useLessons(): Lesson[] {
  const { locale } = useI18n()
  return useMemo(() => lessonsFor(locale), [locale])
}

export function useLesson(id: string): Lesson | undefined {
  const lessons = useLessons()
  return useMemo(() => lessons.find((l) => l.id === id), [lessons, id])
}

export function useUnits(): Unit[] {
  const { locale, t } = useI18n()
  return useMemo(
    () => UNITS.map((u) => localizedUnit(u, (key, fallback) => {
      const v = t(key)
      return v === key ? fallback : v
    })),
    [locale, t],
  )
}

export function useUnit(id: string): Unit {
  const units = useUnits()
  return units.find((u) => u.id === id) ?? units[0]
}

export function useRankFor(xp: number): string {
  const { t } = useI18n()
  const level = levelFor(xp)
  const base = RANKS[Math.min(level - 1, RANKS.length - 1)]
  return localizedRank(base, level, (key, fallback) => {
    const v = t(key)
    return v === key ? fallback : v
  })
}

export function useDifficultyLabel(): Record<Difficulty, string> {
  const { t } = useI18n()
  return useMemo(() => ({
    easy: t('diff.easy'),
    standard: t('diff.standard'),
    challenge: t('diff.challenge'),
  }), [t])
}

/** Special badges with localized title/description (keys: badge.<id>.title / .description). */
export function useSpecialBadges() {
  const { t } = useI18n()
  return useMemo(
    () => SPECIAL_BADGES.map((b) => ({
      ...b,
      title: t(`badge.${b.id}.title`),
      description: t(`badge.${b.id}.description`),
    })),
    [t],
  )
}
