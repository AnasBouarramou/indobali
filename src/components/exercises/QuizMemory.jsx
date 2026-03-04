import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSound } from '../../hooks/useSound.js'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Pair colors for matched cards
const PAIR_COLORS = [
  'border-jungle bg-jungle/10 text-jungle',
  'border-ochre bg-ochre/10 text-ochre',
  'border-sunset bg-sunset/10 text-sunset',
  'border-coral bg-coral/10 text-coral',
  'border-sky-500 bg-sky-50 text-sky-700',
  'border-violet-500 bg-violet-50 text-violet-700',
]

export default function QuizMemory({ exercise, onAnswer }) {
  const { play } = useSound()
  const pairs = exercise.pairs || []

  const [cards] = useState(() =>
    shuffle([
      ...pairs.map((p, i) => ({ id: `a${i}`, pairId: i, text: p.indonesian, lang: 'id' })),
      ...pairs.map((p, i) => ({ id: `b${i}`, pairId: i, text: p.french, lang: 'fr' })),
    ])
  )

  const [flipped, setFlipped] = useState([])   // indices currently face-up (max 2)
  const [matched, setMatched] = useState(new Set()) // indices that are matched
  const [locked, setLocked] = useState(false)
  const [wrong, setWrong] = useState([])        // indices to shake

  function handleFlip(idx) {
    if (locked || matched.has(idx) || flipped.includes(idx) || flipped.length >= 2) return

    const newFlipped = [...flipped, idx]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setLocked(true)
      const [a, b] = newFlipped
      if (cards[a].pairId === cards[b].pairId) {
        play('correct')
        const newMatched = new Set([...matched, a, b])
        setMatched(newMatched)
        setFlipped([])
        setLocked(false)
        if (newMatched.size === cards.length) {
          setTimeout(() => onAnswer(true), 700)
        }
      } else {
        play('wrong')
        setWrong([a, b])
        setTimeout(() => {
          setFlipped([])
          setWrong([])
          setLocked(false)
        }, 900)
      }
    }
  }

  const cols = cards.length <= 8 ? 4 : 4

  return (
    <div className="flex flex-col h-full bg-parchment px-4 py-5">
      <div className="mb-4 text-center">
        <p className="font-handwritten text-2xl font-bold text-jungle">
          {exercise.instruction || 'Associe les paires !'}
        </p>
        <p className="text-xs text-ink/50 mt-1 font-semibold">
          {matched.size / 2} / {pairs.length} paires trouvées
        </p>
      </div>

      {/* Pairs found indicator */}
      <div className="flex gap-1.5 justify-center mb-4">
        {pairs.map((_, i) => {
          const isFound = [...matched].some(idx => cards[idx]?.pairId === i)
          return (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                isFound ? 'w-6 bg-jungle' : 'w-2 bg-parchment-dark'
              }`}
            />
          )
        })}
      </div>

      <div
        className="grid gap-2.5 flex-1"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.has(idx)
          const isMatched = matched.has(idx)
          const isWrong = wrong.includes(idx)
          const matchColor = isMatched ? PAIR_COLORS[card.pairId % PAIR_COLORS.length] : ''

          return (
            <motion.button
              key={card.id}
              onClick={() => handleFlip(idx)}
              animate={isWrong ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={isWrong ? { duration: 0.4 } : {}}
              whileTap={!isFlipped ? { scale: 0.88 } : {}}
              className={`
                aspect-square rounded-2xl flex items-center justify-center p-1.5
                text-center font-bold transition-all text-xs leading-tight overflow-hidden
                ${isMatched
                  ? `border-2 ${matchColor} cursor-default`
                  : isFlipped
                  ? 'bg-cream border-2 border-ochre text-ink shadow-card'
                  : 'bg-gradient-to-br from-jungle to-jungle-light text-white shadow-card cursor-pointer'}
                ${isWrong ? 'border-2 border-coral bg-coral/10' : ''}
              `}
            >
              {isFlipped ? (
                <motion.span
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  className={`w-full text-center break-words hyphens-auto text-[11px] font-black leading-tight ${
                    card.lang === 'id' ? 'font-handwritten text-sm' : ''
                  }`}
                >
                  {card.text}
                </motion.span>
              ) : (
                <span className="text-xl opacity-60">🌸</span>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
