import { notFound } from 'next/navigation'
import { getConjugation } from '@/utils/firestore'

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
      <h2 className={'font-heading text-2xl'}>Indicativo</h2>
      <div>
        <div className={'font-bold'}>{conjugation.verb}</div>
        <pre>{JSON.stringify(conjugation, null, ' ')}</pre>
      </div>
    </>
  )
}
