// ─── Physics Quest · Licenses & attribution page ──────────────────────────────
'use client'

import { Badge } from '@/components/ui/badge'
import { RichText } from '@/components/game/tex'

const LIBS = [
  { name: 'Next.js', license: 'MIT', use: 'App framework (React, routing, bundling)', url: 'https://nextjs.org' },
  { name: 'React & React DOM', license: 'MIT', use: 'UI runtime', url: 'https://react.dev' },
  { name: 'TypeScript', license: 'Apache-2.0', use: 'Type-safe language', url: 'https://www.typescriptlang.org' },
  { name: 'Tailwind CSS', license: 'MIT', use: 'Utility-first styling', url: 'https://tailwindcss.com' },
  { name: 'shadcn/ui + Radix UI primitives', license: 'MIT', use: 'Accessible UI components (dialogs, sliders, tabs…)', url: 'https://ui.shadcn.com' },
  { name: 'lucide-react', license: 'ISC', use: 'Icon set', url: 'https://lucide.dev' },
  { name: 'Zustand', license: 'MIT', use: 'State management + localStorage persistence', url: 'https://zustand.docs.pmnd.rs' },
  { name: 'KaTeX', license: 'MIT', use: 'Rendering math formulas (fonts included, OFL-licensed)', url: 'https://katex.org' },
  { name: 'next-themes', license: 'MIT', use: 'Light/dark theme handling', url: 'https://github.com/pacocoursey/next-themes' },
  { name: 'Geist font (via next/font)', license: 'SIL Open Font License 1.1', use: 'Interface typeface', url: 'https://vercel.com/font' },
]

export function LicensesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Licenses &amp; Attribution</h1>
        <p className="text-muted-foreground">
          Physics Quest is 100% free, open and ad-free. Everything below is used under a
          free/open license, and all game content is original.
        </p>
      </header>

      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="text-lg font-bold">Open-source libraries</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-3 py-2 font-semibold">Library</th>
                <th className="px-3 py-2 font-semibold">License</th>
                <th className="px-3 py-2 font-semibold">Used for</th>
              </tr>
            </thead>
            <tbody>
              {LIBS.map((l) => (
                <tr key={l.name} className="border-t">
                  <td className="px-3 py-2 font-medium">
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                      {l.name}
                    </a>
                  </td>
                  <td className="px-3 py-2"><Badge variant="secondary">{l.license}</Badge></td>
                  <td className="px-3 py-2 text-muted-foreground">{l.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="text-lg font-bold">Game content &amp; assets</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/90">
          <li><b>All lessons, explanations, examples, questions, diagrams and simulations are original works</b> created for Physics Quest and offered to you under <b>CC0 1.0 (public domain)</b> — copy, remix and reuse freely.</li>
          <li>No text, images or diagrams are reproduced from any copyrighted book.</li>
          <li>The lesson <i>topic coverage</i> follows a standard middle-school / early-high-school physics curriculum outline (mechanics → fluids → thermal → waves → light → electricity &amp; magnetism → modern physics), which is common knowledge and not copyrightable. If you came here from a syllabus nicknamed “Holiday Physics”, know that <b>only its table-of-contents-level topic list</b> was consulted as a checklist — zero content, wording, or artwork from that book appears in this game.</li>
          <li>Graphics are drawn procedurally with the HTML5 Canvas API at runtime — there are no third-party image files.</li>
          <li>Optional sim sounds are synthesized in-browser with the Web Audio API (oscillators) — no audio files, off by default, with visual equivalents always available.</li>
          <li>No trackers, no ads, no accounts, no external network calls: your progress lives only in your browser’s localStorage.</li>
        </ul>
      </section>

      <section className="rounded-xl border bg-card p-5 space-y-2">
        <h2 className="text-lg font-bold">License of this project’s code</h2>
        <p className="text-sm leading-relaxed text-foreground/90">
          The source code of Physics Quest is released under the <b>MIT License</b>. You may use,
          modify and redistribute it, including for commercial purposes, provided the copyright
          notice is preserved. See the project repository’s <code className="rounded bg-muted px-1 py-0.5 text-xs">LICENSE</code> file.
        </p>
        <p className="text-sm leading-relaxed text-foreground/90">
          Physics content was written and reviewed against standard SI conventions (BIPM) and
          widely-published physical constants (e.g. <RichText text={'$g = 9.8\\ \\mathrm{m/s^2}$'} />, speed of sound ≈ 343 m/s in air at 20 °C) — facts of nature that belong to everyone. 💛
        </p>
      </section>
    </div>
  )
}
