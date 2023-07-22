import { SearchCombobox } from '@/components/search-combobox'
import { VerbLink } from '@/components/shared/verb-link'

export function Search() {
  return (
    <div className={'h-24'}>
      <p className={'pb-2'}>
        Type the verb you wish to conjugate (ie:{' '}
        <VerbLink href={'mangiare'}>mangiare</VerbLink>,{' '}
        <VerbLink href={'dormire'}>dormire</VerbLink>,{' '}
        <VerbLink href={'amare'}>amare</VerbLink>)
      </p>

      <SearchCombobox />
    </div>
  )
}
