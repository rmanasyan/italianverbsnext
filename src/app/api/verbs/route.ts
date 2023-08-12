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
      console.time('searchfire ' + query)
      verbs = await getFilteredVerbs(query)
      console.timeEnd('searchfire ' + query)
    } else {
      console.time('searchfile ' + query)
      verbs = getFilteredVerbsFromArray(query)
      console.timeEnd('searchfile ' + query)
    }
  }

  return NextResponse.json(verbs)
}
