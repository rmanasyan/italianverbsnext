// ht: https://github.com/uidotdev/usehooks/blob/main/index.js

import { useEffect, useRef } from 'react'

export function useClickAway<T extends HTMLElement>(cb: () => void) {
  const ref = useRef<T>(null)
  const refCb = useRef(cb)

  useEffect(() => {
    const handler = (e: any) => {
      const element = ref.current
      if (element && !element.contains(e.target)) {
        refCb.current()
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
