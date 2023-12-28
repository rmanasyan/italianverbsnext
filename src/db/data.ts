import { cache } from 'react'
import { sql } from '@/db/postgres'
import { Conjugation, Verb } from '@/types/verbs'

// CREATE TABLE IF NOT EXISTS verbs (
//   id VARCHAR(24) NOT NULL PRIMARY KEY,
//   conjugation_id VARCHAR(24) NOT NULL,
//   json_data JSONB NOT NULL
// );
//
// CREATE INDEX idx_conjugation_id ON verbs(conjugation_id);
// CREATE INDEX idx_json_data_forms ON verbs USING GIN ((json_data->'forms'));
// CREATE INDEX idx_json_data_verb ON verbs USING GIN ((json_data->'verb'));
// CREATE INDEX idx_json_data_featured ON verbs USING GIN ((json_data->'featured'));
//
// CREATE TABLE IF NOT EXISTS conjugations (
//   id VARCHAR(24) NOT NULL PRIMARY KEY,
//   json_data JSONB NOT NULL
// );

export const getFeaturedVerbs = cache(async (): Promise<Verb[]> => {
  const rows = await sql<Array<{ data: Verb }>>`
    SELECT json_data as data
    FROM verbs
    WHERE json_data->>'featured' = 'true'
    ORDER BY json_data->>'verb'
    LIMIT ${Number(process.env.FEATURED_VERBS_LIMIT || 10)};
  `
  return rows.map((row) => row.data)
})

export const getVerbs = cache(async (): Promise<Verb[]> => {
  const rows = await sql<Array<{ data: Verb }>>`
    SELECT json_data AS data
    FROM verbs
    ORDER BY json_data->>'verb'
    LIMIT ${Number(process.env.VERBS_LIMIT || 10)};
  `
  return rows.map((row) => row.data)
})

export const getFilteredVerbs = cache(async (searchQuery: string): Promise<Verb[]> => {
  const rows = await sql<Array<{ data: Verb }>>`
    SELECT json_data AS data
    FROM verbs
    WHERE json_data->>'verb' ILIKE ${searchQuery + '%'}
    ORDER BY json_data->>'verb'
    LIMIT 30;
  `

  return rows.map((row) => row.data)
})

export const getConjugation = cache(async (verb: string): Promise<Conjugation | null> => {
  try {
    const now = Date.now()
    console.time(`---sql ${now} ${verb}`)

    const [row] = await sql<Array<{ conjugation: Conjugation; verb: string }>>`
      SELECT c.json_data AS conjugation, v.json_data->>'verb' as verb
      FROM conjugations c
      JOIN verbs v ON v.conjugation_id = c.id
      WHERE v.json_data->'forms' ? ${decodeURI(verb)}
      LIMIT 1;
    `

    console.timeEnd(`---sql ${now} ${verb}`)

    if (!row) {
      return null
    }

    return {
      ...row.conjugation,
      verb: row.verb
    }
  } catch (error) {
    console.error('Error getConjugation: ', error)
    return null
  }
})
