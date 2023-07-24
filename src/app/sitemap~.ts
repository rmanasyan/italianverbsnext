import { MetadataRoute } from 'next'
import { getVerbs } from '@/db/firestore'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const verbs = await getVerbs()
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''

  const sitemapData = verbs.map((verb) => {
    return {
      url: `${baseUrl}/${verb.verb}`,
      lastModified: new Date(),
    }
  })

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    ...sitemapData,
  ]
}
