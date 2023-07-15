import { Timestamp } from 'firebase-admin/firestore'

export interface Verb {
  conjugationId: string
  createdAt: Timestamp
  forms: string[]
  id: string
  verb: string
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
  createdAt: Timestamp
  examples: string[]
  verb: string
  tenses: {
    [key: number]: VerbTense
  }
}
