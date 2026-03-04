import { motion } from 'framer-motion'

// Zigzag X positions (320px wide container)
const X_ZIGZAG = [160, 245, 75, 245, 160, 75, 245, 160]
const Y_START = 80
const Y_STEP = 130

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

const DECORATIVE_EMOJIS = [
  { emoji: '🌺', x: 8,   y: 40,  delay: 0 },
  { emoji: '🦜', x: 278, y: 50,  delay: 0.4 },
  { emoji: '🥥', x: 282, y: 180, delay: 0.5 },
  { emoji: '🌴', x: 4,   y: 310, delay: 1.0 },
  { emoji: '🌸', x: 285, y: 435, delay: 0.3 },
  { emoji: '🌋', x: 6,   y: 565, delay: 0.7 },
  { emoji: '🐚', x: 280, y: 690, delay: 0.2 },
  { emoji: '🌿', x: 8,   y: 820, delay: 0.9 },
]

function buildSvgPath(nodes) {
  return nodes.slice(0, -1).map((node, i) => {
    const next = nodes[i + 1]
    const midY = (node.y + next.y) / 2
    return `M ${node.x} ${node.y} C ${node.x} ${midY} ${next.x} ${midY} ${next.x} ${next.y}`
  }).join(' ')
}

export default function HomeScreen({ weekData, progress, onStartDay }) {
  const { completedDays, xp, streak, isDayUnlocked, isDayCompleted } = progress

  const allDays = [
    { id: weekData.intro.id || 'intro', title: weekData.intro.title, duration: '15-20 min' },
    ...weekData.days.map(d => ({ id: d.id, title: d.title, duration: d.duration })),
  ]

  const nodes = allDays.map((day, idx) => ({
    ...day,
    icon: DAY_ICONS[day.id] || '📚',
    x: X_ZIGZAG[idx % X_ZIGZAG.length],
    y: Y_START + idx * Y_STEP,
  }))

  const svgHeight = Y_START + (nodes.length - 1) * Y_STEP + Y_START
  const svgPath = buildSvgPath(nodes)

  const xpLevel = Math.floor(xp / 100)
  const xpInLevel = xp % 100

  const nextAvailableDay = allDays.find(
    d => isDayUnlocked(d.id) && !isDayCompleted(d.id)
  )

  return (
    <div className="flex flex-col min-h-dvh bg-parchment">
      {/* Header */}
      <div className="bg-gradient-to-br from-jungle via-jungle to-jungle-light text-white px-5 pt-safe pt-5 pb-6 shadow-jungle">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🇮🇩</span>
            <div>
              <h1 className="font-handwritten text-2xl font-bold leading-tight">Bahasa Indonesia</h1>
              <p className="text-jungle-muted text-xs font-semibold">Semaine 1 · Programme Bali</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white/15 rounded-2xl px-3 py-1.5">
              <span className="text-base">🔥</span>
              <span className="font-black text-sm">{streak}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 rounded-2xl px-3 py-1.5">
              <span className="text-base">⚡</span>
              <span className="font-black text-sm">{xp}</span>
            </div>
          </div>
        </div>

        {/* XP bar */}
        <div>
          <div className="flex justify-between text-xs text-jungle-muted font-semibold mb-1.5">
            <span className="font-handwritten text-sm">Niveau {xpLevel + 1}</span>
            <span>{xpInLevel}/100 XP</span>
          </div>
          <div className="bg-jungle-light/30 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-ochre-light to-ochre h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${xpInLevel}%` }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Map scroll area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="relative mx-auto" style={{ width: 320, height: svgHeight }}>
          {/* SVG sinuous path */}
          <svg
            className="absolute inset-0"
            width="320"
            height={svgHeight}
            viewBox={`0 0 320 ${svgHeight}`}
            fill="none"
          >
            {/* Base trail */}
            <path
              d={svgPath}
              stroke="#EDE0CA"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Jungle accent dashes */}
            <path
              d={svgPath}
              stroke="#40916C"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="14 10"
              opacity="0.45"
            />
          </svg>

          {/* Floating decorative emojis */}
          {DECORATIVE_EMOJIS.map(({ emoji, x, y, delay }) => (
            <div
              key={emoji}
              className="absolute text-2xl animate-float select-none pointer-events-none"
              style={{ left: x, top: y, animationDelay: `${delay}s` }}
            >
              {emoji}
            </div>
          ))}

          {/* Day nodes */}
          {nodes.map((node, idx) => {
            const isCompleted = isDayCompleted(node.id)
            const isAvailable = isDayUnlocked(node.id) && !isCompleted
            const isLocked = !isDayUnlocked(node.id)

            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{ left: node.x - 40, top: node.y - 40 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  delay: idx * 0.08,
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {/* Pulsing ring for available node */}
                  {isAvailable && (
                    <>
                      <span className="absolute inset-0 rounded-full border-4 border-ochre animate-ping opacity-40" />
                      <span className="absolute inset-[-6px] rounded-full border-2 border-ochre/30" />
                    </>
                  )}

                  <button
                    onClick={() => !isLocked && onStartDay(node.id)}
                    disabled={isLocked}
                    className={`
                      w-20 h-20 rounded-full flex flex-col items-center justify-center
                      font-bold transition-all active:scale-90 select-none
                      ${isCompleted
                        ? 'bg-gradient-to-br from-jungle-light to-jungle shadow-jungle text-white'
                        : isAvailable
                        ? 'bg-gradient-to-br from-ochre-light to-ochre shadow-ochre text-white'
                        : 'bg-parchment-dark text-ink/30 cursor-not-allowed border-2 border-parchment-dark'}
                    `}
                  >
                    <span className="text-xl leading-none mb-0.5">
                      {isLocked ? '🔒' : isCompleted ? '✓' : node.icon}
                    </span>
                    <span className="font-handwritten text-xs font-bold leading-tight text-center px-1">
                      {node.id === 'intro' ? 'Intro' : node.id.replace('jour', 'J')}
                    </span>
                  </button>
                </div>

                {/* Day title label */}
                {isAvailable && (
                  <div
                    className="absolute font-handwritten text-[11px] font-bold text-ochre whitespace-nowrap pointer-events-none"
                    style={{
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: 4,
                    }}
                  >
                    {node.id === 'intro' ? 'Introduction' : node.title.split('—')[0]?.trim() || node.title}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* CTA button */}
        {nextAvailableDay && (
          <div className="px-5 py-6">
            <button
              onClick={() => onStartDay(nextAvailableDay.id)}
              className="w-full py-4 rounded-organic-btn bg-gradient-to-r from-jungle to-jungle-light text-white font-black text-base shadow-jungle active:scale-95 transition-all"
            >
              Continuer · {nextAvailableDay.title.split('—')[0]?.trim() || nextAvailableDay.title} →
            </button>
          </div>
        )}

        <div className="h-8" />
      </div>
    </div>
  )
}
