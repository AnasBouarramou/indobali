import { useState } from 'react'
import { motion } from 'framer-motion'
import FeedbackBar from '../molecules/FeedbackBar.jsx'

const PAIR_COLORS_LIGHT = [
  'bg-violet-100 border-violet-400 text-violet-800',
  'bg-sky-100 border-sky-400 text-sky-800',
  'bg-amber-100 border-amber-400 text-amber-800',
  'bg-rose-100 border-rose-400 text-rose-800',
]

export default function QuizMatching({ exercise, onAnswer }) {
  const pairs = exercise.pairs
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [matched, setMatched] = useState([])
  const [done, setDone] = useState(false)

  const rightOrder = useState(() =>
    [...pairs.map((_, i) => i)].sort(() => Math.random() - 0.5)
  )[0]

  function isLeftMatched(idx) {
    return matched.find(m => m.leftIdx === idx)
  }

  function isRightMatched(idx) {
    return matched.find(m => m.rightIdx === idx)
  }

  function getMatchColor(idx, side) {
    const m = side === 'left'
      ? matched.find(m => m.leftIdx === idx)
      : matched.find(m => m.rightIdx === idx)
    return m ? PAIR_COLORS_LIGHT[m.colorIdx % PAIR_COLORS_LIGHT.length] : null
  }

  function handleLeft(idx) {
    if (isLeftMatched(idx) || done) return
    setSelectedLeft(idx === selectedLeft ? null : idx)
  }

  function handleRight(idx) {
    if (isRightMatched(idx) || done) return

    if (selectedLeft === null) {
      setSelectedRight(idx === selectedRight ? null : idx)
      return
    }

    const isCorrectPair = rightOrder[idx] === selectedLeft
    const colorIdx = matched.length
    const newMatch = { leftIdx: selectedLeft, rightIdx: idx, colorIdx, correct: isCorrectPair }
    const newMatched = [...matched, newMatch]
    setMatched(newMatched)
    setSelectedLeft(null)
    setSelectedRight(null)

    if (newMatched.length === pairs.length) {
      setDone(true)
    }
  }

  function handleContinue() {
    const allCorrect = matched.every(m => m.correct)
    onAnswer(allCorrect)
    setMatched([])
    setSelectedLeft(null)
    setSelectedRight(null)
    setDone(false)
  }

  return (
    <div className="flex flex-col h-full bg-sand">
      <div className="flex-1 px-5 pt-6 pb-4">
        <p className="text-lg font-bold text-gray-800 mb-5 text-balance">
          {exercise.instruction}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {/* Left column */}
          <div className="flex flex-col gap-3">
            {pairs.map((pair, idx) => {
              const matchColor = getMatchColor(idx, 'left')
              const isSelected = selectedLeft === idx
              return (
                <motion.button
                  key={idx}
                  onClick={() => handleLeft(idx)}
                  disabled={!!isLeftMatched(idx) || done}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    px-3 py-3 rounded-2xl border-2 text-sm font-bold text-center transition-colors
                    ${matchColor
                      ? matchColor
                      : isSelected
                      ? 'border-sky-500 bg-sky-50 text-sky-800'
                      : 'border-sand-dark bg-white text-gray-800 shadow-card'}
                  `}
                >
                  {pair.left}
                </motion.button>
              )
            })}
          </div>

          {/* Right column — shuffled */}
          <div className="flex flex-col gap-3">
            {rightOrder.map((pairIdx, displayIdx) => {
              const matchColor = getMatchColor(displayIdx, 'right')
              const isSelected = selectedRight === displayIdx
              return (
                <motion.button
                  key={displayIdx}
                  onClick={() => handleRight(displayIdx)}
                  disabled={!!isRightMatched(displayIdx) || done}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    px-3 py-3 rounded-2xl border-2 text-sm font-bold text-center transition-colors
                    ${matchColor
                      ? matchColor
                      : isSelected
                      ? 'border-violet-500 bg-violet-50 text-violet-800'
                      : 'border-sand-dark bg-white text-gray-800 shadow-card'}
                  `}
                >
                  {pairs[pairIdx].right}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {done && (
        <FeedbackBar
          correct={matched.every(m => m.correct)}
          correctAnswer={null}
          onContinue={handleContinue}
        />
      )}
    </div>
  )
}
