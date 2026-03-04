import QuizOption from '../../molecules/QuizOption/QuizOption.jsx'
import Button from '../../atoms/Button/Button.jsx'
import styles from './QuizBlock.module.css'

/**
 * Organism — QuizBlock
 * Renders a complete quiz question with multiple options.
 * All state (selected answer, submission result) is controlled externally.
 *
 * @param {string}   question
 * @param {string[]} options
 * @param {number|null} selectedIndex
 * @param {boolean}  submitted
 * @param {number}   correctIndex
 * @param {function} onSelect      — (index) => void
 * @param {function} onSubmit
 * @param {function} onNext
 */
export default function QuizBlock({
  question,
  options = [],
  selectedIndex = null,
  submitted = false,
  correctIndex,
  onSelect,
  onSubmit,
  onNext,
}) {
  return (
    <div className={styles.block}>
      <p className={styles.question}>{question}</p>

      <div className={styles.options}>
        {options.map((option, i) => {
          const result = submitted
            ? i === correctIndex
              ? 'correct'
              : i === selectedIndex
              ? 'wrong'
              : null
            : null

          return (
            <QuizOption
              key={i}
              label={option}
              selected={selectedIndex === i}
              result={result}
              disabled={submitted}
              onSelect={() => onSelect?.(i)}
            />
          )
        })}
      </div>

      <div className={styles.actions}>
        {!submitted ? (
          <Button
            variant="primary"
            disabled={selectedIndex === null}
            onClick={onSubmit}
          >
            Valider
          </Button>
        ) : (
          <Button variant="secondary" onClick={onNext}>
            Question suivante →
          </Button>
        )}
      </div>
    </div>
  )
}
