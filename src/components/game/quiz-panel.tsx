// ─── Physics Quest · Quiz: 5 questions, best score saved, retries allowed ─────
'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import type { Lesson, Question } from '@/lib/game/types'
import { PASS_PERCENT, useGame } from '@/lib/game/progress'
import { Explanation } from '@/components/game/celebration'
import { RichText } from '@/components/game/tex'
import { Check, ArrowRight, RotateCcw, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

type Status = 'asking' | 'answered'

export function QuizPanel({
  lesson, onMastered,
}: {
  lesson: Lesson
  onMastered: (xpGain: number, score: number) => void
}) {
  const recordQuiz = useGame((s) => s.recordQuiz)
  const quizBest = useGame((s) => s.lessons[lesson.id]?.quizBest ?? 0)
  const awardSpecial = useGame((s) => s.awardSpecial)

  // stable question order per attempt
  const [attempt, setAttempt] = useState(0)
  const questions = useMemo(() => [...lesson.quiz], [lesson, attempt])

  const quizXpMax = lesson.xp - 30
  const [idx, setIdx] = useState(0)
  const [status, setStatus] = useState<Status>('asking')
  const [choice, setChoice] = useState<number | null>(null)
  const [input, setInput] = useState('')
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)

  const q: Question | undefined = questions[idx]

  const check = () => {
    if (!q || status === 'answered') return
    let ok = false
    if (q.kind === 'mc') ok = choice === q.answerIndex
    else {
      const val = parseFloat(input.replace(',', '.'))
      const tol = (q.tolerance ?? 0.02) * Math.abs(q.answer ?? 0)
      ok = Number.isFinite(val) && q.answer !== undefined && Math.abs(val - q.answer) <= Math.max(tol, 1e-9)
    }
    setLastCorrect(ok)
    if (ok) setCorrectCount((c) => c + 1)
    setStatus('answered')
  }

  const next = () => {
    if (idx + 1 >= questions.length) {
      const score = Math.round((correctCount / questions.length) * 100)
      const res = recordQuiz(lesson.id, score, quizXpMax)
      if (score === 100) awardSpecial('perfect-quiz')
      setFinished(true)
      if (res.newlyMastered) onMastered(res.xpGain, score)
    } else {
      setIdx((i) => i + 1)
      setStatus('asking'); setChoice(null); setInput('')
    }
  }

  const retry = () => {
    setAttempt((a) => a + 1)
    setIdx(0); setStatus('asking'); setChoice(null); setInput('')
    setCorrectCount(0); setFinished(false); setLastCorrect(false)
  }

  if (finished) {
    const score = Math.round((correctCount / questions.length) * 100)
    const passed = score >= PASS_PERCENT
    return (
      <div className="rounded-xl border bg-card p-6 text-center space-y-3">
        <p className="text-3xl" aria-hidden>{passed ? '🏅' : score >= 40 ? '💪' : '🌱'}</p>
        <h3 className="text-xl font-bold">{passed ? 'Quiz passed!' : 'Good effort!'}</h3>
        <p className="text-4xl font-extrabold tabular-nums">{score}%</p>
        <p className="text-sm text-muted-foreground">
          {correctCount} of {questions.length} correct · Best score saved: <b>{Math.max(score, quizBest)}%</b>
          {passed ? '' : ' — you need 70% to master this lesson. Review, practice, and try again anytime!'}
        </p>
        {!passed && (
          <div>
            <Button onClick={retry} variant="secondary">
              <RotateCcw className="mr-1 h-4 w-4" aria-hidden /> Retry quiz
            </Button>
          </div>
        )}
      </div>
    )
  }

  if (!q) return null
  const pct = (idx / questions.length) * 100

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span>Quiz · Question {idx + 1} of {questions.length}</span>
          <span className="inline-flex items-center gap-1"><Trophy className="h-3.5 w-3.5 text-amber-500" aria-hidden /> pass ≥ 70%</span>
        </div>
        <Progress value={pct} aria-label="Quiz progress" />
      </div>

      <p className="text-base font-medium leading-relaxed"><RichText text={q.prompt} /></p>

      {q.kind === 'mc' ? (
        <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Answer choices">
          {q.choices?.map((c, i) => {
            const isPicked = choice === i
            const reveal = status === 'answered'
            const isRight = i === q.answerIndex
            return (
              <button
                key={i}
                role="radio"
                aria-checked={isPicked}
                disabled={reveal}
                onClick={() => setChoice(i)}
                className={cn(
                  'rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  reveal && isRight && 'border-emerald-500 bg-emerald-500/10',
                  reveal && isPicked && !isRight && 'border-rose-500 bg-rose-500/10',
                  !reveal && isPicked && 'border-primary bg-primary/10',
                  !reveal && !isPicked && 'hover:border-primary/50 hover:bg-muted/50',
                  reveal && !isRight && !isPicked && 'opacity-60',
                )}
              >
                <RichText text={c} />
              </button>
            )
          })}
        </div>
      ) : (
        <div className="flex items-center gap-2 max-w-xs">
          <Input
            aria-label="Your answer"
            inputMode="decimal"
            value={input}
            placeholder="?"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && check()}
            disabled={status === 'answered'}
            className="font-mono"
          />
          {q.unit && <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">{q.unit}</span>}
        </div>
      )}

      {status === 'answered' && <Explanation correct={lastCorrect} text={q.explanation} />}

      <div className="flex flex-wrap gap-2">
        {status === 'asking' ? (
          <Button onClick={check} disabled={q.kind === 'numeric' ? !input : choice === null}>
            <Check className="mr-1 h-4 w-4" aria-hidden /> Submit
          </Button>
        ) : (
          <Button onClick={next}>
            {idx + 1 >= questions.length ? 'See results' : 'Next question'} <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
          </Button>
        )}
      </div>
    </div>
  )
}
