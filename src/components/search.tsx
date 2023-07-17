import { IconSearch } from '@/components/icons/icon-search'
import { VerbLink } from '@/components/shared/verb-link'

export function Search() {
  return (
    <>
      <p className={'pb-2'}>
        Type the verb you wish to conjugate (ie:{' '}
        <VerbLink href={'mangiare'}>mangiare</VerbLink>,{' '}
        <VerbLink href={'dormire'}>dormire</VerbLink>,{' '}
        <VerbLink href={'amare'}>amare</VerbLink>)
      </p>

      <form className={'group relative'} role="search">
        <div
          className={
            'pointer-events-none absolute inset-y-0 left-4 flex items-center text-primary-500 transition'
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
