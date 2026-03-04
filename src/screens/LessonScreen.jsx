import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import StepIndicator from '../components/organisms/StepIndicator.jsx'
import TheorySlider from '../components/organisms/TheorySlider.jsx'
import VocabDeck from '../components/organisms/VocabDeck.jsx'
import PracticeSession from '../components/organisms/PracticeSession.jsx'

const DAY_EMOJIS = {
  intro: '🌟',
  jour1: '🔤',
  jour2: '👋',
  jour3: '🙋',
  jour4: '❓',
  jour5: '🛠️',
  jour6: '⏰',
  jour7: '🎯',
}

export default function LessonScreen({ dayData, onComplete, onExit }) {
  const [step, setStep] = useState(0) // 0=theory, 1=vocab, 2=practice

  const theoryRules = dayData.grammar_rules || []
  const vocab = dayData.vocabulary || []
  const exercises = dayData.exercises || []

  const dayEmoji = DAY_EMOJIS[dayData.id] || '📖'

  function handleTheoryDone() {
    if (vocab.length > 0) {
      setStep(1)
    } else if (exercises.length > 0) {
      setStep(2)
    } else {
      onComplete(0, 10)
    }
  }

  function handleVocabDone() {
    if (exercises.length > 0) {
      setStep(2)
    } else {
      onComplete(0, 10)
    }
  }

  function handlePracticeDone(correctCount, earnedXp) {
    onComplete(correctCount, earnedXp)
  }

  return (
    <div className="flex flex-col min-h-dvh bg-sand">
      {/* Header — jungle gradient */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white px-4 pt-safe pt-4 pb-4 shadow-jungle">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:scale-90 transition-all"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0">{dayEmoji}</span>
            <p className="font-black text-white text-sm truncate">{dayData.title}</p>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <StepIndicator currentStep={step} progress={0} />

      {/* Step content with AnimatePresence */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="h-full"
          >
            {step === 0 && (
              <TheorySlider rules={theoryRules} onComplete={handleTheoryDone} />
            )}
            {step === 1 && (
              <VocabDeck vocab={vocab} onComplete={handleVocabDone} />
            )}
            {step === 2 && (
              <PracticeSession exercises={exercises} onComplete={handlePracticeDone} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
