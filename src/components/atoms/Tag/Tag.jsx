import styles from './Tag.module.css'

/**
 * Atom — Tag
 * Semantic label for exercise types, grammar categories, etc.
 * @param {'pronunciation'|'grammar'|'vocab'|'dialogue'|'exercise'} type
 */
export default function Tag({ type = 'vocab', children, className = '' }) {
  return (
    <span className={[styles.tag, styles[type], className].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
