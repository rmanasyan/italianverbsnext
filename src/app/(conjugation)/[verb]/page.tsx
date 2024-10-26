import { ConjugationInfo } from '@/components/conjugation/conjugation-info'
import { ConjugationSummary } from '@/components/conjugation/conjugation-summary'
import { RelatedVerbs } from '@/components/conjugation/related-verbs'
import { getConjugation, getFeaturedVerbs, getVerbs } from '@/db/data'
import { capitalize } from '@/utils/capitalize'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type VerbParam = { verb: string }

interface VerbPageProps {
  params: Promise<VerbParam>
}

export async function generateMetadata(props: VerbPageProps): Promise<Metadata> {
  const params = await props.params
  const conjugation = await getConjugation(params.verb)

  const verb = decodeURI(params.verb)
  const isVerbForm = verb !== conjugation?.verb

  const capitalizedVerb = capitalize(verb) + (conjugation && isVerbForm ? ` (${conjugation?.verb})` : '')

  if (!conjugation) {
    return {
      title: `${capitalizedVerb} Italian verb not found`
    }
  }

  return {
    title: `${capitalizedVerb} verb conjugation - Italian Verbs Conjugation`,
    description: `Conjugate Italian verb ${verb}, verbo Italiano: indicativo, congiuntivo, condizionale, imperativo, infinito, participio and gerundio forms of the verb ${verb}`,
    alternates: {
      ...(isVerbForm && { canonical: '/' + conjugation?.verb })
    }
  }
}

export async function generateStaticParams(): Promise<VerbParam[]> {
  type StaticPages = 'featured' | 'all' | undefined

  let staticParams: VerbParam[] = []

  const generateStaticPages: StaticPages = process.env.GENERATE_STATIC_PAGES as StaticPages

  if (!generateStaticPages) {
    return []
  }

  if (generateStaticPages === 'featured') {
    staticParams = await getFeaturedVerbs()
  }

  if (generateStaticPages === 'all') {
    staticParams = await getVerbs()
  }

  return staticParams.map((verb) => ({ verb: verb.verb }))
}

export default async function VerbPage(props: VerbPageProps) {
  const params = await props.params
  const conjugation = await getConjugation(params.verb)

  if (!conjugation) {
    notFound()
  }

  return (
    <>
      <section lang="it">
        <ConjugationSummary conjugation={conjugation} paramsVerb={params.verb} />
        <ConjugationInfo conjugation={conjugation} />
      </section>

      <RelatedVerbs relatedTo={params.verb} />
    </>
  )
}
