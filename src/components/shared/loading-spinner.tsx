import { Loader2 as IconLoader } from 'lucide-react'
import { PageHeading } from '@/components/shared/page-heading'

export function LoadingSpinner() {
  return (
    <PageHeading>
      <IconLoader className={'animate-spin text-primary-400'} />
    </PageHeading>
  )
}
