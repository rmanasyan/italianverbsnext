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
          <h2 className={'pb-2 font-heading text-2xl'}>
            {conjugationGroup.name}
          </h2>

          <div className={'mb-8 grid grid-cols-2 gap-4'}>
            {tensesByGroup(conjugationGroup.id).map((tense) => (
              <ConjugationTense key={tense.name} tense={tense} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
