import { FeaturedVerbs } from '@/components/featured-verbs'

export default function HomePage() {
  return (
    <>
      <h2 className={'font-heading text-2xl'}>
        Or find the most popular Italian verbs below*
      </h2>
      <section className={'px-5 py-2 leading-8'}>{<FeaturedVerbs />}</section>
    </>
  )
}
