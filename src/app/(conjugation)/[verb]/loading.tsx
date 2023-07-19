import { ScrollText as IconScrollText } from 'lucide-react'

export default function Loading() {
  return (
    <div className={'flex animate-pulse items-center px-4 text-xl'}>
      <IconScrollText className={'mr-2 text-primary-400'} /> ...
    </div>
  )
}
