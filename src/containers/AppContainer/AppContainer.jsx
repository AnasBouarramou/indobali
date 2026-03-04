import { useState } from 'react'
import LessonContainer from '../LessonContainer/LessonContainer.jsx'
import week1Data from '../../data/week1.json'

// When week2.json exists, add it to this map.
const WEEK_DATA = {
  1: week1Data,
}

/**
 * Container — AppContainer
 * Top-level container. Manages active week selection.
 * Owns: activeWeek
 *
 * Add future weeks here without touching any component.
 */
export default function AppContainer() {
  const [activeWeek] = useState(1)

  const weekData = WEEK_DATA[activeWeek]

  if (!weekData) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#6c757d' }}>
        Semaine {activeWeek} non disponible.
      </div>
    )
  }

  return <LessonContainer weekData={weekData} />
}
