import Link from 'next/link'
import {
  Conjugation,
  ConjugationDisplaySetting,
  ConjugationGroup,
  VerbTense,
} from '@/types/verbs'
import {
  conjugationDisplaySettings,
  conjugationGroupList,
} from '@/db/conjugation-config'
import { ConjugationTense } from '@/components/conjugation/conjugation-tense'

interface ConjugationInfoProps {
  conjugation: Conjugation
}

export function ConjugationInfo({ conjugation }: ConjugationInfoProps) {
  const tenses: Array<VerbTense & ConjugationDisplaySetting> = Object.values(
    conjugation.tenses
  )
    .map((tense) => {
      return {
        ...tense,
        ...conjugationDisplaySettings[tense.name],
      }
    })
    .sort((t1, t2) => t1.order - t2.order)

  const tensesByGroup = (group: ConjugationGroup) => {
    return tenses.filter((tense) => tense.group === group)
  }

  return (
    <div className={'my-5'}>
      {conjugationGroupList.map((conjugationGroup) => (
        <section key={conjugationGroup.id}>
          <h2
            className={'group relative pb-2 font-heading text-xl md:text-2xl'}
            id={conjugationGroup.name.toLowerCase()}
          >
            <Link
              href={`#${conjugationGroup.name.toLowerCase()}`}
              className={
                'absolute -left-6 text-primary-400 opacity-0 outline-none transition hover:text-accent-700 focus-visible:opacity-100 group-hover:opacity-100'
              }
            >
              #
            </Link>
            {conjugationGroup.name}
          </h2>

          <div className={'mb-8 grid grid-cols-1 gap-4 md:grid-cols-2'}>
            {tensesByGroup(conjugationGroup.id).map((tense) => (
              <ConjugationTense key={tense.name} tense={tense} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
