import weekData from './data/week1.json'
import { useProgress } from './hooks/useProgress.js'
import HomeScreen from './screens/HomeScreen.jsx'
import LessonScreen from './screens/LessonScreen.jsx'
import CompletionScreen from './screens/CompletionScreen.jsx'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function getDayData(dayId) {
  if (dayId === 'intro') return weekData.intro
  return weekData.days.find(d => d.id === dayId) || null
}

function countTotalExercises(dayData) {
  if (!dayData || !dayData.exercises) return 0
  return dayData.exercises.length
}

export default function App() {
  const [view, setView] = useState('home')
  const [activeDayId, setActiveDayId] = useState(null)
  const [completionData, setCompletionData] = useState(null)

  const progress = useProgress()

  function handleStartDay(dayId) {
    setActiveDayId(dayId)
    setView('lesson')
  }

  function handleLessonComplete(correctCount, earnedXp) {
    const dayData = getDayData(activeDayId)
    const totalExercises = countTotalExercises(dayData)
    progress.completeDay(activeDayId, earnedXp)
    setCompletionData({
      dayId: activeDayId,
      dayTitle: dayData?.title || '',
      correctCount,
      totalExercises,
      earnedXp,
    })
    setView('completion')
  }

  function handleExitLesson() {
    setView('home')
    setActiveDayId(null)
  }

  function handleCompletionContinue() {
    setView('home')
    setActiveDayId(null)
    setCompletionData(null)
  }

  const dayData = activeDayId ? getDayData(activeDayId) : null

  let screen = 'home'
  if (view === 'lesson' && dayData) screen = 'lesson'
  else if (view === 'completion' && completionData) screen = 'completion'

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}
      >
        {screen === 'lesson' ? (
          <LessonScreen
            dayData={dayData}
            onComplete={handleLessonComplete}
            onExit={handleExitLesson}
          />
        ) : screen === 'completion' ? (
          <CompletionScreen
            correctCount={completionData.correctCount}
            totalExercises={completionData.totalExercises}
            earnedXp={completionData.earnedXp}
            dayTitle={completionData.dayTitle}
            onContinue={handleCompletionContinue}
          />
        ) : (
          <HomeScreen
            weekData={weekData}
            progress={progress}
            onStartDay={handleStartDay}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
