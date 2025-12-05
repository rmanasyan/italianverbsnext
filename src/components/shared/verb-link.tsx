import { ComponentProps } from 'react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export function VerbLink({ href, className, children, ...props }: ComponentProps<typeof Link>) {
  const prefetchDisabled = !!process.env.GENERATE_STATIC_PAGES

  return (
    <Link
      className={twMerge(
        `rounded-xs underline decoration-1 underline-offset-2 outline-hidden transition hover:bg-accent-100 hover:decoration-accent-400 focus-visible:bg-accent-100 focus-visible:decoration-accent-400`,
        className
      )}
      href={href}
      prefetch={!prefetchDisabled}
      {...props}
    >
      {children}
    </Link>
  )
}
