import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuizMCQ from '../exercises/QuizMCQ.jsx'
import QuizSentenceBuilder from '../exercises/QuizSentenceBuilder.jsx'
import QuizMatching from '../exercises/QuizMatching.jsx'
import QuizReveal from '../exercises/QuizReveal.jsx'
import QuizDialogueCompletion from '../exercises/QuizDialogueCompletion.jsx'
import QuizSwipe from '../exercises/QuizSwipe.jsx'
import QuizMemory from '../exercises/QuizMemory.jsx'
import { useCombo } from '../../hooks/useCombo.js'
import { useSound } from '../../hooks/useSound.js'

const XP_TABLE = {
  mcq: 5,
  sentence_builder: 8,
  matching: 8,
  reveal: 1,
  dialogue_completion: 5,
  swipe: 6,
  memory: 10,
}

// Combo milestone messages
const COMBO_MESSAGES = ['🔥 x3 Combo!', '⚡ x6 Super!', '🌟 x9 Ultime!', '🎯 Combo!']

function ExerciseComponent({ exercise, onAnswer }) {
  switch (exercise.type) {
    case 'mcq':
      return <QuizMCQ exercise={exercise} onAnswer={onAnswer} />
    case 'sentence_builder':
      return <QuizSentenceBuilder exercise={exercise} onAnswer={onAnswer} />
    case 'matching':
      return <QuizMatching exercise={exercise} onAnswer={onAnswer} />
    case 'reveal':
      return <QuizReveal exercise={exercise} onAnswer={onAnswer} />
    case 'dialogue_completion':
      return (
        <QuizDialogueCompletion
          exercise={exercise}
          onAnswer={(score, total) => onAnswer(true, score * XP_TABLE.dialogue_completion)}
        />
      )
    case 'swipe':
      return <QuizSwipe exercise={exercise} onAnswer={onAnswer} />
    case 'memory':
      return <QuizMemory exercise={exercise} onAnswer={onAnswer} />
    default:
      return (
        <div className="flex items-center justify-center h-full text-gray-400 font-semibold">
          Type inconnu : {exercise.type}
        </div>
      )
  }
}

export default function PracticeSession({ exercises, onComplete }) {
  const [index, setIndex] = useState(0)
  const [xp, setXp] = useState(0)
  const [correct, setCorrect] = useState(0)
  const { combo, celebrating, hit, miss } = useCombo()
  const { play } = useSound()

  if (!exercises || exercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-6 bg-parchment">
        <p className="text-5xl">🎉</p>
        <p className="text-ink/70 text-center font-black">
          Pas d'exercices pour cette leçon.
        </p>
        <button
          onClick={() => onComplete(0, 0)}
          className="mt-4 px-8 py-4 bg-gradient-to-r from-jungle to-jungle-light text-white rounded-organic-btn font-black active:scale-95 transition-all shadow-jungle"
        >
          Terminer →
        </button>
      </div>
    )
  }

  const total = exercises.length
  const current = exercises[index]
  const progressPct = (index / total) * 100

  function handleAnswer(isCorrect, bonusXp = 0) {
    const earnedXp = bonusXp > 0 ? bonusXp : isCorrect ? (XP_TABLE[current.type] || 5) : 0
    const newXp = xp + earnedXp
    const newCorrect = correct + (isCorrect ? 1 : 0)

    if (isCorrect) {
      hit()
    } else {
      miss()
    }

    if (index + 1 >= total) {
      onComplete(newCorrect, newXp + 10)
    } else {
      setXp(newXp)
      setCorrect(newCorrect)
      setIndex(i => i + 1)
    }
  }

  return (
    <div className="flex flex-col h-full bg-parchment relative">
      {/* Combo celebration overlay */}
      <AnimatePresence>
        {celebrating && (
          <motion.div
            key={combo}
            initial={{ scale: 0, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -30 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-ochre to-sunset text-white font-handwritten font-bold text-2xl px-6 py-2 rounded-full shadow-ochre whitespace-nowrap">
              {COMBO_MESSAGES[Math.floor(combo / 3 - 1) % COMBO_MESSAGES.length]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-parchment-dark bg-cream/80 backdrop-blur">
        <div className="flex-1 bg-parchment-dark rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-jungle to-jungle-light rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Combo indicator */}
        <AnimatePresence>
          {combo >= 2 && (
            <motion.span
              key={combo}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
              className="text-xs font-black text-sunset flex items-center gap-0.5"
            >
              🔥{combo}
            </motion.span>
          )}
        </AnimatePresence>

        <span className="text-xs font-black text-ochre flex items-center gap-1">
          ⚡ {xp} XP
        </span>
      </div>

      {/* Exercise */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.id}-${index}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="h-full"
          >
            <ExerciseComponent
              exercise={current}
              onAnswer={handleAnswer}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
