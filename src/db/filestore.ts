import { VerbFiltered } from '@/types/verbs'
import { verbs } from '@/db/verb-list'

export const getFilteredVerbsFromArray = (searchQuery: string): VerbFiltered[] => {
  return verbs
    .filter((verb) => verb.startsWith(searchQuery.toLowerCase()))
    .slice(0, 30)
    .map((verb) => {
      return {
        id: verb,
        path: verb,
        title: verb
      }
    })
}
