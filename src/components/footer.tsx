import { VerbLink } from '@/components/shared/verb-link'

const contactEmail = 'madewithlove@italianverbs.info'

export function Footer() {
  return (
    <footer className={'py-5 text-base'}>
      <VerbLink href={`mailto:${contactEmail}`}>{contactEmail}</VerbLink>
    </footer>
  )
}
