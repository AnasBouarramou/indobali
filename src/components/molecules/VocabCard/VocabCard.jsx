import styles from './VocabCard.module.css'

/**
 * Molecule — VocabCard (Flashcard)
 * Pure UI. Flip state is controlled externally via `isFlipped` prop.
 *
 * @param {string}  indonesian     — Indonesian word
 * @param {string}  french         — French translation
 * @param {string}  pronunciation  — Phonetic transcription
 * @param {string}  [example]      — Optional example sentence
 * @param {string}  [note]         — Optional grammar/culture note
 * @param {boolean} isFlipped      — Controlled by parent container
 * @param {function} onFlip        — Callback when card is clicked
 */
export default function VocabCard({
  indonesian,
  french,
  pronunciation,
  example,
  note,
  isFlipped = false,
  onFlip,
}) {
  return (
    <div
      className={[styles.cardWrapper, isFlipped ? styles.flipped : ''].filter(Boolean).join(' ')}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-label={`Carte : ${indonesian} — ${french}`}
      onKeyDown={(e) => e.key === 'Enter' && onFlip?.()}
    >
      <div className={styles.card}>
        {/* Front — Indonesian */}
        <div className={styles.front}>
          <span className={styles.word}>{indonesian}</span>
          {pronunciation && (
            <span className={styles.pronunciation}>[{pronunciation}]</span>
          )}
          <span className={styles.hint}>Cliquer pour révéler</span>
        </div>

        {/* Back — French */}
        <div className={styles.back}>
          <span className={styles.french}>{french}</span>
          {example && <p className={styles.example}>{example}</p>}
          {note && <p className={styles.note}>{note}</p>}
        </div>
      </div>
    </div>
  )
}
