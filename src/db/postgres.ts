import { SQL } from 'bun'

if (!process.env.POSTGRES_URL) {
  throw new Error('DB url connection string is required, please update .env')
}

const sql = new SQL(process.env.POSTGRES_URL, {
  max: 10, // Increased for build performance (was 1, caused timeouts during static generation)
})

export { sql }
