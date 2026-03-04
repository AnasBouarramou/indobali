import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuizReveal({ exercise, onAnswer }) {
  const [revealed, setRevealed] = useState(false)

  function handleReveal() {
    setRevealed(true)
  }

  function handleContinue() {
    onAnswer(true)
    setRevealed(false)
  }

  return (
    <div className="flex flex-col h-full bg-sand">
      <div className="flex-1 px-5 pt-6 pb-4 flex flex-col gap-5">
        {/* Question card */}
        <div className="bg-white rounded-3xl p-5 border border-sand-dark shadow-soft">
          <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
            Exercice de traduction
          </p>
          <p className="text-lg font-bold text-gray-800 text-balance leading-snug">
            {exercise.question}
          </p>
        </div>

        {/* Answer area */}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.button
              key="reveal-btn"
              onClick={handleReveal}
              className="w-full py-6 rounded-3xl border-2 border-dashed border-sand-dark bg-white text-gray-400 font-semibold text-base flex items-center justify-center gap-2 transition-all active:scale-95 hover:border-gray-400 hover:text-gray-600 shadow-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-2xl">👁</span>
              Voir la réponse
            </motion.button>
          ) : (
            <motion.div
              key="answer"
              className="bg-emerald-50 rounded-3xl border-2 border-emerald-300 p-5 shadow-soft"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <p className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-2">
                Réponse
              </p>
              <p className="text-lg font-black text-emerald-800">
                {exercise.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue button */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="px-5 pb-safe"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          >
            <button
              onClick={handleContinue}
              className="w-full py-4 rounded-3xl font-black text-base bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-jungle transition-all active:scale-95"
            >
              Continuer
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
