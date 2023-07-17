import { Conjugation } from '@/types/verbs'
import { IconPin } from '@/components/icons/icon-pin'

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
      <h2 className={'flex items-center px-4 text-xl'}>
        <IconPin className={'mr-2 text-primary-500'} />
        <span className={'mr-1'}>{decodeURI(paramsVerb)}</span>
        {conjugation.verb !== paramsVerb && `(${conjugation.verb})`}
      </h2>
    </>
  )
}
