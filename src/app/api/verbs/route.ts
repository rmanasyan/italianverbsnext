import { NextResponse } from 'next/server'
import { VerbFiltered } from '@/types/verbs'
import { getFilteredVerbsFromArray } from '@/db/filestore'
import { getFilteredVerbs } from '@/db/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  let verbs: VerbFiltered[] = []

  if (query && query?.length > 1) {
    if (!(process.env.API_SEARCH_FILESTORE === 'true')) {
      verbs = await getFilteredVerbs(query)
    } else {
      verbs = getFilteredVerbsFromArray(query)
    }
  }

  return NextResponse.json(verbs)
}
