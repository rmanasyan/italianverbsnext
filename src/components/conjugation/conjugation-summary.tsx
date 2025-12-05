import { PageHeading } from '@/components/shared/page-heading'
import { Conjugation } from '@/types/verbs'
import { ScrollText as IconScrollText } from 'lucide-react'

interface ConjugationSummaryProps {
  conjugation: Conjugation
  paramsVerb: string
}

export function ConjugationSummary({ conjugation, paramsVerb }: ConjugationSummaryProps) {
  let verb = decodeURI(paramsVerb)
  verb += paramsVerb !== conjugation.verb ? ` (${conjugation.verb})` : ''

  return (
    <>
      <PageHeading>
        <IconScrollText className={'text-primary-400'} />
        <div>{verb}</div>
      </PageHeading>
    </>
  )
}
