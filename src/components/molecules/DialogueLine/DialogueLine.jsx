import styles from './DialogueLine.module.css'

/**
 * Molecule — DialogueLine
 * One line in a dialogue exchange.
 *
 * @param {string}  speaker      — Who is speaking (e.g. "Toi", "Chauffeur")
 * @param {string}  indonesian
 * @param {string}  french
 * @param {boolean} isUser       — Highlights lines spoken by the learner
 */
export default function DialogueLine({ speaker, indonesian, french, isUser = false }) {
  return (
    <div className={[styles.line, isUser ? styles.user : styles.other].filter(Boolean).join(' ')}>
      <span className={styles.speaker}>{speaker}</span>
      <div className={styles.content}>
        <p className={styles.indonesian}>{indonesian}</p>
        <p className={styles.french}>{french}</p>
      </div>
    </div>
  )
}
