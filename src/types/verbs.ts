export interface Verb {
  conjugationId: string
  forms: string[]
  id: string
  verb: string
  featured?: boolean
}

export interface VerbFiltered {
  id: string
  path: string
  title: string
}

export interface VerbForm {
  form: string
  pronoun: string
  use: number
  id: number
}

export interface VerbTense {
  name: string
  forms: VerbForm[]
}

export interface Conjugation {
  auxiliaries: string[]
  examples: string[]
  id: string
  verb: string
  tenses: {
    [key: number]: VerbTense
  }
}

export enum ConjugationGroup {
  Indicativo,
  Congiuntivo,
  Condizionale,
  Imperativo,
  Infinito,
  Participio,
  Gerundio
}

export interface ConjugationDisplaySetting {
  group: ConjugationGroup
  nameIta: string
  nameEng: string
  order: number
}
