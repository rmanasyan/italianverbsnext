import { FeaturedVerbs } from '@/components/home/featured-verbs'

export default function HomePage() {
  return (
    <>
      <h2 className={'font-heading text-xl md:text-2xl'}>
        Or find the most popular Italian verbs below*
      </h2>

      <section lang="it" className={'px-5 py-2 leading-8'}>
        {<FeaturedVerbs />}
      </section>
    </>
  )
}
