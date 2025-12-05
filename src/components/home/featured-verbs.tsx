import { VerbLink } from '@/components/shared/verb-link'
import { getFeaturedVerbs } from '@/db/data'
import { Verb } from '@/types/verbs'
import React from 'react'

export async function FeaturedVerbs() {
  const verbs = await getFeaturedVerbs()

  const formattedVerbs: Array<Verb & { isLast: boolean; className: string }> = verbs.map((verb, index) => {
    const isFirstInGroup = index === 0 || verb.verb.charAt(0) !== verbs[index - 1].verb.charAt(0)

    return {
      ...verb,
      isLast: verbs.length - 1 === index,
      className: isFirstInGroup ? 'font-bold' : ''
    }
  })

  return formattedVerbs.map((verb, index) => (
    <React.Fragment key={verb.id}>
      <VerbLink className={verb.className} href={verb.verb}>
        {verb.verb}
      </VerbLink>

      {!verb.isLast && ', '}
    </React.Fragment>
  ))
}
