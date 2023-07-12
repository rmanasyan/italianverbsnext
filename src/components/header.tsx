import Link from 'next/link'

export function Header() {
  return (
    <header className={'mb-12'}>
      <h1 className={'font-heading text-[80px] leading-[0.8] tracking-wide'}>
        <Link
          href={'/'}
          className={
            'outline-none transition hover:text-primary-700 focus-visible:text-primary-700'
          }
        >
          Italian Verbs Conjugation
        </Link>
      </h1>
    </header>
  )
}
