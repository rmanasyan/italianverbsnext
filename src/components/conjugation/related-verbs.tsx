import { getRelatedVerbs } from '@/db/data'
import { VerbLink } from '@/components/shared/verb-link'

export async function RelatedVerbs({ relatedTo }: { relatedTo: string }) {
  const verbs = await getRelatedVerbs(relatedTo)

  if (!verbs.length) {
    return ''
  }

  return (
    <section>
      <h4 className="font-heading text-sm">Related verbs*</h4>

      <div lang="it" className={'px-4 py-1.5 text-sm'}>
        {verbs.map((verb, index) => (
          <span key={verb.id}>
            <VerbLink href={verb.verb}>{verb.verb}</VerbLink>

            {verbs.length - 1 !== index && ', '}
          </span>
        ))}
      </div>
    </section>
  )
}
