import { Verb } from '@/types/verbs'
import { getFeaturedVerbs } from '@/utils/firestore'
import { VerbLink } from '@/components/verb-link'

export async function FeaturedVerbs() {
  const verbs = await getFeaturedVerbs()

  return (
    <>
      {verbs.map((verb: Verb) => (
        <VerbLink className={'block'} href={verb.verb} key={verb.id}>
          {verb.verb}
        </VerbLink>
      ))}
    </>
  )
}
