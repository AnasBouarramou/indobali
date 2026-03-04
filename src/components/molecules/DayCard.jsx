import { Lock, CheckCircle, PlayCircle, Star } from 'lucide-react'

const DAY_ICONS = {
  intro: '🌟',
  jour1: '🔤',
  jour2: '👋',
  jour3: '🙋',
  jour4: '❓',
  jour5: '🛠️',
  jour6: '⏰',
  jour7: '🎯',
}

export default function DayCard({ day, status, onClick }) {
  // status: 'locked' | 'available' | 'completed'
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const isAvailable = status === 'available'

  const icon = DAY_ICONS[day.id] || '📚'

  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
        isLocked
          ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
          : isCompleted
          ? 'bg-emerald-50 border-emerald-200 active:scale-98'
          : 'bg-white border-gray-200 shadow-sm active:scale-98 hover:border-red-300 hover:shadow-md'
      }`}
    >
      {/* Icon circle */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
          isLocked
            ? 'bg-gray-200'
            : isCompleted
            ? 'bg-emerald-100'
            : 'bg-red-50 border border-red-100'
        }`}
      >
        {isLocked ? '🔒' : icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-bold text-sm truncate ${
            isLocked ? 'text-gray-400' : isCompleted ? 'text-emerald-800' : 'text-gray-900'
          }`}
        >
          {day.title}
        </p>
        <p className={`text-xs mt-0.5 ${isLocked ? 'text-gray-300' : 'text-gray-500'}`}>
          {day.duration || '30-45 min'}
        </p>
        {isCompleted && (
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3].map(i => (
              <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
        )}
      </div>

      {/* Status icon */}
      <div className="flex-shrink-0">
        {isLocked ? (
          <Lock size={20} className="text-gray-300" />
        ) : isCompleted ? (
          <CheckCircle size={24} className="text-emerald-500" />
        ) : (
          <PlayCircle size={24} className="text-red-500" />
        )}
      </div>
    </button>
  )
}
