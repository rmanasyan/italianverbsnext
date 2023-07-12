import { IconSearch } from '@/components/icons/icon-search'
import { VerbLink } from '@/components/verb-link'

export function Search() {
  return (
    <>
      <p className={'inline-flex space-x-1.5 pb-1'}>
        <span>Type the verb you wish to conjugate (ie:</span>
        <span>
          🍕<VerbLink href={'mangiare'}>mangiare</VerbLink>,
        </span>
        <span>
          😴<VerbLink href={'dormire'}>dormire</VerbLink>,
        </span>
        <span>
          💕<VerbLink href={'amare'}>amare</VerbLink>)
        </span>
      </p>

      <form className={'group relative'} role="search">
        <div
          className={
            'pointer-events-none absolute inset-y-0 left-4 flex items-center text-primary-600 transition'
          }
          aria-hidden="true"
        >
          <IconSearch />
        </div>

        <input
          className={
            'w-full rounded-sm border border-primary-800 bg-white px-11 py-3 outline-none ring-accent-100 transition focus-visible:ring-4 group-focus-within:border-accent-400'
          }
          type="text"
          role="searchbox"
          aria-label="Search italian verb conjugation"
        />
      </form>
    </>
  )
}
