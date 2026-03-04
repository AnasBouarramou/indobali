import CultureNote from './CultureNote.jsx'

const HEADER_GRADIENTS = [
  'from-jungle to-jungle-light',
  'from-sky-700 to-sky-400',
  'from-ochre to-ochre-light',
  'from-sunset to-sunset-light',
  'from-violet-700 to-purple-400',
  'from-teal-700 to-teal-400',
]

export default function TheoryCard({ rule, index, total }) {
  const gradient = HEADER_GRADIENTS[(index || 0) % HEADER_GRADIENTS.length]

  return (
    <div className="flex flex-col h-full">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-br ${gradient} px-6 pt-8 pb-7 text-white shadow-lift`}>
        {rule.number !== undefined && (
          <div className="mb-3">
            <span className="inline-block bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full backdrop-blur font-handwritten text-sm">
              Règle {rule.number} / {total}
            </span>
          </div>
        )}
        <h2 className="font-handwritten text-2xl font-bold leading-tight text-balance">
          {rule.title}
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4 bg-parchment">
        {/* Explanation */}
        <p className="text-ink/80 leading-relaxed text-base font-medium">
          {rule.explanation}
        </p>

        {/* Example box */}
        {rule.example && (
          <div className="bg-cream rounded-2xl p-4 border border-parchment-dark shadow-soft card-organic">
            <p className="text-jungle font-black text-base mb-1.5 font-handwritten text-lg">
              🇮🇩 {rule.example.indonesian}
            </p>
            <p className="text-jungle/70 text-sm font-semibold">
              🇫🇷 {rule.example.french}
            </p>
          </div>
        )}

        {/* Note */}
        {rule.note && (
          <div className="bg-ochre/10 rounded-2xl p-4 border border-ochre/30 shadow-card flex gap-3">
            <span className="text-xl flex-shrink-0">💡</span>
            <p className="text-ochre/90 text-sm leading-relaxed font-semibold">
              {rule.note}
            </p>
          </div>
        )}

        {/* Cultural note */}
        {rule.cultural_note && (
          <CultureNote note={rule.cultural_note} />
        )}
      </div>
    </div>
  )
}
