// ─── Physics Quest · KaTeX rendering helpers ──────────────────────────────────
'use client'

import { useMemo } from 'react'
import katex from 'katex'
import { cn } from '@/lib/utils'

function renderTex(tex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      output: 'html',
      strict: false,
    })
  } catch {
    return tex
  }
}

export function Tex({ tex, display = false, className }: { tex: string; display?: boolean; className?: string }) {
  const html = useMemo(() => renderTex(tex, display), [tex, display])
  return (
    <span
      className={cn(display && 'block text-center overflow-x-auto py-1', className)}
      dangerouslySetInnerHTML={{ __html: html }}
      role={display ? 'math' : undefined}
      aria-label={display ? tex : undefined}
    />
  )
}

/**
 * Renders text that may contain inline math wrapped in $…$ and **bold** spans.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = useMemo(() => text.split('$'), [text])
  if (parts.length === 1) return <span className={className}>{withBold(text)}</span>
  return (
    <span className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Tex key={i} tex={part} />
        ) : (
          <span key={i}>{withBold(part)}</span>
        ),
      )}
    </span>
  )
}

/** Minimal **bold** support inside plain text segments. */
function withBold(text: string): React.ReactNode[] {
  const chunks = text.split(/\*\*(.+?)\*\*/g)
  if (chunks.length === 1) return [text]
  return chunks.map((c, i) => (i % 2 === 1 ? <strong key={i} className="font-semibold">{c}</strong> : <span key={i}>{c}</span>))
}
