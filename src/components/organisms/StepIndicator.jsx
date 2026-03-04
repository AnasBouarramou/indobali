const STEPS = [
  { label: 'Comprendre', emoji: '🧠', color: 'bg-violet-600', textColor: 'text-violet-600', activeBg: 'bg-violet-100' },
  { label: 'Découvrir',  emoji: '📚', color: 'bg-sky-500',    textColor: 'text-sky-500',    activeBg: 'bg-sky-100' },
  { label: 'Pratiquer', emoji: '⚡', color: 'bg-emerald-500', textColor: 'text-emerald-600', activeBg: 'bg-emerald-100' },
]

export default function StepIndicator({ currentStep, progress }) {
  return (
    <div className="px-4 py-3 bg-white border-b border-sand-dark shadow-card">
      {/* Step pills */}
      <div className="flex gap-2 mb-2.5">
        {STEPS.map((step, idx) => {
          const isActive = idx === currentStep
          const isDone = idx < currentStep
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`
                  flex items-center gap-1.5 px-2.5 py-1 rounded-2xl text-xs font-black transition-all
                  ${isActive
                    ? `${step.activeBg} ${step.textColor}`
                    : isDone
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-gray-100 text-gray-300'}
                `}
              >
                <span className={`${!isActive && !isDone ? 'opacity-40' : ''}`}>
                  {isDone ? '✓' : step.emoji}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              <div
                className={`h-1.5 w-full rounded-full transition-all ${
                  isDone
                    ? 'bg-emerald-400'
                    : isActive
                    ? step.color
                    : 'bg-gray-200'
                }`}
              />
            </div>
          )
        })}
      </div>

      {/* Sub-progress within current step */}
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${STEPS[currentStep]?.color || 'bg-gray-300'}`}
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  )
}
