import { BookOpen, CheckCircle, Lock } from 'lucide-react'
import Icon from '../../atoms/Icon/Icon.jsx'
import styles from './DayNavBar.module.css'

/**
 * Organism — DayNavBar
 * Horizontal navigation strip showing all 7 days + intro.
 *
 * @param {Array}   days          — Array of {id, number, title}
 * @param {string}  activeId      — Currently selected day id
 * @param {Set}     completedIds  — Set of completed day ids
 * @param {function} onSelect     — (id) => void
 */
export default function DayNavBar({ days = [], activeId, completedIds = new Set(), onSelect }) {
  return (
    <nav className={styles.nav} aria-label="Navigation des jours">
      {days.map((day) => {
        const isActive = day.id === activeId
        const isCompleted = completedIds.has(day.id)

        return (
          <button
            key={day.id}
            type="button"
            className={[
              styles.dayBtn,
              isActive ? styles.active : '',
              isCompleted ? styles.completed : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onSelect?.(day.id)}
            aria-current={isActive ? 'page' : undefined}
            title={day.title}
          >
            <span className={styles.icon}>
              {isCompleted ? (
                <Icon icon={CheckCircle} size={16} />
              ) : day.id === 'intro' ? (
                <Icon icon={BookOpen} size={16} />
              ) : (
                <span className={styles.dayNumber}>{day.number}</span>
              )}
            </span>
            <span className={styles.label}>
              {day.id === 'intro' ? 'Intro' : `J${day.number}`}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
