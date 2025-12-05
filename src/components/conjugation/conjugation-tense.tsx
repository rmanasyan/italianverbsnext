import { ConjugationDisplaySetting, VerbTense } from '@/types/verbs'

interface ConjugationTenseProps {
  tense: VerbTense & ConjugationDisplaySetting
}

export function ConjugationTense({ tense }: ConjugationTenseProps) {
  return (
    <section className={'rounded-xs border border-primary-200 px-4 py-2'}>
      <h3 className={'pb-1.5 font-bold'} key={tense.name}>
        {tense.nameIta}
      </h3>

      <ul>
        {tense.forms.map((form) => (
          <li key={form.id + form.form}>
            <span className={'text-accent-700'}>{form.pronoun}</span>{' '}
            {form.form}
          </li>
        ))}
      </ul>
    </section>
  )
}
