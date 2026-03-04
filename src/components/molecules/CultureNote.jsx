import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function CultureNote({ note }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mt-3">
      <button
        onClick={() => setExpanded(e => !e)}
        style={{ transform: 'rotate(-1.2deg)' }}
        className="w-full flex items-center gap-2 bg-post-it border-2 border-post-it-border rounded-organic-sm px-4 py-2.5 shadow-post-it text-left active:scale-98 transition-transform"
      >
        <span className="text-lg flex-shrink-0">📌</span>
        <span className="font-handwritten text-base font-bold text-ochre flex-1">
          Le savais-tu ?
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-post-it-border text-sm font-bold flex-shrink-0"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="overflow-hidden"
          >
            <div
              style={{ transform: 'rotate(-0.5deg)' }}
              className="bg-post-it border-2 border-t-0 border-post-it-border rounded-b-2xl px-4 pt-1 pb-4 shadow-post-it"
            >
              <p className="font-handwritten text-base text-ink leading-relaxed">
                {note.text}
              </p>
              {note.fun_fact && (
                <p className="mt-2 font-handwritten text-sm text-ochre font-semibold">
                  🎯 {note.fun_fact}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
