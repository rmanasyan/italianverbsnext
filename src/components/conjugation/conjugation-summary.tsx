import { ScrollText as IconScrollText } from 'lucide-react'
import { Conjugation } from '@/types/verbs'

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
        <IconScrollText className={'mr-2 text-primary-400'} />
        <span className={'mr-1'}>{decodeURI(paramsVerb)}</span>
        {conjugation.verb !== paramsVerb && `(${conjugation.verb})`}
      </h2>
    </>
  )
}
