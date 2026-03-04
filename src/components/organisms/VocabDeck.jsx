import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import VocabFlipCard from '../molecules/VocabFlipCard.jsx'
import { useSound } from '../../hooks/useSound.js'

export default function VocabDeck({ vocab, onComplete }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const { play } = useSound()

  if (!vocab || vocab.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-6 bg-sand">
        <p className="text-5xl">📝</p>
        <p className="text-gray-500 text-center font-semibold">Pas de vocabulaire pour cette leçon.</p>
        <button
          onClick={onComplete}
          className="mt-4 px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-3xl font-black active:scale-95 transition-all shadow-lift"
        >
          Continuer →
        </button>
      </div>
    )
  }

  const total = vocab.length

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

  return (
    <div className="flex flex-col h-full bg-sand">
      {/* Counter */}
      <div className="px-5 pt-3 pb-1 flex justify-between items-center">
        <span className="text-sm text-gray-400 font-bold">
          {index + 1} / {total}
        </span>
        <span className="text-xs text-sky-500 font-black">
          Appuie sur la carte →
        </span>
      </div>

      {/* Card with AnimatePresence */}
      <div className="flex-1 px-5 py-3">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ x: direction * 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="h-full"
          >
            <VocabFlipCard vocab={vocab[index]} />
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

        {/* Dot indicators — max 15 shown */}
        <div className="flex-1 flex justify-center gap-1 overflow-hidden">
          {vocab.slice(0, 15).map((_, i) => (
            <button
              key={i}
              onClick={() => { play('pop'); setDirection(i > index ? 1 : -1); setIndex(i) }}
              className={`h-2 rounded-full transition-all flex-shrink-0 ${
                i === index ? 'bg-sky-500 w-5' : i < index ? 'bg-sky-200 w-2' : 'bg-gray-200 w-2'
              }`}
            />
          ))}
          {total > 15 && (
            <span className="text-xs text-gray-300 self-center ml-1 font-bold">+{total - 15}</span>
          )}
        </div>

        <button
          onClick={handleNext}
          className="px-5 h-12 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-black text-sm active:scale-95 transition-all shadow-lift"
        >
          {index === total - 1 ? 'Pratiquer →' : 'Suivant →'}
        </button>
      </div>
    </div>
  )
}
