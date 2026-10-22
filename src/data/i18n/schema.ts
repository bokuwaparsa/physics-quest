// ─── Physics Quest · Lesson translation overlay schema ────────────────────────
// Translation files provide overrides for the English lesson data. Every field
// is optional — anything missing falls back to the English base at runtime.
// Math inside $…$ must be copied UNCHANGED (LaTeX is language-neutral).

export type BlockOv =
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'key'; text: string }
  | { t: 'list'; items: string[] }
  | { t: 'formula'; caption?: string }
  | { t: 'table'; headers: string[]; rows: string[][] }

export interface QuestionOv {
  prompt?: string
  choices?: string[]
  hints?: string[]
  explanation?: string
}

export interface ExampleOv {
  title?: string
  problem?: string
  /** aligned by index with the base worked example steps (only `text` is translated) */
  steps?: { text?: string }[]
  answer?: string
}

export interface LessonOv {
  title?: string
  tagline?: string
  objectives?: string[]
  /** aligned by index with the base concept blocks; `null` keeps the English block */
  concept?: (BlockOv | null)[]
  example?: ExampleOv
  /** keyed by the question's stable id (e.g. 'm1-p1', 'm1-q3') */
  questions?: Record<string, QuestionOv>
}

/** One overlay file: lessonId → LessonOv */
export type LessonOvFile = Record<string, LessonOv>
