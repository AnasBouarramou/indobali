import { motion } from 'framer-motion'

export default function FeedbackBar({ correct, correctAnswer, onContinue }) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      className={`px-5 pt-4 pb-safe border-t-2 ${
        correct
          ? 'bg-emerald-50 border-emerald-200'
          : 'bg-rose-50 border-rose-200'
      }`}
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl flex-shrink-0 mt-0.5">{correct ? '✅' : '❌'}</span>
        <div>
          <p className={`font-black text-base ${correct ? 'text-emerald-700' : 'text-rose-700'}`}>
            {correct ? 'Excellente réponse !' : 'Pas tout à fait…'}
          </p>
          {!correct && correctAnswer && (
            <p className="text-sm text-rose-600 mt-0.5 font-semibold">
              Réponse : <strong>{correctAnswer}</strong>
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onContinue}
        className={`
          w-full py-4 rounded-3xl font-black text-base transition-all active:scale-95
          ${correct
            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-jungle'
            : 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-coral'}
        `}
      >
        Continuer
      </button>
    </motion.div>
  )
}
