import { ConjugationDisplaySetting, ConjugationGroup } from '@/types/verbs'

export const conjugationGroupList: Array<{
  name: string
  id: ConjugationGroup
}> = [
  {
    name: 'Indicativo',
    id: ConjugationGroup.Indicativo,
  },
  {
    name: 'Congiuntivo',
    id: ConjugationGroup.Congiuntivo,
  },
  {
    name: 'Condizionale',
    id: ConjugationGroup.Condizionale,
  },
  {
    name: 'Imperativo',
    id: ConjugationGroup.Imperativo,
  },
  {
    name: 'Infinito',
    id: ConjugationGroup.Infinito,
  },
  {
    name: 'Participio',
    id: ConjugationGroup.Participio,
  },
  {
    name: 'Gerundio',
    id: ConjugationGroup.Gerundio,
  },
]

export const conjugationDisplaySettings: {
  [key: string]: ConjugationDisplaySetting
} = {
  'Indicative Present': {
    group: ConjugationGroup.Indicativo,
    nameIta: 'Presente',
    nameEng: 'Indicative Present',
    order: 1,
  },
  'Indicative Perfect': {
    group: ConjugationGroup.Indicativo,
    nameIta: 'Passato Prossimo',
    nameEng: 'Indicative Perfect',
    order: 2,
  },
  'Indicative Past': {
    group: ConjugationGroup.Indicativo,
    nameIta: 'Imperfetto',
    nameEng: 'Indicative Past',
    order: 3,
  },
  'Indicative Pluperfect': {
    group: ConjugationGroup.Indicativo,
    nameIta: 'Trapassato Prossimo',
    nameEng: 'Indicative Pluperfect',
    order: 4,
  },
  'Indicative Preterite': {
    group: ConjugationGroup.Indicativo,
    nameIta: 'Passato Remoto',
    nameEng: 'Indicative Preterite',
    order: 5,
  },
  'Preterite Perfect': {
    group: ConjugationGroup.Indicativo,
    nameIta: 'Trapassato Remoto',
    nameEng: 'Preterite Perfect',
    order: 6,
  },
  'Indicative Future': {
    group: ConjugationGroup.Indicativo,
    nameIta: 'Futuro Semplice',
    nameEng: 'Indicative Future',
    order: 7,
  },
  'Future Perfect': {
    group: ConjugationGroup.Indicativo,
    nameIta: 'Futuro Anteriore',
    nameEng: 'Future Perfect',
    order: 8,
  },
  'Subjunctive Present': {
    group: ConjugationGroup.Congiuntivo,
    nameIta: 'Presente',
    nameEng: 'Subjunctive Present',
    order: 9,
  },
  'Subjunctive Perfect': {
    group: ConjugationGroup.Congiuntivo,
    nameIta: 'Passato',
    nameEng: 'Subjunctive Perfect',
    order: 10,
  },
  'Subjunctive Past': {
    group: ConjugationGroup.Congiuntivo,
    nameIta: 'Imperfetto',
    nameEng: 'Subjunctive Past',
    order: 11,
  },
  'Subjunctive Pluperfect': {
    group: ConjugationGroup.Congiuntivo,
    nameIta: 'Trapassato',
    nameEng: 'Subjunctive Pluperfect',
    order: 12,
  },
  Conditional: {
    group: ConjugationGroup.Condizionale,
    nameIta: 'Presente',
    nameEng: 'Conditional',
    order: 13,
  },
  'Conditional Perfect': {
    group: ConjugationGroup.Condizionale,
    nameIta: 'Passato',
    nameEng: 'Conditional Perfect',
    order: 14,
  },
  Imperative: {
    group: ConjugationGroup.Imperativo,
    nameIta: 'Presente',
    nameEng: 'Imperative',
    order: 15,
  },
  Infinitive: {
    group: ConjugationGroup.Infinito,
    nameIta: 'Presente',
    nameEng: 'Infinitive',
    order: 16,
  },
  'Infinitive Perfect': {
    group: ConjugationGroup.Infinito,
    nameIta: 'Passato',
    nameEng: 'Infinitive Perfect',
    order: 17,
  },
  'Present Participle': {
    group: ConjugationGroup.Participio,
    nameIta: 'Presente',
    nameEng: 'Present Participle',
    order: 18,
  },
  'Past Participle': {
    group: ConjugationGroup.Participio,
    nameIta: 'Passato',
    nameEng: 'Past Participle',
    order: 19,
  },
  Gerund: {
    group: ConjugationGroup.Gerundio,
    nameIta: 'Presente',
    nameEng: 'Gerund',
    order: 20,
  },
  'Gerund Perfect': {
    group: ConjugationGroup.Gerundio,
    nameIta: 'Passato',
    nameEng: 'Gerund Perfect',
    order: 21,
  },
}
