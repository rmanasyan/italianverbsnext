import { Scroll as IconScroll } from 'lucide-react'
import { PageHeading } from '@/components/shared/page-heading'

export default function NotFound() {
  return (
    <>
      <PageHeading>
        <IconScroll className={'text-primary-400'} />
        <div>Italian verb not found</div>
      </PageHeading>

      <p className={'p-5'}>It is either non-existent or the Italians invented something new ¯\_(ツ)_/¯</p>
    </>
  )
}
