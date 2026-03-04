import { useState } from 'react'
import { motion } from 'framer-motion'
import FeedbackBar from '../molecules/FeedbackBar.jsx'

export default function QuizSentenceBuilder({ exercise, onAnswer }) {
  const [assembled, setAssembled] = useState([])
  const [used, setUsed] = useState([])
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  function addWord(word, idx) {
    if (answered || used.includes(idx)) return
    setAssembled(prev => [...prev, { word, idx }])
    setUsed(prev => [...prev, idx])
  }

  function removeWord(assembledIdx) {
    if (answered) return
    const removed = assembled[assembledIdx]
    setAssembled(prev => prev.filter((_, i) => i !== assembledIdx))
    setUsed(prev => prev.filter(i => i !== removed.idx))
  }

  function handleCheck() {
    const sentence = assembled.map(a => a.word)
    const correct = JSON.stringify(sentence) === JSON.stringify(exercise.correctSentence)
    setIsCorrect(correct)
    setAnswered(true)
  }

  function handleContinue() {
    onAnswer(isCorrect)
    setAssembled([])
    setUsed([])
    setAnswered(false)
    setIsCorrect(false)
  }

  return (
    <div className="flex flex-col h-full bg-sand">
      <div className="flex-1 px-5 pt-6 pb-4 flex flex-col gap-4">
        <p className="text-lg font-bold text-gray-800 text-balance leading-snug">
          {exercise.instruction}
        </p>

        {/* Assembly zone */}
        <div
          className={`
            min-h-[64px] rounded-3xl border-2 border-dashed p-3 flex flex-wrap gap-2 transition-colors
            ${answered
              ? isCorrect
                ? 'border-emerald-400 bg-emerald-50'
                : 'border-rose-400 bg-rose-50'
              : 'border-sand-dark bg-white'}
          `}
        >
          {assembled.length === 0 && (
            <span className="text-gray-400 text-sm italic self-center font-medium">
              Appuie sur les mots ci-dessous…
            </span>
          )}
          {assembled.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => removeWord(i)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`
                px-3.5 py-2 rounded-2xl text-sm font-black transition-all active:scale-95
                ${answered && isCorrect
                  ? 'bg-emerald-500 text-white'
                  : answered && !isCorrect
                  ? 'bg-rose-400 text-white'
                  : 'bg-sky-500 text-white shadow-card'}
              `}
            >
              {item.word}
            </motion.button>
          ))}
        </div>

        {/* Word bank */}
        <div className="flex flex-wrap gap-2">
          {exercise.words.map((word, idx) => {
            const isUsed = used.includes(idx)
            return (
              <button
                key={idx}
                onClick={() => addWord(word, idx)}
                disabled={isUsed || answered}
                className={`
                  px-3.5 py-2 rounded-2xl border-2 text-sm font-bold transition-all active:scale-95
                  ${isUsed || answered
                    ? 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'border-sand-dark bg-white text-gray-800 hover:border-sky-400 hover:bg-sky-50 shadow-card'}
                `}
              >
                {word}
              </button>
            )
          })}
        </div>
      </div>

      {/* Check button or feedback */}
      {answered ? (
        <FeedbackBar
          correct={isCorrect}
          correctAnswer={!isCorrect ? exercise.correctSentence.join(' ') : null}
          onContinue={handleContinue}
        />
      ) : (
        <div className="px-5 pb-safe">
          <button
            onClick={handleCheck}
            disabled={assembled.length === 0}
            className="w-full py-4 rounded-3xl font-black text-base transition-all active:scale-95 disabled:opacity-40 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-jungle"
          >
            Vérifier
          </button>
        </div>
      )}
    </div>
  )
}
