import { VerbFiltered } from '@/types/verbs'
import { useEffect, useState } from 'react'

export function useSearch(query: string) {
  const [data, setData] = useState<VerbFiltered[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [prevQuery, setPrevQuery] = useState(query)

  if (query !== prevQuery) {
    setPrevQuery(query)
    if (query.length > 1) {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    if (query.length <= 1) {
      return
    }

    let isCancelled = false
    // Loading state is handled in render phase

    fetch(`/api/verbs?q=${query}`)
      .then((res) => res.json())
      .then((results) => {
        if (!isCancelled) {
          setData(results)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setData([])
          setIsLoading(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [query])

  const shouldReturnEmpty = query.length <= 1

  return {
    data: shouldReturnEmpty ? [] : data,
    isLoading: shouldReturnEmpty ? false : isLoading
  }
}
