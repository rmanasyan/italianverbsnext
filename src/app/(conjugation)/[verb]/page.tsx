import { notFound } from 'next/navigation'
import { getConjugation } from '@/db/firestore'
import { ConjugationInfo } from '@/components/conjugation/conjugation-info'
import { ConjugationSummary } from '@/components/conjugation/conjugation-summary'

interface VerbPageProps {
  params: { verb: string }
}

export default async function VerbPage({ params }: VerbPageProps) {
  const conjugation = await getConjugation(params.verb)

  if (!conjugation) {
    notFound()
  }

  return (
    <>
      <ConjugationSummary conjugation={conjugation} paramsVerb={params.verb} />
      <ConjugationInfo conjugation={conjugation} />
    </>
  )
}
