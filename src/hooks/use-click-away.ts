// ht: https://github.com/uidotdev/usehooks/blob/main/index.js

import { useEffect, useEffectEvent, useRef } from 'react'

export function useClickAway<T extends HTMLElement>(cb: (e: MouseEvent | TouchEvent) => void) {
  const ref = useRef<T>(null)
  const onEvent = useEffectEvent(cb)

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const element = ref.current
      if (element && !element.contains(e.target as Node)) {
        onEvent(e)
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [])

  return ref
}
