import { Loader2 as IconLoader } from 'lucide-react'
import { PageHeading } from '@/components/shared/page-heading'

export default function Loading() {
  return (
    <PageHeading>
      <IconLoader className={'animate-spin text-primary-400'} />
    </PageHeading>
  )
}
