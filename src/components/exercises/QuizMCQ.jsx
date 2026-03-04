import { useState } from 'react'
import { motion } from 'framer-motion'
import FeedbackBar from '../molecules/FeedbackBar.jsx'
import { useSound } from '../../hooks/useSound.js'

export default function QuizMCQ({ exercise, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const { play } = useSound()

  const isCorrect = selected === exercise.correctIndex

  function handleSelect(idx) {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === exercise.correctIndex) {
      play('correct')
    } else {
      play('wrong')
    }
  }

  function handleContinue() {
    onAnswer(isCorrect)
    setSelected(null)
    setAnswered(false)
  }

  return (
    <div className="flex flex-col h-full bg-sand">
      {/* Question */}
      <div className="flex-1 px-5 pt-6 pb-4">
        <p className="text-lg font-bold text-gray-800 mb-6 text-balance leading-snug">
          {exercise.question}
        </p>

        <div className="flex flex-col gap-3">
          {exercise.options.map((opt, idx) => {
            const isThisCorrect = idx === exercise.correctIndex
            const isThisSelected = idx === selected

            // Determine button style
            let btnClass =
              'w-full text-left px-4 py-4 rounded-3xl border-2 font-semibold transition-colors text-base '

            if (!answered) {
              btnClass += 'border-sand-dark bg-white text-gray-800 active:scale-95'
            } else if (isThisCorrect) {
              btnClass += 'border-emerald-500 bg-emerald-50 text-emerald-800'
            } else if (isThisSelected) {
              btnClass += 'border-rose-400 bg-rose-50 text-rose-800'
            } else {
              btnClass += 'border-gray-200 bg-white text-gray-400'
            }

            // Animation for answered state
            const animateProps = answered && isThisCorrect
              ? { animate: { scale: [1, 1.05, 1] }, transition: { duration: 0.35 } }
              : answered && isThisSelected && !isThisCorrect
              ? { animate: { x: [0, -8, 8, -5, 5, 0] }, transition: { duration: 0.4 } }
              : {}

            return (
              <motion.button
                key={idx}
                className={btnClass}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                {...animateProps}
              >
                <span className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-black">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Feedback */}
      {answered && (
        <FeedbackBar
          correct={isCorrect}
          correctAnswer={!isCorrect ? exercise.options[exercise.correctIndex] : null}
          onContinue={handleContinue}
        />
      )}
    </div>
  )
}
