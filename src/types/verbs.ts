import { Timestamp } from 'firebase-admin/firestore'

export interface Verb {
  conjugationId: string
  createdAt?: Timestamp
  forms: string[]
  id: string
  verb: string
  featured?: boolean
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
  createdAt?: Timestamp
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
