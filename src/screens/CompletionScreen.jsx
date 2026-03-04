import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useConfetti } from '../hooks/useConfetti.js'
import { useSound } from '../hooks/useSound.js'
import { Star } from 'lucide-react'

function getStarCount(correctCount, total) {
  if (total === 0) return 3
  const ratio = correctCount / total
  if (ratio >= 0.9) return 3
  if (ratio >= 0.6) return 2
  return 1
}

export default function CompletionScreen({ correctCount, totalExercises, earnedXp, dayTitle, onContinue }) {
  const { launch } = useConfetti()
  const { play } = useSound()
  const launched = useRef(false)
  const stars = getStarCount(correctCount, totalExercises)

  useEffect(() => {
    if (!launched.current) {
      launched.current = true
      play('fanfare')
      setTimeout(() => launch(document.body, stars >= 2 ? 100 : 50), 300)
    }
  }, [launch, play, stars])

  return (
    <div className="flex flex-col min-h-dvh bg-sand items-center justify-center px-6 text-center">
      {/* Stars */}
      <div className="flex gap-3 mb-8">
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            initial={{ scale: 0, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
              delay: i * 0.15,
            }}
          >
            <Star
              size={52}
              className={`${
                i <= stars
                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_4px_12px_rgba(251,191,36,0.5)]'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          {stars === 3 ? 'Parfait ! 🎉' : stars === 2 ? 'Très bien ! 👏' : 'Bien joué ! 💪'}
        </h1>
        <p className="text-gray-500 text-sm font-semibold mb-8">{dayTitle} terminé</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="w-full max-w-xs flex gap-4 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75, type: 'spring', stiffness: 200 }}
      >
        <div className="flex-1 bg-amber-50 rounded-3xl p-4 border border-amber-100 shadow-soft">
          <p className="text-2xl font-black text-amber-600">+{earnedXp}</p>
          <p className="text-xs text-amber-500 font-bold mt-0.5">XP gagnés</p>
        </div>
        {totalExercises > 0 && (
          <div className="flex-1 bg-emerald-50 rounded-3xl p-4 border border-emerald-100 shadow-soft">
            <p className="text-2xl font-black text-emerald-600">
              {correctCount}/{totalExercises}
            </p>
            <p className="text-xs text-emerald-500 font-bold mt-0.5">Bonnes réponses</p>
          </div>
        )}
      </motion.div>

      {/* Continue button */}
      <motion.button
        onClick={onContinue}
        className="w-full max-w-xs py-4 rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-base shadow-jungle active:scale-95 transition-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        Continuer →
      </motion.button>
    </div>
  )
}
