import { ScrollText as IconScrollText } from 'lucide-react'
import { Conjugation } from '@/types/verbs'
import { capitalize } from '@/utils/capitalize'
import { PageHeading } from '@/components/shared/page-heading'

interface ConjugationSummaryProps {
  conjugation: Conjugation
  paramsVerb: string
}

export function ConjugationSummary({
  conjugation,
  paramsVerb,
}: ConjugationSummaryProps) {
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
