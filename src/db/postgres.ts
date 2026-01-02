import { SQL } from 'bun'

if (!process.env.POSTGRES_URL) {
  throw new Error('DB url connection string is required, please update .env')
}

const sql = new SQL(process.env.POSTGRES_URL, {
  max: 1, // Limit to 1 connection per worker (15 workers = 15 total)
})

export { sql }
