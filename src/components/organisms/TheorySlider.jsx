import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TheoryCard from '../molecules/TheoryCard.jsx'
import { useSound } from '../../hooks/useSound.js'

export default function TheorySlider({ rules, onComplete }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const { play } = useSound()

  const total = rules.length
  const current = rules[index]

  function handleNext() {
    play('pop')
    setDirection(1)
    if (index < total - 1) {
      setIndex(i => i + 1)
    } else {
      onComplete()
    }
  }

  function handlePrev() {
    if (index > 0) {
      play('pop')
      setDirection(-1)
      setIndex(i => i - 1)
    }
  }

  if (!rules || rules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-6 bg-sand">
        <p className="text-5xl">📖</p>
        <p className="text-gray-500 text-center font-semibold">Pas de règles pour cette leçon.</p>
        <button
          onClick={onComplete}
          className="mt-4 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-500 text-white rounded-3xl font-black shadow-lift active:scale-95 transition-all"
        >
          Continuer →
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-sand">
      {/* Card area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ x: direction * 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="h-full"
          >
            <TheoryCard rule={current} index={index} total={total} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-5 pb-safe pt-3 border-t border-sand-dark bg-white flex items-center gap-3 shadow-soft">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="w-12 h-12 rounded-2xl border-2 border-sand-dark bg-sand flex items-center justify-center text-gray-500 disabled:opacity-30 active:scale-95 transition-all font-bold"
        >
          ←
        </button>

        {/* Dot indicators */}
        <div className="flex-1 flex justify-center gap-1.5">
          {rules.map((_, i) => (
            <button
              key={i}
              onClick={() => { play('pop'); setDirection(i > index ? 1 : -1); setIndex(i) }}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'bg-violet-600 w-5' : 'bg-gray-200 w-2'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-5 h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-black text-sm active:scale-95 transition-all shadow-lift"
        >
          {index === total - 1 ? 'Terminé ✓' : 'Suivant →'}
        </button>
      </div>
    </div>
  )
}
