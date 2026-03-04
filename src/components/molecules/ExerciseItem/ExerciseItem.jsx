import styles from './ExerciseItem.module.css'

/**
 * Molecule — ExerciseItem
 * Displays a single exercise question with its answer (revealed on demand).
 * Answer visibility is controlled externally via `showAnswer` prop.
 *
 * @param {number}  number
 * @param {string}  question
 * @param {string}  answer
 * @param {boolean} showAnswer
 * @param {function} onReveal
 */
export default function ExerciseItem({ number, question, answer, showAnswer = false, onReveal }) {
  return (
    <div className={styles.item}>
      <div className={styles.question}>
        <span className={styles.number}>{number}</span>
        <p className={styles.text}>{question}</p>
      </div>
      {showAnswer ? (
        <div className={styles.answer}>
          <span className={styles.answerLabel}>Réponse :</span>
          <span className={styles.answerText}>{answer}</span>
        </div>
      ) : (
        <button type="button" className={styles.revealBtn} onClick={onReveal}>
          Voir la réponse
        </button>
      )}
    </div>
  )
}
