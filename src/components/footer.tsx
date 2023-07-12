import { VerbLink } from '@/components/verb-link'

const contactEmail = 'madewithlove@italianverbs.info'

export function Footer() {
  return (
    <footer className={'p-5 text-center text-base'}>
      <VerbLink href={`mailto:${contactEmail}`}>{contactEmail}</VerbLink>
    </footer>
  )
}
