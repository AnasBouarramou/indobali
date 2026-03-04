import { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useSound } from '../../hooks/useSound.js'

export default function QuizSwipe({ exercise, onAnswer }) {
  const [cardIndex, setCardIndex] = useState(0)
  const [results, setResults] = useState([])
  const [exiting, setExiting] = useState(null) // 'right' | 'left' | null
  const { play } = useSound()

  const cards = exercise.cards || []
  const current = cards[cardIndex]

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-150, 150], [-18, 18])
  const opacityTrue = useTransform(x, [20, 90], [0, 1])
  const opacityFalse = useTransform(x, [-90, -20], [1, 0])
  const cardScale = useTransform(x, [-100, 0, 100], [0.97, 1, 0.97])

  function submitAnswer(userSaysTrue) {
    if (!current) return
    const isCorrect = userSaysTrue === current.is_true
    play(isCorrect ? 'correct' : 'wrong')

    const newResults = [...results, isCorrect]
    setExiting(userSaysTrue ? 'right' : 'left')

    setTimeout(() => {
      setExiting(null)
      x.set(0)
      if (cardIndex + 1 >= cards.length) {
        const correctCount = newResults.filter(Boolean).length
        onAnswer(correctCount >= Math.ceil(cards.length / 2))
      } else {
        setResults(newResults)
        setCardIndex(i => i + 1)
      }
    }, 280)
  }

  function handleDragEnd(_, info) {
    const threshold = 85
    if (info.offset.x > threshold) {
      submitAnswer(true)
    } else if (info.offset.x < -threshold) {
      submitAnswer(false)
    } else {
      x.set(0)
    }
  }

  if (!current) return null

  return (
    <div className="flex flex-col h-full items-center justify-center bg-parchment px-4 gap-5">
      {/* Progress dots */}
      <div className="flex gap-1.5 items-center">
        {cards.map((_, i) => {
          const done = i < cardIndex
          const active = i === cardIndex
          const correct = done && results[i]
          return (
            <div
              key={i}
              className={`rounded-full transition-all ${
                active ? 'w-8 h-2 bg-ochre' :
                correct ? 'w-2 h-2 bg-jungle' :
                done ? 'w-2 h-2 bg-coral' :
                'w-2 h-2 bg-parchment-dark'
              }`}
            />
          )
        })}
      </div>

      {/* Instruction */}
      <div className="text-center px-2">
        <p className="font-handwritten text-2xl font-bold text-jungle">
          {exercise.instruction || 'Vrai ou Faux ?'}
        </p>
        <p className="text-xs text-ink/50 mt-1 font-semibold tracking-wide">
          ← FAUX &nbsp;&nbsp;|&nbsp;&nbsp; VRAI →
        </p>
      </div>

      {/* Card stack */}
      <div className="relative w-full max-w-xs h-60 select-none">
        {/* Shadow card (next card) */}
        {cardIndex + 1 < cards.length && (
          <div className="absolute inset-x-4 bottom-0 top-4 bg-white rounded-3xl shadow-card border border-parchment-dark opacity-50 scale-[0.93]" />
        )}

        {/* Active card */}
        <AnimatePresence>
          {!exiting && (
            <motion.div
              key={cardIndex}
              style={{ x, rotate, scale: cardScale }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                x: exiting === 'right' ? 300 : -300,
                opacity: 0,
                transition: { duration: 0.25 },
              }}
              className="absolute inset-0 bg-cream rounded-3xl shadow-lift border border-parchment-dark flex flex-col items-center justify-center p-6 cursor-grab active:cursor-grabbing touch-none"
            >
              {/* VRAI badge */}
              <motion.div
                style={{ opacity: opacityTrue }}
                className="absolute top-4 right-4 bg-jungle text-white text-xs font-black px-3 py-1 rounded-full rotate-12 shadow-jungle"
              >
                ✓ VRAI
              </motion.div>

              {/* FAUX badge */}
              <motion.div
                style={{ opacity: opacityFalse }}
                className="absolute top-4 left-4 bg-coral text-white text-xs font-black px-3 py-1 rounded-full -rotate-12 shadow-coral"
              >
                ✗ FAUX
              </motion.div>

              {current.emoji && (
                <span className="text-5xl mb-3 leading-none">{current.emoji}</span>
              )}
              <p className="text-center font-black text-lg text-ink leading-snug text-balance">
                {current.statement}
              </p>
              {current.indonesian && (
                <p className="mt-2 text-center font-handwritten text-xl text-jungle font-bold">
                  {current.indonesian}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tap buttons */}
      <div className="flex gap-3 w-full max-w-xs">
        <button
          onClick={() => submitAnswer(false)}
          className="flex-1 py-3 rounded-organic-btn bg-coral/10 border-2 border-coral text-coral font-black text-sm active:scale-95 transition-all"
        >
          ✗ FAUX
        </button>
        <button
          onClick={() => submitAnswer(true)}
          className="flex-1 py-3 rounded-organic-btn bg-jungle/10 border-2 border-jungle text-jungle font-black text-sm active:scale-95 transition-all"
        >
          ✓ VRAI
        </button>
      </div>
    </div>
  )
}
