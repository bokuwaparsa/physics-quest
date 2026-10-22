// ─── Physics Quest · Locale overlay registry ──────────────────────────────────
// Each part file covers a slice of the 30 lessons for one locale. Missing ids
// or fields simply fall back to the English base (see translate.ts).
import type { Locale } from '@/lib/game/i18n'
import type { LessonOvFile } from './schema'

// Persian (fa) — part files
import faPart01 from './fa/part-01'
import faPart02 from './fa/part-02'
import faPart03 from './fa/part-03'
import faPart04 from './fa/part-04'
import faPart05 from './fa/part-05'
import faPart06 from './fa/part-06'
import faPart07 from './fa/part-07'
import faPart08 from './fa/part-08'
import faPart09 from './fa/part-09'
import faPart10 from './fa/part-10'
import faPart11 from './fa/part-11'
import faPart12 from './fa/part-12'
import faPart13 from './fa/part-13'
import faPart14 from './fa/part-14'
import faPart15 from './fa/part-15'
import faPart16 from './fa/part-16'
import faPart17 from './fa/part-17'
import faPart18 from './fa/part-18'
import faPart19 from './fa/part-19'

// Turkish (tr) — part files
import trPart01 from './tr/part-01'
import trPart02 from './tr/part-02'
import trPart03 from './tr/part-03'
import trPart04 from './tr/part-04'
import trPart05 from './tr/part-05'
import trPart06 from './tr/part-06'
import trPart07 from './tr/part-07'
import trPart08 from './tr/part-08'
import trPart09 from './tr/part-09'
import trPart10 from './tr/part-10'
import trPart11 from './tr/part-11'
import trPart12 from './tr/part-12'
import trPart13 from './tr/part-13'
import trPart14 from './tr/part-14'
import trPart15 from './tr/part-15'
import trPart16 from './tr/part-16'
import trPart17 from './tr/part-17'
import trPart18 from './tr/part-18'
import trPart19 from './tr/part-19'

export const OVERLAYS: Record<Locale, LessonOvFile> = {
  en: {},
  fa: {
    ...faPart01, ...faPart02, ...faPart03, ...faPart04, ...faPart05,
    ...faPart06, ...faPart07, ...faPart08, ...faPart09, ...faPart10,
    ...faPart11, ...faPart12, ...faPart13, ...faPart14,
    ...faPart15, ...faPart16, ...faPart17, ...faPart18, ...faPart19,
  },
  tr: {
    ...trPart01, ...trPart02, ...trPart03, ...trPart04, ...trPart05,
    ...trPart06, ...trPart07, ...trPart08, ...trPart09, ...trPart10,
    ...trPart11, ...trPart12, ...trPart13, ...trPart14,
    ...trPart15, ...trPart16, ...trPart17, ...trPart18, ...trPart19,
  },
}
