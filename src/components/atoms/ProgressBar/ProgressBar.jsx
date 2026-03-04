import styles from './ProgressBar.module.css'

/**
 * Atom — ProgressBar
 * @param {number} value  — 0 to 100
 * @param {string} label  — optional accessible label
 * @param {'sm'|'md'|'lg'} size
 */
export default function ProgressBar({ value = 0, label, size = 'md', className = '' }) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      className={[styles.track, styles[size], className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className={styles.fill} style={{ width: `${clamped}%` }} />
    </div>
  )
}
