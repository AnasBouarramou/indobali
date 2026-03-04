import styles from './QuizOption.module.css'

/**
 * Molecule — QuizOption
 * A single selectable answer in a quiz.
 * State (selected/correct/wrong) is controlled externally.
 *
 * @param {string}  label      — The answer text
 * @param {boolean} selected   — Is this option currently selected?
 * @param {'correct'|'wrong'|null} result — Feedback after submission
 * @param {boolean} disabled   — After quiz is submitted
 * @param {function} onSelect
 */
export default function QuizOption({ label, selected = false, result = null, disabled = false, onSelect }) {
  const stateClass = result === 'correct'
    ? styles.correct
    : result === 'wrong'
    ? styles.wrong
    : selected
    ? styles.selected
    : ''

  return (
    <button
      type="button"
      className={[styles.option, stateClass].filter(Boolean).join(' ')}
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
    >
      <span className={styles.dot} />
      <span className={styles.label}>{label}</span>
    </button>
  )
}
