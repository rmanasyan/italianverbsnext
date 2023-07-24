import Link from 'next/link'

export function Header() {
  return (
    <header className={'mb-7 md:mb-12'}>
      <h1
        className={
          'font-heading text-4xl md:text-[5rem] md:leading-[0.8] md:tracking-wide'
        }
      >
        <Link
          href={'/'}
          className={
            'outline-none transition hover:text-accent-800 focus-visible:text-accent-800'
          }
        >
          Italian Verbs Conjugation
        </Link>
      </h1>
    </header>
  )
}
