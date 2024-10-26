import { VerbFiltered } from '@/types/verbs'
import { useEffect, useState } from 'react'

export function useSearch(query: string) {
  const [data, setData] = useState<VerbFiltered[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query.length <= 1) {
      setData([])
      return
    }

    let isCancelled = false
    setIsLoading(true)

    fetch(`/api/verbs?q=${query}`)
      .then((res) => res.json())
      .then((results) => {
        if (!isCancelled) {
          setData(results)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        if (!isCancelled) {
          setData([])
          setIsLoading(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [query])

  return { data, isLoading }
}
