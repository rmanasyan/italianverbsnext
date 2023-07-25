import './globals.css'
import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { twMerge } from 'tailwind-merge'
import { fontHeading, fontSans } from '@/utils/fonts'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Search } from '@/components/search'

export const metadata: Metadata = {
  title: 'Italian Verbs Conjugation',
  description:
    'Search and conjugate Italian verbs. Fast and easy to use, no ads. More than 12000 Italian verbs with forms',
  creator: 'Roman Manasyan',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ''),
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          'bg-primary-50 font-sans text-lg text-primary-800 antialiased selection:bg-accent-200',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <div
          className={'mx-auto flex min-h-screen max-w-screen-md flex-col p-8'}
        >
          <Header />
          <Search />
          <main className={'my-8 grow'}>{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
