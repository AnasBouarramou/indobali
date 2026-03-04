import styles from './Badge.module.css'

/**
 * Atom — Badge
 * @param {'day'|'grammar'|'vocab'|'success'|'warning'} variant
 * @param {React.ReactNode} children
 */
export default function Badge({ variant = 'day', children, className = '' }) {
  return (
    <span className={[styles.badge, styles[variant], className].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
