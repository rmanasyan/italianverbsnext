import { NextResponse } from 'next/server'
import { Verb } from '@/types/verbs'
import { getFilteredVerbsFromArray } from '@/db/filestore'
import { getFilteredVerbs } from '@/db/firestore'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  let verbs: Verb[] = []

  if (query && query?.length > 1) {
    if (!process.env.API_SEARCH_FILESTORE) {
      verbs = await getFilteredVerbs(query)
    } else {
      verbs = getFilteredVerbsFromArray(query)
    }
  }

  return NextResponse.json(verbs)
}
