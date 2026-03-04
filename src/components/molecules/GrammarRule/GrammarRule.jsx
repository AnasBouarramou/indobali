import styles from './GrammarRule.module.css'

/**
 * Molecule — GrammarRule
 * Displays a single grammar rule with number, title, explanation, and optional example.
 *
 * @param {number} number
 * @param {string} title
 * @param {string} explanation
 * @param {{indonesian: string, french: string}} [example]
 * @param {string} [note]
 */
export default function GrammarRule({ number, title, explanation, example, note }) {
  return (
    <div className={styles.rule}>
      <div className={styles.header}>
        <span className={styles.number}>{number}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.explanation}>{explanation}</p>
      {example && (
        <div className={styles.example}>
          <span className={styles.indonesian}>{example.indonesian}</span>
          <span className={styles.arrow}>→</span>
          <span className={styles.french}>{example.french}</span>
        </div>
      )}
      {note && <p className={styles.note}>{note}</p>}
    </div>
  )
}
