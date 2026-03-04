import DialogueLine from '../../molecules/DialogueLine/DialogueLine.jsx'
import Tag from '../../atoms/Tag/Tag.jsx'
import styles from './DialogueBlock.module.css'

/**
 * Organism — DialogueBlock
 * Renders a full dialogue with context and all lines.
 *
 * @param {string}  title
 * @param {string}  context
 * @param {Array}   lines    — Array of {speaker, indonesian, french, isUser}
 * @param {string[]} [newWords] — New vocabulary introduced in this dialogue
 */
export default function DialogueBlock({ title, context, lines = [], newWords = [] }) {
  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <Tag type="dialogue">Dialogue</Tag>
        <h3 className={styles.title}>{title}</h3>
      </div>

      {context && (
        <p className={styles.context}>
          <span className={styles.contextLabel}>Contexte :</span> {context}
        </p>
      )}

      <div className={styles.lines}>
        {lines.map((line, i) => (
          <DialogueLine
            key={i}
            speaker={line.speaker}
            indonesian={line.indonesian}
            french={line.french}
            isUser={line.isUser}
          />
        ))}
      </div>

      {newWords.length > 0 && (
        <div className={styles.newWords}>
          <span className={styles.newWordsLabel}>Mots nouveaux :</span>
          <span className={styles.newWordsList}>{newWords.join(' · ')}</span>
        </div>
      )}
    </div>
  )
}
