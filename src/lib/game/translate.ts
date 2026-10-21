// ─── Physics Quest · Merges English lesson base with locale overlays ──────────
import type { Lesson, Unit, UnitId } from '@/lib/game/types'
import type { LessonOv, BlockOv } from '@/data/i18n/schema'

function ovText(base: string, ov: string | undefined): string {
  return typeof ov === 'string' && ov.length > 0 ? ov : base
}

function ovList(base: string[], ov: string[] | undefined): string[] {
  return Array.isArray(ov) && ov.length === base.length && ov.every((s) => typeof s === 'string' && s.length > 0)
    ? ov
    : base
}

function ovBlock(base: Lesson['concept'][number], ov: BlockOv | null | undefined): Lesson['concept'][number] {
  if (!ov) return base
  switch (base.type) {
    case 'p':
    case 'h':
    case 'key':
      return ov.t === base.type && typeof ov.text === 'string' && ov.text.length > 0
        ? { ...base, text: ov.text }
        : base
    case 'list':
      return ov.t === 'list' ? { ...base, items: ovList(base.items, ov.items) } : base
    case 'formula':
      return ov.t === 'formula'
        ? { ...base, caption: ov.caption ? ovText(base.caption ?? '', ov.caption) || base.caption : base.caption }
        : base
    case 'table': {
      if (ov.t !== 'table') return base
      const headers = ovList(base.headers, ov.headers)
      const rows =
        Array.isArray(ov.rows) &&
        ov.rows.length === base.rows.length &&
        ov.rows.every((r, i) => Array.isArray(r) && r.length === base.rows[i].length)
          ? ov.rows
          : base.rows
      return { ...base, headers, rows }
    }
    default:
      return base
  }
}

/** Apply a translation overlay to a lesson (pure; returns the base when no overlay). */
export function applyLessonOv(base: Lesson, ov?: LessonOv): Lesson {
  if (!ov) return base
  const concept = ov.concept && ov.concept.length === base.concept.length
    ? base.concept.map((b, i) => ovBlock(b, ov.concept?.[i]))
    : base.concept

  const example = (() => {
    const we = base.workedExample
    const o = ov.example
    if (!o) return we
    const steps = o.steps && o.steps.length === we.steps.length
      ? we.steps.map((s, i) => ({ ...s, text: ovText(s.text, o.steps?.[i]?.text) }))
      : we.steps
    return {
      ...we,
      title: ovText(we.title, o.title),
      problem: ovText(we.problem, o.problem),
      steps,
      answer: ovText(we.answer, o.answer),
    }
  })()

  const mapQuestion = <T extends { id: string; choices?: string[]; hints: string[] }>(q: T): T => {
    const o = ov.questions?.[q.id]
    if (!o) return q
    return {
      ...q,
      ...(o.prompt ? { prompt: o.prompt } : {}),
      ...(o.choices && q.choices && o.choices.length === q.choices.length ? { choices: o.choices } : {}),
      ...(o.hints && o.hints.length === q.hints.length ? { hints: o.hints } : {}),
      ...(o.explanation ? { explanation: o.explanation } : {}),
    } as T
  }

  return {
    ...base,
    title: ovText(base.title, ov.title),
    tagline: ovText(base.tagline, ov.tagline),
    objectives: ov.objectives ? ovList(base.objectives, ov.objectives) : base.objectives,
    concept,
    workedExample: example,
    practice: base.practice.map(mapQuestion),
    quiz: base.quiz.map(mapQuestion),
  }
}

/** Localized unit title/tagline via dictionary keys `unit.<id>.title` / `.tagline`. */
export function localizedUnit(
  base: Unit,
  lookup: (key: string, fallback: string) => string,
): Unit {
  return {
    ...base,
    title: lookup(`unit.${base.id}.title`, base.title),
    tagline: lookup(`unit.${base.id}.tagline`, base.tagline),
  }
}

export function localizedRank(
  base: string,
  level: number,
  lookup: (key: string, fallback: string) => string,
): string {
  const i = Math.min(Math.max(1, level), 10)
  return lookup(`rank.${i - 1}`, base)
}

export function localizedUnitName(id: UnitId, lookup: (key: string, fallback: string) => string): string {
  return lookup(`unit.${id}.title`, id)
}
