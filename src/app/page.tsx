import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <div className={`text-accent-500`}>hello</div>
      <Link href={'mangiare'}>Mangiare verb</Link>
    </>
  )
}
