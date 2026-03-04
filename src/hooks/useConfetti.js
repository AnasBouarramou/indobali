import { useCallback, useRef } from 'react'

const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4',
]

const SHAPES = ['square', 'circle', 'rectangle']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export function useConfetti() {
  const piecesRef = useRef([])

  const launch = useCallback((container = document.body, count = 80) => {
    // Clean up previous
    piecesRef.current.forEach(el => el.remove())
    piecesRef.current = []

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
      const size = randomBetween(6, 12)
      const left = randomBetween(0, 100)
      const delay = randomBetween(0, 1.5)
      const duration = randomBetween(2, 4)

      el.style.cssText = `
        position: fixed;
        left: ${left}%;
        top: -${size}px;
        width: ${shape === 'rectangle' ? size * 2 : size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${shape === 'circle' ? '50%' : shape === 'square' ? '2px' : '2px'};
        animation: confettiFall ${duration}s ${delay}s ease-in forwards;
        z-index: 9999;
        pointer-events: none;
        transform: rotate(${randomBetween(0, 360)}deg);
      `

      container.appendChild(el)
      piecesRef.current.push(el)

      // Remove after animation
      setTimeout(() => {
        el.remove()
        piecesRef.current = piecesRef.current.filter(p => p !== el)
      }, (delay + duration) * 1000 + 100)
    }
  }, [])

  const clear = useCallback(() => {
    piecesRef.current.forEach(el => el.remove())
    piecesRef.current = []
  }, [])

  return { launch, clear }
}
