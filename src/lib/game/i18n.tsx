// ─── Physics Quest · i18n core: locale store, dictionaries, term glossary ─────
'use client'

import { useSyncExternalStore, useMemo } from 'react'
import { en } from './dict/en'
import { fa } from './dict/fa'
import { tr } from './dict/tr'
import { termsFa } from './dict/terms-fa'
import { termsTr } from './dict/terms-tr'

export type Locale = 'en' | 'fa' | 'tr'

export const LOCALES: { id: Locale; native: string; english: string }[] = [
  { id: 'en', native: 'English', english: 'English' },
  { id: 'fa', native: 'فارسی', english: 'Persian' },
  { id: 'tr', native: 'Türkçe', english: 'Turkish' },
]

const DICTS: Record<Locale, Record<string, string>> = { en, fa, tr }

/** Physics/sim vocabulary used by sim-kit controls (English label → translation). */
const TERMS: Partial<Record<Locale, Record<string, string>>> = {
  fa: termsFa,
  tr: termsTr,
}

export const LOCALE_KEY = 'pq.locale'

export function dirFor(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'fa' ? 'rtl' : 'ltr'
}

// ─── Tiny external store (hydration-safe: server + first client render = 'en')
let storeLocale: Locale = 'en'
const listeners = new Set<() => void>()

function applyDocument(locale: Locale) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = locale
  document.documentElement.dir = dirFor(locale)
}

/** Switch locale, persist it, sync <html lang/dir>, notify subscribers. */
export function setLocale(locale: Locale) {
  if (locale === storeLocale) return
  storeLocale = locale
  try { window.localStorage.setItem(LOCALE_KEY, locale) } catch { /* storage unavailable */ }
  applyDocument(locale)
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

function detectLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(LOCALE_KEY)
    if (saved === 'en' || saved === 'fa' || saved === 'tr') return saved
  } catch { /* storage unavailable */ }
  try {
    const nav = navigator.language?.slice(0, 2)
    if (nav === 'fa' || nav === 'tr') return nav
  } catch { /* no navigator */ }
  return 'en'
}

export interface I18n {
  locale: Locale
  setLocale: (l: Locale) => void
  /** Translate a UI dictionary key, with {var} interpolation. Falls back to English, then the key. */
  t: (key: string, vars?: Record<string, string | number>) => string
  /** Translate a physics/sim term given in its English form. Falls back to the English term. */
  simT: (label: string) => string
  dir: 'ltr' | 'rtl'
}

function makeI18n(locale: Locale): I18n {
  return {
    locale,
    dir: dirFor(locale),
    setLocale,
    t: (key, vars) => {
      let s = DICTS[locale]?.[key] ?? en[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v))
      }
      return s
    },
    simT: (label) => TERMS[locale]?.[label] ?? label,
  }
}

const I18N_INSTANCES: Partial<Record<Locale, I18n>> = {}

/** Hydration-safe i18n hook: renders 'en' during SSR/first paint, then switches. */
export function useI18n(): I18n {
  const locale = useSyncExternalStore(
    subscribe,
    () => storeLocale,
    () => 'en' as Locale,
  )
  return useMemo(() => {
    I18N_INSTANCES[locale] ??= makeI18n(locale)
    return I18N_INSTANCES[locale] as I18n
  }, [locale])
}

/** One-time bootstrap: pick up saved/browser locale after hydration. */
export function bootstrapLocale() {
  const detected = detectLocale()
  if (detected !== storeLocale) setLocale(detected)
  else applyDocument(storeLocale)
}

export function useT() {
  return useI18n().t
}
