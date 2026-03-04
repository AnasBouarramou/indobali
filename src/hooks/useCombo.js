import { useState, useCallback } from 'react'

export function useCombo() {
  const [combo, setCombo] = useState(0)
  const [celebrating, setCelebrating] = useState(false)

  const hit = useCallback(() => {
    setCombo(prev => {
      const next = prev + 1
      if (next % 3 === 0) {
        setCelebrating(true)
        setTimeout(() => setCelebrating(false), 1800)
      }
      return next
    })
  }, [])

  const miss = useCallback(() => {
    setCombo(0)
  }, [])

  const reset = useCallback(() => {
    setCombo(0)
    setCelebrating(false)
  }, [])

  return { combo, celebrating, hit, miss, reset }
}
