import { useState } from 'react'
import { useSpeech } from '../../hooks/useSpeech.js'
import { useSound } from '../../hooks/useSound.js'

export default function VocabFlipCard({ vocab }) {
  const [flipped, setFlipped] = useState(false)
  const { speak, isSpeaking, isSupported } = useSpeech()
  const { play } = useSound()

  function handleFlip() {
    setFlipped(f => !f)
    play('flip')
  }

  function handleSpeak(e) {
    e.stopPropagation()
    speak(vocab.indonesian)
  }

  return (
    <div
      className="flip-card w-full h-full cursor-pointer select-none"
      onClick={handleFlip}
    >
      <div className={`flip-card-inner w-full h-full ${flipped ? 'flipped' : ''}`}>
        {/* Front — Indonesian */}
        <div className="flip-card-front w-full h-full bg-gradient-to-br from-sky-500 to-cyan-400 rounded-3xl flex flex-col items-center justify-center p-8 text-white shadow-lift">
          <p className="text-4xl font-black mb-3 text-center">{vocab.indonesian}</p>
          {vocab.pronunciation && (
            <p className="text-sky-100 text-base font-semibold mb-2">
              /{vocab.pronunciation}/
            </p>
          )}
          {isSupported && (
            <button
              onClick={handleSpeak}
              className={`
                mt-4 px-5 py-2.5 rounded-2xl bg-white/20 backdrop-blur text-white
                text-sm font-black flex items-center gap-2 transition-all active:scale-95
                border border-white/30
                ${isSpeaking ? 'opacity-70' : 'hover:bg-white/30'}
              `}
            >
              <span className="text-lg">🔊</span>
              {isSpeaking ? 'Lecture…' : 'Écouter'}
            </button>
          )}
          <p className="mt-6 text-xs text-sky-100 opacity-70 font-semibold">
            Appuie pour voir la traduction
          </p>
        </div>

        {/* Back — French */}
        <div className="flip-card-back w-full h-full bg-white rounded-3xl flex flex-col items-center justify-center p-8 shadow-lift">
          <p className="text-3xl font-black text-gray-800 mb-3 text-center">{vocab.french}</p>
          {vocab.example && (
            <div className="bg-sky-50 rounded-2xl p-4 mt-2 w-full text-center border border-sky-100">
              <p className="text-sky-800 text-sm font-semibold italic">"{vocab.example}"</p>
            </div>
          )}
          {vocab.note && (
            <p className="text-gray-400 text-xs mt-3 text-center font-semibold">{vocab.note}</p>
          )}
          <p className="mt-6 text-xs text-gray-300 font-semibold">Appuie pour revenir</p>
        </div>
      </div>
    </div>
  )
}
