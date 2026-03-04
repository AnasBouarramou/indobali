import VocabCard from '../../molecules/VocabCard/VocabCard.jsx'
import styles from './VocabGrid.module.css'

/**
 * Organism — VocabGrid
 * Renders a grid of VocabCards.
 * Flip state per card is controlled externally (passed as `flippedIds` set).
 *
 * @param {Array}   items       — Array of vocab objects
 * @param {Set}     flippedIds  — Set of flipped card ids
 * @param {function} onFlip     — (id) => void
 */
export default function VocabGrid({ items = [], flippedIds = new Set(), onFlip }) {
  if (items.length === 0) {
    return <p className={styles.empty}>Aucun vocabulaire pour cette section.</p>
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <VocabCard
          key={item.id}
          indonesian={item.indonesian}
          french={item.french}
          pronunciation={item.pronunciation}
          example={item.example}
          note={item.note}
          isFlipped={flippedIds.has(item.id)}
          onFlip={() => onFlip?.(item.id)}
        />
      ))}
    </div>
  )
}
