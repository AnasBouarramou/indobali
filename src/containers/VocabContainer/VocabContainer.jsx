import { useState } from 'react'
import VocabGrid from '../../components/organisms/VocabGrid/VocabGrid.jsx'

/**
 * Container — VocabContainer
 * Manages flashcard flip state.
 * Owns: flippedIds (Set)
 *
 * @param {Array} items — vocab items to display
 */
export default function VocabContainer({ items = [] }) {
  const [flippedIds, setFlippedIds] = useState(new Set())

  function handleFlip(id) {
    setFlippedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <VocabGrid
      items={items}
      flippedIds={flippedIds}
      onFlip={handleFlip}
    />
  )
}
