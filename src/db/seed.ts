import { DocumentData } from 'firebase-admin/lib/firestore'
import { sql } from '@/db/postgres'
import { collectionData, firestore } from '@/db/firestore'
import { Verb } from '@/types/verbs'

async function getVerbs() {
  const collectionRef: FirebaseFirestore.Query<DocumentData> = firestore.collection('verbs').orderBy('verb').limit(0)

  return collectionData<Verb>(collectionRef)
}

async function getConjugations() {
  const collectionRef: FirebaseFirestore.Query<DocumentData> = firestore
    .collection('conjugations')
    .orderBy('verb')
    .limit(0)

  return collectionData(collectionRef)
}

async function copyVerbs() {
  try {
    await sql`DROP TABLE verbs;`
    await sql`
      CREATE TABLE IF NOT EXISTS verbs (
        id VARCHAR(24) NOT NULL PRIMARY KEY,
        conjugation_id VARCHAR(24) NOT NULL,
        json_data JSONB NOT NULL
      );
    `
    await sql`CREATE INDEX idx_conjugation_id ON verbs(conjugation_id);`
    await sql`CREATE INDEX idx_json_data_forms ON verbs USING GIN ((json_data->'forms'));`
    await sql`CREATE INDEX idx_json_data_verb ON verbs USING GIN ((json_data->'verb'));`

    const verbs = (await getVerbs()).map((verb) => {
      const { createdAt, ...data } = verb

      return {
        id: verb.id,
        conjugation_id: verb.conjugationId,
        json_data: data
      }
    })

    await sql`INSERT INTO verbs ${sql(verbs, 'id', 'conjugation_id', 'json_data')}`

    console.log('verbs: ', verbs.length)
  } catch (error) {
    console.error('Error seeding verbs:', error)
    throw error
  }
}

async function copyConjugations() {
  try {
    await sql`DROP TABLE conjugations;`
    await sql`
      CREATE TABLE IF NOT EXISTS conjugations (
        id VARCHAR(24) NOT NULL PRIMARY KEY,
        json_data JSONB NOT NULL
      );
    `

    const conjugations = (await getConjugations()).map((conjugation) => {
      const { createdAt, ...data } = conjugation

      return {
        id: conjugation.id,
        json_data: data
      }
    })

    await sql`INSERT INTO conjugations ${sql(conjugations, 'id', 'json_data')}`

    console.log('conjugations: ', conjugations.length)
  } catch (error) {
    console.error('Error seeding conjugations:', error)
    throw error
  }
}

export async function seed() {
  await copyVerbs()
  await copyConjugations()
}
