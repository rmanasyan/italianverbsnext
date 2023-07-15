import { Verb } from '@/types/verbs'
import { getFeaturedVerbs } from '@/utils/firestore'
import { VerbLink } from '@/components/verb-link'

export async function FeaturedVerbs() {
  const verbs = await getFeaturedVerbs()

  const formattedVerbs: Array<Verb & { isLast: boolean; className: string }> =
    verbs.map((verb, index) => {
      const isFirstInGroup =
        index === 0 || verb.verb.charAt(0) !== verbs[index - 1].verb.charAt(0)

      return {
        ...verb,
        isLast: verbs.length - 1 === index,
        className: isFirstInGroup ? 'font-bold' : '',
      }
    })

  return formattedVerbs.map((verb, index) => (
    <>
      <VerbLink className={verb.className} href={verb.verb} key={verb.id}>
        {verb.verb}
      </VerbLink>

      {!verb.isLast && ', '}
    </>
  ))
}
