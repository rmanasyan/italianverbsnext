import { ScrollText as IconScrollText } from 'lucide-react'
import { Conjugation } from '@/types/verbs'
import { PageHeading } from '@/components/shared/page-heading'

interface ConjugationSummaryProps {
  conjugation: Conjugation
  paramsVerb: string
}

export function ConjugationSummary({
  conjugation,
  paramsVerb,
}: ConjugationSummaryProps) {
  return (
    <>
      <PageHeading>
        <IconScrollText className={'text-primary-400'} />
        <div>
          <span className={'mr-1.5'}>{decodeURI(paramsVerb)}</span>
          {conjugation.verb !== paramsVerb && `(${conjugation.verb})`}
        </div>
      </PageHeading>
    </>
  )
}
