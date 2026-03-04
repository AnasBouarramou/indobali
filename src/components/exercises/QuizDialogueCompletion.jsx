import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuizDialogueCompletion({ exercise, onAnswer }) {
  const lines = exercise.lines
  const [currentLine, setCurrentLine] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState([])

  const currentUserLineIdx = (() => {
    for (let i = currentLine; i < lines.length; i++) {
      if (lines[i].speaker === 'user') return i
    }
    return -1
  })()

  const done = currentUserLineIdx === -1

  function handleSelect(optIdx) {
    if (answered) return
    setSelectedOption(optIdx)
  }

  function handleConfirm() {
    if (selectedOption === null || answered) return
    const line = lines[currentUserLineIdx]
    const correct = selectedOption === line.correctIndex
    if (correct) setScore(s => s + 1)
    setHistory(prev => [
      ...prev,
      { lineIdx: currentUserLineIdx, selected: selectedOption, correct },
    ])
    setAnswered(true)
  }

  function handleNext() {
    const nextStart = currentUserLineIdx + 1
    setCurrentLine(nextStart)
    setSelectedOption(null)
    setAnswered(false)
  }

  function handleFinish() {
    const userLines = lines.filter(l => l.speaker === 'user')
    onAnswer(score, userLines.length)
  }

  const userLines = lines.filter(l => l.speaker === 'user')
  const totalUserLines = userLines.length

  return (
    <div className="flex flex-col h-full bg-sand">
      {/* Chat bubbles */}
      <div className="flex-1 px-4 pt-4 pb-2 overflow-y-auto flex flex-col gap-3 scrollbar-hide">
        <p className="text-xs text-center text-gray-400 font-semibold mb-1">
          {exercise.instruction}
        </p>

        <AnimatePresence initial={false}>
          {lines.map((line, idx) => {
            if (idx > currentLine && !done) return null

            const pastAnswer = history.find(h => h.lineIdx === idx)

            if (line.speaker === 'agent') {
              return (
                <motion.div
                  key={`agent-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex-shrink-0 flex items-center justify-center text-base">
                    🇮🇩
                  </div>
                  <div className="bg-white rounded-3xl rounded-bl-md px-4 py-3 max-w-[80%] shadow-card">
                    <p className="text-sm text-gray-800 font-semibold">{line.text}</p>
                  </div>
                </motion.div>
              )
            }

            if (line.speaker === 'user' && pastAnswer) {
              const selectedText = line.options[pastAnswer.selected]
              return (
                <motion.div
                  key={`user-answered-${idx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-end"
                >
                  <div
                    className={`rounded-3xl rounded-br-md px-4 py-3 max-w-[80%] shadow-card ${
                      pastAnswer.correct
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
                        : 'bg-gradient-to-br from-rose-500 to-rose-600 text-white'
                    }`}
                  >
                    <p className="text-sm font-bold">{selectedText}</p>
                    {!pastAnswer.correct && (
                      <p className="text-xs mt-1 opacity-80 font-semibold">
                        ✓ {line.options[line.correctIndex]}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            }

            // Current user turn: show MCQ options
            if (line.speaker === 'user' && idx === currentUserLineIdx && !done) {
              return (
                <motion.div
                  key={`user-choice-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2"
                >
                  <p className="text-xs text-right text-gray-400 mb-2 italic font-semibold">
                    {line.prompt}
                  </p>
                  <div className="flex flex-col gap-2 items-end">
                    {line.options.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => handleSelect(oi)}
                        disabled={answered}
                        className={`
                          text-right px-4 py-3 rounded-3xl border-2 text-sm font-bold
                          max-w-[85%] transition-all active:scale-95
                          ${answered && oi === line.correctIndex
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                            : answered && oi === selectedOption
                            ? 'border-rose-400 bg-rose-50 text-rose-800'
                            : selectedOption === oi
                            ? 'border-sky-500 bg-sky-50 text-sky-800'
                            : 'border-sand-dark bg-white text-gray-800 shadow-card'}
                        `}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )
            }

            return null
          })}
        </AnimatePresence>

        {/* Done state */}
        {done && (
          <motion.div
            className="text-center py-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <p className="text-3xl mb-2">🎉</p>
            <p className="font-black text-gray-800">
              {score}/{totalUserLines} bonnes réponses
            </p>
          </motion.div>
        )}
      </div>

      {/* Action button */}
      <div className="px-5 pb-safe pt-2 border-t border-sand-dark bg-sand">
        {done ? (
          <button
            onClick={handleFinish}
            className="w-full py-4 rounded-3xl font-black text-base bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-jungle transition-all active:scale-95"
          >
            Continuer
          </button>
        ) : answered ? (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-3xl font-black text-base bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-card transition-all active:scale-95"
          >
            Suivant →
          </button>
        ) : (
          <button
            onClick={handleConfirm}
            disabled={selectedOption === null}
            className="w-full py-4 rounded-3xl font-black text-base bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-jungle transition-all active:scale-95 disabled:opacity-40"
          >
            Valider
          </button>
        )}
      </div>
    </div>
  )
}
