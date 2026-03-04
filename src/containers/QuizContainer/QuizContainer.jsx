import { useState } from 'react'
import QuizBlock from '../../components/organisms/QuizBlock/QuizBlock.jsx'
import ExerciseItem from '../../components/molecules/ExerciseItem/ExerciseItem.jsx'
import styles from './QuizContainer.module.css'

/**
 * Container — QuizContainer
 * Handles two exercise types:
 *   - "mcq"    : multiple choice with options + correctIndex
 *   - "reveal" : show/hide answer (question + answer)
 *
 * @param {Array}    questions  — Array of exercise objects
 * @param {function} onComplete — (score, total) => void
 */
export default function QuizContainer({ questions = [], onComplete }) {
  const mcq    = questions.filter((q) => q.type === 'mcq' || !q.type)
  const reveal = questions.filter((q) => q.type === 'reveal')

  // MCQ state
  const [mcqIndex, setMcqIndex]       = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [submitted, setSubmitted]     = useState(false)
  const [score, setScore]             = useState(0)
  const [mcqFinished, setMcqFinished] = useState(false)

  // Reveal state — set of revealed exercise ids
  const [revealedIds, setRevealedIds] = useState(new Set())

  function handleSelect(index) {
    if (!submitted) setSelectedIndex(index)
  }

  function handleSubmit() {
    if (selectedIndex === null) return
    const current = mcq[mcqIndex]
    const isCorrect = selectedIndex === current.correctIndex
    if (isCorrect) setScore((s) => s + 1)
    setSubmitted(true)
  }

  function handleNext() {
    const nextIndex = mcqIndex + 1
    if (nextIndex >= mcq.length) {
      const finalScore = score + (selectedIndex === mcq[mcqIndex].correctIndex ? 1 : 0)
      setMcqFinished(true)
      onComplete?.(finalScore, mcq.length)
    } else {
      setMcqIndex(nextIndex)
      setSelectedIndex(null)
      setSubmitted(false)
    }
  }

  function handleReveal(id) {
    setRevealedIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  if (questions.length === 0) {
    return <p className={styles.empty}>Aucun exercice disponible pour ce jour.</p>
  }

  return (
    <div className={styles.wrapper}>

      {/* ── MCQ Section ── */}
      {mcq.length > 0 && (
        <div className={styles.section}>
          {mcq.length > 1 && !mcqFinished && (
            <p className={styles.counter}>
              Question {mcqIndex + 1} / {mcq.length}
            </p>
          )}

          {!mcqFinished ? (
            <QuizBlock
              question={mcq[mcqIndex].question}
              options={mcq[mcqIndex].options}
              selectedIndex={selectedIndex}
              submitted={submitted}
              correctIndex={mcq[mcqIndex].correctIndex}
              onSelect={handleSelect}
              onSubmit={handleSubmit}
              onNext={handleNext}
            />
          ) : (
            <div className={styles.result}>
              <p className={styles.resultTitle}>Quiz terminé !</p>
              <p className={styles.resultScore}>
                {score} / {mcq.length}
              </p>
              <p className={styles.resultFeedback}>
                {score === mcq.length
                  ? 'Parfait ! Toutes les réponses sont correctes.'
                  : score >= mcq.length * 0.7
                  ? 'Très bien ! Continue comme ça.'
                  : 'À retravailler. Relis le cours et réessaie.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Reveal Section ── */}
      {reveal.length > 0 && (
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Traduction — révèle la réponse quand tu es prêt</p>
          <div className={styles.revealList}>
            {reveal.map((ex, i) => (
              <ExerciseItem
                key={ex.id}
                number={i + 1}
                question={ex.question}
                answer={ex.answer}
                showAnswer={revealedIds.has(ex.id)}
                onReveal={() => handleReveal(ex.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
