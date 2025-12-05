'use client'

import { VerbLink } from '@/components/shared/verb-link'
import { useClickAway } from '@/hooks/use-click-away'
import { useDebounce } from '@/hooks/use-debounce'
import { useSearch } from '@/hooks/use-search'
import { Loader as IconLoader, Search as IconSearch } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { FormEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState, useTransition } from 'react'
import { twMerge } from 'tailwind-merge'

export function SearchForm() {
  const router = useRouter()
  const pathname = usePathname()
  const optionsRef = useRef<(HTMLLIElement | null)[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isPending, startTransition] = useTransition()

  const debouncedQuery = useDebounce(query, 300)
  const { data: filteredVerbs, isLoading } = useSearch(debouncedQuery)

  const listBoxRef = useClickAway<HTMLUListElement>(() => {
    setIsOpen(false)
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const filteredVerb = filteredVerbs?.[currentIndex]?.path

    startTransition(() => router.push(filteredVerb || query))

    setQuery('')
    setIsOpen(false)
  }

  const handleClick = (verb: string) => {
    setQuery('')
    setIsOpen(false)

    startTransition(() => router.push(verb))
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        setCurrentIndex((index) => Math.max(-1, index - 1))
        break

      case 'ArrowDown':
        event.preventDefault()
        setCurrentIndex((index) => Math.min((filteredVerbs?.length ?? 0) - 1, index + 1))
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

  // focus search field on '/' press
  useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      if (e.key === '/') {
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keyup', onKeyup)
    return () => document.removeEventListener('keyup', onKeyup)
  }, [])

  // scroll search results when using arrow keys
  useEffect(() => {
    optionsRef.current[currentIndex]?.scrollIntoView({
      block: 'nearest'
    })
  }, [currentIndex])

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setIsOpen(false)
  }

  return (
    <>
      <form role="search" onSubmit={handleSubmit} className={'group relative'}>
        <div className={'pointer-events-none absolute inset-y-0 left-4 flex items-center'} aria-hidden="true">
          {isLoading || isPending ? (
            <IconLoader strokeWidth={1} className="text-primary-500 animate-spin" />
          ) : (
            <IconSearch strokeWidth={1} className="text-primary-500 group-focus-within:text-accent-500 transition" />
          )}
        </div>

        <div className={'pointer-events-none absolute inset-y-0 right-4 flex items-center'} aria-hidden="true">
          <span
            className={
              'bg-primary-50 text-primary-300 grid h-6 w-6 place-items-center rounded-sm border leading-3 opacity-100 transition group-focus-within:opacity-0'
            }
          >
            /
          </span>
        </div>

        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setCurrentIndex(-1)
            setIsOpen(true)
          }}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className={
            'border-primary-800 caret-accent-400 ring-accent-100 focus:border-accent-400 w-full appearance-none rounded-xs border bg-white px-11 py-3 outline-hidden transition focus:ring-4'
          }
          autoComplete={'off'}
          aria-label="Search italian verb conjugation"
        />

        {isOpen && (filteredVerbs?.length ?? 0) > 0 && (
          <ul
            role="listbox"
            className="border-primary-300 absolute z-10 mt-4 max-h-60 w-full overflow-auto overscroll-contain rounded-xs border bg-white/90 py-1 shadow-md backdrop-blur-xs"
            ref={listBoxRef}
          >
            {filteredVerbs?.map((verb, index) => (
              <li
                role="option"
                aria-selected={index === currentIndex}
                key={verb.id}
                ref={(element) => {
                  optionsRef.current[index] = element
                }}
                onClick={() => handleClick(verb.path)}
                className={'group/item cursor-pointer px-4 py-0.5'}
              >
                <VerbLink
                  href={verb.path}
                  className={twMerge(
                    'group-hover/item:bg-accent-100 group-hover/item:decoration-accent-400',
                    index === currentIndex && 'bg-accent-100 decoration-accent-400'
                  )}
                >
                  {verb.title}
                </VerbLink>
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  )
}
