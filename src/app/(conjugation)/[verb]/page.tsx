import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { capitalize } from '@/utils/capitalize'
import { getConjugation } from '@/db/firestore'
import { ConjugationInfo } from '@/components/conjugation/conjugation-info'
import { ConjugationSummary } from '@/components/conjugation/conjugation-summary'

interface VerbPageProps {
  params: { verb: string }
}

export async function generateMetadata({
  params,
}: VerbPageProps): Promise<Metadata> {
  const conjugation = await getConjugation(params.verb)

  const verb = decodeURI(params.verb)
  const isVerbForm = verb !== conjugation?.verb

  const capitalizedVerb =
    capitalize(verb) +
    (conjugation && isVerbForm ? ` (${conjugation?.verb})` : '')

  if (!conjugation) {
    return {
      title: `${capitalizedVerb} italian verb not found`,
    }
  }

  return {
    title: `${capitalizedVerb} Italian verb conjugation | Conjugate verb ${verb}`,
    description: `Conjugate Italian verb ${verb}: indicativo, congiuntivo, condizionale, imperativo, infinito, participio and gerundio forms of the verb ${verb}`,
    alternates: {
      ...(isVerbForm && { canonical: '/' + conjugation?.verb }),
    },
  }
}

export default async function VerbPage({ params }: VerbPageProps) {
  const conjugation = await getConjugation(params.verb)

  if (!conjugation) {
    notFound()
  }

  return (
    <section lang="it">
      <ConjugationSummary conjugation={conjugation} paramsVerb={params.verb} />
      <ConjugationInfo conjugation={conjugation} />
    </section>
  )
}
