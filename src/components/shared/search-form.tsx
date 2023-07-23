'use client'

import {
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Search as IconSearch } from 'lucide-react'
import useSWR from 'swr'
import { twMerge } from 'tailwind-merge'
import { Verb } from '@/types/verbs'
import { useClickAway } from '@/hooks/use-click-away'
import { useDebounce } from '@/hooks/use-debounce'

async function fetcher([url, query]: [string, string]): Promise<Verb[]> {
  const data = await fetch(`${url}?q=${query}`)
  return data.json()
}

export function SearchForm() {
  const router = useRouter()
  const pathname = usePathname()
  const optionsRef = useRef<Array<HTMLLIElement | null>>([])

  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)

  const debouncedQuery = useDebounce(query, 300)

  const { data: filteredVerbs, isLoading } = useSWR(
    debouncedQuery ? ['/api/verbs', debouncedQuery] : null,
    fetcher
  )

  const listBoxRef = useClickAway<HTMLUListElement>(() => {
    setIsOpen(false)
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const filteredVerb = filteredVerbs?.[currentIndex]?.verb
    router.push(filteredVerb || query)
    setQuery('')
    setIsOpen(false)
  }

  const handleClick = (verb: string) => {
    setQuery('')
    setIsOpen(false)
    router.push(verb)
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        setCurrentIndex((index) => Math.max(-1, index - 1))
        break

      case 'ArrowDown':
        event.preventDefault()
        setCurrentIndex((index) =>
          Math.min((filteredVerbs?.length ?? 0) - 1, index + 1)
        )
        break

      case 'ArrowLeft':
      case 'ArrowRight':
        setCurrentIndex(-1)
        break

      case 'Tab':
      case 'Escape':
        setCurrentIndex(-1)
        setIsOpen(false)
        break
    }
  }

  useEffect(() => {
    optionsRef.current[currentIndex]?.scrollIntoView({
      block: 'nearest',
    })
  }, [currentIndex])

  useEffect(() => {
    setCurrentIndex(-1)
  }, [query])

  useEffect(() => {
    setIsOpen(!!filteredVerbs?.length)
  }, [filteredVerbs])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <form role="search" onSubmit={handleSubmit} className={'group relative'}>
        <div
          className={twMerge(
            'pointer-events-none absolute inset-y-0 left-4 flex items-center text-primary-400 transition',
            isLoading && 'animate-pulse-fast'
          )}
          aria-hidden="true"
        >
          <IconSearch />
        </div>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          className={
            'w-full appearance-none rounded-sm border border-primary-800 bg-white px-11 py-3 caret-accent-400 outline-none ring-accent-100 transition focus:border-accent-400 focus:ring-4'
          }
          autoComplete={'off'}
          aria-label="Search italian verb conjugation"
        />

        {isOpen && (
          <ul
            role="listbox"
            className="absolute z-10 mt-4 max-h-60 w-full overflow-auto overscroll-contain rounded-sm border border-primary-300 bg-white/90 py-1 shadow-md backdrop-blur-sm"
            ref={listBoxRef}
          >
            {filteredVerbs?.map((verb, index) => (
              <li
                role="option"
                aria-selected={index === currentIndex}
                key={verb.id}
                ref={(element) => (optionsRef.current[index] = element)}
                onClick={() => handleClick(verb.verb)}
                className={'group/item cursor-pointer px-4 py-0.5'}
              >
                <span
                  className={twMerge(
                    'underline decoration-1 underline-offset-2 transition group-hover/item:bg-accent-100 group-hover/item:decoration-accent-400',
                    index === currentIndex &&
                      'bg-accent-100 decoration-accent-400'
                  )}
                >
                  {verb.verb}
                </span>
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  )
}
