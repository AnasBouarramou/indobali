import { useState, useCallback } from 'react'

const STORAGE_KEY = 'bahasa_progress_v1'

function getToday() {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore storage errors
  }
}

const DEFAULT_STATE = {
  completedDays: [],
  xp: 0,
  streak: 0,
  lastActiveDate: null,
}

// Day unlock logic
// intro: always unlocked
// jour1: requires intro completed
// jourN: requires jour(N-1) completed
export function isDayUnlocked(dayId, completedDays) {
  if (dayId === 'intro') return true
  if (dayId === 'jour1') return completedDays.includes('intro')
  const match = dayId.match(/^jour(\d+)$/)
  if (!match) return false
  const n = parseInt(match[1], 10)
  return completedDays.includes(`jour${n - 1}`)
}

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    const saved = loadProgress()
    if (!saved) return { ...DEFAULT_STATE }

    // Streak calculation
    const today = getToday()
    const last = saved.lastActiveDate
    let streak = saved.streak ?? 0

    if (last) {
      const diffDays = Math.round(
        (new Date(today) - new Date(last)) / (1000 * 60 * 60 * 24)
      )
      if (diffDays > 1) {
        streak = 0 // streak broken
      }
    }

    return { ...DEFAULT_STATE, ...saved, streak }
  })

  const completeDay = useCallback((dayId, earnedXp) => {
    setProgress(prev => {
      const today = getToday()
      const alreadyDone = prev.completedDays.includes(dayId)
      const completedDays = alreadyDone
        ? prev.completedDays
        : [...prev.completedDays, dayId]

      // Streak
      let streak = prev.streak ?? 0
      const last = prev.lastActiveDate
      if (last !== today) {
        const diffDays = last
          ? Math.round((new Date(today) - new Date(last)) / (1000 * 60 * 60 * 24))
          : 0
        if (diffDays <= 1) {
          streak = streak + 1
        } else {
          streak = 1
        }
      }

      const next = {
        ...prev,
        completedDays,
        xp: prev.xp + (alreadyDone ? 0 : earnedXp),
        streak,
        lastActiveDate: today,
      }
      saveProgress(next)
      return next
    })
  }, [])

  const isDayUnlockedFn = useCallback(
    (dayId) => isDayUnlocked(dayId, progress.completedDays),
    [progress.completedDays]
  )

  const isDayCompleted = useCallback(
    (dayId) => progress.completedDays.includes(dayId),
    [progress.completedDays]
  )

  return {
    completedDays: progress.completedDays,
    xp: progress.xp,
    streak: progress.streak,
    lastActiveDate: progress.lastActiveDate,
    completeDay,
    isDayUnlocked: isDayUnlockedFn,
    isDayCompleted,
  }
}
