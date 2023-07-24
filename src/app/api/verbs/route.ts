import { NextResponse } from 'next/server'
import { Verb } from '@/types/verbs'
import { getFilteredVerbs } from '@/db/firestore'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  let verbs: Verb[] = []

  if (query && query?.length > 1) {
    verbs = await getFilteredVerbs(query)
  }

  return NextResponse.json(verbs)
}
