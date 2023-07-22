'use client'

import { FormEvent, useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { Search as IconSearch } from 'lucide-react'
import useSWR from 'swr'
import { Verb } from '@/types/verbs'
import { useDebounce } from '@/hooks/use-debounce'

async function fetcher([url, query]: [string, string]): Promise<Verb[]> {
  const data = await fetch(`${url}?q=${query}`)
  return data.json()
}

export function SearchCombobox() {
  const [mounted, setMounted] = useState(false)

  const [selectedPerson, setSelectedPerson] = useState<Verb>({
    id: '',
    verb: '',
  } as Verb)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const { data: filteredPeople, isLoading } = useSWR(
    debouncedQuery ? ['/api/verbs', debouncedQuery] : null,
    fetcher
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <form role="search" onSubmit={handleSubmit}>
        <Combobox value={selectedPerson} onChange={setSelectedPerson} by="id">
          <div className={'group relative'}>
            <div
              className={
                'pointer-events-none absolute inset-y-0 left-4 flex items-center text-primary-400 transition'
              }
              aria-hidden="true"
            >
              <IconSearch />
            </div>

            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(verb: Verb) => verb.verb}
              className={
                'w-full rounded-sm border border-primary-800 bg-white px-11 py-3 outline-none ring-accent-100 transition focus:border-accent-400 focus:ring-4'
              }
              name="verb"
              autoComplete={'off'}
              aria-label="Search italian verb conjugation"
            />

            <Combobox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-sm bg-white shadow-sm shadow-primary-300">
              {filteredPeople?.map((verb) => (
                <Combobox.Option
                  key={verb.id}
                  value={verb}
                  className="p-1 ui-active:bg-primary-300"
                >
                  {verb.verb}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </div>
        </Combobox>
      </form>
    </>
  )
}
