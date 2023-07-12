import { VerbLink } from '@/components/verb-link'

export default function HomePage() {
  return (
    <>
      <h2 className={'font-heading text-2xl'}>
        Or find the most popular Italian verbs below*
      </h2>
      <section className={'px-3'}>
        <VerbLink href={'abbandonare'}>abbandonare</VerbLink>
      </section>
    </>
  )
}
