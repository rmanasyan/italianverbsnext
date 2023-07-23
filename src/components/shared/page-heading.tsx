import { ReactNode } from 'react'

export function PageHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className={'flex items-center space-x-2 px-4 text-xl'}>{children}</h2>
  )
}
